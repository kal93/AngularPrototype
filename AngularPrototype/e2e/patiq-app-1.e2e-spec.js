"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var protractor_1 = require("protractor");
var patiq_app_po_1 = require("./patiq-app.po");
var patiq_login_po_1 = require("./patiq-login.po");
var patiq_login_po_2 = require("./patiq-login.po");
var patiq_search_po_1 = require("./patiq-search.po");
var patiq_search_po_2 = require("./patiq-search.po");
var patiq_search_po_3 = require("./patiq-search.po");
var patiq_app_po_2 = require("./patiq-app.po");
var patiq_search_po_4 = require("./patiq-search.po");
var patiq_search_po_5 = require("./patiq-search.po");
var patiq_search_po_6 = require("./patiq-search.po");
var patiq_result_po_1 = require("./patiq-result.po");
var patiq_result_po_2 = require("./patiq-result.po");
describe('patient-inquiry-prototype App', function () {
    var page;
    var loginAdmin;
    var User;
    var appHeader;
    var verifyRouting;
    var appDrawer;
    var keyActions;
    var searchInput;
    var AGgrid;
    var toggle;
    var Result;
    var Dialog;
    var TestData = require('./TestData.json');
    beforeEach(function () {
        page = new patiq_app_po_1.PatientInquiryPrototypePage();
        loginAdmin = new patiq_login_po_1.LoginAdmin();
        User = new patiq_login_po_2.VerifyUser();
        appHeader = new patiq_search_po_1.AppHeader();
        verifyRouting = new patiq_search_po_2.VerifyRouting();
        appDrawer = new patiq_search_po_3.AppDrawer();
        keyActions = new patiq_app_po_2.KeyActions();
        searchInput = new patiq_search_po_4.SearchFields();
        AGgrid = new patiq_search_po_5.agGrid();
        toggle = new patiq_search_po_6.Toggle();
        Result = new patiq_result_po_1.ResultPage();
        Dialog = new patiq_result_po_2.PopUpDialog();
        protractor_1.browser.waitForAngularEnabled(false);
        protractor_1.browser.sleep(10000);
    });
    it('Navigate to Test URL', function () {
        page.navigateTo(TestData.Common[0].TestURL[0]);
        page.setBrowserResolution(1280, 1024);
        page.setBrowserPosition();
        protractor_1.browser.sleep(30000);
        page.VerifyPage(TestData.Common[0].TestURL[0]);
    });
    it('Login as Administrator', function () {
        loginAdmin.sendUsername(TestData.Login[0].UserName[0]);
        loginAdmin.sendPassword(TestData.Login[0].Password[0]);
        loginAdmin.openHostSystem();
        loginAdmin.selectHostSystem(0);
        loginAdmin.openHostRole();
        loginAdmin.selectHostRole(3);
        loginAdmin.loginClick();
        protractor_1.browser.sleep(10000);
        page.VerifyPage(TestData.Common[0].TestURL[1]);
    });
    it('Verify the Logged in User', function () {
        page.VerifyPage(TestData.Common[0].TestURL[1]);
        User.loggedUser(TestData.Login[0].UserName[0]);
    });
    it('Verify the Host System of the User', function () {
        page.VerifyPage(TestData.Common[0].TestURL[1]);
        User.loggedUser(TestData.Login[0].UserName[0]);
    });
    it('Verify App Header routing Result tab', function () {
        appHeader.resultTab();
        expect(verifyRouting.resultsPage()).toBe(true);
        page.VerifyPage(TestData.Common[0].TestURL[2]);
    });
    it('Verify App Header routing Admin tab', function () {
        appHeader.adminTab();
        expect(verifyRouting.adminPage()).toBe(true);
        page.VerifyPage(TestData.Common[0].TestURL[3]);
    });
    it('Verify App Header routing Search tab', function () {
        appHeader.searchTab();
        expect(verifyRouting.searchPage()).toBe(true);
        page.VerifyPage(TestData.Common[0].TestURL[1]);
    });
    it('Verify App Drawer menu', function () {
        page.setBrowserResolution(768, 1024);
        page.setBrowserPosition();
        appDrawer.appDrawerMenu();
        protractor_1.browser.sleep(2000);
        appDrawer.resultTab();
        expect(verifyRouting.resultsPage()).toBe(true);
        page.VerifyPage(TestData.Common[0].TestURL[2]);
        keyActions.Escape();
        protractor_1.browser.sleep(2000);
        appDrawer.appDrawerMenu();
        protractor_1.browser.sleep(2000);
        appDrawer.adminTab();
        expect(verifyRouting.adminPage()).toBe(true);
        page.VerifyPage(TestData.Common[0].TestURL[3]);
        keyActions.Escape();
        protractor_1.browser.sleep(2000);
        appDrawer.appDrawerMenu();
        protractor_1.browser.sleep(2000);
        appDrawer.searchTab();
        expect(verifyRouting.searchPage()).toBe(true);
        page.VerifyPage(TestData.Common[0].TestURL[1]);
        keyActions.Escape();
        protractor_1.browser.sleep(2000);
        page.setBrowserResolution(1024, 768);
        page.setBrowserPosition();
    });
    xit('Verify AppHeader Styles', function () {
    });
    it('Verify onload both search and clear buttons are disabled', function () {
        expect(searchInput.clearButtonDisabled()).toBe('true');
        expect(searchInput.searchButtonDisabled()).toBe('true');
    });
    it('Verify on load check all HID is selected', function () {
        expect(searchInput.checkAllState()).toContain('mat-checkbox-checked');
    });
    it('verify clear and search buttons enable/disable', function () {
        searchInput.firstName('simpson');
        expect(searchInput.clearButtonDisabled()).toBe('false');
        expect(searchInput.searchButtonDisabled()).toBe('false');
    });
    it('Clear and Verify disable of search', function () {
        searchInput.firstNameClear();
        searchInput.clearButton();
        protractor_1.browser.sleep(2000);
        expect(searchInput.clearButtonDisabled()).toBe('true');
        expect(searchInput.searchButtonDisabled()).toBe('true');
    });
    it('Modify HID Verify disable of clear button enable/disable', function () {
        searchInput.firstName(TestData.Search[0].LastName[0]);
        searchInput.defaultHIDCheckbox();
        expect(searchInput.defaultHIDState()).toContain('mat-checkbox-checked');
        expect(searchInput.clearButtonDisabled()).toBe('false');
        expect(searchInput.searchButtonDisabled()).toBe('false');
        searchInput.firstName(protractor_1.protractor.Key.CLEAR);
        protractor_1.browser.sleep(2000);
        expect(searchInput.clearButtonDisabled()).toBe('false');
        expect(searchInput.searchButtonDisabled()).toBe('false');
    });
    it('Click on clear, Should reset checkAll and buttons state', function () {
        searchInput.clearButton();
        expect(searchInput.checkAllState()).toContain('mat-checkbox-checked');
        expect(searchInput.clearButtonDisabled()).toBe('true');
        expect(searchInput.searchButtonDisabled()).toBe('true');
    });
    it('Perform search & result population in ag-Grid', function () {
        searchInput.clearButton();
        searchInput.lastName(TestData.Search[0].LastName[1]);
        expect(searchInput.clearButtonDisabled()).toBe('false');
        expect(searchInput.searchButtonDisabled()).toBe('false');
        expect(AGgrid.priorSearch()).toBe(true);
        expect(AGgrid.performSearch()).toContain(TestData.Search[0].ValidationMsgs[0]);
        searchInput.searchButton();
        expect(AGgrid.PatientListGrid()).toBe(false);
    });
    it('Verify Patient list matches with the performed search criteria', function () {
        for (var cell = 0; cell < 3; cell++) {
            expect(AGgrid.PatientNameValidation(cell)).toContain(TestData.Search[0].LastName[1]);
        }
    });
    it('Toggle to hide & show the search form', function () {
        toggle.toggleUp();
        expect(toggle.formHidden()).toBe('true');
        protractor_1.browser.sleep(5000);
        toggle.toggleDown();
        expect(toggle.formHidden()).toBe(null);
    });
    it('Sorting of Results in Patient list', function () {
        AGgrid.sortPatients();
        protractor_1.browser.sleep(1000);
        expect(protractor_1.element(protractor_1.by.css('[class="ag-cell-label-container ag-header-cell-sorted-asc"]')).isPresent()).toBe(true);
        AGgrid.sortPatients();
        protractor_1.browser.sleep(1000);
        expect(protractor_1.element(protractor_1.by.css('[class="ag-cell-label-container ag-header-cell-sorted-desc"]')).isPresent()).toBe(true);
    });
    it('Show Results', function () {
        AGgrid.SelectAllPatients();
        AGgrid.ShowResults();
        expect(verifyRouting.resultsPage()).toBe(true);
        page.VerifyPage(TestData.Common[0].TestURL[2]);
        protractor_1.browser.sleep(3000);
    });
    it('Verify Show all and Hide all', function () {
        Result.ShowAll();
        protractor_1.browser.sleep(5000);
        expect(Result.ViewAGgrid()).toBe(true);
        Result.HideAll();
        protractor_1.browser.sleep(10000);
    });
    it('Verify Result Edit and Update', function () {
        Result.TestResultsEdit(1);
        Result.TestResultsEdit(1);
        protractor_1.browser.sleep(5000);
        protractor_1.$('input').clear();
        protractor_1.browser.sleep(1000);
        protractor_1.$('input').sendKeys(TestData.Search[0].agGridEdit[0]);
        protractor_1.browser.sleep(2000);
        keyActions.Enter();
        protractor_1.browser.sleep(2000);
        Result.Update();
        protractor_1.browser.sleep(10000);
    });
    it('Verify mdDialog pop up', function () {
        appHeader.searchTab();
        expect(verifyRouting.searchPage()).toBe(true);
        page.VerifyPage(TestData.Common[0].TestURL[1]);
        searchInput.firstName('dan');
        protractor_1.browser.sleep(6000);
        searchInput.searchButton();
        protractor_1.browser.sleep(3000);
        AGgrid.selectPatient();
        AGgrid.ShowResults();
        expect(verifyRouting.resultsPage()).toBe(true);
        page.VerifyPage(TestData.Common[0].TestURL[2]);
        protractor_1.browser.sleep(3000);
        Result.ShowAll();
        protractor_1.browser.sleep(5000);
        expect(Result.ViewAGgrid()).toBe(true);
        protractor_1.browser.sleep(3000);
        Result.TestResultsEdit(1);
        Result.TestResultsEdit(1);
        protractor_1.browser.sleep(5000);
        protractor_1.$('input').sendKeys(TestData.Search[0].agGridEdit[1]);
        protractor_1.browser.sleep(2000);
        keyActions.Enter();
        protractor_1.browser.sleep(2000);
        appHeader.searchTab();
    });
    it('Redirect Dialog to Search page without saving', function () {
        Dialog.mdDialog();
        protractor_1.browser.sleep(1000);
        keyActions.Enter();
        keyActions.Enter();
        protractor_1.browser.sleep(1000);
        page.VerifyPage(TestData.Common[0].TestURL[1]);
    });
    xit('Verify Manage User Update in Admin Tab', function () {
    });
    xit('Verify Add & UpdateUsers in Admin Tab', function () {
    });
    it('Close the browser', function () {
        protractor_1.browser.restart();
    });
});
//# sourceMappingURL=patiq-app-1.e2e-spec.js.map