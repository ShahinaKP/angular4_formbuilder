import { AppComponent } from './app.component';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { BrowserModule } from '@angular/platform-browser';
import { LoginComponent } from './components/login/login.component';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { FormBuilderComponent } from './components/formbuilder/formbuilder.component';
import { FormsModule } from '@angular/forms';
import { AngularFireModule } from 'angularfire2';
import { AngularFireAuth } from 'angularfire2/auth';
import { ReturnSetInfoDataService } from './components/dashboard/dashboard.service';
import { HttpModule } from '@angular/http';

import { Ng4LoadingSpinnerModule } from 'ng4-loading-spinner'; 

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { MyCalendarModule } from './components/calendar/calendar.module';


import { DemoUtilsModule } from './components/calendar/demo-utils/module';

import 'jquery-ui-sortable';

export const environment = {
    production: false,
    firebase: {
        apiKey: "AIzaSyAueWsWmDMxI8grHw9nt1vwX78nhUOZ5P4",
        authDomain: "bug-tracker-app.firebaseapp.com",
        databaseURL: "https://bug-tracker-app.firebaseio.com",
        projectId: "bug-tracker-app",
        storageBucket: "bug-tracker-app.appspot.com",
        messagingSenderId: "46954325452"
    }
};

@NgModule({
    imports: [
        BrowserModule,
        AppRoutingModule,
        FormsModule,
        AngularFireModule.initializeApp(environment.firebase),
        HttpModule,
        MyCalendarModule,
        DemoUtilsModule,
        Ng4LoadingSpinnerModule,
        NgbModule.forRoot()
    ],
    declarations: [
        AppComponent,
        LoginComponent,
        DashboardComponent,
        HeaderComponent,
        FooterComponent,
        FormBuilderComponent
    ],
    providers: [ ReturnSetInfoDataService, AngularFireAuth ],
    bootstrap: [AppComponent]
})

export class AppModule { }