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
var ManageUsersService = (function () {
    function ManageUsersService(http, getConfig) {
        var _this = this;
        this.http = http;
        this.updateUserList = function (body) {
            return _this.http.put(_this.userListServiceLink, body)
                .map(function (data) { return data.json(); });
        };
        this.getUserList = function () {
            return _this.http.get(_this.userListServiceLink)
                .map(function (data) { return data.json(); });
        };
        this.userListServiceLink = getConfig.get('UserListServiceLink');
    }
    return ManageUsersService;
}());
ManageUsersService = __decorate([
    core_1.Injectable(),
    __metadata("design:paramtypes", [http_service_1.HttpService, get_config_service_1.GetConfigService])
], ManageUsersService);
exports.ManageUsersService = ManageUsersService;
//# sourceMappingURL=manage-users.service.js.map