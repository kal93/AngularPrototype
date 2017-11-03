import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, NavigationExtras } from '@angular/router';
import { FormGroup, FormControl, FormBuilder, NgControl, ValidatorFn, AbstractControl } from '@angular/forms';
import { LoginService } from '../services/login.service';
import { HostInfoModel, HostRole, HostSystem } from '../models/host-info.model';
import { AuthenticationService } from '../services/authentication.service';
import { GetConfigService } from '../services/get-config.service';

@Component({
    moduleId: module.id,
    selector: 'patiq-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
    // public properties
    // To store list of host systems
    hostSystems: Array<HostSystem>;
    // To store list of host roles
    hostRoles: Array<HostRole>;
    // Flag to show/hide loading spinner inside the button
    isLoginShowActionIcon = false;
    // Title of the page
    applicationName: string;
    usernameRequired: string;
    // Login and Clear Button text
    loginButtonText: string;
    clearButtonText: string;
    // To store Host Information
    hostInfo: HostInfoModel;

    // Private Members
    private loginForm: FormGroup;
    // Error Message
    private loginFormErrorMessage: string;
    private authResponse: any;
    private isClearDisable: boolean;
    private isLoginDisable: boolean;
    private companyImage: string;
    constructor(private route: ActivatedRoute, private router: Router,
        private formBuilder: FormBuilder, private authenticationService: AuthenticationService,
        private getConfig: GetConfigService, private loginService: LoginService) {
        this.loginForm = this.formBuilder.group({
            'username': new FormControl(),
            'password': new FormControl(),
            'hostSystem': new FormControl(),
            'hostRole': new FormControl(),
        });
        this.companyImage = 'src/assets/images/Sunquest-logo-RGB.jpg';
        // Get Texts from Config - Starts here
       
        this.applicationName = this.getConfig.getResx('ApplicationName');
        this.usernameRequired = this.getConfig.getResx('UsernameRequired');
        this.loginButtonText = this.getConfig.getResx('LoginButtonText');
        this.clearButtonText = this.getConfig.getResx('ClearButtonText');
        // Get Host Information
        this.getHostInfo();
        // Get Texts from Config - Ends here
    }
    ngOnInit() {

        // Subscribing form value changes
        this.loginForm.valueChanges.subscribe(values => {
            // Enable/Disable update and clear button
            if (this.loginForm.valid) {
                this.isLoginDisable = false;
                this.isClearDisable = false;
            } else {
                this.isLoginDisable = true;
                this.isClearDisable = false;
            }
        });
    }
    // private methods
    /// <summary>
    /// Service call to get Host Information
    /// </summary>
    private getHostInfo = function () {
        this.loginService.getHostInfoData()
            .subscribe((data: HostInfoModel) => {
                this.hostInfo = data;
                this.hostSystems = data.HostSystems;
                this.setHostandRoles();
            }),
            (error: any) => {
                if (!error.ok) {
                    this.loginFormErrorMessage = error.json().Message;
                }
            };
    }
    /// <summary>
    /// Method to set host systems and host roles for the user 
    /// </summary>
    private setHostandRoles() {
        // Set host roles based on host system
        if (this.loginForm.get('hostSystem').value !== this.hostSystems[1].Name) {
            this.hostRoles = JSON.parse(JSON.stringify(this.hostInfo.HostRoles.slice(0, 3)));
        }
        else {
            this.hostRoles = this.hostInfo.HostRoles;
        }
    }
    /// <summary>
    /// Method to reset the values of Login form
    /// </summary>
    private clear() {
        this.loginForm.reset({
            'username': null,
            'password': null,
            'hostSystem': null,
            'hostRole': null,
        });
        this.isClearDisable = true;
        this.loginFormErrorMessage = '';
    }
    /// <summary>
    /// This event is to login to application
    /// </summary>
    private login(): void {
        this.isLoginShowActionIcon = true;
        // Input data to the Service
        let inputValue = {
            'UserName': this.loginForm.get('username').value || undefined,
            'Password': this.loginForm.get('password').value || undefined,
            'HostSystem': this.loginForm.get('hostSystem').value || undefined,
            'HostRole': this.loginForm.get('hostRole').value || undefined,
        };
        setTimeout(() => {
            this.authenticationService.authenticateUser(inputValue)
                .subscribe(
                ((data: JSON) => {
                    this.authResponse = data;
                    // Storing user permissions 
                    this.authenticationService.setUserPermissions(this.authResponse.Permissions);
                }),
                (error: any) => {
                    if (!error.ok) {
                        this.loginFormErrorMessage = this.getConfig.getResx('LoginFailed');
                        this.isLoginShowActionIcon = false;
                    }
                }, () => {
                    if (this.authResponse.token) {
                        // Adding Values to Session to access across the application 
                        // (as this is a simple data we are using session storage instead of a service)
                        sessionStorage.setItem('username', this.loginForm.get('username').value);
                        sessionStorage.setItem('hostSystem', this.loginForm.get('hostSystem').value);
                        sessionStorage.setItem('AuthenticationToken', this.authResponse.token);
                        this.router.navigate(['/search']);
                    }
                    else {
                        this.isLoginShowActionIcon = false;
                        this.loginFormErrorMessage = this.getConfig.getResx('IncorrectCredentials');
                    }
                });
        }, 1000);
    }
}
