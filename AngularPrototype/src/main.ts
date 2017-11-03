import { enableProdMode} from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { getTranslationProviders } from './app/services/i18n-providers';

import { AppModule } from './app/patiq-app.module';
import { environment } from './environments/environment';

if (environment.production) {
    enableProdMode();
}

//Call getTranslationProviders from i18n-providers to get language code and respective translated text
getTranslationProviders().then(providers => {
    const options = { providers };
    platformBrowserDynamic().bootstrapModule(AppModule, options);
});