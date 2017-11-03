"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var AjaxHeaderService = (function () {
    function AjaxHeaderService() {
    }
    AjaxHeaderService.prototype.$ajax = function (actionUrl, actionParameters, actionMethod, successCallback, isAsync) {
        var token = sessionStorage.getItem('AuthenticationToken');
        $.ajax({
            url: actionUrl,
            data: actionParameters,
            method: actionMethod,
            async: isAsync,
            contentType: "application/json; charset=utf-8",
            beforeSend: function (xhr) {
                xhr.setRequestHeader('Authorization', "Bearer " + token);
            },
        }).done(successCallback);
        $(document).ajaxError(function (e, xhr, opt) {
            console.log(opt.url + '\t' + xhr.status + '\t' + xhr.statusText);
        });
    };
    ;
    return AjaxHeaderService;
}());
AjaxHeaderService = __decorate([
    core_1.Injectable()
], AjaxHeaderService);
exports.AjaxHeaderService = AjaxHeaderService;
//# sourceMappingURL=ajax-header.service.js.map