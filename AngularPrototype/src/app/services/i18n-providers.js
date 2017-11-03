"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
function getTranslationProviders() {
    var locale = document['locale'];
    var noProviders = [];
    if (!locale) {
        return Promise.resolve(noProviders);
    }
    return getTranslationsWithSystemJs(locale)
        .then(function (translations) { return [
        { provide: core_1.TRANSLATIONS, useValue: translations },
        { provide: core_1.TRANSLATIONS_FORMAT, useValue: 'xlf' },
        { provide: core_1.LOCALE_ID, useValue: locale },
    ]; })
        .catch(function () { return noProviders; });
}
exports.getTranslationProviders = getTranslationProviders;
function getTranslationsWithSystemJs(locale) {
    if (locale === "es")
        return System.import('src/i18n/messages.es.xlf!text');
    else if (locale === "tr")
        return System.import('src/i18n/messages.tr.xlf!text');
    return System.import(locale);
}
//# sourceMappingURL=i18n-providers.js.map