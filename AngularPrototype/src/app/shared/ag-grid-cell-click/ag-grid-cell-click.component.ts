import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
    moduleId: module.id,
    selector: 'patiq-ag-grid-cell-click',
    templateUrl: './ag-grid-cell-click.component.html',
    styleUrls: ['./ag-grid-cell-click.component.css']
})
/// <summary>
/// This class creates AgGridCellClickComponent to provide a icon in any row cell data and an event
/// </summary>
export class AgGridCellClickComponent {
    // To store grid cell data 
    @Input() cell: any;
    // Event for cell on click
    @Output() onClicked = new EventEmitter<boolean>();

    // Click event for the edit icon 
    click(): void {
        this.onClicked.emit(this.cell);
    }
}
