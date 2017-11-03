import { browser, by, element, protractor, ExpectedConditions, $, $$ } from 'protractor';

export class PatientInquiryPrototypePage {
  navigateTo(URL: string) {
      return browser.get(URL);
  }

  VerifyPage(URL: string) {
      return expect(browser.getCurrentUrl()).toBe(URL);
  }

  getParagraphText() {
    return element(by.css('patiq-root h1')).getText();
  }

  setBrowserResolution(width: number, height: number) {
      browser.manage().window().setSize(width, height);
  }

  setBrowserPosition() {
      browser.manage().window().setPosition(0, 0);
  }
}

export class KeyActions {

    Escape() {
        return browser.actions().sendKeys(protractor.Key.ESCAPE).perform();
    }

    Tab() {
        return browser.actions().sendKeys(protractor.Key.TAB).perform();
    }

    Backspace() {
        return browser.actions().sendKeys(protractor.Key.BACK_SPACE).perform();
    }

    Enter() {
        return browser.actions().sendKeys(protractor.Key.ENTER).perform();
    }
}