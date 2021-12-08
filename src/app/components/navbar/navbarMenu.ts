import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})

// tslint:disable-next-line:class-name
export class myMenu {

menuOfData = [];
calPayMenu = [];
agisPayMenu = [];
payArenaMenu = [];
bet9jaMenu = [];
remiterMenu = [];
egsMenu = [];


constructor() { }

getMenu(val){

  // INFINITY MENU  INFINITIPAY
    if (val === 'InfinitiPay'){
      this.menuOfData = [
        {
          key: 0,
          name: 'Dashboard',
          link: 'localhost',
          childRoute: '',
          rounte: 'dashboard',
          icon: 'typcn typcn-th-large-outline',
          expand: false,
          permission: 'CANPOSTVALIDATETRANSACTIONS',
          children: []
        },
        {
          key: 3,
          name: 'Transactions',
          link: 'localhost',
          childRoute: '',
          rounte: 'validate-transaction/all-transactions',
          icon: 'typcn typcn-arrow-shuffle',
          expand: false,
          permission: true,
          children: [
            {
              key: 1,
              name: 'Validate Transaction',
              link: 'localhost',
              childRoute: '',
              rounte: 'validate-transaction/all-transactions',
              icon: 'dropdown',
              expand: false,
              permission: true,
              children: []
            },
            {
              key: 2,
              name: 'Confirm Transaction',
              link: 'localhost',
              childRoute: '',
              rounte: 'manage-transaction',
              icon: 'dropdown',
              expand: false,
              permission: true,
              children: []
            },
            {
              key: 3,
              name: 'Transaction History',
              link: 'localhost',
          childRoute: '',
              rounte: 'transaction-history',
              icon: 'dropdown',
              expand: false,
              permission: true,
              children: []
            }
          ]
        },
        {
          key: 4,
          name: 'Report',
          link: 'localhost',
          childRoute: '',
          rounte: '',
          icon: 'typcn typcn-printer',
          expand: true,
          permission: false,
          children: [
            {
              key: 1,
              name: 'Audit Report',
              link: 'localhost',
          childRoute: '',
              rounte: 'audit-report',
              icon: 'dropdown',
              expand: false,
              permission: true,
              children: []
            },
            {
              key: 2,
              name: 'Export Excel ',
              link: 'localhost',
          childRoute: '',
              rounte: 'export-excel',
              icon: 'dropdown',
              expand: false,
              permission: true,
              children: []
            }
          ]
        },
      ];

      return this.menuOfData;
    }

    // CALPAY MENU
    if (val === 'CALPAY'){
      this.calPayMenu = [
        {
          key: 0,
          name: 'Dashboard',
          link: 'localhost',
          childRoute: '',
          rounte: 'calpay-dashboard',
          icon: 'typcn typcn-th-large-outline',
          expand: false,
          permission: true,
          children: []
        },
        {
          key: 1,
          name: 'Students',
          link: 'localhost',
          childRoute: '',
          rounte: 'manage-students',
          icon: 'typcn typcn-group-outline',
          expand: false,
          permission: 'CALPAY.VIEW_STUDENT',
          children: [ ]
        },
        {
          key: 3,
          name: 'Payments',
          link: 'localhost',
          childRoute: '',
          rounte: 'manage-payments',
          icon: 'typcn typcn-arrow-shuffle',
          expand: true,
          permission: 'VIEW_REQUEST',
          children: []
        },
        // {
        //   key: 4,
        //   name: 'Report',
        //   link: 'localhost',
        //   childRoute: '',
        //   rounte: '',
        //   icon: 'typcn typcn-printer',
        //   expand: true,
        //   permission: 'CALPAY.PRINT',
        //   children: [ ]
        // },
        // {
        //   key: 0,
        //   name: 'Settings',
        //   link: 'localhost',
        //   childRoute: '',
        //   rounte: 'dashboard',
        //   icon: 'typcn typcn-cog',
        //   expand: false,
        //   permission: true,
        //   children: []
        // },
      ];
      return this.calPayMenu;
    }

    // AGISPAY MENU
    if (val === 'AGISPAY'){
      this.agisPayMenu = [
        {
          key: 0,
          name: 'Dashboard',
          link: 'localhost',
          childRoute: '',
          rounte: 'agis-dashboard',
          icon: 'typcn typcn-th-large-outline',
          expand: false,
          permission: true,
          children: []
        },
        {
          key: 1,
          name: 'Transaction',
          link: 'localhost',
          childRoute: '',
          rounte: 'post-transaction',
          icon: 'typcn typcn-tabs-outline',
          expand: false,
          permission: 'CANAPPROVETRANSACTION',
          children: []
        },
        {
          key: 2,
          name: 'Receipt',
          link: 'localhost',
          childRoute: '',
          rounte: 'agisreceipt',
          icon: 'typcn typcn-document-text',
          expand: false,
          permission: '',
          children: []
        },
        {
          key: 3,
          name: 'Report',
          link: 'localhost',
          childRoute: '',
          rounte: 'agisreport',
          icon: 'typcn typcn-clipboard',
          expand: false,
          permission: '',
          children: []
        },
      ];
      return this.agisPayMenu;
    }

    // PAYARENA MENU
    if (val === 'PAYARENA'){
      this.payArenaMenu = [
        // {
        //   key: 0,
        //   name: 'Dashboard',
        //   link: 'localhost',
        //   childRoute: '',
        //   rounte: 'arena-dashboard',
        //   icon: 'typcn typcn-th-large-outline',
        //   expand: false,
        //   permission: true,
        //   children: []
        // },
        {
          key: 1,
          name: 'Transactions',
          link: 'localhost',
          childRoute: '',
          rounte: 'arena-pending-transaction',
          icon: 'typcn typcn-tabs-outline',
          expand: true,
          permission: true,
          children: [
            {
              key: 1,
              name: 'Get Service',
              link: 'localhost',
              childRoute: '',
              //rounte: 'arena-get-service',
              icon: 'dropdown',
              expand: true,
              permission: true,
              children: []
            },
            {
              key: 2,
              name: 'Transactions',
              link: 'localhost',
              childRoute: '',
              rounte: 'arena-pending-transaction',
              icon: 'dropdown',
              expand: true,
              permission: true,
              children: []
            },
            // {
            //   key: 3,
            //   name: 'Approved Transactions',
            //   link: 'localhost',
            //   childRoute: '',
            //   rounte: 'arena-approved-transaction',
            //   icon: 'dropdown',
            //   expand: true,
            //   permission: true,
            //   children: []
            // },
          ]
        },
        {
          key: 2,
          name: 'Report',
          link: 'localhost',
          childRoute: '',
          rounte: 'arena-report-pending-transaction',
          icon: 'typcn typcn-chart-line-outline',
          expand: true,
          permission: true,
          children: [
            // {
            //   key: 1,
            //   name: 'Approved Transactions',
            //   link: 'localhost',
            //   childRoute: '',
            //   rounte: 'arena-report-approved-transaction',
            //   icon: 'dropdown',
            //   expand: true,
            //   permission: true,
            //   children: []
            // },
            // {
            //   key: 2,
            //   name: 'Declined Transactions',
            //   link: 'localhost',
            //   childRoute: '',
            //   rounte: 'arena-report-declined-transaction',
            //   icon: 'dropdown',
            //   expand: true,
            //   permission: true,
            //   children: []
            // },
            {
              key: 3,
              name: 'Transactions',
              link: 'localhost',
              childRoute: '',
              rounte: 'arena-report-pending-transaction',
              icon: 'dropdown',
              expand: true,
              permission: true,
              children: []
            },
          ]
        },
        {
          key: 3,
          name: 'Receipts',
          link: 'localhost',
          childRoute: '',
          rounte: 'arena-receipt',
          icon: 'typcn typcn-document-text',
          expand: false,
          permission: true,
          children: []
        },
      ];
      return this.payArenaMenu;
    }

    // BET9JA MENU
    if (val === ''){
      this.bet9jaMenu = [
        {
          key: 0,
          name: 'Dashboard',
          link: 'localhost',
          childRoute: '',
          rounte: 'bet9jadashboard',
          icon: 'typcn typcn-th-large-outline',
          expand: false,
          permission: true,
          children: []
        },
        {
          key: 1,
          name: 'Transaction',
          link: 'localhost',
          childRoute: '',
          rounte: 'bet9jatransaction',
          icon: 'typcn typcn-tabs-outline',
          expand: false,
          permission: 'CANAPPROVETRANSACTION',
          children: []
        },
        {
          key: 2,
          name: 'Receipt',
          link: 'localhost',
          childRoute: '',
          rounte: 'bet9jareceipt',
          icon: 'typcn typcn-document-text',
          expand: false,
          permission: '',
          children: []
        },
        {
          key: 3,
          name: 'Report',
          link: 'localhost',
          childRoute: '',
          rounte: 'bet9jareport',
          icon: 'typcn typcn-clipboard',
          expand: false,
          permission: '',
          children: []
        },
      ];
      return this.bet9jaMenu;
    }

    //  REMITA MENU  REMITERPAY
    if (val === 'REMITTA'){
      this.remiterMenu = [
        {
          key: 0,
          name: 'Dashboard',
          link: 'localhost',
          childRoute: '',
          rounte: 'remita-dashboard',
          icon: 'typcn typcn-th-large-outline',
          expand: false,
          permission: true,
          children: []
        },
        {
          key: 3,
          name: 'Payments',
          link: 'localhost',
          childRoute: '',
          rounte: 'remita-payments/pending-transactions',
          icon: 'typcn typcn-arrow-shuffle',
          expand: false,
          permission: true,
          children: [ ]
        },
        // {
        //   key: 4,
        //   name: 'Report',
        //   link: 'localhost',
        //   childRoute: '',
        //   rounte: '',
        //   icon: 'typcn typcn-printer',
        //   expand: false,
        //   permission: false,
        //   children: [ ]
        // },
      ];

      return this.remiterMenu;
    }

    // EGSPAY MENU
    if (val === 'EBSPAYAPP'){
      this.egsMenu = [
        // {
        //   key: 0,
        //   name: 'Dashboard',
        //   link: 'localhost',
        //   childRoute: '',
        //   rounte: 'egsdashboard',
        //   icon: 'typcn typcn-th-large-outline',
        //   expand: false,
        //   permission: true,
        //   children: []
        // },
        {
          key: 1,
          name: 'Transaction',
          link: 'localhost',
          childRoute: '',
          rounte: 'egstransaction',
          icon: 'typcn typcn-tabs-outline',
          expand: false,
          permission: '',
          children: []
        },
        {
          key: 2,
          name: 'Report',
          link: 'localhost',
          childRoute: '',
          rounte: 'egsreport',
          icon: 'typcn typcn-document-text',
          expand: false,
          permission: '',
          children: []
        },
      ];
      return this.egsMenu;
    }


  }

}
