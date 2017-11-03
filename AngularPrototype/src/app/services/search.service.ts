import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import { UserSettingsModel } from '../models/user-settings.model';
import { GetConfigService } from './get-config.service';
import { HttpService } from './http.service';
import { AjaxHeaderService } from '../services/ajax-header.service';


@Injectable()
/// <summary>
/// This class is used to get data from services related to Search page
/// </summary>
export class SearchService {
    //Holds Web API service link to get HID list and Date format for the logged in user
    private getUserSettingsLink: string;

    constructor(private http: HttpService, getConfig: GetConfigService, private ajaxService: AjaxHeaderService) {
        //Get Web API service link to get HID list and Date format for the logged in user
        this.getUserSettingsLink = getConfig.get('GetUserSettingsLink');
    }
    /// <summary>
    /// Gets user configuration data
    /// </summary>
    public getUserSettingsData = (userName: string): Observable<UserSettingsModel> => {
        //Pass Username in body 
        let body = JSON.stringify(userName);
        
        //to store response from ajax call
        let response: any;
        let ajaxCall = this.ajaxService.$ajax(this.getUserSettingsLink, body, 'POST',
            function successCall(data: UserSettingsModel) {
                response = data;
                console.log('Inside success call back' + JSON.stringify(response));
            });
        
        return response;
    }
   
}
