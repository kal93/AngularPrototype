import { browser, by, element, protractor, ExpectedConditions, $, $$ } from 'protractor';
import { PatientInquiryPrototypePage } from './patiq-app.po';
import { LoginAdmin } from './patiq-login.po';
import { VerifyUser } from './patiq-login.po';
import { AppHeader } from './patiq-search.po';
import { VerifyRouting } from './patiq-search.po';
import { AppDrawer } from './patiq-search.po';
import { KeyActions } from './patiq-app.po';
import { SearchFields } from './patiq-search.po';
import { agGrid } from './patiq-search.po';
import { Toggle } from './patiq-search.po';
import { ResultPage } from './patiq-result.po';
import { PopUpDialog } from './patiq-result.po';


describe('patient-inquiry-prototype App', () => {
    let page: PatientInquiryPrototypePage;
    let loginAdmin: LoginAdmin;
    let User: VerifyUser;
    let appHeader: AppHeader;
    let verifyRouting: VerifyRouting;
    let appDrawer: AppDrawer;
    let keyActions: KeyActions;
    let searchInput: SearchFields;
    let AGgrid: agGrid;
    let toggle: Toggle;
    let Result: ResultPage;
    let Dialog: PopUpDialog;

    //get the TestData
    var TestData = require('./TestData.json');

    beforeEach(() => {

        page = new PatientInquiryPrototypePage();
        loginAdmin = new LoginAdmin();
        User = new VerifyUser();
        appHeader = new AppHeader();
        verifyRouting = new VerifyRouting();
        appDrawer = new AppDrawer();
        keyActions = new KeyActions();
        searchInput = new SearchFields();
        AGgrid = new agGrid();
        toggle = new Toggle();
        Result = new ResultPage();
        Dialog = new PopUpDialog();

        //ignore Synchronization
        browser.waitForAngularEnabled(false);
        browser.sleep(10000);
    });

    it('Navigate to Test URL', () => {
        //Navigate to PatientInquiryPrototype
        page.navigateTo(TestData.Common[0].TestURL[0]);

        //Set the browser resolution
        page.setBrowserResolution(1280, 1024);
        page.setBrowserPosition();

        //wait for page to load
        browser.sleep(30000);

        ///Verify the current url
        page.VerifyPage(TestData.Common[0].TestURL[0]);

    });

    //---------Login Fellow-----------------------

    it('Login as Fellow', () => {
        //enter user name
        loginAdmin.sendUsername(TestData.Login[0].UserName[1]);
        //enter password
        loginAdmin.sendPassword(TestData.Login[0].Password[1]);

        //selectHostSystem
        loginAdmin.openHostSystem();
        loginAdmin.selectHostSystem(0);

        //Select HostRole (index change only in ie)
        loginAdmin.openHostRole();
        //loginAdmin.selectHostRole(2);

        //for chrome
        loginAdmin.selectHostRole(2);

        //Login
        loginAdmin.loginClick();
        browser.sleep(10000);

        //Verify navigation from login to patiq search page
        page.VerifyPage(TestData.Common[0].TestURL[1]);
    });

    it('Verify the Logged in User', () => {
        page.VerifyPage(TestData.Common[0].TestURL[1]);
        User.loggedUser(TestData.Login[0].UserName[1]);
    });

    it('Verify the Host System of the User', () => {
        page.VerifyPage(TestData.Common[0].TestURL[1]);
        User.loggedUser(TestData.Login[0].UserName[1]);
    });
    
    //---------AppHeader(Admin Tab Absent)--------

    it('Verify App Header Tab is absent for Fellow Permissions', () => {

        expect(appHeader.adminTabPresent()).toBe(false);
    });

    //---------ManageUsers(Absent)----------------

    it('Verify ManageUsers is absent', () => {

        //click on Admin tab
        appHeader.adminTab();
        //verify the Result page is present
        expect(verifyRouting.adminPage()).toBe(true);
        //verify the change in Result page url
        page.VerifyPage(TestData.Common[0].TestURL[3]);



    });

    //---------Exit-------------------------------

    it('Close the browser', () => {

        browser.restart();
    });

    //--------------------------------------------



});
