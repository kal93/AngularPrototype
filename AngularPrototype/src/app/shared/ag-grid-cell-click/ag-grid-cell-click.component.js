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
var AgGridCellClickComponent = (function () {
    function AgGridCellClickComponent() {
        this.onClicked = new core_1.EventEmitter();
    }
    AgGridCellClickComponent.prototype.click = function () {
        this.onClicked.emit(this.cell);
    };
    return AgGridCellClickComponent;
}());
__decorate([
    core_1.Input(),
    __metadata("design:type", Object)
], AgGridCellClickComponent.prototype, "cell", void 0);
__decorate([
    core_1.Output(),
    __metadata("design:type", Object)
], AgGridCellClickComponent.prototype, "onClicked", void 0);
AgGridCellClickComponent = __decorate([
    core_1.Component({
        moduleId: module.id,
        selector: 'patiq-ag-grid-cell-click',
        templateUrl: './ag-grid-cell-click.component.html',
        styleUrls: ['./ag-grid-cell-click.component.css']
    })
], AgGridCellClickComponent);
exports.AgGridCellClickComponent = AgGridCellClickComponent;
//# sourceMappingURL=ag-grid-cell-click.component.js.map