import { Component, AfterViewInit, HostListener } from '@angular/core';
import { Router } from '@angular/router';
import { GridOptions } from 'ag-grid/main';
import { ICellRendererAngularComp } from 'ag-grid-angular/main';
import { ResultUpdateComponent } from './result-update.component';

import { PassDataService } from '../services/pass-data.service';
import { GetConfigService } from '../services/get-config.service';

@Component({
    moduleId: module.id,
    selector: 'patiq-result-detail',
    templateUrl: './result-detail.component.html',
    styleUrls: ['./result-detail.component.css']
})
/// <summary>
/// This class is used to display TestResults in inner ag-grid
/// </summary>
export class ResultDetailComponent implements ICellRendererAngularComp, AfterViewInit {
    //GridOptions - Column definition, row data and other settings to display Test results
    public testResultsGridOptions: GridOptions;
    //Store Accession Banner data
    public parentRecord: any;
    //Store original cell value
    public originalCellValue: string;
    //holds browser's locale
    locale: string;

    //Holds patient demographic details to display in inner ag-grid
    patientIdLabel: string;
    dobLabel: string;
    genderLabel: string;
    nhsLabel: string;
    hidLabel: string;

    hasUnsavedChanges: boolean = false;

    backButtonClicked: boolean;

    constructor(private setDataService: PassDataService, private router: Router, private getConfig: GetConfigService) {
        //Initiate grid options along with Column definition
        this.testResultsGridOptions = <GridOptions>{
            columnDefs: this.createColumnDefs()
        };

        //get the browser's locale
        this.locale = document['locale'] as string;

        //Get the original data from cell before it gets updated
        this.testResultsGridOptions.onCellEditingStarted = function (event) {
            this.originalCellValue = event.value;
        }

        //Get the updated data and compare with the original data.
        //Pass true if its modified to Notify unsaved changes
        this.testResultsGridOptions.onCellEditingStopped = function (event) {
            if (this.originalCellValue != event.value) {
                //Pass true to Notify unsaved changes
                setDataService.passUnsavedChangesFlag(true);
                setDataService.passUnsavedChangesFlag(true);
                this.hasUnsavedChanges = true;
            }
        }

        //Get Texts from Config - Starts here
        this.patientIdLabel = this.getConfig.getResx('PatientID');
        this.dobLabel = this.getConfig.getResx('Dob');
        this.genderLabel = this.getConfig.getResx('Gender');
        this.nhsLabel = this.getConfig.getResx('NHS');
        if (this.locale == 'en-US')
        { this.nhsLabel = this.getConfig.getResx('SSN'); }
        this.hidLabel = this.getConfig.getResx('HID');
        //Get Texts from Config - Ends here
    }

    /// <summary>
    /// Identify AccessionBanner data for the record
    /// </summary>
    agInit(params: any): void {
        this.parentRecord = params.node.parent.data;
    }

    /// <summary>
    /// Sometimes the gridReady event can fire before the angular component is ready to receive it, so in an angular
    /// environment its safer to on you cannot safely rely on AfterViewInit instead before using the API
    /// </summary>
    ngAfterViewInit() {
        //Set TestResults of Accession Banner as Row data
        this.testResultsGridOptions.api.setRowData(this.parentRecord.TestResults);
        this.testResultsGridOptions.api.sizeColumnsToFit();
    }

    /// <summary>
    /// Column Definitions
    /// </summary>
    private createColumnDefs() {
        let gridHeaders = this.getConfig.getResx('ResultsDetailGridHeaders');
        return [
            {
                headerName: gridHeaders.TestName,
                field: 'TestName',
                headerTooltip: gridHeaders.TestName,
                tooltipField: 'TestName',
                cellClass: 'results-record-cell'
            },
            {
                headerName: gridHeaders.ExternalQAFlags,
                field: 'ExternalQAFlags',
                headerTooltip: gridHeaders.ExternalQAFlags,
                tooltipField: 'ExternalQAFlags',
                cellClass: 'results-record-cell',
                //Include textbox to edit this data
                cellEditorFramework: ResultUpdateComponent,
                editable: true
            },
            {
                headerName: gridHeaders.ResultData,
                field: 'ResultData',
                headerTooltip: gridHeaders.ResultData,
                tooltipField: 'ResultData',
                cellClass: 'results-record-cell',
                //Include textbox to edit this data
                cellEditorFramework: ResultUpdateComponent,
                editable: true
            },
            {
                headerName: gridHeaders.Range,
                field: 'Range',
                headerTooltip: gridHeaders.Range,
                tooltipField: 'Range',
                cellClass: 'results-record-cell'
            },
            {
                headerName: gridHeaders.Units,
                field: 'Units',
                headerTooltip: gridHeaders.Units,
                tooltipField: 'Units',
                cellClass: 'results-record-cell'
            },
            {
                headerName: gridHeaders.CallBackFlag,
                field: 'CallBackFlag',
                headerTooltip: gridHeaders.CallBackFlag,
                tooltipField: 'CallBackFlag',
                cellClass: 'results-record-cell'
            },
            {
                headerName: gridHeaders.ResultedTechCode,
                field: 'ResultedTechCode',
                headerTooltip: gridHeaders.ResultedTechCode,
                tooltipField: 'ResultedTechCode',
                cellClass: 'results-record-cell',
                //Include textbox to edit this data
                cellEditorFramework: ResultUpdateComponent,
                editable: true
            },
            {
                headerName: gridHeaders.PerformingLabCode,
                field: 'PerformingLabCode',
                headerTooltip: gridHeaders.PerformingLabCode,
                tooltipField: 'PerformingLabCode',
                cellClass: 'results-record-cell'
            },
            {
                headerName: gridHeaders.PriorityCode,
                field: 'PriorityCode',
                headerTooltip: gridHeaders.PriorityCode,
                tooltipField: 'PriorityCode',
                cellClass: 'results-record-cell'
            },
            {
                headerName: gridHeaders.ResultedTime,
                field: 'ResultedTime',
                headerTooltip: gridHeaders.ResultedTime,
                tooltipField: 'ResultedTime',
                cellClass: 'results-record-cell',
                //Include textbox to edit this data
                cellEditorFramework: ResultUpdateComponent,
                editable: true
            }
        ];
    }

    /// <summary>
    /// if we don't do this, then the mouse wheel will be picked up by the main grid and scroll the main grid and not this component.
    /// this ensures that the wheel move is only picked up by the text field
    /// </summary>
    consumeMouseWheelOnDetailGrid($event: any) {
        $event.stopPropagation();
    }
}