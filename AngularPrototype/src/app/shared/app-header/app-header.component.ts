import { Component, Input, Output, EventEmitter } from '@angular/core';
import { AppHeaderSettingsModel } from './app-header-settings.model';

@Component({
    moduleId: module.id,
    selector: 'sq-app-header',
    templateUrl: './app-header.component.html',
    styleUrls: ['./app-header.component.css', './app-header.component.desktop.css', './app-header.component.mobile.css']
})

/// <summary>
/// This class creates App Header
/// </summary>
export class AppHeaderComponent {
    // Header Component Settings
    @Input() headerSettings: AppHeaderSettingsModel;
    @Output() menuItemClick: EventEmitter<string> = new EventEmitter<string>();

    // Handler for menu item click
    onClickHandler(menuItem: string) {
        this.menuItemClick.emit(menuItem);
    }
}