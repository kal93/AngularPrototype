import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import { HostInfoModel } from '../models/host-info.model';
import { GetConfigService } from './get-config.service';
import { HttpService } from './http.service';

@Injectable()
/// <summary>
/// This class is used to get Host Information
/// </summary>
export class LoginService {
    //Holds Web API service link to get Host information
    private getHostInfoLink: string;

    constructor(private http: HttpService, getConfig: GetConfigService) {
        //Get Web API service link to get to get Host information
        this.getHostInfoLink = getConfig.get('GetHostInfoLink');
    }
    /// <summary>
    /// Gets host information
    /// </summary>
    public getHostInfoData = (): Observable<HostInfoModel> => {
        return this.http.get(this.getHostInfoLink)
            .map((data) => data.json());
    }
}
