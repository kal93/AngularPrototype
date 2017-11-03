"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
require("rxjs/add/operator/map");
var Rx_1 = require("rxjs/Rx");
var PassDataService = (function () {
    function PassDataService() {
        this.notify = new Rx_1.Subject();
        this.notifyObservable$ = this.notify.asObservable();
    }
    PassDataService.prototype.passUnsavedChangesFlag = function (data) {
        this.notify.next(data);
    };
    PassDataService.prototype.setUserInfo = function (user) { this.user = user; };
    PassDataService.prototype.getUserInfo = function () { return this.user; };
    PassDataService.prototype.setSearchData = function (searchData) { this.searchData = searchData; };
    PassDataService.prototype.getSearchData = function () { return this.searchData; };
    return PassDataService;
}());
PassDataService = __decorate([
    core_1.Injectable()
], PassDataService);
exports.PassDataService = PassDataService;
//# sourceMappingURL=pass-data.service.js.map