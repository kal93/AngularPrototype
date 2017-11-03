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
var forms_1 = require("@angular/forms");
var material_1 = require("@angular/material");
var common_1 = require("@angular/common");
var login_service_1 = require("../../services/login.service");
var manage_users_service_1 = require("../../services/manage-users.service");
var pass_data_service_1 = require("../../services/pass-data.service");
var get_config_service_1 = require("../../services/get-config.service");
var modal_dialog_service_1 = require("../../shared/modal-dialog/modal-dialog.service");
var ManageUsersComponent = (function () {
    function ManageUsersComponent(passDataService, route, router, snackBar, formBuilder, dataService, getConfig, location, loginService, modalDialogService) {
        this.passDataService = passDataService;
        this.route = route;
        this.router = router;
        this.snackBar = snackBar;
        this.dataService = dataService;
        this.getConfig = getConfig;
        this.location = location;
        this.loginService = loginService;
        this.modalDialogService = modalDialogService;
        this.isUpdateDisable = true;
        this.hasUnsavedChanges = false;
        this.getHostInfo = function () {
            var _this = this;
            this.loginService.getHostInfoData()
                .subscribe(function (data) {
                _this.hostInfo = data;
                _this.hostSystems = data.HostSystems;
                _this.setHostandRoles();
            }),
                function (error) {
                    if (!error.ok) {
                        _this.loginFormErrorMessage = error.json().Message;
                    }
                };
        };
        this.editUsersForm = formBuilder.group({
            'UserId': new forms_1.FormControl(),
            'permissions': new forms_1.FormControl(),
            'name': new forms_1.FormControl(),
            'username': new forms_1.FormControl(),
            'userDescription': new forms_1.FormControl(),
            'selectedHostSystem': new forms_1.FormControl(),
            'selectedHostRole': new forms_1.FormControl(),
            'selectSuppressResults': new forms_1.FormControl(false),
            'selectSensitiveData': new forms_1.FormControl(false),
        });
        this.actionFromUrl = route.snapshot.queryParams['Action'];
        if (this.actionFromUrl == this.updateAction) {
            this.selectedUser = this.passDataService.getUserInfo();
        }
        this.unsavedChangesMessage = this.getConfig.getResx('UnsavedChangesMessage');
        this.nameMandatory = this.getConfig.getResx('NameMandatory');
        this.usernameMandatory = this.getConfig.getResx('UsernameMandatory');
        this.userPermission = this.getConfig.getResx('UserPermission');
        this.suppressedResults = this.getConfig.getResx('SuppressedResults');
        this.sensitiveData = this.getConfig.getResx('SensitiveData');
        this.cancelButtonText = this.getConfig.getResx('CancelButtonText');
        this.userUpdateFailed = this.getConfig.getResx('UserUpdateFailed');
        this.userAddedMessage = this.getConfig.getResx('userAddedMessage');
        this.updateAction = this.getConfig.getResx('updateAction');
        this.addAction = this.getConfig.getResx('addAction');
        this.getHostInfo();
    }
    ManageUsersComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.selectedUser = this.passDataService.getUserInfo();
        this.actionFromUrl = this.route.snapshot.queryParams['Action'];
        if (this.actionFromUrl == this.updateAction && this.selectedUser !== undefined) {
            this.addOrUpdateButtonText = this.getConfig.getResx('Update');
            this.manageUserHeaderText = this.getConfig.getResx('UpdateUserTitle');
            var selectedUser = this.passDataService.getUserInfo();
            this.editUsersForm.get('name').setValue(selectedUser.Name);
            this.editUsersForm.get('permissions').setValue(selectedUser.Permissions),
                this.editUsersForm.get('UserId').setValue(selectedUser.UserId),
                this.editUsersForm.get('username').setValue(selectedUser.UserName),
                this.editUsersForm.get('userDescription').setValue(selectedUser.UserDescription),
                this.editUsersForm.get('selectedHostSystem').setValue(selectedUser.HostSystem),
                this.editUsersForm.get('selectedHostRole').setValue(selectedUser.HostRole);
        }
        else if (this.actionFromUrl == this.addAction) {
            this.addOrUpdateButtonText = this.getConfig.getResx('addUserButtonText');
            this.manageUserHeaderText = this.getConfig.getResx('addUserHeaderText');
        }
        else {
            this.location.back();
        }
        this.editUsersForm.valueChanges.subscribe(function (values) {
            if (_this.editUsersForm.valid) {
                _this.isUpdateDisable = false;
            }
            else {
                _this.isUpdateDisable = true;
            }
            if ((_this.editUsersForm.get('name').value ||
                _this.editUsersForm.get('username').value ||
                _this.editUsersForm.get('userDescription').value ||
                _this.editUsersForm.get('selectedHostSystem').value ||
                _this.editUsersForm.get('selectedHostRole')) && _this.editUsersForm.dirty) {
                _this.hasUnsavedChanges = true;
            }
            else {
                _this.hasUnsavedChanges = false;
            }
        });
    };
    ManageUsersComponent.prototype.changeHostdata = function () {
        this.setHostandRoles();
    };
    ManageUsersComponent.prototype.setHostandRoles = function () {
        if (this.editUsersForm.get('selectedHostSystem').value !== this.hostSystems[1].Name) {
            this.hostRoles = JSON.parse(JSON.stringify(this.hostInfo.HostRoles.slice(0, 3)));
        }
        else {
            this.hostRoles = this.hostInfo.HostRoles;
        }
        if (this.editUsersForm.get('selectedHostRole').value === this.hostRoles[2].Role) {
            this.editUsersForm.get('selectSuppressResults').setValue(true);
            this.editUsersForm.get('selectSensitiveData').setValue(true);
        }
        else {
            this.editUsersForm.get('selectSuppressResults').setValue(false);
            this.editUsersForm.get('selectSensitiveData').setValue(false);
        }
    };
    ManageUsersComponent.prototype.addUpdateUser = function () {
        var _this = this;
        var inputValue = {
            'UserId': this.editUsersForm.get('UserId').value,
            'name': this.editUsersForm.get('name').value || undefined,
            'username': this.editUsersForm.get('username').value || undefined,
            'userDescription': this.editUsersForm.get('userDescription').value || undefined,
            'hostSystem': this.editUsersForm.get('selectedHostSystem').value || undefined,
            'hostRole': this.editUsersForm.get('selectedHostRole').value || undefined,
            'permissions': this.editUsersForm.get('permissions').value,
        };
        if (this.actionFromUrl == this.updateAction) {
            setTimeout(function () {
                _this.dataService
                    .updateUserList(inputValue)
                    .subscribe(function (data) { return _this.updateUserResponse = data; }, function (error) {
                    if (!error.ok) {
                        _this.snackBar.open(_this.userUpdateFailed + error.json().Message, '', {
                            duration: 5000,
                        });
                    }
                }, function () {
                    _this.snackBar.open(_this.editUsersForm.get('username').value + ' ' + _this.updateUserResponse, '', {
                        duration: 5000,
                    });
                    _this.hasUnsavedChanges = false;
                    _this.router.navigate(['/admin']);
                });
            }, 1000);
        }
        else {
            this.snackBar.open(this.userAddedMessage, '', {
                duration: 5000,
            });
            this.hasUnsavedChanges = false;
            this.router.navigate(['/admin']);
        }
    };
    ManageUsersComponent.prototype.cancel = function () {
        this.router.navigate(['/admin']);
    };
    return ManageUsersComponent;
}());
ManageUsersComponent = __decorate([
    core_1.Component({
        moduleId: module.id,
        selector: 'patiq-manage-users',
        templateUrl: './manage-users.component.html',
        styleUrls: ['./manage-users.component.css']
    }),
    __metadata("design:paramtypes", [pass_data_service_1.PassDataService, router_1.ActivatedRoute,
        router_1.Router, material_1.MdSnackBar, forms_1.FormBuilder,
        manage_users_service_1.ManageUsersService, get_config_service_1.GetConfigService,
        common_1.Location, login_service_1.LoginService,
        modal_dialog_service_1.ModalDialogService])
], ManageUsersComponent);
exports.ManageUsersComponent = ManageUsersComponent;
//# sourceMappingURL=manage-users.component.js.map