import { Component, Input, Output, EventEmitter, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AppRoutingModule } from '../patiq-app-routing.module';
import { GridOptions } from 'ag-grid';
import { PatientListModel } from '../models/patient-list.model';
import { SelectedPatientModel } from '../models/selected-patient.model';
import { SelectedPatientForResultModel } from '../models/selected-patient-result.model';
import { GetConfigService } from '../services/get-config.service';
import { DemographicModel } from '../models/patient-demographic.model';
import { PassDataService } from '../services/pass-data.service';

@Component({
    moduleId: module.id,
    selector: 'patiq-patient-lists',
    templateUrl: './patient-list.component.html',
    styleUrls: ['./patient-list.component.css'],
})
/// <summary>
/// This class is used to display Patient List in grid
/// </summary>
export class PatientListComponent implements OnDestroy {
    //Patient List settings are passed from Search component
    @Input() patientListSettings: PatientListModel;

    //store selected patient list data from patient list for persistancy
    persistedPatientListData: PatientListModel;

    //Model to store selected PatientID and Number of last day activity. It will be passed to result page
    selectedPatientID: SelectedPatientModel;

    //get the entire selected row
    selectedPatientRow: any;

    // patientListData: any;

    //flag to show & hide patient list
    isPatientListShow = false;

    //GridOptions - Column definition, row data and other settings.
    patientListGridOptionData: GridOptions;

    //Flag to Disable/Enable Show Results button
    isShowResultsDisabled: boolean = true;
    //ShowResult button text
    showResultText: string;
    title: string;

    //holds column header definittions
    gridHeaders: any;
    //holds browser's locale
    locale: string;

    constructor(private router: Router, private route: ActivatedRoute, public patientFromList: SelectedPatientForResultModel, private getConfig: GetConfigService, private passDataService: PassDataService) {
        //get the browser's locale
        this.locale = document['locale'] as string;

        //Patient List settings
        //Use checked checkbox image in ag-grid
        this.patientListGridOptionData =
            <GridOptions>{
                icons: {
                    checkboxChecked: '<img src="src/assets/images/checkbox.png"/>'
                },
                //Column definition of PatientList grid
                columnDefs: this.createColumnDefs(),
            };

        //Initialize model to store selected PatientID
        this.selectedPatientID = new SelectedPatientModel();
        //Get Texts from Config - Starts here
        this.title = this.getConfig.getResx('PatientListTitle');
        this.showResultText = this.getConfig.getResx('ShowResultsButtonText');
        //Get Texts from Config - Ends here
    }

    ngOnInit() {
        this.persistedPatientListData = this.passDataService.getSearchData();
    }

    //This reflects changes from search component as the patient list settings are being set from search component
    ngAfterContentChecked() {
        //show patient list if persisted data is present
        if (this.patientListSettings.isPatientListShow == true || this.persistedPatientListData !== undefined) {
            this.isShowResultsDisabled = false;
            this.isPatientListShow = true;
        }
        else if (this.patientListSettings.isPatientListShow == false || this.persistedPatientListData == undefined) {
            //hide patient list if there's any change in components data-bound properties
            this.isShowResultsDisabled = true;
            this.isPatientListShow = false;
        }
    }
    //set row data in ngAfterViewInit as grid is triggered before component can receive it
    ngAfterViewInit() {
        if (this.persistedPatientListData !== undefined) {
            this.patientListSettings.isPatientListShow = true;
            this.isPatientListShow = true;
            //set row data using ag-grid API
            this.patientListGridOptionData.api.setRowData(this.persistedPatientListData.gridRowData);
            //get the row that was selected from persistedPatientListData
            let selectedrow = this.persistedPatientListData.selectedRow;
            if (selectedrow !== undefined) {
                //use ag-grid API to get row nodes
                this.patientListGridOptionData.api.forEachNode((node) => {
                    let PID: string[] = [];
                    //get only PIDX from persistedPatientListData
                    selectedrow.forEach(function (selectedRow: any, index: any) {
                        PID.push(selectedRow.PIDX);
                    });
                    //store PIDX
                    this.selectedPatientID.PatientIDs = PID;
                    //Compare the persisted PIDX to each PIDX in grid
                    for (let checkPIDX of this.selectedPatientID.PatientIDs) {
                        if (node.data.PIDX == checkPIDX) {
                            //set checkbox to true if persisted PIDX & PIDX in grid match
                            node.setSelected(true);
                        }
                    }
                });
            }
        }
    }

    /// <summary>
    /// Column Definitions
    /// </summary>
    private createColumnDefs() {
        this.gridHeaders = this.getConfig.getResx('PatientListHeaders');
        //set the the column header to SSN only if locale is en-US
        if (this.locale == 'en-US')
        { this.gridHeaders.NHS = this.getConfig.getResx('SSN'); }
        return [
            {
                field: 'Name',
                headerName: this.gridHeaders.Name,
                width: 200,
                checkboxSelection: true,
                headerCheckboxSelection: true,
            },
            {
                field: 'PIDX',
                headerName: this.gridHeaders.PIDX,
                width: 150,
            },
            {
                field: 'HospitalCode',
                headerName: this.gridHeaders.HospitalCode,
                width: 70,
            },
            {
                field: 'NHS',
                headerName: this.gridHeaders.NHS,
                width: 100,
            },
            {
                field: 'BirthDateText',
                headerName: this.gridHeaders.BirthDateText,
                width: 150,
            },
            {
                field: 'Gender',
                headerName: this.gridHeaders.Gender,
                width: 70,
            },
            {
                field: 'MPI',
                headerName: this.gridHeaders.MPI,
                width: 100,
            },
            {
                field: 'AkaName',
                headerName: this.gridHeaders.AkaName,
                width: 150,
            },
            {
                field: 'DateOfLastActivityText',
                headerName: this.gridHeaders.DateOfLastActivityText,
                width: 150,
            },

        ];
    }

    /// <summary>
    /// Store selected model to object of SelectedPatientForResultModel
    /// This object will be used in result component
    /// </summary>
    ngOnDestroy() {
        this.patientFromList.selectedData = this.selectedPatientID;
    }

    /// <summary>
    /// On selection of Patient from the PatientList grid
    /// Get the selected patient id
    /// Enable/Disable the Show Results button
    /// </summary>
    public onSelectionChanged() {
        //Get Selected Rows
        let selectedRows = this.patientListGridOptionData.api.getSelectedRows();
        this.selectedPatientRow = selectedRows;
        //Enable/Disable the Show Results button
        this.isShowResultsDisabled = (selectedRows.length === 0);
    }

    /// <summary>
    /// Get Test Results for the selected Patient ID
    /// Redirect to Result Page
    /// </summary>
    public showTestResult() {
        //Get Selected Patients
        let selectedRows = this.patientListGridOptionData.api.getSelectedRows();
        this.selectedPatientRow = selectedRows;
        let selectedRowPatientId: string[] = [];
        //Get only PatientID from the selected row in Patient-list grid
        selectedRows.forEach(function (selectedRow, index) {
            selectedRowPatientId.push(selectedRow.PIDX);
        });
        //Store array of selected patientID to SelectedPatientModel
        this.selectedPatientID.PatientIDs = selectedRowPatientId;
        //pass selected rows to service for persistancy
        this.patientListSettings.isPatientListShow = true;
        this.patientListSettings.selectedRow = selectedRows;
        //update the model to be passed to service,will occur from second click of showresults button
        if (this.persistedPatientListData !== undefined) {
            this.patientListSettings = this.persistedPatientListData;
            this.persistedPatientListData.selectedRow = selectedRows;
        }
        //update the existing model in pass-data service
        this.passDataService.setSearchData(this.patientListSettings);
        //Navigate to result page
        this.router.navigate(['/results']);
    }
}