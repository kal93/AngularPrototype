import { Component } from '@angular/core';

@Component({
    moduleId: module.id,
    selector: 'app-spinner',
    template: `<md-spinner class="loading">Loading Spinner..</md-spinner>`,
    styleUrls: ['./spinner.component.css']
})
///<summary>
///This class displays indeterminate progress spinner
///</summary>
export class SpinnerComponent { }
