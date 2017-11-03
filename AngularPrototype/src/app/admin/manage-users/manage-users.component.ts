import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, NavigationExtras } from '@angular/router';
import { FormGroup, FormControl, FormBuilder, NgControl, ValidatorFn, AbstractControl } from '@angular/forms';
import { MdSnackBar } from '@angular/material';
import { Location } from '@angular/common';

import { LoginService } from '../../services/login.service';
import { HostInfoModel, HostRole, HostSystem } from '../../models/host-info.model';
import { ManageUsersService } from '../../services/manage-users.service';
import { PassDataService } from '../../services/pass-data.service';

import { GetConfigService } from '../../services/get-config.service';
import { ModalDialogService } from '../../shared/modal-dialog/modal-dialog.service';

@Component({
    moduleId: module.id,
    selector: 'patiq-manage-users',
    templateUrl: './manage-users.component.html',
    styleUrls: ['./manage-users.component.css']
})
/// <summary>
/// This class creates manage users form
/// </summary>
export class ManageUsersComponent {
    // public properties
    // To store list of host systems
    hostSystems: Array<HostSystem>;
    // To store list of host roles
    hostRoles: Array<HostRole>;
    // To store Host Information
    hostInfo: HostInfoModel;
    // To store the response message from the service(success or failure message)
    public updateUserResponse: string;

    // Private Members
    private editUsersForm: FormGroup;
    private isUpdateDisable: boolean = true;

    // Flag to find the form has dirty data or not, Its declared in IUnsavedChanges interface
    hasUnsavedChanges = false;
    // Message to display if there is unsaved data
    unsavedChangesMessage: string;

    // Text for add/update button
    public addOrUpdateButtonText: string;

    // Flag for edit or add users
    private editMode: boolean;

    // Action to be perfomed,this will come from query params in url
    private actionFromUrl: string;

    // Text for the manage users header
    private manageUserHeaderText: string;
    // Button text for the form
    private addUpdateButtonText: string;
    // Message to be displayed on snackbar when user gets added
    private userAddedMessage: string;
    private updateAction: string;
    // Get add action from query params
    private addAction: string;

    nameMandatory: string;
    usernameMandatory: string;
    userPermission: string;
    suppressedResults: string;
    sensitiveData: string;
    cancelButtonText: string;
    userUpdateFailed: string;

    // Get selected user,this comes from user list component
    private selectedUser: any;

    constructor(private passDataService: PassDataService, private route: ActivatedRoute,
        private router: Router, public snackBar: MdSnackBar, formBuilder: FormBuilder,
        private dataService: ManageUsersService, private getConfig: GetConfigService,
        private location: Location, private loginService: LoginService,
        private modalDialogService: ModalDialogService) {
        // Edit form group
        this.editUsersForm = formBuilder.group({
            'UserId': new FormControl(),
            'permissions': new FormControl(),
            'name': new FormControl(),
            'username': new FormControl(),
            'userDescription': new FormControl(),
            'selectedHostSystem': new FormControl(),
            'selectedHostRole': new FormControl(),
            'selectSuppressResults': new FormControl(false),
            'selectSensitiveData': new FormControl(false),
        });

        // Get action from query params
        this.actionFromUrl = route.snapshot.queryParams['Action'];

        if (this.actionFromUrl == this.updateAction) {
            this.selectedUser = this.passDataService.getUserInfo();
        }

        // Get Texts from Config - Starts here
        this.unsavedChangesMessage = this.getConfig.getResx('UnsavedChangesMessage');
        this.nameMandatory = this.getConfig.getResx('NameMandatory');
        this.usernameMandatory = this.getConfig.getResx('UsernameMandatory');
        this.userPermission = this.getConfig.getResx('UserPermission');
        this.suppressedResults = this.getConfig.getResx('SuppressedResults');
        this.sensitiveData = this.getConfig.getResx('SensitiveData');
        this.cancelButtonText = this.getConfig.getResx('CancelButtonText');
        this.userUpdateFailed = this.getConfig.getResx('UserUpdateFailed');
        this.userAddedMessage = this.getConfig.getResx('userAddedMessage');
        this.updateAction = this.getConfig.getResx('updateAction');
        this.addAction = this.getConfig.getResx('addAction');
        // Get Host Information
        this.getHostInfo();
        // Get Texts from Config - Ends here
    }

    ngOnInit() {
        // Get selected user
        this.selectedUser = this.passDataService.getUserInfo();
        // Get action from query params
        this.actionFromUrl = this.route.snapshot.queryParams['Action'];

        // Display the add or update form based on values in url & selected user
        if (this.actionFromUrl == this.updateAction && this.selectedUser !== undefined) {
            // Set header and add/update button text for the view/page
            this.addOrUpdateButtonText = this.getConfig.getResx('Update');
            this.manageUserHeaderText = this.getConfig.getResx('UpdateUserTitle');

            let selectedUser = this.passDataService.getUserInfo();
            this.editUsersForm.get('name').setValue(selectedUser.Name);
            this.editUsersForm.get('permissions').setValue(selectedUser.Permissions),
                this.editUsersForm.get('UserId').setValue(selectedUser.UserId),
                this.editUsersForm.get('username').setValue(selectedUser.UserName),
                this.editUsersForm.get('userDescription').setValue(selectedUser.UserDescription),
                this.editUsersForm.get('selectedHostSystem').setValue(selectedUser.HostSystem),
                this.editUsersForm.get('selectedHostRole').setValue(selectedUser.HostRole);
        }
        else if (this.actionFromUrl == this.addAction) {
            this.addOrUpdateButtonText = this.getConfig.getResx('addUserButtonText');
            this.manageUserHeaderText = this.getConfig.getResx('addUserHeaderText');
        }
        // Kick the user back to user list component on refresh
        else { this.location.back(); }
        // Subscribing form value changes
        this.editUsersForm.valueChanges.subscribe(values => {
            // Enable/Disable update button
            if (this.editUsersForm.valid) {
                this.isUpdateDisable = false;
            } else {
                this.isUpdateDisable = true;
            }

            if ((this.editUsersForm.get('name').value ||
                this.editUsersForm.get('username').value ||
                this.editUsersForm.get('userDescription').value ||
                this.editUsersForm.get('selectedHostSystem').value ||
                this.editUsersForm.get('selectedHostRole')) && this.editUsersForm.dirty) {
                this.hasUnsavedChanges = true;
            }
            else {
                this.hasUnsavedChanges = false;
            }
        });
    }

    /// private methods
    /// <summary>
    /// Method to get Host Information
    /// </summary>
    private getHostInfo = function () {
        this.loginService.getHostInfoData()
            .subscribe((data: HostInfoModel) => {
                this.hostInfo = data;
                this.hostSystems = data.HostSystems;
                // To set host system and host role
                this.setHostandRoles();
            }),
            (error: any) => {
                if (!error.ok) {
                    this.loginFormErrorMessage = error.json().Message;
                }
            };
    }

    /// <summary>
    /// This event is to watch the changes for select Host systems and roles list
    /// </summary>
    private changeHostdata() {
        this.setHostandRoles();
    }

    /// <summary>
    /// Method to set host systems and host roles for the user
    /// </summary>
    private setHostandRoles() {
        // Set host roles based on host system
        if (this.editUsersForm.get('selectedHostSystem').value !== this.hostSystems[1].Name) {
            this.hostRoles = JSON.parse(JSON.stringify(this.hostInfo.HostRoles.slice(0, 3)));
        }
        else {
            this.hostRoles = this.hostInfo.HostRoles;
        }
        // Set permissions based on host role
        if (this.editUsersForm.get('selectedHostRole').value === this.hostRoles[2].Role) {
            this.editUsersForm.get('selectSuppressResults').setValue(true);
            this.editUsersForm.get('selectSensitiveData').setValue(true);
        }
        else {
            this.editUsersForm.get('selectSuppressResults').setValue(false);
            this.editUsersForm.get('selectSensitiveData').setValue(false);
        }
    }

    /// <summary>
    /// This method updates user information and redirects to admin page (User-list)
    /// </summary>

    private addUpdateUser() {
        let inputValue = {
            'UserId': this.editUsersForm.get('UserId').value,
            'name': this.editUsersForm.get('name').value || undefined,
            'username': this.editUsersForm.get('username').value || undefined,
            'userDescription': this.editUsersForm.get('userDescription').value || undefined,
            'hostSystem': this.editUsersForm.get('selectedHostSystem').value || undefined,
            'hostRole': this.editUsersForm.get('selectedHostRole').value || undefined,
            'permissions': this.editUsersForm.get('permissions').value,
        };
        if (this.actionFromUrl == this.updateAction) {
            setTimeout(() => {
                // Service call to update the user list
                this.dataService
                    .updateUserList(inputValue)
                    .subscribe((data: string) => this.updateUserResponse = data,
                    (error: any) => {
                        if (!error.ok) {
                            // Display a message box at the bottom of the Result page
                            this.snackBar.open(this.userUpdateFailed + error.json().Message, '', {
                                duration: 5000,
                            });
                        }
                    },
                    () => {
                        // Display a message box at the bottom of the user-list page with updated user name
                        this.snackBar.open(this.editUsersForm.get('username').value + ' ' + this.updateUserResponse, '', {
                            duration: 5000,
                        });

                        // Reset form dirty once its updated user data
                        this.hasUnsavedChanges = false;
                        this.router.navigate(['/admin']);
                    });
            }, 1000);
        }
        else {
            this.snackBar.open(this.userAddedMessage, '', {
                duration: 5000,
            });
            // Reset form dirty once its added user data
            this.hasUnsavedChanges = false;
            this.router.navigate(['/admin']);
        }
    }
    /// <summary>
    /// Method to cancel the update
    /// </summary>
    private cancel() {
        this.router.navigate(['/admin']);
    }
}
