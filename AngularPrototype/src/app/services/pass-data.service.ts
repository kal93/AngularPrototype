import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import { Subject } from 'rxjs/Rx';

@Injectable()
/// <summary>
/// This class is used to pass data from one component to another component
/// </summary>
export class PassDataService {
    private notify = new Subject<any>();

    //store user data
    private user: any;

    //store search data
    private searchData: any;

    notifyObservable$ = this.notify.asObservable();

    //Method to set UnsavedChanges
    public passUnsavedChangesFlag(data: boolean) {
        this.notify.next(data);
    }

    //this set & get is used by manage users
    public setUserInfo(user: any) { this.user = user; }

    public getUserInfo() { return this.user; }

    //this set is used by search & patient list component
    public setSearchData(searchData: any) { this.searchData = searchData }

    //this get is used by search & patient list component
    public getSearchData() { return this.searchData; }

    
}