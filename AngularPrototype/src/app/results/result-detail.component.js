"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var router_1 = require("@angular/router");
var result_update_component_1 = require("./result-update.component");
var pass_data_service_1 = require("../services/pass-data.service");
var get_config_service_1 = require("../services/get-config.service");
var ResultDetailComponent = (function () {
    function ResultDetailComponent(setDataService, router, getConfig) {
        this.setDataService = setDataService;
        this.router = router;
        this.getConfig = getConfig;
        this.hasUnsavedChanges = false;
        this.testResultsGridOptions = {
            columnDefs: this.createColumnDefs()
        };
        this.locale = document['locale'];
        this.testResultsGridOptions.onCellEditingStarted = function (event) {
            this.originalCellValue = event.value;
        };
        this.testResultsGridOptions.onCellEditingStopped = function (event) {
            if (this.originalCellValue != event.value) {
                setDataService.passUnsavedChangesFlag(true);
                setDataService.passUnsavedChangesFlag(true);
                this.hasUnsavedChanges = true;
            }
        };
        this.patientIdLabel = this.getConfig.getResx('PatientID');
        this.dobLabel = this.getConfig.getResx('Dob');
        this.genderLabel = this.getConfig.getResx('Gender');
        this.nhsLabel = this.getConfig.getResx('NHS');
        if (this.locale == 'en-US') {
            this.nhsLabel = this.getConfig.getResx('SSN');
        }
        this.hidLabel = this.getConfig.getResx('HID');
    }
    ResultDetailComponent.prototype.agInit = function (params) {
        this.parentRecord = params.node.parent.data;
    };
    ResultDetailComponent.prototype.ngAfterViewInit = function () {
        this.testResultsGridOptions.api.setRowData(this.parentRecord.TestResults);
        this.testResultsGridOptions.api.sizeColumnsToFit();
    };
    ResultDetailComponent.prototype.createColumnDefs = function () {
        var gridHeaders = this.getConfig.getResx('ResultsDetailGridHeaders');
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
                cellEditorFramework: result_update_component_1.ResultUpdateComponent,
                editable: true
            },
            {
                headerName: gridHeaders.ResultData,
                field: 'ResultData',
                headerTooltip: gridHeaders.ResultData,
                tooltipField: 'ResultData',
                cellClass: 'results-record-cell',
                cellEditorFramework: result_update_component_1.ResultUpdateComponent,
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
                cellEditorFramework: result_update_component_1.ResultUpdateComponent,
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
                cellEditorFramework: result_update_component_1.ResultUpdateComponent,
                editable: true
            }
        ];
    };
    ResultDetailComponent.prototype.consumeMouseWheelOnDetailGrid = function ($event) {
        $event.stopPropagation();
    };
    return ResultDetailComponent;
}());
ResultDetailComponent = __decorate([
    core_1.Component({
        moduleId: module.id,
        selector: 'patiq-result-detail',
        templateUrl: './result-detail.component.html',
        styleUrls: ['./result-detail.component.css']
    }),
    __metadata("design:paramtypes", [pass_data_service_1.PassDataService, router_1.Router, get_config_service_1.GetConfigService])
], ResultDetailComponent);
exports.ResultDetailComponent = ResultDetailComponent;
//# sourceMappingURL=result-detail.component.js.map