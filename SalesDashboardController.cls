public with sharing class SalesDashboardController {
    
    @AuraEnabled(cacheable=true)
    public static Integer getAccountCount() {
        return [SELECT Count() FROM Account];
    }
    
    @AuraEnabled(cacheable=true)
    public static Integer getOpportunityCount() {
        return [SELECT Count() FROM Opportunity];
    }
    
    @AuraEnabled(cacheable=true)
    public static Decimal getRevenue() {
        AggregateResult ar =
            [SELECT SUM(Amount) total
             FROM Opportunity
             WHERE IsClosed = false];
        
        return (Decimal)ar.get('total');
    }
    @AuraEnabled(cacheable=true)
    public static List<Account> getAccountsForMap() {
        
        return [
            SELECT Id, Name, BillingCity, BillingCountry
            FROM Account
            WHERE BillingCity != null
            LIMIT 50
        ];
    }
    @AuraEnabled(cacheable=true)
public static List<ChartData> getOpportunityStageData(String selectedStage) {

    List<ChartData> results = new List<ChartData>();

    List<AggregateResult> ars;

    if(String.isBlank(selectedStage) || selectedStage == 'All') {

        ars = [
            SELECT StageName, COUNT(Id) total
            FROM Opportunity
            GROUP BY StageName
            ORDER BY StageName
        ];

    } else {

        ars = [
            SELECT StageName, COUNT(Id) total
            FROM Opportunity
            WHERE StageName = :selectedStage
            GROUP BY StageName
        ];
    }

    for(AggregateResult ar : ars) {

        results.add(
            new ChartData(
                (String)ar.get('StageName'),
                (Integer)ar.get('total')
            )
        );
    }

    return results;
}
    public class ChartData {

    @AuraEnabled
    public String label;

    @AuraEnabled
    public Integer value;

    public ChartData(String label, Integer value) {
        this.label = label;
        this.value = value;
    }
}
}