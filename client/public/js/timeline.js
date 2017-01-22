$.ajax({
    type: "GET",
    async: false,
    dataType:"json",
    url: './js/timelineConfig.json',
    success: function(data){
        var chart = AmCharts.makeChart( "chartdiv", {
            "type": "serial",
            "theme": "light",
            "dataProvider": data,
            "valueAxes": [ {
                "gridColor": "#FFFFFF",
                "gridAlpha": 0.2,
                "dashLength": 1
            } ],
            "gridAboveGraphs": true,
            "startDuration": 3,
            "graphs": [ {
                "balloonText": "[[category]]: <b>[[value]]</b>",
                "fillAlphas": 0.8,
                "lineAlpha": 0.2,
                "type": "column",
                "valueField": "visits"
            } ],
            "chartCursor": {
                "categoryBalloonEnabled": false,
                "cursorAlpha":  0,
                "zoomable": false
            },
            "categoryField": "time",
            "categoryAxis": {
                "gridPosition": "start",
                "gridAlpha": 0,
                "tickPosition": "start",
                "tickLength": 20
            },
            "export": {
                "enabled": false
            }
        } );
    }
});