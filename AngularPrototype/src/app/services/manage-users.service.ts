import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import { UserInfoModel } from '../models/user-info.model';
import { GetConfigService } from './get-config.service';
import { HttpService } from './http.service';

@Injectable()
/// <summary>
/// This class is used to define service call to update user data
/// </summary>
export class ManageUsersService {
    //Holds Web API service Link to update user list
    private userListServiceLink: string;

    constructor(private http: HttpService, getConfig: GetConfigService) {
        //Get Web API service Link to update user list
        this.userListServiceLink = getConfig.get('UserListServiceLink');
    }

    /// <summary>
    /// updateUser service
    /// </summary>
    public updateUserList = (body: any): Observable<any> => {
        //Call webApi Service with input value(options) and header
        return this.http.put(this.userListServiceLink, body)
            .map(data => data.json());
    };

    /// <summary>
    /// Get User List service
    /// </summary>
    public getUserList = (): Observable<UserInfoModel[]> => {
        //Call webApi Service to get User list
        return this.http.get(this.userListServiceLink)
            .map((data) => data.json());
    }
}
