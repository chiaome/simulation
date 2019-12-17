
function speedupmanual(val) {
    var ele = document.getElementById("speedupmanual");
    if(val.value == "Manual") {
        ele.style.display = "block";
    }else {
        ele.style.display = "none";
    }
}

function schedulingalgorithm(val) {
    var ele = document.getElementById("schedulingalgorithm");
    if(val.value == "selfdefined") {
        ele.style.display = "block";
    }else {
        ele.style.display = "none";
    }
    var editor = ace.edit("schedulingalgorithm");
    editor.resize();
    editor.session.setMode("javascript");
    editor.setTheme("ace/theme/xcode");

}

var a = 0;
var handle = null;
function test() {
    if(a > 100) {
        clearInterval(handle);
        return ;
    }
    $('#progressbar1').LineProgressbar({
        percentage: a++,
        // fillBackgroundColor: '#1abc9c',
        animation: false,
        height: '10px',
        ShowProgressCount: false,
        radius: '2px'
    });
    document.getElementById("progress-count").innerHTML = (a - 1).toString() + '%';
}
$('#progressbar1').LineProgressbar({
    percentage: a++,
    // fillBackgroundColor: '#1abc9c',
    animation: false,
    height: '10px',
    ShowProgressCount: false,
    radius: '2px'
});
handle = setInterval(test, 2000);
generateGraph("exponential", []);


function output() {

    Highcharts.chart('summary-content-right', {
    chart: {
        type: 'column'
    },
    title: {
        text: ''
    },
    subtitle: {
        text: 'Utilization'
    },
    credits: {
        enabled: false
    },
    xAxis: {
        categories: [0.00, 0.49, 1.16, 1.78]
    },
    yAxis: {
        min: 0,
        title: {
            text: 'Allocation(t)'
        }
    },
    tooltip: {
        pointFormat: '<span style="color:{series.color}">{series.name}</span>: <b>{point.y}</b> ({point.percentage:.0f}%)<br/>',
        shared: true
    },
    plotOptions: {
        column: {
            stacking: 'percent'
        }
    },
    series: [{
        name: 'Job1',
        data: [1, 3, 4, 2]
    }, {
        name: 'Job2',
        data: [1, 3, 4, 2]
    }, {
        name: 'Job3',
        data: [1, 3, 4, 2]
    }]
});
}

output();
