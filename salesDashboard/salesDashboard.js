import { LightningElement, wire } from 'lwc';

import getAccountCount
from '@salesforce/apex/SalesDashboardController.getAccountCount';

import getOpportunityCount
from '@salesforce/apex/SalesDashboardController.getOpportunityCount';

import getRevenue
from '@salesforce/apex/SalesDashboardController.getRevenue';

export default class SalesDashboard extends LightningElement {

    accountCount = 0;
    opportunityCount = 0;
    revenue = 0;

    selectedStage = 'All';

    handleStageChange(event) {

        this.selectedStage =
            event.detail.stage;
    }

    @wire(getAccountCount)
    wiredAccounts({ data }) {
        if(data) {
            this.accountCount = data;
        }
    }

    @wire(getOpportunityCount)
    wiredOpps({ data }) {
        if(data) {
            this.opportunityCount = data;
        }
    }

    @wire(getRevenue)
    wiredRevenue({ data }) {
        if(data) {
            this.revenue = data;
        }
    }
}