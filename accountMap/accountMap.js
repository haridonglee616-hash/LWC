import { LightningElement, wire } from 'lwc';
import getAccountsForMap
    from '@salesforce/apex/SalesDashboardController.getAccountsForMap';

export default class AccountMap extends LightningElement {

    mapMarkers = [];

    @wire(getAccountsForMap)
    wiredAccounts({ data }) {

        if(data) {

            this.mapMarkers = data.map(acc => {
                return {
                    location: {
                        City: acc.BillingCity,
                        Country: acc.BillingCountry
                    },
                    title: acc.Name
                };
            });
        }
    }
}