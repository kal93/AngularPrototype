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
var login_service_1 = require("../services/login.service");
var authentication_service_1 = require("../services/authentication.service");
var get_config_service_1 = require("../services/get-config.service");
var LoginComponent = (function () {
    function LoginComponent(route, router, formBuilder, authenticationService, getConfig, loginService) {
        this.route = route;
        this.router = router;
        this.formBuilder = formBuilder;
        this.authenticationService = authenticationService;
        this.getConfig = getConfig;
        this.loginService = loginService;
        this.isLoginShowActionIcon = false;
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
        this.loginForm = this.formBuilder.group({
            'username': new forms_1.FormControl(),
            'password': new forms_1.FormControl(),
            'hostSystem': new forms_1.FormControl(),
            'hostRole': new forms_1.FormControl(),
        });
        this.companyImage = 'src/assets/images/Sunquest-logo-RGB.jpg';
        this.applicationName = this.getConfig.getResx('ApplicationName');
        this.usernameRequired = this.getConfig.getResx('UsernameRequired');
        this.loginButtonText = this.getConfig.getResx('LoginButtonText');
        this.clearButtonText = this.getConfig.getResx('ClearButtonText');
        this.getHostInfo();
    }
    LoginComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.loginForm.valueChanges.subscribe(function (values) {
            if (_this.loginForm.valid) {
                _this.isLoginDisable = false;
                _this.isClearDisable = false;
            }
            else {
                _this.isLoginDisable = true;
                _this.isClearDisable = false;
            }
        });
    };
    LoginComponent.prototype.setHostandRoles = function () {
        if (this.loginForm.get('hostSystem').value !== this.hostSystems[1].Name) {
            this.hostRoles = JSON.parse(JSON.stringify(this.hostInfo.HostRoles.slice(0, 3)));
        }
        else {
            this.hostRoles = this.hostInfo.HostRoles;
        }
    };
    LoginComponent.prototype.clear = function () {
        this.loginForm.reset({
            'username': null,
            'password': null,
            'hostSystem': null,
            'hostRole': null,
        });
        this.isClearDisable = true;
        this.loginFormErrorMessage = '';
    };
    LoginComponent.prototype.login = function () {
        var _this = this;
        this.isLoginShowActionIcon = true;
        var inputValue = {
            'UserName': this.loginForm.get('username').value || undefined,
            'Password': this.loginForm.get('password').value || undefined,
            'HostSystem': this.loginForm.get('hostSystem').value || undefined,
            'HostRole': this.loginForm.get('hostRole').value || undefined,
        };
        setTimeout(function () {
            _this.authenticationService.authenticateUser(inputValue)
                .subscribe((function (data) {
                _this.authResponse = data;
                _this.authenticationService.setUserPermissions(_this.authResponse.Permissions);
            }), function (error) {
                if (!error.ok) {
                    _this.loginFormErrorMessage = _this.getConfig.getResx('LoginFailed');
                    _this.isLoginShowActionIcon = false;
                }
            }, function () {
                if (_this.authResponse.token) {
                    sessionStorage.setItem('username', _this.loginForm.get('username').value);
                    sessionStorage.setItem('hostSystem', _this.loginForm.get('hostSystem').value);
                    sessionStorage.setItem('AuthenticationToken', _this.authResponse.token);
                    _this.router.navigate(['/search']);
                }
                else {
                    _this.isLoginShowActionIcon = false;
                    _this.loginFormErrorMessage = _this.getConfig.getResx('IncorrectCredentials');
                }
            });
        }, 1000);
    };
    return LoginComponent;
}());
LoginComponent = __decorate([
    core_1.Component({
        moduleId: module.id,
        selector: 'patiq-login',
        templateUrl: './login.component.html',
        styleUrls: ['./login.component.css']
    }),
    __metadata("design:paramtypes", [router_1.ActivatedRoute, router_1.Router,
        forms_1.FormBuilder, authentication_service_1.AuthenticationService,
        get_config_service_1.GetConfigService, login_service_1.LoginService])
], LoginComponent);
exports.LoginComponent = LoginComponent;
//# sourceMappingURL=login.component.js.map