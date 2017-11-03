"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var protractor_1 = require("protractor");
var PatientInquiryPrototypePage = (function () {
    function PatientInquiryPrototypePage() {
    }
    PatientInquiryPrototypePage.prototype.navigateTo = function (URL) {
        return protractor_1.browser.get(URL);
    };
    PatientInquiryPrototypePage.prototype.VerifyPage = function (URL) {
        return expect(protractor_1.browser.getCurrentUrl()).toBe(URL);
    };
    PatientInquiryPrototypePage.prototype.getParagraphText = function () {
        return protractor_1.element(protractor_1.by.css('patiq-root h1')).getText();
    };
    PatientInquiryPrototypePage.prototype.setBrowserResolution = function (width, height) {
        protractor_1.browser.manage().window().setSize(width, height);
    };
    PatientInquiryPrototypePage.prototype.setBrowserPosition = function () {
        protractor_1.browser.manage().window().setPosition(0, 0);
    };
    return PatientInquiryPrototypePage;
}());
exports.PatientInquiryPrototypePage = PatientInquiryPrototypePage;
var KeyActions = (function () {
    function KeyActions() {
    }
    KeyActions.prototype.Escape = function () {
        return protractor_1.browser.actions().sendKeys(protractor_1.protractor.Key.ESCAPE).perform();
    };
    KeyActions.prototype.Tab = function () {
        return protractor_1.browser.actions().sendKeys(protractor_1.protractor.Key.TAB).perform();
    };
    KeyActions.prototype.Backspace = function () {
        return protractor_1.browser.actions().sendKeys(protractor_1.protractor.Key.BACK_SPACE).perform();
    };
    KeyActions.prototype.Enter = function () {
        return protractor_1.browser.actions().sendKeys(protractor_1.protractor.Key.ENTER).perform();
    };
    return KeyActions;
}());
exports.KeyActions = KeyActions;
//# sourceMappingURL=patiq-app.po.js.map