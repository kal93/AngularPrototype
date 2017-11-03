"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
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
var forms_1 = require("@angular/forms");
var material_1 = require("@angular/material");
var moment = require("moment/moment");
var patient_list_model_1 = require("../models/patient-list.model");
var patient_list_service_1 = require("../services/patient-list.service");
var search_service_1 = require("../services/search.service");
var get_config_service_1 = require("../services/get-config.service");
var ajax_header_service_1 = require("../services/ajax-header.service");
var authentication_service_1 = require("../services/authentication.service");
var SearchComponent = (function (_super) {
    __extends(SearchComponent, _super);
    function SearchComponent(formBuilder, dataService, searchService, getConfig, authenticationService, ajaxService) {
        var _this = _super.call(this) || this;
        _this.dataService = dataService;
        _this.searchService = searchService;
        _this.getConfig = getConfig;
        _this.authenticationService = authenticationService;
        _this.ajaxService = ajaxService;
        _this.isSearchShowActionIcon = false;
        _this.showMPI = false;
        _this.checkAllHids = function () {
            if (!this.searchForm.value.checkAll && this.searchForm.selectedHids !== this.hids) {
                this.searchForm.patchValue({ selectedHids: this.hids, defaultHidCheck: false });
            }
            else {
                this.searchForm.patchValue({ selectedHids: [] });
            }
        };
        _this.checkDefaultHid = function () {
            if (!this.searchForm.value.defaultHidCheck) {
                this.searchForm.patchValue({ selectedHids: [this.defaultHid], checkAll: false });
            }
            else {
                this.searchForm.patchValue({ selectedHids: [] });
            }
        };
        _this.dobOnBlur = function () {
            if (this.searchForm.get('dob').valid) {
                this.searchForm.get('dob').setValue(this.searchForm.get('dob').value);
            }
        };
        _this.locale = document['locale'];
        _this.currentPatientListModel = new patient_list_model_1.PatientListModel();
        _this.currentPatientListModel.isPatientListShow = false;
        _this.currentPatientListModel.errorMessage = _this.getConfig.getResx('PatientListErrorMessage');
        _this.currentPatientListModel.gridRowData = [];
        _this.hids = [];
        _this.isSearchDisable = true;
        _this.isClearDisable = true;
        _this.loggedInUser = sessionStorage.getItem('username');
        _this.searchForm = formBuilder.group({
            'lastName': new forms_1.FormControl(''),
            'firstName': new forms_1.FormControl(''),
            'middleName': new forms_1.FormControl(''),
            'patientId': new forms_1.FormControl(''),
            'nhsNo': new forms_1.FormControl(''),
            'dob': new forms_1.FormControl(''),
            'billAccount': new forms_1.FormControl(''),
            'mpi': new forms_1.FormControl(''),
            'selectedHids': new forms_1.FormControl(_this.hids),
            'checkAll': new forms_1.FormControl(true),
            'defaultHidCheck': new forms_1.FormControl(false)
        });
        _this.getUserSettingsData(_this.loggedInUser);
        _this.searchText = _this.getConfig.getResx('Search');
        _this.nhsOrssn = _this.getConfig.getResx('NHS');
        if (_this.locale == 'en-US') {
            _this.nhsOrssn = _this.getConfig.getResx('SSN');
        }
        _this.searchActionText = _this.getConfig.getResx('SearchActionText');
        _this.firstNameIsRequiredText = _this.getConfig.getResx('FirstNameRequired');
        _this.validDateText = _this.getConfig.getResx('EnterValidDate');
        _this.checkAllText = _this.getConfig.getResx('CheckAll');
        _this.defaultHidText = _this.getConfig.getResx('DefaultHID');
        _this.clearText = _this.getConfig.getResx('ClearButtonText');
        _this.showToggleText = _this.getConfig.getResx('ShowToggleText');
        _this.hideToggleText = _this.getConfig.getResx('HideToggleText');
        if (_this.authenticationService.getUserPermissions() === 'CanEdit') {
            _this.showMPI = true;
        }
        return _this;
    }
    SearchComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.searchForm.valueChanges.subscribe(function (values) {
            if (_this.searchForm.get('lastName').value ||
                _this.searchForm.get('firstName').value ||
                _this.searchForm.get('middleName').value ||
                _this.searchForm.get('patientId').value ||
                _this.searchForm.get('nhsNo').value ||
                _this.searchForm.get('dob').value ||
                _this.searchForm.get('billAccount').value ||
                _this.searchForm.get('mpi').value) {
                _this.searchFormValuesChanged = true;
            }
            else {
                _this.searchFormValuesChanged = false;
            }
            if (_this.searchForm.get('selectedHids').value.length > 0 && _this.searchFormValuesChanged) {
                _this.isSearchDisable = false;
            }
            else {
                _this.isSearchDisable = true;
            }
            if (_this.searchForm.valid && (_this.searchForm.get('selectedHids').value.length === _this.hids.length && !_this.searchFormValuesChanged)) {
                _this.isClearDisable = true;
            }
            else {
                _this.isClearDisable = false;
            }
            _this.currentPatientListModel.isPatientListShow = false;
            _this.currentPatientListModel.errorMessage = _this.getConfig.getResx('PatientListErrorMessage');
        });
        if (this.locale === 'es' || this.locale === 'tr' || this.locale === 'en-GB') {
            this.dateFormat = moment().format('l').toString();
        }
        else {
            this.dateFormat = moment().format('l').toString();
        }
    };
    SearchComponent.prototype.getUserSettingsData = function (userName) {
        var _this = this;
        var getHIDlistURL = this.getConfig.get('GetUserSettingsLink');
        var data = JSON.stringify(userName);
        var response;
        var ajaxCall = this.ajaxService.$ajax(getHIDlistURL, data, 'POST', function successCall(data) {
            response = data;
        });
        setTimeout(function () {
            _this.hids = response.HidList;
            _this.searchForm.get('selectedHids').setValue(_this.hids);
            _this.defaultHid = response.DefaultHid;
        }, 1000);
    };
    SearchComponent.prototype.parse = function (value) {
        if ((typeof value === 'string') && ((value.indexOf('/') > -1) || (value.indexOf('.') > -1))) {
            var str = value.split(/[/.]/g);
            var year = Number(str[2]);
            var month = void 0, date = void 0;
            month = Number(str[0]) - 1;
            date = Number(str[1]);
            if (this.locale === 'es' || this.locale === 'tr' || this.locale == 'en-GB') {
                month = Number(str[1]) - 1;
                date = Number(str[0]);
            }
            if (month > 11 || date > 31)
                return null;
            return new Date(year, month, date);
        }
        var timestamp = typeof value === 'number' ? value : Date.parse(value);
        return isNaN(timestamp) ? null : new Date(timestamp);
    };
    SearchComponent.prototype.selectHid = function () {
        if (this.searchForm.value.selectedHids.length == this.hids.length) {
            this.searchForm.patchValue({ checkAll: true, defaultHidCheck: false });
        }
        else if (this.searchForm.value.selectedHids == this.defaultHid) {
            this.searchForm.patchValue({ defaultHidCheck: true, checkAll: false });
        }
        else {
            this.searchForm.patchValue({ checkAll: false, defaultHidCheck: false });
        }
    };
    SearchComponent.prototype.performSearch = function () {
        var _this = this;
        if (this.searchForm.get('middleName').value !== '' && this.searchForm.get('firstName').value === '') {
            this.searchForm.controls.middleName.setErrors({ onlyMiddleName: true });
        }
        else {
            this.searchForm.controls.middleName.setErrors(null);
        }
        if (this.searchForm.invalid) {
            this.searchFormErrorMessage = this.getConfig.getResx('SearchFormErrorMessage');
        }
        else {
            this.searchFormErrorMessage = '';
            this.isSearchShowActionIcon = true;
            setTimeout(function () {
                _this.currentPatientListModel.isPatientListShow = false;
                _this.currentPatientListModel.errorMessage = _this.getConfig.getResx('PatientListErrorMessage');
                var dobValue = _this.searchForm.get('dob').value || null;
                if (dobValue) {
                    dobValue = moment(dobValue).format('MM/DD/YYYY').toString();
                }
                var inputValue = {
                    'LastName': String(_this.searchForm.get('lastName').value).toUpperCase() || undefined,
                    'FirstName': String(_this.searchForm.get('firstName').value).toUpperCase() || undefined,
                    'MiddleName': String(_this.searchForm.get('middleName').value).toUpperCase() || undefined,
                    'PIDX': _this.searchForm.get('patientId').value || undefined,
                    'NHS': _this.searchForm.get('nhsNo').value || undefined,
                    'BirthDateText': dobValue,
                    'BilingAccountNumber': _this.searchForm.get('billAccount').value || undefined,
                    'MPI': _this.searchForm.get('mpi').value || undefined,
                    'HospitalCode': _this.searchForm.get('selectedHids').value || undefined,
                };
                _this.dataService
                    .getPatientList(inputValue)
                    .subscribe(function (data) { return _this.patientListData = data; }, function (error) {
                    if (!error.ok) {
                        _this.currentPatientListModel.errorMessage = error.json().Message;
                        _this.currentPatientListModel.isPatientListShow = false;
                    }
                }, function () {
                    if (_this.patientListData.length != 0) {
                        _this.currentPatientListModel.isPatientListShow = true;
                        _this.currentPatientListModel.gridRowData = _this.patientListData;
                    }
                    else {
                        _this.currentPatientListModel.isPatientListShow = false;
                        _this.currentPatientListModel.errorMessage = _this.getConfig.getResx('NoPatientList');
                    }
                });
                _this.isSearchShowActionIcon = false;
            }, 1000);
        }
    };
    SearchComponent.prototype.performClear = function () {
        this.searchForm.reset({
            'lastName': '',
            'firstName': '',
            'middleName': '',
            'patientId': '',
            'nhsNo': '',
            'dob': '',
            'billAccount': '',
            'mpi': '',
            'selectedHids': this.hids,
            'checkAll': true,
            'defaultHidCheck': false,
        });
        this.searchFormErrorMessage = '';
        this.currentPatientListModel.isPatientListShow = false;
        this.currentPatientListModel.errorMessage = this.getConfig.getResx('PatientListErrorMessage');
        this.currentPatientListModel.gridRowData = [];
    };
    return SearchComponent;
}(material_1.NativeDateAdapter));
SearchComponent = __decorate([
    core_1.Component({
        moduleId: module.id,
        selector: 'patiq-search',
        templateUrl: './search.component.html',
        styleUrls: ['./search.component.css'],
        providers: [search_service_1.SearchService, patient_list_service_1.PatientListService]
    }),
    __metadata("design:paramtypes", [forms_1.FormBuilder, patient_list_service_1.PatientListService, search_service_1.SearchService, get_config_service_1.GetConfigService, authentication_service_1.AuthenticationService, ajax_header_service_1.AjaxHeaderService])
], SearchComponent);
exports.SearchComponent = SearchComponent;
//# sourceMappingURL=search.component.js.map