import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { UsersComponent } from './component/users/users.component';
import { NgModel } from '../../node_modules/@angular/forms';

const appRoutes: Routes = [
  {
    path: 'emails',
    component: UsersComponent
  }
];

@NgModule({
    imports: [
        RouterModule.forRoot(
            appRoutes
        )
    ],
    exports: [
        RouterModule
    ]
})

export class AppRoutingModule {

}
