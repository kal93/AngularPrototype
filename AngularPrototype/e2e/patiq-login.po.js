"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var protractor_1 = require("protractor");
var LoginAdmin = (function () {
    function LoginAdmin() {
    }
    LoginAdmin.prototype.sendUsername = function (Username) {
        return protractor_1.element(protractor_1.by.css('[formcontrolname="username"]')).sendKeys(Username);
    };
    LoginAdmin.prototype.sendPassword = function (Password) {
        return protractor_1.element(protractor_1.by.css('[formcontrolname="password"]')).sendKeys(Password);
    };
    LoginAdmin.prototype.openHostSystem = function () {
        return protractor_1.element(protractor_1.by.css('[formcontrolname="hostSystem"]')).click();
    };
    LoginAdmin.prototype.selectHostSystem = function (num) {
        return protractor_1.element.all(protractor_1.by.css('[class="mat-option"]')).get(num).click();
    };
    LoginAdmin.prototype.openHostRole = function () {
        return protractor_1.element(protractor_1.by.css('[formcontrolname="hostRole"]')).click();
    };
    LoginAdmin.prototype.selectHostRole = function (num) {
        return protractor_1.element.all(protractor_1.by.css('[class="mat-option"]')).get(num).click();
    };
    LoginAdmin.prototype.loginClick = function () {
        return protractor_1.element(protractor_1.by.css('[class="sq-btn btn-primary mat-raised-button"]')).click();
    };
    LoginAdmin.prototype.cancelLogin = function () {
        return protractor_1.element(protractor_1.by.css('[class="sq-btn btn-secondary mat-raised-button"]')).click();
    };
    return LoginAdmin;
}());
exports.LoginAdmin = LoginAdmin;
var VerifyUser = (function () {
    function VerifyUser() {
    }
    VerifyUser.prototype.loggedUser = function (userName) {
        return expect(protractor_1.element.all(protractor_1.by.css('[class="sq-user-name"]')).last().getText()).toBe(userName);
    };
    return VerifyUser;
}());
exports.VerifyUser = VerifyUser;
//# sourceMappingURL=patiq-login.po.js.map