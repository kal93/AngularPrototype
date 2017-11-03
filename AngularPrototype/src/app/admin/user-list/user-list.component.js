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
var user_list_cell_edit_component_1 = require("../user-list-cell-edit/user-list-cell-edit.component");
var manage_users_service_1 = require("../../services/manage-users.service");
var get_config_service_1 = require("../../services/get-config.service");
var UserListComponent = (function () {
    function UserListComponent(route, router, manageUsersService, getConfig) {
        this.route = route;
        this.router = router;
        this.manageUsersService = manageUsersService;
        this.getConfig = getConfig;
        this.addUserButtonText = this.getConfig.getResx('adduserButtonTextUserList');
        this.userListHeaderText = this.getConfig.getResx('userListHeaderText');
        this.userListGridOptions = {
            columnDefs: this.createColumnDefs()
        };
        this.setRowdata();
    }
    UserListComponent.prototype.createColumnDefs = function () {
        var gridHeaders = this.getConfig.getResx('UserListHeaders');
        return [
            {
                headerName: gridHeaders.Name,
                field: "Name",
                width: 150,
                hide: true,
            },
            {
                headerName: gridHeaders.UserName,
                field: "UserName",
                width: 150,
            },
            {
                headerName: gridHeaders.UserDescription,
                field: "UserDescription",
                width: 300,
            },
            {
                headerName: gridHeaders.Edit,
                field: "Edit",
                width: 50,
                cellRendererFramework: user_list_cell_edit_component_1.UserListCellEditComponent,
                suppressSorting: true,
            },
            {
                headerName: gridHeaders.HostSystem,
                field: "HostSystem",
                width: 50,
                hide: true,
            },
            {
                headerName: gridHeaders.HostRole,
                field: "HostRole",
                width: 50,
                hide: true,
            },
            {
                headerName: gridHeaders.Permissions,
                field: "Permissions",
                width: 50,
                hide: true,
            },
            {
                headerName: gridHeaders.Password,
                field: "Password",
                width: 0,
                hide: true,
            },
        ];
    };
    UserListComponent.prototype.setRowdata = function () {
        var _this = this;
        this.manageUsersService.getUserList()
            .subscribe(function (data) { return _this.userListData = data; }, function (error) { return console.log(error); }, function () {
            return _this.userListData;
        });
    };
    UserListComponent.prototype.goToAddUser = function () {
        var navigationExtras = { queryParams: { "Action": 'add user' } };
        this.router.navigate(["/manage-user"], navigationExtras);
    };
    return UserListComponent;
}());
UserListComponent = __decorate([
    core_1.Component({
        moduleId: module.id,
        selector: 'patiq-user-list',
        templateUrl: './user-list.component.html',
        styleUrls: ['./user-list.component.css']
    }),
    __metadata("design:paramtypes", [router_1.ActivatedRoute, router_1.Router, manage_users_service_1.ManageUsersService, get_config_service_1.GetConfigService])
], UserListComponent);
exports.UserListComponent = UserListComponent;
//# sourceMappingURL=user-list.component.js.map