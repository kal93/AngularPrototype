"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var platform_browser_dynamic_1 = require("@angular/platform-browser-dynamic");
var i18n_providers_1 = require("./app/services/i18n-providers");
var patiq_app_module_1 = require("./app/patiq-app.module");
var environment_1 = require("./environments/environment");
if (environment_1.environment.production) {
    core_1.enableProdMode();
}
i18n_providers_1.getTranslationProviders().then(function (providers) {
    var options = { providers: providers };
    platform_browser_dynamic_1.platformBrowserDynamic().bootstrapModule(patiq_app_module_1.AppModule, options);
});
//# sourceMappingURL=main.js.map