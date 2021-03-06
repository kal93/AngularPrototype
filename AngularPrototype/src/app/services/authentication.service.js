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
require("rxjs/add/operator/map");
var get_config_service_1 = require("./get-config.service");
var http_service_1 = require("./http.service");
var AuthenticationService = (function () {
    function AuthenticationService(http, getConfig) {
        this.http = http;
        this.authenticateUserLink = getConfig.get('AuthenticateUserLink');
        this.getUseRolePermissionsLink = getConfig.get('UseRolePermissionsLink');
    }
    AuthenticationService.prototype.authenticateUser = function (body) {
        return this.http.post(this.authenticateUserLink, body)
            .map(function (data) { return data.json(); });
    };
    ;
    AuthenticationService.prototype.setUserPermissions = function (permissions) {
        sessionStorage.setItem('permissions', permissions);
    };
    AuthenticationService.prototype.getUserPermissions = function () {
        return sessionStorage.getItem('permissions');
    };
    return AuthenticationService;
}());
AuthenticationService = __decorate([
    core_1.Injectable(),
    __metadata("design:paramtypes", [http_service_1.HttpService, get_config_service_1.GetConfigService])
], AuthenticationService);
exports.AuthenticationService = AuthenticationService;
//# sourceMappingURL=authentication.service.js.map