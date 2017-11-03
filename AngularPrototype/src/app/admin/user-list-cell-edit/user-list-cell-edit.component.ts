import { Component } from '@angular/core';
import { ICellRendererAngularComp } from 'ag-grid-angular/main';
import { GridOptions } from 'ag-grid';
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot, NavigationExtras } from '@angular/router';
import { PassDataService } from '../../services/pass-data.service';
import { UserInfoModel } from '../../models/user-info.model';
import { GetConfigService } from '../../services/get-config.service';


@Component({
    selector: 'patiq-user-list-cell-edit',
    template: `
   <patiq-ag-grid-cell-click (onClicked)="clicked($event)" [cell]="cell"></patiq-ag-grid-cell-click>
    `
})
/// <summary>
/// This class creates UserListEditCellComponent to provide row edit in user's grid
/// </summary>
export class UserListCellEditComponent implements ICellRendererAngularComp {
    //get selected row
    private selectedRow: GridOptions;
    //get selected user
    selectedUser: UserInfoModel;

    // storing parameters 
    private params: any;
    public cell: any;

    //set edit mode for the manage user component.This is sent in the query params
    editMode: boolean = true;

    action: string;


    constructor(private router: Router, private passDataService: PassDataService, private getConfig: GetConfigService) {
        this.action = this.getConfig.getResx('updateAction');
    }


    agInit(params: any): void {
        // Getting the selected row values
        this.params = params;

        this.cell = { row: params.value, col: params.colDef.headerName };

    }
    /// <summary>
    /// Event to navigate manage-users page
    /// </summary>
    public clicked(cell: any): void {

        let userData = {
            "UserId": this.params.data.UserId,
            "Name": this.params.data.Name,
            "UserName": this.params.data.UserName,
            "HostSystem": this.params.data.HostSystem,
            "HostRole": this.params.data.HostRole,
            "Permissions": this.params.data.Permissions,
            "UserDescription": this.params.data.UserDescription,
        }

        //store data to pass-data service
        this.passDataService.setUserInfo(userData);
        //send action in url
        let navigationExtras: NavigationExtras = {
            queryParams: {
                "Action": this.action,
            }
        };

        // Navigation with data
        this.router.navigate(["/manage-user"], navigationExtras);
    }
}