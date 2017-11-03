import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LoginComponent } from './login/login.component';
import { SearchComponent } from './search/search.component';
import { PatientListComponent } from './search/patient-list.component';
import { ResultsComponent } from './results/results.component';
import { UserListComponent } from './admin/user-list/user-list.component';
import { ManageUsersComponent } from './admin/manage-users/manage-users.component';
import { PreventUnsavedChanges } from './shared/unsaved-changes/prevent-unsaved-changes-handler';

const routes: Routes = [
    // Default route
    {
        path: '',
        pathMatch: 'full',
        redirectTo: 'login'
    },
    // Login page route
    {
        path: 'login',
        component: LoginComponent
    },
    // Search page route
    {
        path: 'search',
        component: SearchComponent,
    },
    // Results page route
    {
        path: 'results',
        component: ResultsComponent,
        canDeactivate: [PreventUnsavedChanges]
    },
    // Admin users page route
    {
        path: 'admin',
        component: UserListComponent,
    },
    // Admin manage/update users page route 
    {
        path: 'manage-user',
        component: ManageUsersComponent,
        canDeactivate: [PreventUnsavedChanges],
    }
];


@NgModule({
    imports: [RouterModule.forRoot(routes, { useHash: true })],
    exports: [RouterModule]
})
export class AppRoutingModule { }
