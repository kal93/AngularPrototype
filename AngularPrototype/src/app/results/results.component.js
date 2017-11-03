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
var material_1 = require("@angular/material");
var result_detail_component_1 = require("./result-detail.component");
var patient_list_service_1 = require("../services/patient-list.service");
var selected_patient_model_1 = require("../models/selected-patient.model");
var selected_patient_result_model_1 = require("../models/selected-patient-result.model");
var pass_data_service_1 = require("../services/pass-data.service");
var get_config_service_1 = require("../services/get-config.service");
var ResultsComponent = (function () {
    function ResultsComponent(dataService, patientFromList, snackBar, getData, getConfig, router) {
        this.dataService = dataService;
        this.patientFromList = patientFromList;
        this.snackBar = snackBar;
        this.getData = getData;
        this.getConfig = getConfig;
        this.router = router;
        this.isUpdateShowActionIcon = false;
        this.isUpdateDisable = true;
        this.isLoading = false;
        this.expandAll = false;
        this.hasUnsavedChanges = false;
        this.selectedPatientfromPatientList = new selected_patient_model_1.SelectedPatientModel();
        this.selectedPatientfromPatientList = this.patientFromList.selectedData;
        this.accessionBannerGridOptions = {
            columnDefs: this.createColumnDefs()
        };
        if (this.selectedPatientfromPatientList.PatientIDs == null) {
            this.noPatientIDSelected = this.getConfig.getResx('NoPatientIDSelected');
        }
        else {
            this.createRowData();
        }
        this.title = this.getConfig.getResx('Results');
        this.updateText = this.getConfig.getResx('Update');
        this.updateActionText = this.getConfig.getResx('UpdateActionText');
        this.noPatientIDSelected = this.getConfig.getResx('NoPatientIDSelected');
        this.unsavedChangesMessage = this.getConfig.getResx('UnsavedChangesMessage');
        this.hideShowButtonText = this.getConfig.getResx('ShowAll');
        this.goBackToSearch = this.getConfig.getResx('Search');
    }
    ResultsComponent.prototype.createColumnDefs = function () {
        var gridHeaders = this.getConfig.getResx('ResultsMasterGridHeaders');
        return [
            {
                headerName: gridHeaders.Name, field: 'Name',
                cellRenderer: 'group',
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
    };
    ResultsComponent.prototype.isFullWidthCell = function (rowNode) {
        return rowNode.level === 1;
    };
    ResultsComponent.prototype.ngAfterViewInit = function () {
        if (this.selectedPatientfromPatientList.PatientIDs !== undefined) {
            this.accessionBannerGridOptions.api.sizeColumnsToFit();
        }
    };
    ResultsComponent.prototype.ngOnDestroy = function () {
    };
    ResultsComponent.prototype.getFullWidthCellRenderer = function () {
        return result_detail_component_1.ResultDetailComponent;
    };
    ResultsComponent.prototype.getRowHeight = function (params) {
        var rowIsDetailRow = params.node.level === 1;
        return rowIsDetailRow ? 200 : 50;
    };
    ResultsComponent.prototype.getNodeChildDetails = function (record) {
        if (record.TestResults) {
            return {
                group: true,
                key: record.name,
                children: [record.TestResults],
            };
        }
        else {
            return null;
        }
    };
    ResultsComponent.prototype.expandCollapseResult = function () {
        if (this.expandAll === false) {
            this.accessionBannerGridOptions.api.expandAll();
            this.expandAll = true;
            this.hideShowButtonText = this.getConfig.getResx('HideAll');
        }
        else {
            this.accessionBannerGridOptions.api.collapseAll();
            this.expandAll = false;
            this.hideShowButtonText = this.getConfig.getResx('ShowAll');
        }
    };
    ResultsComponent.prototype.createRowData = function () {
        var _this = this;
        this.isLoading = true;
        setTimeout(function () {
            _this.dataService
                .getPatientResults(_this.selectedPatientfromPatientList)
                .subscribe(function (data) { return _this.patientResultData = data; }, function (error) {
                if (!error.ok) {
                    _this.noPatientIDSelected = error.json().Message;
                    _this.selectedPatientfromPatientList.PatientIDs = null;
                    _this.isLoading = false;
                }
            }, function () {
                _this.accessionBannerGridOptions.rowData = _this.patientResultData;
                _this.isLoading = false;
            });
        }, 1000);
    };
    ResultsComponent.prototype.updateResult = function () {
        var _this = this;
        this.patientResultData = this.accessionBannerGridOptions.rowData;
        setTimeout(function () {
            _this.isUpdateShowActionIcon = true;
            _this.dataService
                .updateResults(_this.patientResultData)
                .subscribe(function (data) { return _this.updateResultResponse = data; }, function (error) {
                if (!error.ok) {
                    _this.snackBar.open(_this.getConfig.getResx('UpdateFailed') + error.json().Message, '', {
                        duration: 5000,
                    });
                }
            }, function () {
                _this.snackBar.open(_this.getConfig.getResx('UpdateSuccess'), '', {
                    duration: 5000,
                });
                _this.hasUnsavedChanges = false;
                _this.isUpdateDisable = !_this.hasUnsavedChanges;
            });
            _this.isUpdateShowActionIcon = false;
        }, 1000);
    };
    return ResultsComponent;
}());
ResultsComponent = __decorate([
    core_1.Component({
        moduleId: module.id,
        selector: 'patiq-results',
        templateUrl: './results.component.html',
        styleUrls: ['./results.component.css'],
        providers: [patient_list_service_1.PatientListService]
    }),
    __metadata("design:paramtypes", [patient_list_service_1.PatientListService, selected_patient_result_model_1.SelectedPatientForResultModel, material_1.MdSnackBar, pass_data_service_1.PassDataService, get_config_service_1.GetConfigService, router_1.Router])
], ResultsComponent);
exports.ResultsComponent = ResultsComponent;
//# sourceMappingURL=results.component.js.map