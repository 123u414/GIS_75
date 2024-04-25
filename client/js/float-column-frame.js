// 基于准备好的dom，初始化echarts实例
var float_coloumn_frame = echarts.init(document.getElementById('float-column-frame'));
var float_dom = document.getElementById('float-column-frame')
// 指定图表的配置项和数据
var data = [];

data.sort(function (a, b) {
    return a.value - b.value;
})

var convertXData = function (data) {
    var xdata = [];
    for (var i = 0; i < 5; i++) {
        var tmpxdata = data[i].name;
        if (tmpxdata) {
            xdata.push(data[i].name)
        }
    }
    return xdata
}
var convertYData = function (data) {
    var ydata = [];
    for (var i = 0; i < 5; i++) {
        var tmpydata = data[i].value;
        if (tmpydata) {
            ydata.push(data[i].value)
        }
    }
    return ydata
}

var option = {
    textStyle: {
        color: '#fff'
    },
    title: {
        text: 'TOP 5',
        textStyle: {
            color: '#fff'

        }
    },
    tooltip: {},

    xAxis: {
        data: []
    },
    yAxis: {},

};

// 使用刚指定的配置项和数据显示图表。
float_coloumn_frame.setOption(option);



if (option && typeof option === 'object') {
    float_coloumn_frame.setOption(option);
}
var chart = document.getElementById('chart-container')
const resizeObserver = new ResizeObserver(entry => {
    float_coloumn_frame.resize();
});
resizeObserver.observe(float_dom);

resizeObserver.observe(chart);

function update_data(name, data, title) {
    float_coloumn_frame.setOption({
        title: {
            text: title,
            textStyle: {
                color: '#fff'

            }
        },
        legend: {
            data: [name],
            orient: 'horizontal',
            textStyle: {
                color: '#fff'
            },
            bottom: 10
        },
        xAxis: {
            data: convertXData(data)
        },
        series: [
            {
                name: name,
                type: 'bar',
                data: convertYData(data)
            }
        ]
    })
}
