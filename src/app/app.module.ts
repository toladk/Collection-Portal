import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { LoginComponent } from './components/login/login.component';
import { SignupComponent } from './components/signup/signup.component';
import { ProfileComponent } from './components/profile/profile.component';
import { RequestResetComponent } from './components/password/request-reset/request-reset.component';
import { ResponseResetComponent } from './components/password/response-reset/response-reset.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import {NgPipesModule} from 'ngx-pipes';
import { UseErrorInterceptor } from './Services/error.interceptor';
import { DatePipe } from '@angular/common';

import { ExportAsModule } from 'ngx-export-as';
import { NgxPrintModule } from 'ngx-print';

// Loader
import { NgxUiLoaderModule } from 'ngx-ui-loader';


 // ANT JS;
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { NzMenuModule } from 'ng-zorro-antd/menu';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NZ_I18N } from 'ng-zorro-antd/i18n';
import { en_US } from 'ng-zorro-antd/i18n';
import { registerLocaleData } from '@angular/common';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzMessageModule } from 'ng-zorro-antd/message';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzToolTipModule } from 'ng-zorro-antd/tooltip';
import { NzTabsModule } from 'ng-zorro-antd/tabs';
import { NzTableModule } from 'ng-zorro-antd/table';
import { NzDrawerModule } from 'ng-zorro-antd/drawer';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { NzDatePickerModule } from 'ng-zorro-antd/date-picker';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzStepsModule } from 'ng-zorro-antd/steps';
import { NzListModule } from 'ng-zorro-antd/list';
import { NzResultModule } from 'ng-zorro-antd/result';
import { NzPopconfirmModule } from 'ng-zorro-antd/popconfirm';
import { NzNotificationModule } from 'ng-zorro-antd/notification';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { NzUploadModule } from 'ng-zorro-antd/upload';
import { NzInputNumberModule } from 'ng-zorro-antd/input-number';
import { NzSkeletonModule } from 'ng-zorro-antd/skeleton';
import { NzBadgeModule } from 'ng-zorro-antd/badge';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { NzCollapseModule } from 'ng-zorro-antd/collapse';
import { NzPaginationModule } from 'ng-zorro-antd/pagination';
import { NzSpinModule } from 'ng-zorro-antd/spin';


import { Ng2OrderModule } from 'ng2-order-pipe';
import {NgxPaginationModule} from 'ngx-pagination';

import { GridModule, SearchService, ToolbarService } from '@syncfusion/ej2-angular-grids';
import { GeneralDashboardComponent } from './components/general-dashboard/general-dashboard.component';
import { DashboardComponent } from './Apps/dashboard/dashboard.component';
import { GeneralNavbarComponent } from './components/general-navbar/general-navbar.component';

import { InfinityAddTellerComponent } from './Apps/Infinitypay/teller/infinity-add-teller/infinity-add-teller.component';
import { InfinityManageTellerComponent } from './Apps/Infinitypay/teller/infinity-manage-teller/infinity-manage-teller.component';
import { InfinityAllTransactionsComponent } from './Apps/Infinitypay/transactions/infinity-all-transactions/infinity-all-transactions.component';
import { InfinityValidateTransactionsComponent } from './Apps/Infinitypay/transactions/infinity-validate-transactions/infinity-validate-transactions.component';
import { InfinityMenuComponent } from './Apps/Infinitypay/menu/infinity-menu/infinity-menu.component';
import { CalpayDashboardComponent } from './Apps/Calpay/dashboard/calpay-dashboard/calpay-dashboard.component';
import { ManageStudentsComponent } from './Apps/Calpay/students/manage-students/manage-students.component';
import { ManagePaymentsComponent } from './Apps/Calpay/payments/manage-payments/manage-payments.component';
import { RejectedPaymentsComponent } from './Apps/Calpay/payments/rejected-payments/rejected-payments.component';
import { PendingPaymentsComponent } from './Apps/Calpay/payments/pending-payments/pending-payments.component';
import { ViewPaymentsComponent } from './Apps/Calpay/payments/view-payments/view-payments.component';
import { TransactionComponent } from './Apps/Agispay/transaction/transaction.component';
import { AgisdashboardComponent } from './Apps/Agispay/agisdashboard/agisdashboard.component';
import en from '@angular/common/locales/en';
import { ArenadashboardComponent } from './Apps/Payarenal/arenadashboard/arenadashboard.component';
import { ArenapendingtransactionComponent } from './Apps/Payarenal/arenatransaction/arenapendingtransaction/arenapendingtransaction.component';
import { ArenaapprovedtransactionComponent } from './Apps/Payarenal/arenatransaction/arenaapprovedtransaction/arenaapprovedtransaction.component';
import { ArenagetserviceComponent } from './Apps/Payarenal/arenatransaction/arenagetservice/arenagetservice.component';
import { ArenareportpendingtransactionComponent } from './Apps/Payarenal/arenareport/arenareportpendingtransaction/arenareportpendingtransaction.component';
import { ArenareportapprovedtransactionComponent } from './Apps/Payarenal/arenareport/arenareportapprovedtransaction/arenareportapprovedtransaction.component';
import { ArenareportdeclinedtransactionComponent } from './Apps/Payarenal/arenareport/arenareportdeclinedtransaction/arenareportdeclinedtransaction.component';
import { SearchfilterforarenaPipe } from './Apps/Payarenal/searchfolder/searchfilterforarena.pipe';
import { SearchfilterforagisPipe } from './Apps/Agispay/searchfolder/searchfilterforagis.pipe';
import { ArenareceiptsComponent } from './Apps/Payarenal/arereceipt/arenareceipts/arenareceipts.component';
import { AgisreceiptsComponent } from './Apps/Agispay/agisreceipts/agisreceipts.component';
import { AgisreportComponent } from './Apps/Agispay/agisreport/agisreport.component';
import { ArenareportComponent } from './Apps/Payarenal/arenareport/arenareport.component';
import { Bet9jafilterPipe } from './Apps/Bet9ja/searchfolder/bet9jafilter.pipe';
import { Bet9jatransactionComponent } from './Apps/Bet9ja/bet9jatransaction/bet9jatransaction.component';
import { Bet9jareceiptComponent } from './Apps/Bet9ja/bet9jareceipt/bet9jareceipt.component';
import { Bet9jareportComponent } from './Apps/Bet9ja/bet9jareport/bet9jareport.component';
import { Bet9jadashboardComponent } from './Apps/Bet9ja/bet9jadashboard/bet9jadashboard.component';

/// REMITA
import { RemitaDashboardComponent } from './Apps/Remita/remita-dashboard/remita-dashboard.component';
import { RemitaPaymentsComponent } from './Apps/Remita/remita-payments/remita-payments.component';
import { EgsdashboardComponent } from './Apps/Egspay/egsdashboard/egsdashboard.component';
import { EgstransactionComponent } from './Apps/Egspay/egstransaction/egstransaction.component';
import { SearchfilterforegsPipe } from './Apps/Egspay/searchfolder/searchfilterforegs.pipe';
import { EgsreportComponent } from './Apps/Egspay/egsreport/egsreport.component';
import { SearchfilteregsreportPipe } from './Apps/Egspay/searchfolder/searchfilteregsreport.pipe';


registerLocaleData(en);
@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    LoginComponent,
    SignupComponent,
    ProfileComponent,
    RequestResetComponent,
    ResponseResetComponent,
    GeneralDashboardComponent,
    DashboardComponent,
    CalpayDashboardComponent,
    GeneralNavbarComponent,
    InfinityAddTellerComponent,
    InfinityManageTellerComponent,
    InfinityAllTransactionsComponent,
    InfinityValidateTransactionsComponent,
    InfinityMenuComponent,
    ManageStudentsComponent,
    ManagePaymentsComponent,
    ViewPaymentsComponent,
    PendingPaymentsComponent,
    RejectedPaymentsComponent,
    TransactionComponent,
    AgisdashboardComponent,
    ArenadashboardComponent,
    ArenapendingtransactionComponent,
    ArenaapprovedtransactionComponent,
    ArenagetserviceComponent,
    ArenareportpendingtransactionComponent,
    ArenareportapprovedtransactionComponent,
    ArenareportdeclinedtransactionComponent,
    SearchfilterforarenaPipe,
    SearchfilterforagisPipe,
    ArenareceiptsComponent,
    AgisreceiptsComponent,
    AgisreportComponent,
    ArenareportComponent,
    Bet9jafilterPipe,
    Bet9jatransactionComponent,
    Bet9jareceiptComponent,
    Bet9jareportComponent,
    Bet9jadashboardComponent,
    RemitaDashboardComponent,
    RemitaPaymentsComponent,
    EgsdashboardComponent,
    EgstransactionComponent,
    SearchfilterforegsPipe,
    EgsreportComponent,
    SearchfilteregsreportPipe,
  ],
  imports: [
    NgPipesModule,
    BrowserAnimationsModule,
    BrowserModule,
    ExportAsModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    NzToolTipModule,
    HttpClientModule,
    NzLayoutModule,
    NzMenuModule,
    NzButtonModule,
    NzMessageModule,
    NzTabsModule,
    NzTableModule,
    NzDrawerModule,
    NzFormModule,
    NzSelectModule,
    NzIconModule,
    NzDatePickerModule,
    NzInputModule,
    NzStepsModule,
    NzListModule,
    NzResultModule,
    NzGridModule,
    NzUploadModule,
    NzNotificationModule,
    NzPopconfirmModule,
    NzInputNumberModule,
    NzSkeletonModule,
    NzBadgeModule,
    Ng2OrderModule,
    NgxPaginationModule,
    NzModalModule,
    NzCollapseModule,
    NzPaginationModule,
    NzSpinModule,
    GridModule,
    NgxUiLoaderModule,
    NgxPrintModule
    ],
  providers: [DatePipe, UseErrorInterceptor,
    { provide: NZ_I18N, useValue: en_US },
  ],
  bootstrap: [AppComponent],
})
export class AppModule { }
