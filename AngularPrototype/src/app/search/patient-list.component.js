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
var patient_list_model_1 = require("../models/patient-list.model");
var selected_patient_model_1 = require("../models/selected-patient.model");
var selected_patient_result_model_1 = require("../models/selected-patient-result.model");
var get_config_service_1 = require("../services/get-config.service");
var pass_data_service_1 = require("../services/pass-data.service");
var PatientListComponent = (function () {
    function PatientListComponent(router, route, patientFromList, getConfig, passDataService) {
        this.router = router;
        this.route = route;
        this.patientFromList = patientFromList;
        this.getConfig = getConfig;
        this.passDataService = passDataService;
        this.isPatientListShow = false;
        this.isShowResultsDisabled = true;
        this.locale = document['locale'];
        this.patientListGridOptionData =
            {
                icons: {
                    checkboxChecked: '<img src="src/assets/images/checkbox.png"/>'
                },
                columnDefs: this.createColumnDefs(),
            };
        this.selectedPatientID = new selected_patient_model_1.SelectedPatientModel();
        this.title = this.getConfig.getResx('PatientListTitle');
        this.showResultText = this.getConfig.getResx('ShowResultsButtonText');
    }
    PatientListComponent.prototype.ngOnInit = function () {
        this.persistedPatientListData = this.passDataService.getSearchData();
    };
    PatientListComponent.prototype.ngAfterContentChecked = function () {
        if (this.patientListSettings.isPatientListShow == true || this.persistedPatientListData !== undefined) {
            this.isShowResultsDisabled = false;
            this.isPatientListShow = true;
        }
        else if (this.patientListSettings.isPatientListShow == false || this.persistedPatientListData == undefined) {
            this.isShowResultsDisabled = true;
            this.isPatientListShow = false;
        }
    };
    PatientListComponent.prototype.ngAfterViewInit = function () {
        var _this = this;
        if (this.persistedPatientListData !== undefined) {
            this.patientListSettings.isPatientListShow = true;
            this.isPatientListShow = true;
            this.patientListGridOptionData.api.setRowData(this.persistedPatientListData.gridRowData);
            var selectedrow_1 = this.persistedPatientListData.selectedRow;
            if (selectedrow_1 !== undefined) {
                this.patientListGridOptionData.api.forEachNode(function (node) {
                    var PID = [];
                    selectedrow_1.forEach(function (selectedRow, index) {
                        PID.push(selectedRow.PIDX);
                    });
                    _this.selectedPatientID.PatientIDs = PID;
                    for (var _i = 0, _a = _this.selectedPatientID.PatientIDs; _i < _a.length; _i++) {
                        var checkPIDX = _a[_i];
                        if (node.data.PIDX == checkPIDX) {
                            node.setSelected(true);
                        }
                    }
                });
            }
        }
    };
    PatientListComponent.prototype.createColumnDefs = function () {
        this.gridHeaders = this.getConfig.getResx('PatientListHeaders');
        if (this.locale == 'en-US') {
            this.gridHeaders.NHS = this.getConfig.getResx('SSN');
        }
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
    };
    PatientListComponent.prototype.ngOnDestroy = function () {
        this.patientFromList.selectedData = this.selectedPatientID;
    };
    PatientListComponent.prototype.onSelectionChanged = function () {
        var selectedRows = this.patientListGridOptionData.api.getSelectedRows();
        this.selectedPatientRow = selectedRows;
        this.isShowResultsDisabled = (selectedRows.length === 0);
    };
    PatientListComponent.prototype.showTestResult = function () {
        var selectedRows = this.patientListGridOptionData.api.getSelectedRows();
        this.selectedPatientRow = selectedRows;
        var selectedRowPatientId = [];
        selectedRows.forEach(function (selectedRow, index) {
            selectedRowPatientId.push(selectedRow.PIDX);
        });
        this.selectedPatientID.PatientIDs = selectedRowPatientId;
        this.patientListSettings.isPatientListShow = true;
        this.patientListSettings.selectedRow = selectedRows;
        if (this.persistedPatientListData !== undefined) {
            this.patientListSettings = this.persistedPatientListData;
            this.persistedPatientListData.selectedRow = selectedRows;
        }
        this.passDataService.setSearchData(this.patientListSettings);
        this.router.navigate(['/results']);
    };
    return PatientListComponent;
}());
__decorate([
    core_1.Input(),
    __metadata("design:type", patient_list_model_1.PatientListModel)
], PatientListComponent.prototype, "patientListSettings", void 0);
PatientListComponent = __decorate([
    core_1.Component({
        moduleId: module.id,
        selector: 'patiq-patient-lists',
        templateUrl: './patient-list.component.html',
        styleUrls: ['./patient-list.component.css'],
    }),
    __metadata("design:paramtypes", [router_1.Router, router_1.ActivatedRoute, selected_patient_result_model_1.SelectedPatientForResultModel, get_config_service_1.GetConfigService, pass_data_service_1.PassDataService])
], PatientListComponent);
exports.PatientListComponent = PatientListComponent;
//# sourceMappingURL=patient-list.component.js.map