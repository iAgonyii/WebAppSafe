import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
import { HomeScanComponent } from './components/home-scan/home-scan.component';
import { AppRoutingModule } from './app-routing.module';
import { NZ_I18N } from 'ng-zorro-antd/i18n';
import { en_US } from 'ng-zorro-antd/i18n';
import { registerLocaleData } from '@angular/common';
import en from '@angular/common/locales/en';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {NzLayoutModule} from "ng-zorro-antd/layout";
import {NzBreadCrumbModule} from "ng-zorro-antd/breadcrumb";
import {NzMenuModule} from "ng-zorro-antd/menu";
import {NzIconModule} from "ng-zorro-antd/icon";
import { IconDefinition } from '@ant-design/icons-angular';

import { GlobalOutline, LinkOutline, CaretRightOutline } from '@ant-design/icons-angular/icons';
import {NzFormModule} from "ng-zorro-antd/form";
import {NzInputModule} from "ng-zorro-antd/input";
import {NzButtonModule} from "ng-zorro-antd/button";
import {NzCheckboxModule} from "ng-zorro-antd/checkbox";
import {NzModalModule} from "ng-zorro-antd/modal";
import {NzNotificationServiceModule} from "ng-zorro-antd/notification";
import { ReportComponent } from './components/report/report.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import {AngularFireAuthModule} from "@angular/fire/auth";
import {AngularFireModule} from "@angular/fire";
import { ProfileComponent } from './components/profile/profile.component';
import {AuthInterceptor} from "./services/AuthInterceptor";
import {AuthGuard} from "./services/AuthGuard";
import { AdminComponent } from './components/admin/admin.component';
import {AdminGuard} from "./services/AdminGuard";
import {NzPageHeaderModule} from "ng-zorro-antd/page-header";
import {NzTagModule} from "ng-zorro-antd/tag";
import {NzStatisticModule} from "ng-zorro-antd/statistic";
import {NzCollapseModule} from "ng-zorro-antd/collapse";

const icons: IconDefinition[] = [ GlobalOutline, LinkOutline, CaretRightOutline];

registerLocaleData(en);

const firebaseConfig = {
  apiKey: "AIzaSyA61cz2uZ8pDV3ig7QKOM3la7xxdl5KjMA",
  authDomain: "webappsafe.firebaseapp.com",
  projectId: "webappsafe",
  storageBucket: "webappsafe.appspot.com",
  messagingSenderId: "203563566503",
  appId: "1:203563566503:web:0ea786b3c7483db3dc6282",
  measurementId: "G-GVDL45XGHS"
};

@NgModule({
  declarations: [
    AppComponent,
    HomeScanComponent,
    ReportComponent,
    LoginComponent,
    RegisterComponent,
    ProfileComponent,
    AdminComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    FormsModule,
    BrowserAnimationsModule,
    NzIconModule.forRoot(icons),
    NzLayoutModule,
    NzBreadCrumbModule,
    NzMenuModule,
    NzIconModule,
    NzFormModule,
    ReactiveFormsModule,
    NzInputModule,
    NzButtonModule,
    NzCheckboxModule,
    NzModalModule,
    NzNotificationServiceModule,
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFireAuthModule,
    NzPageHeaderModule,
    NzTagModule,
    NzStatisticModule,
    NzCollapseModule
  ],
  providers: [{ provide: NZ_I18N, useValue: en_US }, { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true }, AuthGuard, AdminGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
