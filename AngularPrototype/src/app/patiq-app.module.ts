import { BrowserModule } from '@angular/platform-browser';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA, APP_INITIALIZER } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { AgGridModule } from 'ag-grid-angular/main';
import { HttpModule, JsonpModule, RequestOptions, XHRBackend } from '@angular/http';
import * as md from '../index';

import { AppRoutingModule } from './patiq-app-routing.module';
import { AppComponent } from './patiq-app.component';

import { LoginComponent } from './login/login.component';
import { AppHeaderComponent } from './shared/app-header/app-header.component';
import { SearchComponent } from './search/search.component';
import { PatientListComponent } from './search/patient-list.component';
import { ResultsComponent } from './results/results.component';
import { ResultDetailComponent } from './results/result-detail.component';
import { ResultUpdateComponent } from "./results/result-update.component";
import { ManageUsersComponent } from './admin/manage-users/manage-users.component';
import { UserListComponent } from './admin/user-list/user-list.component';
import { UserListCellEditComponent } from './admin/user-list-cell-edit/user-list-cell-edit.component';
import { AgGridCellClickComponent } from './shared/ag-grid-cell-click/ag-grid-cell-click.component';
import { SpinnerComponent } from './shared/spinner/spinner.component';

import { LoginService } from './services/login.service';
import { SearchService } from './services/search.service';
import { PatientListService } from './services/patient-list.service';
import { ManageUsersService } from './services/manage-users.service';

import { SelectedPatientForResultModel } from './models/selected-patient-result.model';

import { PreventUnsavedChanges } from './shared/unsaved-changes/prevent-unsaved-changes-handler';

import { ModalDialogComponent } from './shared/modal-dialog/modal-dialog.component';
import { ModalDialogService } from './shared/modal-dialog/modal-dialog.service';

import { PassDataService } from './services/pass-data.service';
import { GetConfigService } from './services/get-config.service';
import { AjaxHeaderService } from './services/ajax-header.service';
import { DateFormatValidatorDirective } from './shared/validators/date-format-validator.directive';
import { AuthenticationService } from './services/authentication.service';
import { HttpService } from './services/http.service';

/// <summary>
/// Loads all the service links from app.config.json file.
/// </summary>
export function initConfig(config: GetConfigService) {
    return () => config.loadConfig();
}

/// <summary>
/// Loads all the application strings from app.resx.json file.
/// </summary>
export function initResx(resx: GetConfigService) {
    return () => resx.loadResx();
}

/// <summary>
/// Initialize custom Http Service class
/// </summary>
export function initHttpService(backend: XHRBackend, options: RequestOptions) {
    return new HttpService(backend, options);
}


@NgModule({
    declarations: [
        AppComponent,
        AppHeaderComponent,
        SearchComponent,
        ResultsComponent,
        ResultDetailComponent,
        PatientListComponent,
        UserListComponent,
        UserListCellEditComponent,
        ManageUsersComponent,
        AgGridCellClickComponent,
        LoginComponent,
        ResultUpdateComponent,
        SpinnerComponent,
        ModalDialogComponent,
        DateFormatValidatorDirective
    ],
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        ReactiveFormsModule,
        FormsModule,
        HttpModule,
        JsonpModule,
        AppRoutingModule,
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
        AgGridModule.withComponents([ResultDetailComponent, UserListCellEditComponent, ResultUpdateComponent]),
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA],
    providers: [
        GetConfigService,
        {
            deps: [GetConfigService],
            multi: true,
            provide: APP_INITIALIZER,
            useFactory: initConfig
        },
        {
            deps: [GetConfigService],
            multi: true,
            provide: APP_INITIALIZER,
            useFactory: initResx
        },
        {
            provide: md.DateAdapter, useClass: SearchComponent
        },
        LoginService,
        SearchService,
        ManageUsersService,
        PatientListService,
        SelectedPatientForResultModel,
        PreventUnsavedChanges,
        ModalDialogService,
        PassDataService,
        AuthenticationService,
        {
            provide: HttpService,
            useFactory: initHttpService,
            deps: [XHRBackend, RequestOptions]
        },
        AjaxHeaderService,

    ],
    entryComponents: [ModalDialogComponent],
    bootstrap: [AppComponent]
})
export class AppModule { }