import { browser, by, element, protractor, ExpectedConditions, $, $$ } from 'protractor';

export class ResultPage {

    ShowAll() {
        return element(by.css('[class="sq-btn btn-secondary mat-raised-button"]')).click();
    }

    HideAll() {
        return element.all(by.css('[class="sq-btn btn-secondary mat-raised-button"]')).click();
    }

    ShowAllText() {
        return element(by.css('class="mat-button-wrapper"]')).getText();
    }

    HideAllText() {
        return element(by.css('[class="sq-btn btn-secondary mat-raised-button"]')).getText();
    }

    Update() {
        return element(by.css('[class="sq-btn btn-primary mat-raised-button"]')).click();
    }

    AGgridPlus(num: number) {

    }

    ExternalQAEdit(num: number) {

    }

    TestResultsEdit(num: number) {
        //browser.actions().doubleClick(element(by.id('mybutton'))).perform();
        return browser.actions().doubleClick(element.all(by.css('[colid="ResultData"]')).get(num)).perform();

    }

    TestResultsClear(num: number) {

        var ctrlA = protractor.Key.chord(protractor.Key.CONTROL, "a");
        return element.all(by.css('[colid="ResultData"]')).get(num).sendKeys(ctrlA);

        //browser.actions().doubleClick(element(by.id('mybutton'))).perform();
        //return element.all(by.css('[colid="ResultData"]')).get(num).clear();

    }

    TestResultUpdate(num: number, text: string) {
        return element.all(by.css('[colid="ResultData"]')).get(num).sendKeys(text);
    }

    ViewAGgrid() {
        return element(by.css('[class="ag-full-width-viewport"]')).isPresent();
    }
}

export class PopUpDialog {

    mdDialog() {
        return expect($('md-dialog-container').isPresent()).toBe(true);
    }

    mdRedirect() {
        return element(by.css('[class="sq-btn btn-primary mat-button"]')).click();
    }

}