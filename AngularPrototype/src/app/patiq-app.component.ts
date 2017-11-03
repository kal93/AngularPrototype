import { Component, NgModule, OnInit } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule, Routes, Router } from '@angular/router';

import { AppHeaderSettingsModel } from './shared/app-header/app-header-settings.model';
import { GetConfigService } from './services/get-config.service';
import { AuthenticationService } from './services/authentication.service';

@Component({
    moduleId: module.id,
    selector: 'patiq-root',
    templateUrl: './patiq-app.component.html'
})
/// <summary>
/// This is Application Component
/// It passes settings to header component 
/// </summary>
export class AppComponent implements OnInit {
    //Application Header Settings for app-header component
    appHeaderSettings: AppHeaderSettingsModel;
    showHeader: boolean = false;

    constructor(private router: Router, private getConfig: GetConfigService, private authenticationService: AuthenticationService) {
        //App Header Settings Start
        this.appHeaderSettings = new AppHeaderSettingsModel();
        this.appHeaderSettings.companyLogo = 'src/assets/images/sunquest-logo.svg';
        //Get Application Name from app.config
        this.appHeaderSettings.appName = this.getConfig.getResx('ApplicationName');
        //Get Name Space from app.config
        this.appHeaderSettings.nameSpace = this.getConfig.getResx('NameSpace');
        this.appHeaderSettings.tabList = [
            { path: '/search', name: this.getConfig.getResx('Search') },
            { path: '/results', name: this.getConfig.getResx('Results') },
            { path: '/admin', name: this.getConfig.getResx('Admin') }
        ];
        this.appHeaderSettings.menuList = [
            { name: this.getConfig.getResx('DarkThemeMenu') },
            { name: this.getConfig.getResx('DefaultThemeMenu') },
            { name: this.getConfig.getResx('ExitMenu') }
        ];
        //App Header Settings End
    }
    ngOnInit() {
        // listening to routing navigation event
        this.router.events.subscribe(event => this.displayHeader(event));
        // Apply selected theme on refresh
        let appliedTheme = sessionStorage.getItem('selectedTheme');
        if (appliedTheme) {
            this.applyTheme(appliedTheme);
        }
    }
    // public methods
    /// <summary>
    /// This method is to check the location and display header 
    /// </summary>
    displayHeader(location: any) {
        if (location.url === '/login' || location.url === '/') {
            this.showHeader = false;
        }
        else {
            // Setting user and host System from Session storage
            this.appHeaderSettings.loggedInUser = sessionStorage.getItem('username')
            this.appHeaderSettings.hostSystem = sessionStorage.getItem('hostSystem')
            this.showHeader = true;
        }
        // Getting the admin tab index value from tab list
        var adminTabIndex = this.appHeaderSettings.tabList.indexOf(this.appHeaderSettings.tabList.find(x => x.name === this.getConfig.getResx('Admin')));
        if (this.authenticationService.getUserPermissions() === 'CanEdit') {
            this.appHeaderSettings.tabList[adminTabIndex].isVisible = true;
        }
        else {
            this.appHeaderSettings.tabList[adminTabIndex].isVisible = false;
        }
    }
    /// <summary>
    /// This method is to apply/change theme for application
    /// </summary>
    private applyTheme(selectedTheme: string) {
        let elem = document.getElementById('themes');
        elem.setAttribute("href", `Content/${selectedTheme}-theme.css`);
        sessionStorage.setItem('selectedTheme', selectedTheme);
    }
    /// <summary>
    /// This method is to check the menu item clicked and perform action accordingly 
    /// </summary>
    menuClickHandler(menuItem: string): void {
        if (menuItem === this.getConfig.getResx('DarkThemeMenu')) {
            this.applyTheme("dark");
        }
        else if (menuItem === this.getConfig.getResx('DefaultThemeMenu')) {
            this.applyTheme('default');
        }
        else if (menuItem === this.getConfig.getResx('ExitMenu')) {
            // Apply default theme on Exit
            this.applyTheme('default');
            this.router.navigate(['/login']);
            // Clear the token and username from session storage
            sessionStorage.clear();
        }
    }
}


