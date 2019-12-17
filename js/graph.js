var global_chart = null;
var gloabl_timeout1 = null;
var gloabl_timeout2 = null;
function generateGraph(funcName, arr) {
    if(global_chart) {
        global_chart.destroy();
        clearTimeout(gloabl_timeout1);
        clearTimeout(gloabl_timeout2);
    }
    global_chart = Highcharts.chart('job-container', {
        chart: {
            type: 'spline',
            animation: Highcharts.svg, // don't animate in old IE
            marginRight: 10,
            events: {
                load: function () {
                    var series = this.series[0];
                    gloabl_timeout1 = setTimeout(function run() {
                     	var x = (new Date()).getTime(), // current time
                            y = getSize(funcName, arr);
                            series.addPoint([x, y], true, true);
                      gloabl_timeout2 = setTimeout(run, exponential(1) * 1000) ;
                    }, 0);
                }
            }
        },

        time: {
            useUTC: false
        },

        title: {
            text: 'Jobs Generator'
        },
        xAxis: {
            type: 'datetime',
            tickPixelInterval: 150
        },
        yAxis: {
            title: {
                text: 'Size'
            },
            plotLines: [{
                value: 0,
                width: 1,
                color: '#808080'
            }]
        },
        plotOptions: {
            series: {
                marker: {
                    enabled: true
                }
            }
        },
        tooltip: {
            headerFormat: '<b>{series.name}</b><br/>',
            pointFormat: '{point.x:%Y-%m-%d %H:%M:%S}<br/>{point.y:.2f}'
        },
        legend: {
            enabled: false
        },
        exporting: {
            enabled: false
        },
        credits: {
            enabled: false
        },
        series: [{
            name: 'Job',
            data: (function () {
                // generate an array of random data
                var data = [],
                    time = (new Date()).getTime(),
                    i;

                for (i = -19; i <= 0; i += 1) {

                    data.push({
                        x: time + i * 1000,
                        y:  getSize(funcName, arr)
                    });
                    // time += exponential(1) * 1000;
                }
                return data;
            }())
        }]
    });
}

function getSize(name, arr) {
    if(name == "exponential") {
        return exponential(arr);
    }else if(name == "deterministic") {
        return deterministic(arr);
    }if(name == "uniform") {
        return uniform(arr);
    }if(name == "erlang") {
        return erlang(arr);
    }if(name == "pareto") {
        return pareto(arr);
    }
}
