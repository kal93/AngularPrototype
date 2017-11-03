import { Component } from '@angular/core';
import { MdDialogRef } from '@angular/material';

@Component({
    moduleId: module.id,
    selector: 'patiq-modal-dialog',
    templateUrl: './modal-dialog.component.html',
    styleUrls: ['./modal-dialog.component.css']
})
/// <summary>
/// This class creates Modal Dialog
/// </summary>
export class ModalDialogComponent {
    //Message to display in dialog body
    public message: string;
    //Title of modal dialog
    public title?: string;
    //OK button text
    public btnOkText?: string;
    //CANCEl button text
    public btnCancelText?: string;

    constructor(public dialogRef: MdDialogRef<ModalDialogComponent>) { }


}
