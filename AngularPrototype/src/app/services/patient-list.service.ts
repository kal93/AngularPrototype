import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import { DemographicModel } from '../models/patient-demographic.model';
import { AccessionBannerModel } from '../models/accession-banner.model';
import { TestResultsModel } from '../models/test-result.model';
import { SelectedPatientModel } from '../models/selected-patient.model';
import { GetConfigService } from './get-config.service';
import { HttpService } from './http.service';

@Injectable()
/// <summary>
/// This class is used to define service call to get PatientList and Result data
/// </summary>
export class PatientListService {
    //Holds Web API service Link to get patient list
    private getPatientListServiceLink: string;
    //Holds Web API Service Link to get patient test results
    private getPatientResultServiceLink: string;
    //Holds Web API service Link to update patient test results
    private updateResultServiceLink: string;

    constructor(private http: HttpService, getConfig: GetConfigService) {
        //Get Web API service Link to get patient list
        this.getPatientListServiceLink = getConfig.get('GetPatientListServiceLink');
        //Get Web API service Link to get patient test results
        this.getPatientResultServiceLink = getConfig.get('GetPatientResultServiceLink');
        //Get Web API service Link to update patient test results
        this.updateResultServiceLink = getConfig.get('UpdateResultServiceLink');
    }

    /// <summary>
    /// getPatientList service
    /// </summary>
    public getPatientList = (body: any): Observable<DemographicModel[]> => {

        //let urlSearchParams = new URLSearchParams();
        //urlSearchParams.append('body', body);
        
        //let body1 = urlSearchParams.toString()
        //Call WebAPI service to get list of patient for the given search criteria
        return this.http.post(this.getPatientListServiceLink, body)
            .map(data => data.json());
    };

    /// <summary>
    /// getPatientResults service
    /// </summary>
    public getPatientResults = (selectedPatientIds: SelectedPatientModel): Observable<AccessionBannerModel[]> => {
        //Pass selected PatientIDs through body
        let body = JSON.stringify(selectedPatientIds.PatientIDs);
        
        //Call webApi Service with input value(body)
        return this.http.post(this.getPatientResultServiceLink, body)
            .map(data => data.json());
    };

    /// <summary>
    /// updateResults service
    /// </summary>
    public updateResults = (body: AccessionBannerModel[]): Observable<any> => {
        //Call webApi Service with input value(options)
        return this.http.put(this.updateResultServiceLink, body)
            .map(data => data.json());
    };
}