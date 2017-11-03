import { browser, by, element, protractor, ExpectedConditions, $, $$ } from 'protractor';

export class LoginAdmin {


    sendUsername(Username: string) {
        return element(by.css('[formcontrolname="username"]')).sendKeys(Username);
    }

    sendPassword(Password: string) {
        return element(by.css('[formcontrolname="password"]')).sendKeys(Password);
    }

    openHostSystem() {
        return element(by.css('[formcontrolname="hostSystem"]')).click();
    }

    selectHostSystem(num: number) {
        return element.all(by.css('[class="mat-option"]')).get(num).click();
    }

    openHostRole() {
        return element(by.css('[formcontrolname="hostRole"]')).click();
    }

    selectHostRole(num:number) {
        return element.all(by.css('[class="mat-option"]')).get(num).click();
    }

    loginClick() {
        return element(by.css('[class="sq-btn btn-primary mat-raised-button"]')).click();
    }

    cancelLogin() {
        return element(by.css('[class="sq-btn btn-secondary mat-raised-button"]')).click();
    }
}

export class VerifyUser {


    loggedUser(userName: string) {

        return expect(element.all(by.css('[class="sq-user-name"]')).last().getText()).toBe(userName);
    }

}