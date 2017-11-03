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
var forms_1 = require("@angular/forms");
var moment = require("moment/moment");
var DateFormatValidatorDirective = DateFormatValidatorDirective_1 = (function () {
    function DateFormatValidatorDirective() {
    }
    DateFormatValidatorDirective.prototype.validate = function (dobControl) {
        var dobValue = dobControl.value;
        var isValid = moment(dobValue, this.dateFormat).isValid();
        return dobControl.touched && !isValid ? { 'invalid': true } : null;
    };
    return DateFormatValidatorDirective;
}());
__decorate([
    core_1.Input('validateDateFormat'),
    __metadata("design:type", String)
], DateFormatValidatorDirective.prototype, "dateFormat", void 0);
DateFormatValidatorDirective = DateFormatValidatorDirective_1 = __decorate([
    core_1.Directive({
        selector: '[validateDateFormat][ngModel],[validateDateFormat][formControl],[validateDateFormat][formControlName]',
        providers: [
            { provide: forms_1.NG_VALIDATORS, useExisting: core_1.forwardRef(function () { return DateFormatValidatorDirective_1; }), multi: true }
        ]
    })
], DateFormatValidatorDirective);
exports.DateFormatValidatorDirective = DateFormatValidatorDirective;
var DateFormatValidatorDirective_1;
//# sourceMappingURL=date-format-validator.directive.js.map