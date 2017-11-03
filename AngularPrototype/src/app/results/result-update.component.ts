import { Component } from '@angular/core';
import { ICellEditorAngularComp } from 'ag-grid-angular/main';

@Component({
    selector: 'result-update',
    template: `<md-input-container>
                    <input mdInput type="text" placeholder="Update here" [(ngModel)]="value">
               </md-input-container>`
})
/// <summary>
/// This class is used to add md-textbox to edit data in ag-grid
/// </summary>
export class ResultUpdateComponent implements ICellEditorAngularComp {
    public value: string;

    //Initialize value
    agInit(params: any): void {
        this.value = params.value;
    }

    //Get entered value from the input textbox
    getValue(): string {
        return this.value;
    }
}