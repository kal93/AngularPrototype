"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var ResultUpdateComponent = (function () {
    function ResultUpdateComponent() {
    }
    ResultUpdateComponent.prototype.agInit = function (params) {
        this.value = params.value;
    };
    ResultUpdateComponent.prototype.getValue = function () {
        return this.value;
    };
    return ResultUpdateComponent;
}());
ResultUpdateComponent = __decorate([
    core_1.Component({
        selector: 'result-update',
        template: "<md-input-container>\n                    <input mdInput type=\"text\" placeholder=\"Update here\" [(ngModel)]=\"value\">\n               </md-input-container>"
    })
], ResultUpdateComponent);
exports.ResultUpdateComponent = ResultUpdateComponent;
//# sourceMappingURL=result-update.component.js.map