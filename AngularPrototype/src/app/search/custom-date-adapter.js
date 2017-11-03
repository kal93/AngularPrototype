"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var material_1 = require("@angular/material");
var CustomDateAdapter = (function (_super) {
    __extends(CustomDateAdapter, _super);
    function CustomDateAdapter() {
        var _this = _super.call(this) || this;
        _this.locale = document['locale'];
        return _this;
    }
    CustomDateAdapter.prototype.parse = function (value) {
        if ((typeof value === 'string') && (value.indexOf('/') > -1)) {
            var str = value.split('/');
            var year = Number(str[2]);
            var month = Number(str[1]) - 1;
            var date = Number(str[0]);
            if (this.locale == 'es') {
                return new Date(year, month, date);
            }
            else if (this.locale == 'tr') {
                return new Date(year, month, date);
            }
            else {
                var year_1 = Number(str[2]);
                var month_1 = Number(str[0]) - 1;
                var date_1 = Number(str[1]);
                return new Date(year_1, month_1, date_1);
            }
        }
        var timestamp = typeof value === 'number' ? value : Date.parse(value);
        return isNaN(timestamp) ? null : new Date(timestamp);
    };
    CustomDateAdapter.prototype.getFirstDayOfWeek = function () {
        return 2;
    };
    return CustomDateAdapter;
}(material_1.NativeDateAdapter));
exports.CustomDateAdapter = CustomDateAdapter;
//# sourceMappingURL=custom-date-adapter.js.map