import { Component } from '@angular/core';
import { ActivatedRoute, Router, NavigationExtras } from '@angular/router';

import { GridOptions } from "ag-grid";
import { UserListCellEditComponent } from '../user-list-cell-edit/user-list-cell-edit.component';
import { ManageUsersService } from '../../services/manage-users.service';
import { UserInfoModel } from '../../models/user-info.model';
import { GetConfigService } from '../../services/get-config.service';

@Component({
    moduleId: module.id,
    selector: 'patiq-user-list',
    templateUrl: './user-list.component.html',
    styleUrls: ['./user-list.component.css']
})
/// <summary>
/// This class creates user List
/// </summary>
export class UserListComponent {

    // To store user list data
    private userListData: UserInfoModel[];

    //Text for add user button on user-list component
    private addUserButtonText: string;
    private userListHeaderText: string;

    // To toggle Search Form
    private userListGridOptions: GridOptions;
    constructor(private route: ActivatedRoute, private router: Router, private manageUsersService: ManageUsersService, private getConfig: GetConfigService) {

        //get text from app.json.config
        this.addUserButtonText = this.getConfig.getResx('adduserButtonTextUserList');
        this.userListHeaderText = this.getConfig.getResx('userListHeaderText');

        // To display users data in a grid and provide column definition
        this.userListGridOptions = {
            columnDefs: this.createColumnDefs()
        };
        // Assigning data to the user’s grid 
        this.setRowdata();
    }
    /// <summary>
    /// Column Definitions
    /// </summary>
    private createColumnDefs() {
        let gridHeaders = this.getConfig.getResx('UserListHeaders');
        return [
            {
                headerName: gridHeaders.Name,
                field: "Name",
                width: 150,
                hide: true,
            },
            {
                headerName: gridHeaders.UserName,
                field: "UserName",
                width: 150,
            },
            {
                headerName: gridHeaders.UserDescription,
                field: "UserDescription",
                width: 300,
            },
            {
                headerName: gridHeaders.Edit,
                field: "Edit",
                width: 50,
                cellRendererFramework: UserListCellEditComponent,
                suppressSorting: true,

            },
            {
                headerName: gridHeaders.HostSystem,
                field: "HostSystem",
                width: 50,
                hide: true,
            },
            {
                headerName: gridHeaders.HostRole,
                field: "HostRole",
                width: 50,
                hide: true,
            },
            {
                headerName: gridHeaders.Permissions,
                field: "Permissions",
                width: 50,
                hide: true,

            },
            {
                headerName: gridHeaders.Password,
                field: "Password",
                width: 0,
                hide: true,

            },
        ];
    }
    /// <summary>
    /// Row data for Grid
    /// </summary>
    private setRowdata() {
        //call service to get user list 
        this.manageUsersService.getUserList()
            .subscribe((data: UserInfoModel[]) => this.userListData = data,
            error => console.log(error),
            () => {
                return this.userListData;
            });
    }

    ///<summary>
    ///Navigates to manage user component
    ///</summary>
    private goToAddUser() {
        let navigationExtras: NavigationExtras = { queryParams: { "Action": 'add user' } }
        this.router.navigate(["/manage-user"], navigationExtras);
    }
}

