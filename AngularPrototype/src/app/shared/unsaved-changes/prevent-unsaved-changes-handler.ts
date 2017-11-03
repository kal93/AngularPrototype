import { FormGroup } from '@angular/forms';
import { Injectable, HostListener, ApplicationRef } from '@angular/core';
import { CanDeactivate } from '@angular/router';
import { Location } from '@angular/common';
import { Observable } from 'rxjs/Rx';

import { GetConfigService } from '../../services/get-config.service';
import { IUnsavedChanges } from './prevent-unsaved-changes';
import { ModalDialogService } from '../modal-dialog/modal-dialog.service';
import { PassDataService } from '../../services/pass-data.service';

/// <summary>
/// Handles Dirty data
/// Shows confirmation message if there is Unsaved data presents in the form
/// </summary>
@Injectable()
export class PreventUnsavedChanges implements CanDeactivate<IUnsavedChanges> {
    constructor(public modalDialogService: ModalDialogService, private changeDetectorRef: ApplicationRef, private passDataService: PassDataService, private location: Location, private getConfig: GetConfigService) { }

    //Flag for back button click
    backBtn: boolean = false;

    canDeactivate(component: IUnsavedChanges) {
        //this.backBtn = this.passDataService.getBackButtonFlag();
        //Display Confirmation dialog when there are unsaved changes
        if (component.hasUnsavedChanges && this.backBtn) {
            if (!confirm("You've unsaved Changes.Are you sure you want to navigate away?")) {
                //this.backBtn = false;
                return false;
            }
        }
           
        if (component.hasUnsavedChanges) {
            return this.modalDialogService.openDialog(component.unsavedChangesMessage, this.getConfig.getResx('ApplicationName'), this.getConfig.getResx('OkButtonText'), this.getConfig.getResx('CancelButtonText'));
        }
        return true;
    }
}