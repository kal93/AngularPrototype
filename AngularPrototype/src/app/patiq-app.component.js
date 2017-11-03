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
var app_header_settings_model_1 = require("./shared/app-header/app-header-settings.model");
var get_config_service_1 = require("./services/get-config.service");
var authentication_service_1 = require("./services/authentication.service");
var AppComponent = (function () {
    function AppComponent(router, getConfig, authenticationService) {
        this.router = router;
        this.getConfig = getConfig;
        this.authenticationService = authenticationService;
        this.showHeader = false;
        this.appHeaderSettings = new app_header_settings_model_1.AppHeaderSettingsModel();
        this.appHeaderSettings.companyLogo = 'src/assets/images/sunquest-logo.svg';
        this.appHeaderSettings.appName = this.getConfig.getResx('ApplicationName');
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
    }
    AppComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.router.events.subscribe(function (event) { return _this.displayHeader(event); });
        var appliedTheme = sessionStorage.getItem('selectedTheme');
        if (appliedTheme) {
            this.applyTheme(appliedTheme);
        }
    };
    AppComponent.prototype.displayHeader = function (location) {
        var _this = this;
        if (location.url === '/login' || location.url === '/') {
            this.showHeader = false;
        }
        else {
            this.appHeaderSettings.loggedInUser = sessionStorage.getItem('username');
            this.appHeaderSettings.hostSystem = sessionStorage.getItem('hostSystem');
            this.showHeader = true;
        }
        var adminTabIndex = this.appHeaderSettings.tabList.indexOf(this.appHeaderSettings.tabList.find(function (x) { return x.name === _this.getConfig.getResx('Admin'); }));
        if (this.authenticationService.getUserPermissions() === 'CanEdit') {
            this.appHeaderSettings.tabList[adminTabIndex].isVisible = true;
        }
        else {
            this.appHeaderSettings.tabList[adminTabIndex].isVisible = false;
        }
    };
    AppComponent.prototype.applyTheme = function (selectedTheme) {
        var elem = document.getElementById('themes');
        elem.setAttribute("href", "Content/" + selectedTheme + "-theme.css");
        sessionStorage.setItem('selectedTheme', selectedTheme);
    };
    AppComponent.prototype.menuClickHandler = function (menuItem) {
        if (menuItem === this.getConfig.getResx('DarkThemeMenu')) {
            this.applyTheme("dark");
        }
        else if (menuItem === this.getConfig.getResx('DefaultThemeMenu')) {
            this.applyTheme('default');
        }
        else if (menuItem === this.getConfig.getResx('ExitMenu')) {
            this.applyTheme('default');
            this.router.navigate(['/login']);
            sessionStorage.clear();
        }
    };
    return AppComponent;
}());
AppComponent = __decorate([
    core_1.Component({
        moduleId: module.id,
        selector: 'patiq-root',
        templateUrl: './patiq-app.component.html'
    }),
    __metadata("design:paramtypes", [router_1.Router, get_config_service_1.GetConfigService, authentication_service_1.AuthenticationService])
], AppComponent);
exports.AppComponent = AppComponent;
//# sourceMappingURL=patiq-app.component.js.map