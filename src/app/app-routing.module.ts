import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { LoginComponent }      from './components/login/login.component';
import { DashboardComponent }   from './components/dashboard/dashboard.component';
import { CalendarComponent }   from './components/calendar/calendar.component';
import { FormBuilderComponent }   from './components/formbuilder/formbuilder.component';

const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login',  component: LoginComponent },
  { path: 'dashboard',  component: DashboardComponent },
  { path: 'calendar',  component: CalendarComponent },
  { path: 'form-builder',  component: FormBuilderComponent }
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {}