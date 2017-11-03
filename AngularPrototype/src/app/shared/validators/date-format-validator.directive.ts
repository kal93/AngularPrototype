import { Directive, forwardRef, Input } from '@angular/core';
import { NG_VALIDATORS, Validator, AbstractControl } from '@angular/forms';
import * as moment from 'moment/moment';

@Directive({
    selector: '[validateDateFormat][ngModel],[validateDateFormat][formControl],[validateDateFormat][formControlName]',
    providers: [
        { provide: NG_VALIDATORS, useExisting: forwardRef(() => DateFormatValidatorDirective), multi: true }
    ]
})
///<summary>
/// Custom Date Format Validator
///</summary>
export class DateFormatValidatorDirective implements Validator {
    @Input('validateDateFormat') dateFormat: string;

    validate(dobControl: AbstractControl): { [key: string]: boolean } | null {
        const dobValue = dobControl.value;
        const isValid = moment(dobValue, this.dateFormat).isValid();
        return dobControl.touched && !isValid ? { 'invalid': true } : null;
    }
}
