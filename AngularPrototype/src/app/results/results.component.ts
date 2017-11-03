import { Component, AfterViewInit, HostListener, OnDestroy } from '@angular/core';
import { Http, Response, RequestOptions, Headers } from '@angular/http';
import { Router } from '@angular/router';
import { GridOptions } from 'ag-grid/main';
import { MdSnackBar } from '@angular/material';
import { Subscription } from 'rxjs/Subscription';

import { ResultDetailComponent } from './result-detail.component';
import { PatientListService } from '../services/patient-list.service';

import { AccessionBannerModel } from '../models/accession-banner.model';
import { TestResultsModel } from '../models/test-result.model';
import { SelectedPatientModel } from '../models/selected-patient.model';
import { SelectedPatientForResultModel } from '../models/selected-patient-result.model';

import { IUnsavedChanges } from '../shared/unsaved-changes/prevent-unsaved-changes';
import { PreventUnsavedChanges } from '../shared/unsaved-changes/prevent-unsaved-changes-handler';

import { PassDataService } from '../services/pass-data.service';
import { ResultUpdateComponent } from './result-update.component';
import { GetConfigService } from '../services/get-config.service';

@Component({
    moduleId: module.id,
    selector: 'patiq-results',
    templateUrl: './results.component.html',
    styleUrls: ['./results.component.css'],
    providers: [PatientListService]
})
/// <summary>
/// This class is used to display Test result data
/// </summary>
export class ResultsComponent implements AfterViewInit, IUnsavedChanges {
    //GridOptions - Column definition, row data and other settings to display Accession Banner & Test results
    public accessionBannerGridOptions: GridOptions;

    //PatientResult Data is replica of AccessionBannerModel class
    public patientResultData: AccessionBannerModel[];

    public updateResultResponse: string;

    //Get Selected Patient ID and Number of last activity days from Patient-list page
    public selectedPatientfromPatientList: SelectedPatientModel;

    //Title of the page
    title: string;
    //Update Button Settings
    //Original text of Update button
    updateText: string;
    //Dynamic text to Update button
    updateActionText: string;
    //Flag to show/hide loading spinner inside the update button
    isUpdateShowActionIcon = false;
    //Disable the Update button if no change in Result
    isUpdateDisable: boolean = true;

    //Set text for the link to go back to search
    goBackToSearch: string;

    //error message for result page when navigated w/o PatientIDs
    noPatientIDSelected: string;

    //control spinner
    isLoading: boolean = false;

    //hide/show all button text
    hideShowButtonText: string;

    //Track state change for the show/hide button
    expandAll: boolean = false;

    //Flag to find the form has dirty data or not, Its declared in IUnsavedChanges interface
    hasUnsavedChanges = false;
    //Message to display if there is unsaved data
    unsavedChangesMessage: string;
    //To get data from the PassData Service
    private subscription: Subscription;


    constructor(private dataService: PatientListService, public patientFromList: SelectedPatientForResultModel, public snackBar: MdSnackBar, public getData: PassDataService, private getConfig: GetConfigService, private router: Router) {
        //Initiate object of SelectedPatientModel to get selected patientIDs from patient-list page
        this.selectedPatientfromPatientList = new SelectedPatientModel();
        //Receive selected patient IDs from SelectedPatientForResultModel
        this.selectedPatientfromPatientList = this.patientFromList.selectedData;
        //Initiate grid options
        this.accessionBannerGridOptions = <GridOptions>{
            //Get column definition of Result from createColumnDef()
            columnDefs: this.createColumnDefs()
        };
        //Show message if Patient(s) is not selected from PatientList
        if (this.selectedPatientfromPatientList.PatientIDs == null) {
            this.noPatientIDSelected = this.getConfig.getResx('NoPatientIDSelected');
        }
        else {
            //Get row data
            this.createRowData();
        }

        //Get data from the PassData Service
        //this.subscription = this.passDatService.notifyObservable$.subscribe((response) => {
        //    //Get unsaved changes flag from the service
        //    this.hasUnsavedChanges = response;
        //    console.log(this.hasUnsavedChanges);
        //    //Disable/Enable the update button based on changes
        //    this.isUpdateDisable = !this.hasUnsavedChanges;
        //});

        //Get Texts from Config - Starts here
        this.title = this.getConfig.getResx('Results');
        this.updateText = this.getConfig.getResx('Update');
        this.updateActionText = this.getConfig.getResx('UpdateActionText');
        this.noPatientIDSelected = this.getConfig.getResx('NoPatientIDSelected');
        this.unsavedChangesMessage = this.getConfig.getResx('UnsavedChangesMessage');
        this.hideShowButtonText = this.getConfig.getResx('ShowAll');
        this.goBackToSearch = this.getConfig.getResx('Search');
        //Get Texts from Config - Ends here
    }


    /// <summary>
    /// Column Definitions
    /// </summary>
    private createColumnDefs() {
        let gridHeaders = this.getConfig.getResx('ResultsMasterGridHeaders');
        return [
            {
                headerName: gridHeaders.Name, field: 'Name',
                // left column is going to act as group column, with the expand/contract controls
                cellRenderer: 'group',
                // we don't want the child count - it would be one each time anyway as each parent not has exactly one child node
                cellRendererParams: { suppressCount: true },
            },
            {
                headerName: gridHeaders.AccessionNumber,
                field: 'AccessionNumber'
            },
            {
                headerName: gridHeaders.CollectDate,
                field: 'CollectDate'
            },
            {
                headerName: gridHeaders.RecieveDate,
                field: 'RecieveDate'
            },
            {
                headerName: gridHeaders.OrderAccountNo,
                field: 'OrderAccountNo'
            },
            {
                headerName: gridHeaders.OrderLocation,
                field: 'OrderLocation'
            },
            {
                headerName: gridHeaders.OrderingPhysician,
                field: 'OrderingPhysician'
            },
        ];
    }

    /// <summary>
    /// Initialize and returns node level
    /// </summary>
    public isFullWidthCell(rowNode: any) {
        return rowNode.level === 1;
    }

    /// <summary>
    /// Sometimes the gridReady event can fire before the angular component is ready to receive it, so in an angular
    /// environment its safer to on you cannot safely rely on AfterViewInit instead before using the API
    /// </summary>
    ngAfterViewInit() {
        //check if PatientIDs are null/undefined
        if (this.selectedPatientfromPatientList.PatientIDs !== undefined) {
            this.accessionBannerGridOptions.api.sizeColumnsToFit();
        }
    }

    ngOnDestroy() {
        //this.selectedPatientfromPatientList.PatientIDs = null;
    }

    /// <summary>
    /// Get Test Results ag-grid
    /// </summary>
    public getFullWidthCellRenderer() {
        return ResultDetailComponent;
    }

    /// <summary>
    /// get Height of Row/Access row
    /// Set it to 200 if its displaying Test Results, otherwise set it to 50px
    /// </summary>
    public getRowHeight(params: any) {
        var rowIsDetailRow = params.node.level === 1;
        // return 200 when detail row, otherwise return 50
        return rowIsDetailRow ? 200 : 50;
    }

    /// <summary>
    /// Display TestResults data by clicking + symbol
    /// </summary>
    public getNodeChildDetails(record: any) {
        if (record.TestResults) {
            return {
                //Set it to True to show Test Results
                group: true,
                // the key is used by the default group cellRenderer
                key: record.name,
                // provide ag-Grid with the children of this group
                children: [record.TestResults],
            };
        } else {
            return null;
        }
    }

    ///<summary>
    ///This method tracks/shows/hides/expands/collapses the rows
    ///</summary>
    public expandCollapseResult() {
        if (this.expandAll === false) {
            //expand using ag-grid row group api
            this.accessionBannerGridOptions.api.expandAll();
            //change the button state
            this.expandAll = true;
            //change button text to hide all
            this.hideShowButtonText = this.getConfig.getResx('HideAll');
        }
        else {
            //collapse using ag-grid row group api
            this.accessionBannerGridOptions.api.collapseAll();
            //change button state
            this.expandAll = false;
            //change button text to show all
            this.hideShowButtonText = this.getConfig.getResx('ShowAll');
        }
    }

    /// <summary>
    /// Fetch Test Results for the selected PatientID and Number of Days from patient List page
    /// Call getPatientResults service with selected PatientID
    /// Convert fetched json data to AccessionBannerModel
    /// </summary>
    private createRowData() {
        //enable spinner
        this.isLoading = true;
        //Service call to get TestResults for the selected PatientIDs
        setTimeout(() => {
            this.dataService
                .getPatientResults(this.selectedPatientfromPatientList)
                .subscribe((data: AccessionBannerModel[]) => this.patientResultData = data,
                (error: any) => {
                    if (!error.ok) {
                        this.noPatientIDSelected = error.json().Message;
                        this.selectedPatientfromPatientList.PatientIDs = null;
                        this.isLoading = false;
                    }
                },
                () => {
                    //Row data of Test Results grid, fetched from Service
                    this.accessionBannerGridOptions.rowData = this.patientResultData;
                    //disable spinner
                    this.isLoading = false;
                });
        }, 1000);
    }

    /// <summary>
    /// Update modified result
    /// Post modified data to WebAPI service to perform update
    /// </summary>
    private updateResult() {
        //Get Row data from result ag-grid
        this.patientResultData = this.accessionBannerGridOptions.rowData;
        setTimeout(() => {
            //Enable the flag to display loading spinner.
            this.isUpdateShowActionIcon = true;
            this.dataService
                .updateResults(this.patientResultData)
                .subscribe((data: string) => this.updateResultResponse = data,
                (error: any) => {
                    if (!error.ok) {
                        // Display a message box at the bottom of the Result page
                        this.snackBar.open(this.getConfig.getResx('UpdateFailed') + error.json().Message, '', {
                            duration: 5000,
                        });
                    }
                },
                () => {
                    // Display a message box at the bottom of the Result page
                    this.snackBar.open(this.getConfig.getResx('UpdateSuccess'), '', {
                        duration: 5000,
                    });
                    //Reset Unsaved changes flag once its updated
                    this.hasUnsavedChanges = false;
                    //Disable Update button once its updated
                    this.isUpdateDisable = !this.hasUnsavedChanges;
                });
            //Disable the flag to display loading spinner.
            this.isUpdateShowActionIcon = false;
        }, 1000);
    }
}
