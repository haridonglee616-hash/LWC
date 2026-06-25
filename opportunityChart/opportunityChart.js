import { LightningElement, api, wire } from 'lwc';

import getOpportunityStageData
    from '@salesforce/apex/SalesDashboardController.getOpportunityStageData';

export default class OpportunityChart extends LightningElement {

    @api selectedStage = 'All';

    bars = [];

    @wire(getOpportunityStageData, {
        selectedStage: '$selectedStage'
    })
    wiredChartData({ data, error }) {

        if (data) {

            const maxValue =
                Math.max(...data.map(item => item.value), 1);

            let xPos = 60;

            this.bars = data.map(item => {

                const height =
                    (item.value / maxValue) * 220;

                const result = {

                    label: item.label,

                    shortLabel:
                        item.label.length > 12
                        ? item.label.substring(0, 10) + '...'
                        : item.label,

                    value: item.value,

                    x: xPos,

                    y: 280 - height,

                    height: height,

                    labelX: xPos - 5,

                    valueX: xPos + 15,

                    valueY: 270 - height
                };

                xPos += 90;

                return result;
            });

        } else if (error) {

            console.error(error);
        }
    }
}