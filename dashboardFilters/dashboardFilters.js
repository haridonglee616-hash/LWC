import { LightningElement } from 'lwc';

export default class DashboardFilters extends LightningElement {

    selectedStage = 'All';

    stageOptions = [
        { label: 'All', value: 'All' },
        { label: 'Prospecting', value: 'Prospecting' },
        { label: 'Qualification', value: 'Qualification' },
        { label: 'Proposal', value: 'Proposal' },
        { label: 'Negotiation', value: 'Negotiation' },
        { label: 'Closed Won', value: 'Closed Won' },
        { label: 'Closed Lost', value: 'Closed Lost' }
    ];

    handleChange(event) {

        this.selectedStage = event.detail.value;

        this.dispatchEvent(
            new CustomEvent('stagechange', {
                detail: {
                    stage: this.selectedStage
                }
            })
        );
    }
}