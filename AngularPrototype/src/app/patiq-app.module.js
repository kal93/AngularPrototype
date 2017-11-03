"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var platform_browser_1 = require("@angular/platform-browser");
var core_1 = require("@angular/core");
var animations_1 = require("@angular/platform-browser/animations");
var forms_1 = require("@angular/forms");
var main_1 = require("ag-grid-angular/main");
var http_1 = require("@angular/http");
var md = require("../index");
var patiq_app_routing_module_1 = require("./patiq-app-routing.module");
var patiq_app_component_1 = require("./patiq-app.component");
var login_component_1 = require("./login/login.component");
var app_header_component_1 = require("./shared/app-header/app-header.component");
var search_component_1 = require("./search/search.component");
var patient_list_component_1 = require("./search/patient-list.component");
var results_component_1 = require("./results/results.component");
var result_detail_component_1 = require("./results/result-detail.component");
var result_update_component_1 = require("./results/result-update.component");
var manage_users_component_1 = require("./admin/manage-users/manage-users.component");
var user_list_component_1 = require("./admin/user-list/user-list.component");
var user_list_cell_edit_component_1 = require("./admin/user-list-cell-edit/user-list-cell-edit.component");
var ag_grid_cell_click_component_1 = require("./shared/ag-grid-cell-click/ag-grid-cell-click.component");
var spinner_component_1 = require("./shared/spinner/spinner.component");
var login_service_1 = require("./services/login.service");
var search_service_1 = require("./services/search.service");
var patient_list_service_1 = require("./services/patient-list.service");
var manage_users_service_1 = require("./services/manage-users.service");
var selected_patient_result_model_1 = require("./models/selected-patient-result.model");
var prevent_unsaved_changes_handler_1 = require("./shared/unsaved-changes/prevent-unsaved-changes-handler");
var modal_dialog_component_1 = require("./shared/modal-dialog/modal-dialog.component");
var modal_dialog_service_1 = require("./shared/modal-dialog/modal-dialog.service");
var pass_data_service_1 = require("./services/pass-data.service");
var get_config_service_1 = require("./services/get-config.service");
var ajax_header_service_1 = require("./services/ajax-header.service");
var date_format_validator_directive_1 = require("./shared/validators/date-format-validator.directive");
var authentication_service_1 = require("./services/authentication.service");
var http_service_1 = require("./services/http.service");
function initConfig(config) {
    return function () { return config.loadConfig(); };
}
exports.initConfig = initConfig;
function initResx(resx) {
    return function () { return resx.loadResx(); };
}
exports.initResx = initResx;
function initHttpService(backend, options) {
    return new http_service_1.HttpService(backend, options);
}
exports.initHttpService = initHttpService;
var AppModule = (function () {
    function AppModule() {
    }
    return AppModule;
}());
AppModule = __decorate([
    core_1.NgModule({
        declarations: [
            patiq_app_component_1.AppComponent,
            app_header_component_1.AppHeaderComponent,
            search_component_1.SearchComponent,
            results_component_1.ResultsComponent,
            result_detail_component_1.ResultDetailComponent,
            patient_list_component_1.PatientListComponent,
            user_list_component_1.UserListComponent,
            user_list_cell_edit_component_1.UserListCellEditComponent,
            manage_users_component_1.ManageUsersComponent,
            ag_grid_cell_click_component_1.AgGridCellClickComponent,
            login_component_1.LoginComponent,
            result_update_component_1.ResultUpdateComponent,
            spinner_component_1.SpinnerComponent,
            modal_dialog_component_1.ModalDialogComponent,
            date_format_validator_directive_1.DateFormatValidatorDirective
        ],
        imports: [
            platform_browser_1.BrowserModule,
            animations_1.BrowserAnimationsModule,
            forms_1.ReactiveFormsModule,
            forms_1.FormsModule,
            http_1.HttpModule,
            http_1.JsonpModule,
            patiq_app_routing_module_1.AppRoutingModule,
            md.MdMenuModule,
            md.MdSidenavModule,
            md.MdTabsModule,
            md.MdToolbarModule,
            md.MdButtonModule,
            md.MdDatepickerModule,
            md.MdInputModule,
            md.MdNativeDateModule,
            md.MdCheckboxModule,
            md.MdSelectModule,
            md.MdSnackBarModule,
            md.MdProgressSpinnerModule,
            md.MdDialogModule,
            main_1.AgGridModule.withComponents([result_detail_component_1.ResultDetailComponent, user_list_cell_edit_component_1.UserListCellEditComponent, result_update_component_1.ResultUpdateComponent]),
        ],
        schemas: [core_1.CUSTOM_ELEMENTS_SCHEMA],
        providers: [
            get_config_service_1.GetConfigService,
            {
                deps: [get_config_service_1.GetConfigService],
                multi: true,
                provide: core_1.APP_INITIALIZER,
                useFactory: initConfig
            },
            {
                deps: [get_config_service_1.GetConfigService],
                multi: true,
                provide: core_1.APP_INITIALIZER,
                useFactory: initResx
            },
            {
                provide: md.DateAdapter, useClass: search_component_1.SearchComponent
            },
            login_service_1.LoginService,
            search_service_1.SearchService,
            manage_users_service_1.ManageUsersService,
            patient_list_service_1.PatientListService,
            selected_patient_result_model_1.SelectedPatientForResultModel,
            prevent_unsaved_changes_handler_1.PreventUnsavedChanges,
            modal_dialog_service_1.ModalDialogService,
            pass_data_service_1.PassDataService,
            authentication_service_1.AuthenticationService,
            {
                provide: http_service_1.HttpService,
                useFactory: initHttpService,
                deps: [http_1.XHRBackend, http_1.RequestOptions]
            },
            ajax_header_service_1.AjaxHeaderService,
        ],
        entryComponents: [modal_dialog_component_1.ModalDialogComponent],
        bootstrap: [patiq_app_component_1.AppComponent]
    })
], AppModule);
exports.AppModule = AppModule;
//# sourceMappingURL=patiq-app.module.js.map