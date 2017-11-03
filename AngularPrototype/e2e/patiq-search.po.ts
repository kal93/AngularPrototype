import { browser, by, element, protractor, ExpectedConditions, $, $$ } from 'protractor';

export class AppHeader {

    constructor() {
        var tab: any;
    }

    tab = element.all(by.css('[class="sq-tab-list mat-tab-link"]'));


    searchTab() {
        return this.tab.first().click();
    }

    resultTab() {
        return this.tab.first().click();
    }

    adminTab() {
        return this.tab.last().click();
    }

    adminTabPresent() {
        return this.tab.last().isPresent();
    }
}

export class VerifyRouting {

    searchPage() {
        return $('patiq-search').isPresent();
    }

    resultsPage() {
        return $('patiq-results').isPresent();
    }

    adminPage() {
        return $('patiq-user-list').isPresent();
    }
}

export class AppDrawer {

    appDrawerMenu() {
        return element(by.css('[class="fa fa-bars"]')).click();
    }

    searchTab() {
        return element.all(by.css('[ng-reflect-router-link="/search"]')).first().click();
    }

    resultTab() {
        return element.all(by.css('[ng-reflect-router-link="/results"]')).first().click();
    }

    adminTab() {
        return element.all(by.css('[ng-reflect-router-link="/admin"]')).first().click();
    }

}

export class Toggle {

    toggleUp() {

        return element.all(by.css('[class="fa fa-chevron-up"]')).first().click();

    }

    toggleDown() {
        return element.all(by.css('[class="fa fa-chevron-up toggle-chevron-icon"]')).first().click();
    }

    formHidden() {
        return $('form').getAttribute('hidden');
    }
}

export class SearchFields {


    firstName(firstName: any) {
        return element(by.css('[formcontrolname="firstName"]')).sendKeys(firstName);
    }

    firstNameClear() {
        return element(by.css('[formcontrolname="firstName"]')).clear();
    }

    lastName(lastName: string) {
        return element(by.css('[formcontrolname="lastName"]')).sendKeys(lastName);
    }

    middleName(middleName: string) {
        return element(by.css('[formcontrolname="middleName"]')).sendKeys(middleName);
    }

    patientID(patientID: string) {
        return element(by.css('[formcontrolname="patientId"]')).sendKeys(patientID);
    }

    NHS(NHS: string) {
        return element(by.css('[formcontrolname="nhsNo"]')).sendKeys(NHS);
    }

    DOB(DOB: string) {
        return element(by.css('[formcontrolname="dob"]')).sendKeys(DOB);
    }

    MPI(MPI: string) {
        return element(by.css('[formcontrolname="mpi"]')).sendKeys(MPI);
    }

    checkAllState() {
        return element(by.css('[formcontrolname="checkAll"]')).getAttribute('class');
    }

    defaultHIDState() {
        return element(by.css('[formcontrolname="defaultHidCheck"]')).getAttribute('class');
    }

    checkAllCheckbox() {
        return element(by.css('[formcontrolname="checkAll"]')).click();
    }

    defaultHIDCheckbox() {
        return element(by.css('[formcontrolname="defaultHidCheck"]')).click();
    }

    searchButtonDisabled() {
        return element(by.css('[class="sq-btn btn-primary mat-raised-button"]')).getAttribute('ng-reflect-disabled');
    }

    searchButton() {
        return element(by.css('[class="sq-btn btn-primary mat-raised-button"]')).click();
    }

    clearButtonDisabled() {
        return element(by.css('[class="sq-btn btn-secondary mat-raised-button"]')).getAttribute('ng-reflect-disabled');
    }

    clearButton() {
        return element(by.css('[class="sq-btn btn-secondary mat-raised-button"]')).click();
    }

    middleNameErrorMsg() {
        return element.all(by.css('[class="mat-input-error"]')).first().getText();
    }

    searchError() {
        return element.all(by.css('[class="mat-input-error"]')).last().getText();
    }
}

export class agGrid {

    priorSearch() {
        return element(by.css('[class="no-result-div"]')).isPresent();
    }

    performSearch() {
        return element(by.css('[class="no-result-div"]')).getText();
    }

    PatientListGrid() {
        return element(by.css('[class="grid-section"]')).isPresent();
    }

    PatientNameValidation(getCellValue: number) {
        return element.all(by.css('[class="ag-cell-value"]')).get(getCellValue).getText();
    }

    SelectAllPatients() {
        return element(by.css('[class="ag-header-select-all"]')).click();
    }

    ShowResults() {
        return element.all(by.css('[class="mat-button-wrapper"]')).last().click();
    }

    selectPatient() {
        return element(by.css('[class="ag-selection-checkbox"]')).click();
    }

    sortPatients() {
        return element.all(by.css('[class="ag-header-cell-label"]')).get(0).click();
    }

}