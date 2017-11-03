import { TRANSLATIONS, TRANSLATIONS_FORMAT, LOCALE_ID, MissingTranslationStrategy } from '@angular/core';
import { CompilerConfig } from '@angular/compiler';

export function getTranslationProviders(): Promise<Object[]> {

    // Get the locale id from the global
    const locale = document['locale'] as string;

    // return no providers if fail to get translation file for locale
    const noProviders: Object[] = [];

    // No locale: no translation providers
    if (!locale) {
        return Promise.resolve(noProviders);
    }
    return getTranslationsWithSystemJs(locale)
        .then((translations: string) => [
            { provide: TRANSLATIONS, useValue: translations },
            { provide: TRANSLATIONS_FORMAT, useValue: 'xlf' },
            { provide: LOCALE_ID, useValue: locale },
        ])
        .catch(() => noProviders); // ignore if file not found
}

declare var System: any;

function getTranslationsWithSystemJs(locale: string) {
    //Hack to import xlf files as System.import is accepting only hard-coded strings
    if (locale === "es")
        return System.import('src/i18n/messages.es.xlf!text');
    else if (locale === "tr")
        return System.import('src/i18n/messages.tr.xlf!text');
    return System.import(locale);
}
