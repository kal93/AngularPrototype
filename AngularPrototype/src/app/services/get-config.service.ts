import { Injectable } from '@angular/core';
import { HttpService } from './http.service';

@Injectable()
/// <summary>
/// This class is used to get Config values from config.json files
/// </summary>
export class GetConfigService {
    // Get the locale id from the global
    private locale: string = document['locale'] as string;
    private config: object = null;
    private resx : object = null;
    private appConfigPath: string;
    private resxPath: string;

    constructor(private http: HttpService) {
        this.locale = this.locale === "es" || this.locale === "tr" ? this.locale : "en";
        this.appConfigPath = `src/assets/app.config.json`;
        this.resxPath = `src/assets/app.resx.${this.locale}.json`;
    }

    //Return value of the given key
    public get(key: any) {
        return this.config[key];
    }
    //Return value of the given key
    public getResx(key: any) {
        return this.resx[key];
    }
    

    //Loads all the configuration from config.json file.
    public loadConfig() {
        let promise = this.http.get(this.appConfigPath).map(res => res.json()).toPromise();
        promise.then(config => this.config = config);
        return promise;
    };

    //Loads all the resx strings from resx.json file.
    public loadResx() {
        let promise = this.http.get(this.resxPath).map(resx => resx.json()).toPromise();
        promise.then(resx => this.resx = resx);
        return promise;
    };
}