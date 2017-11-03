import { Injectable } from '@angular/core';
import { MdDialogRef, MdDialog } from '@angular/material';
import { Observable } from 'rxjs/Rx';

import { ModalDialogComponent } from './modal-dialog.component';

@Injectable()
/// <summary>
/// This class is used to call modal dialog component with provided data
/// </summary>
export class ModalDialogService {
    constructor(private dialog: MdDialog) { }

    //This method opens modal dialog-can be used as confirm/alert
    public openDialog(message: string, title?: string, btnOkText?: string, btnCancelText?: string): Observable<boolean> {

        let dialogRef: MdDialogRef<ModalDialogComponent>;

        //Opens modal dialog
        dialogRef = this.dialog.open(ModalDialogComponent);

        //Data to display in modal dialog - Title, Message, Buttons Text
        dialogRef.componentInstance.title = title;
        dialogRef.componentInstance.message = message;
        dialogRef.componentInstance.btnOkText = btnOkText;
        dialogRef.componentInstance.btnCancelText = btnCancelText;
        return dialogRef.afterClosed();
    }
}
