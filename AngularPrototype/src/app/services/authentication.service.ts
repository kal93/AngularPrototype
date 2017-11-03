import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import { GetConfigService } from './get-config.service';
import { HttpService } from './http.service';

@Injectable()
/// <summary>
/// This class is used for authenticating user
/// </summary>
export class AuthenticationService {
    //Holds Web API service link to authenticate the logging in user
    private authenticateUserLink: string;
    private getUseRolePermissionsLink: string;
    constructor(private http: HttpService, getConfig: GetConfigService) {
        //Get Web API service link to authenticate the logging in user
        this.authenticateUserLink = getConfig.get('AuthenticateUserLink');
        this.getUseRolePermissionsLink = getConfig.get('UseRolePermissionsLink');
    }
    /// <summary>
    /// This class is used to call authenticate WEB API
    /// </summary>
    public authenticateUser(body: any) {
        //Call webApi Service with input value(body) 
        return this.http.post(this.authenticateUserLink, body)
            .map(data => data.json());
    };
    // Setting user permissions  
    public setUserPermissions(permissions: any) {
        sessionStorage.setItem('permissions', permissions);
    }
    // Retrieving user permissions 
    public getUserPermissions() {
        return sessionStorage.getItem('permissions');
    }

}
