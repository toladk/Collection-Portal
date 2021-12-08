import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { RequestResetComponent } from './components/password/request-reset/request-reset.component';
import { ResponseResetComponent } from './components/password/response-reset/response-reset.component';
import { ProfileComponent } from './components/profile/profile.component';
import { SignupComponent } from './components/signup/signup.component';
import { AfterLoginService } from './Services/after-login.service';
import { BeforeLoginService } from './Services/before-login.service';

import { GeneralDashboardComponent } from './components/general-dashboard/general-dashboard.component';
import { DashboardComponent } from './Apps/dashboard/dashboard.component';

// INFINITY APPLICATION
import { InfinityAddTellerComponent } from './Apps/Infinitypay/teller/infinity-add-teller/infinity-add-teller.component';
import { InfinityManageTellerComponent } from './Apps/Infinitypay/teller/infinity-manage-teller/infinity-manage-teller.component';
import { InfinityAllTransactionsComponent } from './Apps/Infinitypay/transactions/infinity-all-transactions/infinity-all-transactions.component';
import { InfinityValidateTransactionsComponent } from './Apps/Infinitypay/transactions/infinity-validate-transactions/infinity-validate-transactions.component';

// AGIS PAY APPLICATION
import { TransactionComponent } from './Apps/Agispay/transaction/transaction.component';
import { AgisdashboardComponent } from './Apps/Agispay/agisdashboard/agisdashboard.component';
import { AgisreceiptsComponent } from './Apps/Agispay/agisreceipts/agisreceipts.component';
import { AgisreportComponent } from './Apps/Agispay/agisreport/agisreport.component';


// CALPAY
import { CalpayDashboardComponent } from './Apps/Calpay/dashboard/calpay-dashboard/calpay-dashboard.component';
import { InfinityMenuComponent } from './Apps/Infinitypay/menu/infinity-menu/infinity-menu.component';
import { ManageStudentsComponent } from './Apps/Calpay/students/manage-students/manage-students.component';
import { ManagePaymentsComponent } from './Apps/Calpay/payments/manage-payments/manage-payments.component';
import { ViewPaymentsComponent } from './Apps/Calpay/payments/view-payments/view-payments.component';
import { PendingPaymentsComponent } from './Apps/Calpay/payments/pending-payments/pending-payments.component';
import { RejectedPaymentsComponent } from './Apps/Calpay/payments/rejected-payments/rejected-payments.component';

// REMITA
import { RemitaDashboardComponent } from './Apps/Remita/remita-dashboard/remita-dashboard.component';
import { RemitaPaymentsComponent } from './Apps/Remita/remita-payments/remita-payments.component';


// PAY ARENA APPLICATION
import { ArenadashboardComponent } from './Apps/Payarenal/arenadashboard/arenadashboard.component';
import { ArenagetserviceComponent } from './Apps/Payarenal/arenatransaction/arenagetservice/arenagetservice.component';
import { ArenapendingtransactionComponent } from './Apps/Payarenal/arenatransaction/arenapendingtransaction/arenapendingtransaction.component';
import { ArenaapprovedtransactionComponent } from './Apps/Payarenal/arenatransaction/arenaapprovedtransaction/arenaapprovedtransaction.component';
import { ArenareportapprovedtransactionComponent } from './Apps/Payarenal/arenareport/arenareportapprovedtransaction/arenareportapprovedtransaction.component';
import { ArenareportpendingtransactionComponent } from './Apps/Payarenal/arenareport/arenareportpendingtransaction/arenareportpendingtransaction.component';
import { ArenareportdeclinedtransactionComponent } from './Apps/Payarenal/arenareport/arenareportdeclinedtransaction/arenareportdeclinedtransaction.component';
import { ArenareceiptsComponent } from './Apps/Payarenal/arereceipt/arenareceipts/arenareceipts.component';
import { ArenareportComponent } from './Apps/Payarenal/arenareport/arenareport.component';


// BET9JA APPLICATION
import { Bet9jatransactionComponent } from './Apps/Bet9ja/bet9jatransaction/bet9jatransaction.component';
import { Bet9jadashboardComponent } from './Apps/Bet9ja/bet9jadashboard/bet9jadashboard.component';
import { Bet9jareceiptComponent } from './Apps/Bet9ja/bet9jareceipt/bet9jareceipt.component';
import { Bet9jareportComponent } from './Apps/Bet9ja/bet9jareport/bet9jareport.component';
import { EgstransactionComponent } from './Apps/Egspay/egstransaction/egstransaction.component';
import { EgsdashboardComponent } from './Apps/Egspay/egsdashboard/egsdashboard.component';
import { EgsreportComponent } from './Apps/Egspay/egsreport/egsreport.component';

const routes: Routes = [
  {
    path : '',
    redirectTo : 'login',
    pathMatch : 'full'
  },
  {
    path : 'login',
    component : LoginComponent ,
    canActivate : [BeforeLoginService]
  },
  {
    path : 'signup',
    component : SignupComponent,
    canActivate : [BeforeLoginService]
  },
  {
    path : 'my-apps',
    component : GeneralDashboardComponent,
    canActivate : [AfterLoginService]
  },
  {
    path : 'Dashboard/:id',
    component : DashboardComponent,
    canActivate : [AfterLoginService]
  },
  {
    path : 'profile',
    component : ProfileComponent,
    canActivate : [AfterLoginService]
  },
  {
    path : 'request-password-reset',
    component : RequestResetComponent,
    canActivate : [AfterLoginService]
  },
  {
    path : 'response-password-reset',
    component : ResponseResetComponent,
    canActivate : [AfterLoginService]
  },

  // REMITA

  {
    path : 'remita-dashboard',
    component : RemitaDashboardComponent,
    canActivate : [AfterLoginService]
  },
  {
    path : 'remita-payments/:id',
    component : RemitaPaymentsComponent,
    canActivate : [AfterLoginService]
  },

  // INFINITY APPLICATION

      // CALPAY APPLICATION

      {
        path : 'calpay-dashboard',
        component : CalpayDashboardComponent,
        canActivate : [AfterLoginService]
      },

  // Start Students
  {
    path : 'manage-students',
    component : ManageStudentsComponent,
    canActivate : [AfterLoginService]
  },
    // End Students

    // Start Payments
  {
    path : 'manage-payments',
    component : ManagePaymentsComponent,
    canActivate : [AfterLoginService],

  children: [

    {
      path : 'view',
      outlet: 'Payments',
      component : ViewPaymentsComponent,
      canActivate : [AfterLoginService]
    },
    {
      path : 'pending',
      outlet: 'Payments',
      component : PendingPaymentsComponent,
      canActivate : [AfterLoginService]
    },
    {
      path : 'rejected',
      outlet: 'Payments',
      component : RejectedPaymentsComponent,
      canActivate : [AfterLoginService]
    },
  ]
},
  // End Payments

  // Start Teller
  {
    path : 'infinity-add-teller',
    component : InfinityAddTellerComponent,
    canActivate : [AfterLoginService]
  },
  {
    path : 'infinity-manage-teller',
    component : InfinityManageTellerComponent,
    canActivate : [AfterLoginService]
  },

    // Start Transactions
    {
      path : 'manage-transaction',
      component : InfinityAllTransactionsComponent,
      canActivate : [AfterLoginService]
    },
    {
      path : 'validate-transaction/:id',
      component : InfinityValidateTransactionsComponent,
      canActivate : [AfterLoginService]
    },

    // {
    //   path : 'validate-transaction/all-transactions',
    //   component : InfinityValidateTransactionsComponent,
    //   canActivate : [AfterLoginService]
    // },




  // End Teller



  // AGIS PAY APPLICATION
  {
    path : 'post-transaction',
    component : TransactionComponent,
    canActivate : [AfterLoginService]
  },
  {
    path : 'agis-dashboard',
    component : AgisdashboardComponent,
    canActivate : [AfterLoginService]
  },
  {
    path : 'agisreceipt',
    component : AgisreceiptsComponent,
    canActivate : [AfterLoginService]
  },
  {
    path : 'agisreport',
    component : AgisreportComponent,
    canActivate : [AfterLoginService]
  },
  // AGIS PAY APPLICATION

  // BET9JA APPLICATION
  {
    path : 'bet9jatransaction',
    component : Bet9jatransactionComponent,
    canActivate : [AfterLoginService]
  },
  {
    path : 'bet9jadashboard',
    component : Bet9jadashboardComponent,
    canActivate : [AfterLoginService]
  },
  {
    path : 'bet9jareceipt',
    component : Bet9jareceiptComponent,
    canActivate : [AfterLoginService]
  },
  {
    path : 'bet9jareport',
    component : Bet9jareportComponent,
    canActivate : [AfterLoginService]
  },
  // BET9JA APPLICATION


  // EGS APPLICATION
  {
    path : 'egstransaction',
    component : EgstransactionComponent,
    canActivate : [AfterLoginService]
  },
  {
    path : 'egsdashboard',
    component : EgsdashboardComponent,
    canActivate : [AfterLoginService]
  },
  {
    path : 'egsreport',
    component : EgsreportComponent,
    canActivate : [AfterLoginService]
  },
  // EGS APPLICATION


  // PAY ARENA APPLICATION
  {
    path : 'arena-dashboard',
    component : ArenadashboardComponent,
    canActivate : [AfterLoginService]
  },
  {
    path : 'arena-get-service',
    component : ArenagetserviceComponent,
    canActivate : [AfterLoginService]
  },
  {
    path : 'arena-approved-transaction',
    component : ArenaapprovedtransactionComponent,
    canActivate : [AfterLoginService]
  },
  {
    path : 'arena-pending-transaction',
    component : ArenapendingtransactionComponent,
    canActivate : [AfterLoginService]
  },
  {
    path : 'arena-report-approved-transaction',
    component : ArenareportapprovedtransactionComponent,
    canActivate : [AfterLoginService]
  },
  {
    path : 'arena-report-pending-transaction',
    component : ArenareportpendingtransactionComponent,
    canActivate : [AfterLoginService]
  },
  {
    path : 'arena-report-declined-transaction',
    component : ArenareportdeclinedtransactionComponent,
    canActivate : [AfterLoginService]
  },
  {
    path : 'arena-receipt',
    component : ArenareceiptsComponent,
    canActivate : [AfterLoginService]
  },
  {
    path : 'arena-report',
    component : ArenareportComponent,
    canActivate : [AfterLoginService]
  },
  // PAY ARENA APPLICATION
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
