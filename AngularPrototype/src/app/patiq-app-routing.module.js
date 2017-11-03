"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var router_1 = require("@angular/router");
var login_component_1 = require("./login/login.component");
var search_component_1 = require("./search/search.component");
var results_component_1 = require("./results/results.component");
var user_list_component_1 = require("./admin/user-list/user-list.component");
var manage_users_component_1 = require("./admin/manage-users/manage-users.component");
var prevent_unsaved_changes_handler_1 = require("./shared/unsaved-changes/prevent-unsaved-changes-handler");
var routes = [
    {
        path: '',
        pathMatch: 'full',
        redirectTo: 'login'
    },
    {
        path: 'login',
        component: login_component_1.LoginComponent
    },
    {
        path: 'search',
        component: search_component_1.SearchComponent,
    },
    {
        path: 'results',
        component: results_component_1.ResultsComponent,
        canDeactivate: [prevent_unsaved_changes_handler_1.PreventUnsavedChanges]
    },
    {
        path: 'admin',
        component: user_list_component_1.UserListComponent,
    },
    {
        path: 'manage-user',
        component: manage_users_component_1.ManageUsersComponent,
        canDeactivate: [prevent_unsaved_changes_handler_1.PreventUnsavedChanges],
    }
];
var AppRoutingModule = (function () {
    function AppRoutingModule() {
    }
    return AppRoutingModule;
}());
AppRoutingModule = __decorate([
    core_1.NgModule({
        imports: [router_1.RouterModule.forRoot(routes, { useHash: true })],
        exports: [router_1.RouterModule]
    })
], AppRoutingModule);
exports.AppRoutingModule = AppRoutingModule;
//# sourceMappingURL=patiq-app-routing.module.js.map