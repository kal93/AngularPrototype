import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

@Injectable()
/// <summary>
/// This class is used to pass data from one component to another component
/// </summary>
export class PersistDataService {

    //store user data
    private data: any;

    //this set & get is used by search & patient list component
    public setData(data: any) { this.data = data;}

    public getData() { return this.data;}

}