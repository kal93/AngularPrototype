"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var protractor_1 = require("protractor");
var ResultPage = (function () {
    function ResultPage() {
    }
    ResultPage.prototype.ShowAll = function () {
        return protractor_1.element(protractor_1.by.css('[class="sq-btn btn-secondary mat-raised-button"]')).click();
    };
    ResultPage.prototype.HideAll = function () {
        return protractor_1.element.all(protractor_1.by.css('[class="sq-btn btn-secondary mat-raised-button"]')).click();
    };
    ResultPage.prototype.ShowAllText = function () {
        return protractor_1.element(protractor_1.by.css('class="mat-button-wrapper"]')).getText();
    };
    ResultPage.prototype.HideAllText = function () {
        return protractor_1.element(protractor_1.by.css('[class="sq-btn btn-secondary mat-raised-button"]')).getText();
    };
    ResultPage.prototype.Update = function () {
        return protractor_1.element(protractor_1.by.css('[class="sq-btn btn-primary mat-raised-button"]')).click();
    };
    ResultPage.prototype.AGgridPlus = function (num) {
    };
    ResultPage.prototype.ExternalQAEdit = function (num) {
    };
    ResultPage.prototype.TestResultsEdit = function (num) {
        return protractor_1.browser.actions().doubleClick(protractor_1.element.all(protractor_1.by.css('[colid="ResultData"]')).get(num)).perform();
    };
    ResultPage.prototype.TestResultsClear = function (num) {
        var ctrlA = protractor_1.protractor.Key.chord(protractor_1.protractor.Key.CONTROL, "a");
        return protractor_1.element.all(protractor_1.by.css('[colid="ResultData"]')).get(num).sendKeys(ctrlA);
    };
    ResultPage.prototype.TestResultUpdate = function (num, text) {
        return protractor_1.element.all(protractor_1.by.css('[colid="ResultData"]')).get(num).sendKeys(text);
    };
    ResultPage.prototype.ViewAGgrid = function () {
        return protractor_1.element(protractor_1.by.css('[class="ag-full-width-viewport"]')).isPresent();
    };
    return ResultPage;
}());
exports.ResultPage = ResultPage;
var PopUpDialog = (function () {
    function PopUpDialog() {
    }
    PopUpDialog.prototype.mdDialog = function () {
        return expect(protractor_1.$('md-dialog-container').isPresent()).toBe(true);
    };
    PopUpDialog.prototype.mdRedirect = function () {
        return protractor_1.element(protractor_1.by.css('[class="sq-btn btn-primary mat-button"]')).click();
    };
    return PopUpDialog;
}());
exports.PopUpDialog = PopUpDialog;
//# sourceMappingURL=patiq-result.po.js.map