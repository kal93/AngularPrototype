"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var protractor_1 = require("protractor");
var AppHeader = (function () {
    function AppHeader() {
        this.tab = protractor_1.element.all(protractor_1.by.css('[class="sq-tab-list mat-tab-link"]'));
        var tab;
    }
    AppHeader.prototype.searchTab = function () {
        return this.tab.first().click();
    };
    AppHeader.prototype.resultTab = function () {
        return this.tab.first().click();
    };
    AppHeader.prototype.adminTab = function () {
        return this.tab.last().click();
    };
    AppHeader.prototype.adminTabPresent = function () {
        return this.tab.last().isPresent();
    };
    return AppHeader;
}());
exports.AppHeader = AppHeader;
var VerifyRouting = (function () {
    function VerifyRouting() {
    }
    VerifyRouting.prototype.searchPage = function () {
        return protractor_1.$('patiq-search').isPresent();
    };
    VerifyRouting.prototype.resultsPage = function () {
        return protractor_1.$('patiq-results').isPresent();
    };
    VerifyRouting.prototype.adminPage = function () {
        return protractor_1.$('patiq-user-list').isPresent();
    };
    return VerifyRouting;
}());
exports.VerifyRouting = VerifyRouting;
var AppDrawer = (function () {
    function AppDrawer() {
    }
    AppDrawer.prototype.appDrawerMenu = function () {
        return protractor_1.element(protractor_1.by.css('[class="fa fa-bars"]')).click();
    };
    AppDrawer.prototype.searchTab = function () {
        return protractor_1.element.all(protractor_1.by.css('[ng-reflect-router-link="/search"]')).first().click();
    };
    AppDrawer.prototype.resultTab = function () {
        return protractor_1.element.all(protractor_1.by.css('[ng-reflect-router-link="/results"]')).first().click();
    };
    AppDrawer.prototype.adminTab = function () {
        return protractor_1.element.all(protractor_1.by.css('[ng-reflect-router-link="/admin"]')).first().click();
    };
    return AppDrawer;
}());
exports.AppDrawer = AppDrawer;
var Toggle = (function () {
    function Toggle() {
    }
    Toggle.prototype.toggleUp = function () {
        return protractor_1.element.all(protractor_1.by.css('[class="fa fa-chevron-up"]')).first().click();
    };
    Toggle.prototype.toggleDown = function () {
        return protractor_1.element.all(protractor_1.by.css('[class="fa fa-chevron-up toggle-chevron-icon"]')).first().click();
    };
    Toggle.prototype.formHidden = function () {
        return protractor_1.$('form').getAttribute('hidden');
    };
    return Toggle;
}());
exports.Toggle = Toggle;
var SearchFields = (function () {
    function SearchFields() {
    }
    SearchFields.prototype.firstName = function (firstName) {
        return protractor_1.element(protractor_1.by.css('[formcontrolname="firstName"]')).sendKeys(firstName);
    };
    SearchFields.prototype.firstNameClear = function () {
        return protractor_1.element(protractor_1.by.css('[formcontrolname="firstName"]')).clear();
    };
    SearchFields.prototype.lastName = function (lastName) {
        return protractor_1.element(protractor_1.by.css('[formcontrolname="lastName"]')).sendKeys(lastName);
    };
    SearchFields.prototype.middleName = function (middleName) {
        return protractor_1.element(protractor_1.by.css('[formcontrolname="middleName"]')).sendKeys(middleName);
    };
    SearchFields.prototype.patientID = function (patientID) {
        return protractor_1.element(protractor_1.by.css('[formcontrolname="patientId"]')).sendKeys(patientID);
    };
    SearchFields.prototype.NHS = function (NHS) {
        return protractor_1.element(protractor_1.by.css('[formcontrolname="nhsNo"]')).sendKeys(NHS);
    };
    SearchFields.prototype.DOB = function (DOB) {
        return protractor_1.element(protractor_1.by.css('[formcontrolname="dob"]')).sendKeys(DOB);
    };
    SearchFields.prototype.MPI = function (MPI) {
        return protractor_1.element(protractor_1.by.css('[formcontrolname="mpi"]')).sendKeys(MPI);
    };
    SearchFields.prototype.checkAllState = function () {
        return protractor_1.element(protractor_1.by.css('[formcontrolname="checkAll"]')).getAttribute('class');
    };
    SearchFields.prototype.defaultHIDState = function () {
        return protractor_1.element(protractor_1.by.css('[formcontrolname="defaultHidCheck"]')).getAttribute('class');
    };
    SearchFields.prototype.checkAllCheckbox = function () {
        return protractor_1.element(protractor_1.by.css('[formcontrolname="checkAll"]')).click();
    };
    SearchFields.prototype.defaultHIDCheckbox = function () {
        return protractor_1.element(protractor_1.by.css('[formcontrolname="defaultHidCheck"]')).click();
    };
    SearchFields.prototype.searchButtonDisabled = function () {
        return protractor_1.element(protractor_1.by.css('[class="sq-btn btn-primary mat-raised-button"]')).getAttribute('ng-reflect-disabled');
    };
    SearchFields.prototype.searchButton = function () {
        return protractor_1.element(protractor_1.by.css('[class="sq-btn btn-primary mat-raised-button"]')).click();
    };
    SearchFields.prototype.clearButtonDisabled = function () {
        return protractor_1.element(protractor_1.by.css('[class="sq-btn btn-secondary mat-raised-button"]')).getAttribute('ng-reflect-disabled');
    };
    SearchFields.prototype.clearButton = function () {
        return protractor_1.element(protractor_1.by.css('[class="sq-btn btn-secondary mat-raised-button"]')).click();
    };
    SearchFields.prototype.middleNameErrorMsg = function () {
        return protractor_1.element.all(protractor_1.by.css('[class="mat-input-error"]')).first().getText();
    };
    SearchFields.prototype.searchError = function () {
        return protractor_1.element.all(protractor_1.by.css('[class="mat-input-error"]')).last().getText();
    };
    return SearchFields;
}());
exports.SearchFields = SearchFields;
var agGrid = (function () {
    function agGrid() {
    }
    agGrid.prototype.priorSearch = function () {
        return protractor_1.element(protractor_1.by.css('[class="no-result-div"]')).isPresent();
    };
    agGrid.prototype.performSearch = function () {
        return protractor_1.element(protractor_1.by.css('[class="no-result-div"]')).getText();
    };
    agGrid.prototype.PatientListGrid = function () {
        return protractor_1.element(protractor_1.by.css('[class="grid-section"]')).isPresent();
    };
    agGrid.prototype.PatientNameValidation = function (getCellValue) {
        return protractor_1.element.all(protractor_1.by.css('[class="ag-cell-value"]')).get(getCellValue).getText();
    };
    agGrid.prototype.SelectAllPatients = function () {
        return protractor_1.element(protractor_1.by.css('[class="ag-header-select-all"]')).click();
    };
    agGrid.prototype.ShowResults = function () {
        return protractor_1.element.all(protractor_1.by.css('[class="mat-button-wrapper"]')).last().click();
    };
    agGrid.prototype.selectPatient = function () {
        return protractor_1.element(protractor_1.by.css('[class="ag-selection-checkbox"]')).click();
    };
    agGrid.prototype.sortPatients = function () {
        return protractor_1.element.all(protractor_1.by.css('[class="ag-header-cell-label"]')).get(0).click();
    };
    return agGrid;
}());
exports.agGrid = agGrid;
//# sourceMappingURL=patiq-search.po.js.map