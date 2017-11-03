import { NativeDateAdapter } from '@angular/material';

/** Adapts the native JS Date for use with cdk-based components that work with dates. */
export class CustomDateAdapter extends NativeDateAdapter {
    locale: string;
    constructor() {
        super();
        this.locale = document['locale'] as string;
    }

    ///<summary>
    /// This method parses the date from input component as it only expect dates in 
    /// mm-dd-yyyy format
    ///</summary>
    parse(value: any): Date | null {
        if ((typeof value === 'string') && (value.indexOf('/') > -1)) {
            let str = value.split('/');

            const year = Number(str[2]);
            let month = Number(str[1]) - 1;
            let date = Number(str[0]);
            if (this.locale == 'es') {

                return new Date(year, month, date);
            }
            else if (this.locale == 'tr') {
                //const year = Number(str[2]);
                //let month = Number(str[0]) - 1;
                //let date = Number(str[1]);
                return new Date(year, month, date);
            }
            else {
                const year = Number(str[2]);
                let month = Number(str[0]) - 1;
                let date = Number(str[1]);
                return new Date(year, month, date);
            }
        }
        const timestamp = typeof value === 'number' ? value : Date.parse(value);
        return isNaN(timestamp) ? null : new Date(timestamp);
    }

    getFirstDayOfWeek(): number {
        return 2;
    }

}