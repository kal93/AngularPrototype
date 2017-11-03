import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, ValidatorFn, AbstractControl } from '@angular/forms';
import { NativeDateAdapter } from '@angular/material';
import * as moment from 'moment/moment';
import { PatientListModel } from '../models/patient-list.model';
import { PatientListService } from '../services/patient-list.service';
import { DemographicModel } from '../models/patient-demographic.model';
import { UserSettingsModel } from '../models/user-settings.model';
import { SearchService } from '../services/search.service';
import { GetConfigService } from '../services/get-config.service';
import { DateFormatValidatorDirective } from '../shared/validators/date-format-validator.directive';
import { AjaxHeaderService } from '../services/ajax-header.service';
import { AuthenticationService } from '../services/authentication.service';

@Component({
    moduleId: module.id,
    selector: 'patiq-search',
    templateUrl: './search.component.html',
    styleUrls: ['./search.component.css'],
    providers: [SearchService, PatientListService]
})
/// <summary>
/// This class creates Search Form
/// </summary>
export class SearchComponent extends NativeDateAdapter implements OnInit {
    //Create object to pass PatientList settings to PatientList component
    currentPatientListModel: PatientListModel;

    //PatientList Data should be replica of DemographicModel class
    public patientListData: DemographicModel[];

    //To toggle Search Form
    isSearchFormVisible: boolean;

    //Search Button Settings
    //Holds original text of Search button
    searchText: string;
    //Holds dynamic text to Button during performing search action
    searchActionText: string;
    //Flag to show/hide loading spinner inside the button
    isSearchShowActionIcon = false;
    //Form texts
    firstNameIsRequiredText: string;
    //Date Validation text
    validDateText: string;
    //Checkbox texts
    checkAllText: string;
    defaultHidText: string;
    //Clear Button text
    clearText: string;
    //Toggle text
    showToggleText: string;
    hideToggleText: string;
    //holds NHS or SSN text
    nhsOrssn: string;

    //holds the locale of the browser
    locale: string;

    private searchForm: FormGroup;
    private hids: Array<string>;
    private dateFormat: string;
    private defaultHid: string;
    private isSearchDisable: boolean;
    private isClearDisable: boolean;
    private searchFormValuesChanged: boolean;
    private searchFormErrorMessage: string;
    private loggedInUser: string;
    private showMPI: boolean = false;

    constructor(formBuilder: FormBuilder, private dataService: PatientListService, private searchService: SearchService, private getConfig: GetConfigService, private authenticationService: AuthenticationService, private ajaxService: AjaxHeaderService) {
        // Invokes constructor of the base class
        super();
        //get the browser's locale
        this.locale = document['locale'] as string;

        //Initial settings for Patient List component start here
        this.currentPatientListModel = new PatientListModel();
        //Hide Patient List grid, Show Results button initially
        this.currentPatientListModel.isPatientListShow = false;
        //Get initial error message from config
        this.currentPatientListModel.errorMessage = this.getConfig.getResx('PatientListErrorMessage');
        //No row data initially
        this.currentPatientListModel.gridRowData = [];

        //Initial settings for Patient List component end here

        this.hids = [];
        //Initial values to disable search and clear buttons
        this.isSearchDisable = true;
        this.isClearDisable = true;

        //Logged In User - fetching from session storage
        this.loggedInUser = sessionStorage.getItem('username');
        // Search form group
        this.searchForm = formBuilder.group({
            'lastName': new FormControl(''),
            'firstName': new FormControl(''),
            'middleName': new FormControl(''),
            'patientId': new FormControl(''),
            'nhsNo': new FormControl(''),
            'dob': new FormControl(''),
            'billAccount': new FormControl(''),
            'mpi': new FormControl(''),
            'selectedHids': new FormControl(this.hids),
            'checkAll': new FormControl(true),
            'defaultHidCheck': new FormControl(false)
        });
        this.getUserSettingsData(this.loggedInUser);

        //Get Texts from Config - Starts here
        //search button text
        this.searchText = this.getConfig.getResx('Search');
        //default text for the NHS text box
        this.nhsOrssn = this.getConfig.getResx('NHS');
        //change text box placeholder to SSN only if locale is en-US
        if (this.locale == 'en-US')
        { this.nhsOrssn = this.getConfig.getResx('SSN'); }
        //Get search button text while performing some action
        this.searchActionText = this.getConfig.getResx('SearchActionText');
        this.firstNameIsRequiredText = this.getConfig.getResx('FirstNameRequired');
        this.validDateText = this.getConfig.getResx('EnterValidDate');
        this.checkAllText = this.getConfig.getResx('CheckAll');
        this.defaultHidText = this.getConfig.getResx('DefaultHID');
        this.clearText = this.getConfig.getResx('ClearButtonText');
        this.showToggleText = this.getConfig.getResx('ShowToggleText');
        this.hideToggleText = this.getConfig.getResx('HideToggleText');
        //Get Texts from Config - Ends here
        //Check to hide.show MPI element based on permissions
        if (this.authenticationService.getUserPermissions() === 'CanEdit') {
            this.showMPI = true;
        }
    }
    ngOnInit() {
        // Subscribing form value changes
        this.searchForm.valueChanges.subscribe(values => {
            //Track changes of search form values
            if (this.searchForm.get('lastName').value ||
                this.searchForm.get('firstName').value ||
                this.searchForm.get('middleName').value ||
                this.searchForm.get('patientId').value ||
                this.searchForm.get('nhsNo').value ||
                this.searchForm.get('dob').value ||
                this.searchForm.get('billAccount').value ||
                this.searchForm.get('mpi').value) {
                this.searchFormValuesChanged = true;
            } else {
                this.searchFormValuesChanged = false;
            }

            // Enable/Disable Search button
            if (this.searchForm.get('selectedHids').value.length > 0 && this.searchFormValuesChanged) {
                this.isSearchDisable = false;
            } else {
                this.isSearchDisable = true;
            }
            // Enable/Disable Clear button
            if (this.searchForm.valid && (this.searchForm.get('selectedHids').value.length === this.hids.length && !this.searchFormValuesChanged)) {
                this.isClearDisable = true;
            }
            else {
                this.isClearDisable = false;
            }

            //Hide PatientList grid
            this.currentPatientListModel.isPatientListShow = false;
            //set initial error message from app.config
            this.currentPatientListModel.errorMessage = this.getConfig.getResx('PatientListErrorMessage');
        });
        //specify the date format for validation based on locale
        if (this.locale === 'es' || this.locale === 'tr' || this.locale === 'en-GB') {
            this.dateFormat = moment().format('l').toString();
        }
        else {
            this.dateFormat = moment().format('l').toString();
        }
    }

    // To fetch HIDlist from server
    private getUserSettingsData(userName: string): void {
        //get service url
        let getHIDlistURL: string = this.getConfig.get('GetUserSettingsLink');
        let data = JSON.stringify(userName);
        //to store response from ajax call
        let response: any;
        let ajaxCall = this.ajaxService.$ajax(getHIDlistURL, data, 'POST',
            function successCall(data: UserSettingsModel) {
                response = data;
            });

        //wait for the response from asynchronous $.ajax call
        setTimeout(() => {
            this.hids = response.HidList;
            this.searchForm.get('selectedHids').setValue(this.hids);
            this.defaultHid = response.DefaultHid;
        }, 1000);
    }

    ///<summary>
    /// This method parses the date from input component as it only expect dates in
    /// mm-dd-yyyy format.
    ///</summary>
    parse(value: string): Date | null {
        if ((typeof value === 'string') && ((value.indexOf('/') > -1) || (value.indexOf('.') > -1))) {
            let str = value.split(/[/.]/g);
            const year = Number(str[2]);
            let month, date;
            month = Number(str[0]) - 1;
            date = Number(str[1]);
            //change the date format based on locale
            if (this.locale === 'es' || this.locale === 'tr' || this.locale == 'en-GB') {
                month = Number(str[1]) - 1;
                date = Number(str[0]);
            }
            if (month > 11 || date > 31)
                return null;

            return new Date(year, month, date);
        }
        const timestamp = typeof value === 'number' ? value : Date.parse(value);
        return isNaN(timestamp) ? null : new Date(timestamp);
    }

    ///<summary>
    //This method syncs the HID List with Check all checkbox
    ///</summary>
    private selectHid() {
        if (this.searchForm.value.selectedHids.length == this.hids.length) {
            this.searchForm.patchValue({ checkAll: true, defaultHidCheck: false });
        }
        else if (this.searchForm.value.selectedHids == this.defaultHid) {
            this.searchForm.patchValue({ defaultHidCheck: true, checkAll: false });
        }
        else {
            this.searchForm.patchValue({ checkAll: false, defaultHidCheck: false })
        }
    }

    // Select all HID's
    private checkAllHids = function () {
        if (!this.searchForm.value.checkAll && this.searchForm.selectedHids !== this.hids) {
            this.searchForm.patchValue({ selectedHids: this.hids, defaultHidCheck: false }
            );
        }
        else {
            this.searchForm.patchValue({ selectedHids: [] });
        }
    }
    // Select default HID only
    private checkDefaultHid = function () {
        if (!this.searchForm.value.defaultHidCheck) {
            this.searchForm.patchValue({ selectedHids: [this.defaultHid], checkAll: false });
        }
        else {
            this.searchForm.patchValue({ selectedHids: [] });
        }
    }

    //update dob value on blur with parsed date
    private dobOnBlur = function () {
        if (this.searchForm.get('dob').valid) {
            this.searchForm.get('dob').setValue(this.searchForm.get('dob').value);
        }
    }

    /// <summary>
    /// This method perform Search action when click on Search Button
    /// Adds Loading icon
    /// </summary>
    performSearch() {
        // Middle Name Validation - Require First Name along with Middle Name
        if (this.searchForm.get('middleName').value !== '' && this.searchForm.get('firstName').value === '') {
            this.searchForm.controls.middleName.setErrors({ onlyMiddleName: true });
        }
        else {
            this.searchForm.controls.middleName.setErrors(null);
        }
        // Search Form Validation
        if (this.searchForm.invalid) {
            //Get Form error message from app.config
            this.searchFormErrorMessage = this.getConfig.getResx('SearchFormErrorMessage');
        }
        else {
            this.searchFormErrorMessage = '';
            //Enable the flag to display loading spinner.
            this.isSearchShowActionIcon = true;

            setTimeout(() => {
                //Hide PatientList grid
                this.currentPatientListModel.isPatientListShow = false;
                //set initial error message from app.config
                this.currentPatientListModel.errorMessage = this.getConfig.getResx('PatientListErrorMessage');
                //holds the date of birth value
                let dobValue = this.searchForm.get('dob').value || null;
                if (dobValue) {
                    //convert the date to a common format which same as the one presesnt in database
                    dobValue = moment(dobValue).format('MM/DD/YYYY').toString();
                }
                //Input data to the Service
                let inputValue = {
                    'LastName': String(this.searchForm.get('lastName').value).toUpperCase() || undefined,
                    'FirstName': String(this.searchForm.get('firstName').value).toUpperCase() || undefined,
                    'MiddleName': String(this.searchForm.get('middleName').value).toUpperCase() || undefined,
                    'PIDX': this.searchForm.get('patientId').value || undefined,
                    'NHS': this.searchForm.get('nhsNo').value || undefined,
                    'BirthDateText': dobValue,
                    'BilingAccountNumber': this.searchForm.get('billAccount').value || undefined,
                    'MPI': this.searchForm.get('mpi').value || undefined,
                    'HospitalCode': this.searchForm.get('selectedHids').value || undefined,
                };

                //call service to get patient list for the given search criteria
                this.dataService
                    .getPatientList(inputValue)
                    .subscribe((data: DemographicModel[]) => this.patientListData = data,
                    (error: any) => {
                        if (!error.ok) {
                            //Display the error message
                            this.currentPatientListModel.errorMessage = error.json().Message;
                            //Hide PatientList grid
                            this.currentPatientListModel.isPatientListShow = false;
                        }
                    },
                    () => {
                        //Check whether its fetched any data from service for the given search criteria
                        if (this.patientListData.length != 0) {
                            //Show PatientList grid
                            this.currentPatientListModel.isPatientListShow = true;
                            //Row data of PatientList grid, fetched from Service
                            this.currentPatientListModel.gridRowData = this.patientListData;
                        }
                        else {
                            //Hide PatientList grid
                            this.currentPatientListModel.isPatientListShow = false;
                            //Display No data found error message from app.config
                            this.currentPatientListModel.errorMessage = this.getConfig.getResx('NoPatientList');
                        }
                    });
                //Disable the flag to display loading spinner.
                this.isSearchShowActionIcon = false;
                //Given time to show the loading icon in Button, It will be changed when it use service
            }, 1000);
        }
    }

    /// <summary>
    /// This method perform Clear action when click on Clear Button
    /// Clear grid in Patient List component
    /// </summary>
    performClear() {
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
        //Reset settings for Patient List component start here
        //Hide Patient List grid, Show Results button
        this.currentPatientListModel.isPatientListShow = false;
        //Reset error message from app.config
        this.currentPatientListModel.errorMessage = this.getConfig.getResx('PatientListErrorMessage');
        //Reset GridData
        this.currentPatientListModel.gridRowData = [];
        //Reset settings for Patient List component end here
    }
}