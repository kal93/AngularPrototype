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

    //---------Login Admin(Result Edit&Save)------

  it('Login as Administrator', () => {
      //enter user name
      loginAdmin.sendUsername(TestData.Login[0].UserName[0]);
      //enter password
      loginAdmin.sendPassword(TestData.Login[0].Password[0]);

      //selectHostSystem
      loginAdmin.openHostSystem();
      loginAdmin.selectHostSystem(0);

      //Select HostRole (index change only in ie)
      loginAdmin.openHostRole();
      //loginAdmin.selectHostRole(2);

      //for chrome
      loginAdmin.selectHostRole(3);

      //Login
      loginAdmin.loginClick();
      browser.sleep(10000);

      //Verify navigation from login to patiq search page
      page.VerifyPage(TestData.Common[0].TestURL[1]);
  });

  it('Verify the Logged in User', () => {
      page.VerifyPage(TestData.Common[0].TestURL[1]);
      User.loggedUser(TestData.Login[0].UserName[0]);
  });

  it('Verify the Host System of the User', () => {
      page.VerifyPage(TestData.Common[0].TestURL[1]);
      User.loggedUser(TestData.Login[0].UserName[0]);
  });

    //---------AppHeader--------------------------

  it('Verify App Header routing Result tab', () => {

      appHeader.resultTab();
      //verify the Result page is present
      expect(verifyRouting.resultsPage()).toBe(true);
      //verify the change in Result page url
      page.VerifyPage(TestData.Common[0].TestURL[2]);

  });

  it('Verify App Header routing Admin tab', () => {

      //click on Admin tab
      appHeader.adminTab();
      //verify the Result page is present
      expect(verifyRouting.adminPage()).toBe(true);
      //verify the change in Result page url
      page.VerifyPage(TestData.Common[0].TestURL[3]);

  });

  it('Verify App Header routing Search tab', () => {

      //click on Search tab
      appHeader.searchTab();
      //verify the Result page is present
      expect(verifyRouting.searchPage()).toBe(true);
      //verify the change in Result page url
      page.VerifyPage(TestData.Common[0].TestURL[1]);

  });

  it('Verify App Drawer menu', () => {

      //change the Resolution
      page.setBrowserResolution(768, 1024);
      page.setBrowserPosition();

      //open app drawer menu
      appDrawer.appDrawerMenu();
      browser.sleep(2000);

      appDrawer.resultTab();
      //verify the Result page is present
      expect(verifyRouting.resultsPage()).toBe(true);
      //verify the change in Result page url
      page.VerifyPage(TestData.Common[0].TestURL[2]);

      keyActions.Escape();
      browser.sleep(2000);
      appDrawer.appDrawerMenu();
      browser.sleep(2000);

      //click on Admin tab
      appDrawer.adminTab();
      //verify the Result page is present
      expect(verifyRouting.adminPage()).toBe(true);
      //verify the change in Result page url
      page.VerifyPage(TestData.Common[0].TestURL[3]);

      keyActions.Escape();
      browser.sleep(2000);
      appDrawer.appDrawerMenu();
      browser.sleep(2000);

      //click on Search tab
      appDrawer.searchTab();
      //verify the Result page is present
      expect(verifyRouting.searchPage()).toBe(true);
      //verify the change in Result page url
      page.VerifyPage(TestData.Common[0].TestURL[1]);

      keyActions.Escape();
      browser.sleep(2000);

      //change the Resolution
      page.setBrowserResolution(1024, 768);
      page.setBrowserPosition();
  });

  xit('Verify AppHeader Styles', () => {


  });

    //---------Enable\Disabling of Clear&Search---

  it('Verify onload both search and clear buttons are disabled', () => {

      expect(searchInput.clearButtonDisabled()).toBe('true');
      expect(searchInput.searchButtonDisabled()).toBe('true');

  });

  it('Verify on load check all HID is selected', () => {
      //check all HID is selected
      expect(searchInput.checkAllState()).toContain('mat-checkbox-checked');

      ////default HID is unchecked
      //expect(searchInput.defaultHIDState()).toContain('unchecked');
  });

  it('verify clear and search buttons enable/disable', () => {

      searchInput.firstName('simpson');
      expect(searchInput.clearButtonDisabled()).toBe('false');
      expect(searchInput.searchButtonDisabled()).toBe('false');

  });

  it('Clear and Verify disable of search', () => {

      searchInput.firstNameClear();
      searchInput.clearButton();
      //keyActions.Tab();
      browser.sleep(2000);
      expect(searchInput.clearButtonDisabled()).toBe('true');
      expect(searchInput.searchButtonDisabled()).toBe('true');

  });

  it('Modify HID Verify disable of clear button enable/disable', () => {

      //modify
      searchInput.firstName(TestData.Search[0].LastName[0]);
      searchInput.defaultHIDCheckbox();
      expect(searchInput.defaultHIDState()).toContain('mat-checkbox-checked');
      expect(searchInput.clearButtonDisabled()).toBe('false');
      expect(searchInput.searchButtonDisabled()).toBe('false');

      //clear firstname only search is disabled
      searchInput.firstName(protractor.Key.CLEAR);
      //keyActions.Tab();
      browser.sleep(2000);
      expect(searchInput.clearButtonDisabled()).toBe('false');
      expect(searchInput.searchButtonDisabled()).toBe('false');

  });

  it('Click on clear, Should reset checkAll and buttons state', () => {

      searchInput.clearButton();
      expect(searchInput.checkAllState()).toContain('mat-checkbox-checked');
      expect(searchInput.clearButtonDisabled()).toBe('true');
      expect(searchInput.searchButtonDisabled()).toBe('true');

  });
    
    //---------Search-----------------------------

  it('Perform search & result population in ag-Grid', () => {

      //reset all
      searchInput.clearButton();

      //enter search criteria
      searchInput.lastName(TestData.Search[0].LastName[1]);
      expect(searchInput.clearButtonDisabled()).toBe('false');
      expect(searchInput.searchButtonDisabled()).toBe('false');

      //verify ag-Grid is not present before search 
      expect(AGgrid.priorSearch()).toBe(true);

      //Verify appropriate message is displayed to perform search for patient list
      expect(AGgrid.performSearch()).toContain(TestData.Search[0].ValidationMsgs[0]);

      //perform search
      searchInput.searchButton();

      //verify patient list is displayed
      expect(AGgrid.PatientListGrid()).toBe(false);

  });

  it('Verify Patient list matches with the performed search criteria', () => {

      for (var cell = 0; cell < 3; cell++) {

          expect(AGgrid.PatientNameValidation(cell)).toContain(TestData.Search[0].LastName[1]);
      }

  });

    //---------Toggle-----------------------------

  it('Toggle to hide & show the search form', () => {

      //hide search form
      toggle.toggleUp();
      expect(toggle.formHidden()).toBe('true');

      browser.sleep(5000);

      //show search form
      toggle.toggleDown();
      expect(toggle.formHidden()).toBe(null);
  });

    //---------PatientList Sorting----------------

  it('Sorting of Results in Patient list', () => {

      AGgrid.sortPatients();

      browser.sleep(1000);

      expect(element(by.css('[class="ag-cell-label-container ag-header-cell-sorted-asc"]')).isPresent()).toBe(true);

      AGgrid.sortPatients();

      browser.sleep(1000);

      expect(element(by.css('[class="ag-cell-label-container ag-header-cell-sorted-desc"]')).isPresent()).toBe(true);
  });
    
    //---------Showresults------------------------
    
  it('Show Results', () => {

      //select all patients
      AGgrid.SelectAllPatients();

      //show results
      AGgrid.ShowResults();

      //verify routing
      //verify the Result page is present
      expect(verifyRouting.resultsPage()).toBe(true);
      //verify the change in Result page url
      page.VerifyPage(TestData.Common[0].TestURL[2]);

      //Verify Test Results for the selected patient is present
      browser.sleep(3000);
  });

  it('Verify Show all and Hide all', () => { 

      //Click on show ALL
      //expect(Result.ShowAllText()).toContain('SHOW ALL')
      Result.ShowAll();

      browser.sleep(5000);

      //Verify
      expect(Result.ViewAGgrid()).toBe(true);

      ////Click on Hide ALL
      //expect(Result.HideAllText()).toContain('HIDE ALL')
      Result.HideAll();
      ////Verify
      //expect(Result.ViewAGgrid()).toBe(false);


      browser.sleep(10000);
  });

    //---------Edit&Save--------------------------

  it('Verify Result Edit and Update', () => {

      Result.TestResultsEdit(1);
      Result.TestResultsEdit(1);

      browser.sleep(5000);
      
      $('input').clear();
      browser.sleep(1000);
      $('input').sendKeys(TestData.Search[0].agGridEdit[0]);
     
      browser.sleep(2000);

      keyActions.Enter();

      browser.sleep(2000);

      //Update
      Result.Update();

      browser.sleep(10000);
      

  });
        
    //---------mdDialog---------------------------

  it('Verify mdDialog pop up', () => {

      //back to search & perform search on same patient and verify
      appHeader.searchTab();
      //verify the Result page is present
      expect(verifyRouting.searchPage()).toBe(true);
      //verify the change in Result page url
      page.VerifyPage(TestData.Common[0].TestURL[1]);

      //enter search criteria
      searchInput.firstName('dan');
      browser.sleep(6000);

      //perform search
      searchInput.searchButton();
      browser.sleep(3000);

      //select all patients
      AGgrid.selectPatient();

      //show results
      AGgrid.ShowResults();

      //verify routing
      //verify the Result page is present
      expect(verifyRouting.resultsPage()).toBe(true);
      //verify the change in Result page url
      page.VerifyPage(TestData.Common[0].TestURL[2]);

      //Verify Test Results for the selected patient is present
      browser.sleep(3000);

      //Click on show ALL
      Result.ShowAll();

      browser.sleep(5000);

      //Verify
      expect(Result.ViewAGgrid()).toBe(true);

      browser.sleep(3000);

      Result.TestResultsEdit(1);
      Result.TestResultsEdit(1);
      browser.sleep(5000);

      $('input').sendKeys(TestData.Search[0].agGridEdit[1]);

      browser.sleep(2000);

      keyActions.Enter();

      browser.sleep(2000);

      //back to search 
      appHeader.searchTab();



  });

  it('Redirect Dialog to Search page without saving', () => {

      Dialog.mdDialog();

      browser.sleep(1000);

      keyActions.Enter();
      keyActions.Enter();

      //Dialog.mdRedirect();

      browser.sleep(1000);

      page.VerifyPage(TestData.Common[0].TestURL[1]);

  });
    
    //---------ManageUsers------------------------

  xit('Verify Manage User Update in Admin Tab', () => {

  });

    //---------Add&UpdateUsers--------------------

  xit('Verify Add & UpdateUsers in Admin Tab', () => {

  });

    //---------Exit-------------------------------

  it('Close the browser', () => {

      browser.restart();
  });
    
    //--------------------------------------------


});
