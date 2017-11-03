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
    it('Login as Fellow', function () {
        loginAdmin.sendUsername(TestData.Login[0].UserName[1]);
        loginAdmin.sendPassword(TestData.Login[0].Password[1]);
        loginAdmin.openHostSystem();
        loginAdmin.selectHostSystem(0);
        loginAdmin.openHostRole();
        loginAdmin.selectHostRole(2);
        loginAdmin.loginClick();
        protractor_1.browser.sleep(10000);
        page.VerifyPage(TestData.Common[0].TestURL[1]);
    });
    it('Verify the Logged in User', function () {
        page.VerifyPage(TestData.Common[0].TestURL[1]);
        User.loggedUser(TestData.Login[0].UserName[1]);
    });
    it('Verify the Host System of the User', function () {
        page.VerifyPage(TestData.Common[0].TestURL[1]);
        User.loggedUser(TestData.Login[0].UserName[1]);
    });
    it('Verify App Header Tab is absent for Fellow Permissions', function () {
        expect(appHeader.adminTabPresent()).toBe(false);
    });
    it('Verify ManageUsers is absent', function () {
        appHeader.adminTab();
        expect(verifyRouting.adminPage()).toBe(true);
        page.VerifyPage(TestData.Common[0].TestURL[3]);
    });
    it('Close the browser', function () {
        protractor_1.browser.restart();
    });
});
//# sourceMappingURL=patiq-app-2.e2e-spec.js.map