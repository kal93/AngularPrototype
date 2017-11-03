"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var testing_1 = require("@angular/core/testing");
var ag_grid_cell_click_component_1 = require("./ag-grid-cell-click.component");
describe('AgGridCellClickComponent', function () {
    var component;
    var fixture;
    beforeEach(testing_1.async(function () {
        testing_1.TestBed.configureTestingModule({
            declarations: [ag_grid_cell_click_component_1.AgGridCellClickComponent]
        })
            .compileComponents();
    }));
    beforeEach(function () {
        fixture = testing_1.TestBed.createComponent(ag_grid_cell_click_component_1.AgGridCellClickComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });
    it('should be created', function () {
        expect(component).toBeTruthy();
    });
});
//# sourceMappingURL=ag-grid-cell-click.component.spec.js.map