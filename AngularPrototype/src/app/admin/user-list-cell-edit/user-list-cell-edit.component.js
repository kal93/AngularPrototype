"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var router_1 = require("@angular/router");
var pass_data_service_1 = require("../../services/pass-data.service");
var get_config_service_1 = require("../../services/get-config.service");
var UserListCellEditComponent = (function () {
    function UserListCellEditComponent(router, passDataService, getConfig) {
        this.router = router;
        this.passDataService = passDataService;
        this.getConfig = getConfig;
        this.editMode = true;
        this.action = this.getConfig.getResx('updateAction');
    }
    UserListCellEditComponent.prototype.agInit = function (params) {
        this.params = params;
        this.cell = { row: params.value, col: params.colDef.headerName };
    };
    UserListCellEditComponent.prototype.clicked = function (cell) {
        var userData = {
            "UserId": this.params.data.UserId,
            "Name": this.params.data.Name,
            "UserName": this.params.data.UserName,
            "HostSystem": this.params.data.HostSystem,
            "HostRole": this.params.data.HostRole,
            "Permissions": this.params.data.Permissions,
            "UserDescription": this.params.data.UserDescription,
        };
        this.passDataService.setUserInfo(userData);
        var navigationExtras = {
            queryParams: {
                "Action": this.action,
            }
        };
        this.router.navigate(["/manage-user"], navigationExtras);
    };
    return UserListCellEditComponent;
}());
UserListCellEditComponent = __decorate([
    core_1.Component({
        selector: 'patiq-user-list-cell-edit',
        template: "\n   <patiq-ag-grid-cell-click (onClicked)=\"clicked($event)\" [cell]=\"cell\"></patiq-ag-grid-cell-click>\n    "
    }),
    __metadata("design:paramtypes", [router_1.Router, pass_data_service_1.PassDataService, get_config_service_1.GetConfigService])
], UserListCellEditComponent);
exports.UserListCellEditComponent = UserListCellEditComponent;
//# sourceMappingURL=user-list-cell-edit.component.js.map