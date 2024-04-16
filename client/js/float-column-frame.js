// 基于准备好的dom，初始化echarts实例
var myChart = echarts.init(document.getElementById('float-column-frame'));
var dom = document.getElementById('float-column-frame')
// 指定图表的配置项和数据
var data = [];

data.sort(function (a, b) {
    return b.value - a.value;
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
        text: '空气质量',
        textStyle: {
            color: '#fff'

        }
    },
    tooltip: {},
    legend: {
        data: ['PM2.5指数'],
        orient: 'horizontal',
        textStyle: {
            color: '#fff'
        },
        bottom: 10
    },
    xAxis: {
        data: []
    },
    yAxis: {},
    series: [
        {
            name: 'PM2.5指数',
            type: 'bar',
            data: []
        }
    ]
};

// 使用刚指定的配置项和数据显示图表。
myChart.setOption(option);



if (option && typeof option === 'object') {
    myChart.setOption(option);
}
var chart = document.getElementById('chart-container')
const resizeObserver = new ResizeObserver(entry => {
    myChart.resize();
});
resizeObserver.observe(dom);

resizeObserver.observe(chart);

fetch('http://127.0.0.1:1949/data')
    .then(response => response.json())
    .then(dataFromBackend => {
        // 将从后端获取的数据填充到 data 数组中
        data = dataFromBackend;

        // 更新图表的配置项中的 x 轴和 y 轴数据
        myChart.setOption({
            xAxis: {
                data: convertXData(data)
            },
            series: [
                {
                    data: convertYData(data)
                }
            ]
        });
    })
    .catch(error => {
        console.error('Error fetching data:', error);
    });


