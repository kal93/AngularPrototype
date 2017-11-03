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
var http_service_1 = require("./http.service");
var GetConfigService = (function () {
    function GetConfigService(http) {
        this.http = http;
        this.locale = document['locale'];
        this.config = null;
        this.resx = null;
        this.locale = this.locale === "es" || this.locale === "tr" ? this.locale : "en";
        this.appConfigPath = "src/assets/app.config.json";
        this.resxPath = "src/assets/app.resx." + this.locale + ".json";
    }
    GetConfigService.prototype.get = function (key) {
        return this.config[key];
    };
    GetConfigService.prototype.getResx = function (key) {
        return this.resx[key];
    };
    GetConfigService.prototype.loadConfig = function () {
        var _this = this;
        var promise = this.http.get(this.appConfigPath).map(function (res) { return res.json(); }).toPromise();
        promise.then(function (config) { return _this.config = config; });
        return promise;
    };
    ;
    GetConfigService.prototype.loadResx = function () {
        var _this = this;
        var promise = this.http.get(this.resxPath).map(function (resx) { return resx.json(); }).toPromise();
        promise.then(function (resx) { return _this.resx = resx; });
        return promise;
    };
    ;
    return GetConfigService;
}());
GetConfigService = __decorate([
    core_1.Injectable(),
    __metadata("design:paramtypes", [http_service_1.HttpService])
], GetConfigService);
exports.GetConfigService = GetConfigService;
//# sourceMappingURL=get-config.service.js.map