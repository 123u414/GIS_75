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
    var flag = 0;
    for (var i = 0; i < 5; i++) {
        if (data[i].name === '香港特别行政区' || data[i].name === '澳门特别行政区') { // 只统计内地
            flag = 1;
        } else {
            if (flag && i == 4) {
                xdata.push(data[i].name)
                xdata.push(data[i + 1].name)
            } else {
                xdata.push(data[i].name)
            }

        }

    }
    return xdata
}
var convertYData = function (data) {
    var ydata = [];
    var flag = 0;
    for (var i = 0; i < 5; i++) {
        if (data[i].name === '香港特别行政区' || data[i].name === '澳门特别行政区') {
            flag = 1;
        } else {
            if (flag && i == 4) {
                ydata.push(data[i].value)
                ydata.push(data[i + 1].value)
            } else {
                ydata.push(data[i].value)
            }

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
    set_clear_op()
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
