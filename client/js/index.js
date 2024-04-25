var mapChart = document.getElementById('chart-container');
var geoMap = echarts.init(mapChart);
var map_option = {
    graphic: [
        {
            type: 'image', // 图形元素类型
            bottom: '0%', // 根据父元素进行定位   （0%）, 如果bottom的值是 0，也可以删除该bottom属性值。
            z: 0,  // 层叠

            style: {
                image: './img/background.jpg',
                // hight: 2560,
                // width:1440
            }
        },
    ]
}
geoMap.setOption(map_option);
window.addEventListener('resize', geoMap.resize);


fetch('http://127.0.0.1:1949/china.json')
    .then(data => data.json())
    .then(chinaJson => {
        console.log(chinaJson);
        echarts.registerMap('china', { geoJSON: chinaJson });
        map_option = {
            tooltip: {
                trigger: 'item',
                showDelay: 0,
                transitionDuration: 0.2
            },
            visualMap: {
                left: 'right',
                min: 2000,
                max: 140000,
                inRange: {
                    color: [
                        '#313695',
                        '#4575b4',
                        '#74add1',
                        '#abd9e9',
                        '#e0f3f8',
                        '#ffffbf',
                        '#fee090',
                        '#fdae61',
                        '#f46d43',
                        '#d73027',
                        '#a50026'
                    ]
                },
                text: ['高', '低'],
                textStyle: {
                    color: '#eee'
                },
                calculable: true
            },
            toolbox: {
                show: true,
                //orient: 'vertical',
                left: 'left',
                top: 'top',
                feature: {
                    dataView: { readOnly: false },
                    restore: {},
                    saveAsImage: {}
                }
            },
            series: [
                {
                    name: 'China',
                    type: 'map',
                    roam: true,
                    map: 'china',
                    scaleLimit: { min: 0.5, max: 5 },
                    emphasis: {
                        label: {
                            show: true
                        }
                    },
                    data: []
                }
            ],
        };
        geoMap.setOption(map_option);
        showGDP()
    });


function showGDP() {
    fetch('http://127.0.0.1:1949/gdp')
        .then(res => res.json())
        .then(gdpData => {
            geoMap.setOption({
                visualMap: {
                    left: 'right',
                    min: 2000,
                    max: 140000,
                    inRange: {
                        color: [
                            '#313695',
                            '#4575b4',
                            '#74add1',
                            '#abd9e9',
                            '#e0f3f8',
                            '#ffffbf',
                            '#fee090',
                            '#fdae61',
                            '#f46d43',
                            '#d73027',
                            '#a50026'
                        ]
                    },
                    text: ['高', '低'],
                    calculable: true
                },
                series: [
                    {

                        name: 'GDP',
                        type: 'map',
                        roam: true,
                        map: 'china',
                        emphasis: {
                            label: {
                                show: true
                            }
                        },
                        data: gdpData
                    }
                ]
            })
            // console.log(gdpData)
            float_coloumn_frame.setOption({
                legend: {
                    data: ['GDP数据'],
                    orient: 'horizontal',
                    textStyle: {
                        color: '#fff'
                    },
                    bottom: 10
                },
                xAxis: {
                    data: convertXData(gdpData)
                },
                series: [
                    {

                        name: 'GDP数据',
                        type: 'bar',
                        data: [],
                        data: convertYData(gdpData)
                    }
                ]
            });
        })
}

function showEdu() {
    fetch('http://127.0.0.1:1949/edu')
        .then(res => res.json())
        .then(uniData => {
            geoMap.setOption({
                visualMap: {
                    left: 'right',
                    min: 1,
                    max: 200,
                    inRange: {
                        color: [
                            '#313695',
                            '#4575b4',
                            '#74add1',
                            '#abd9e9',
                            '#e0f3f8',
                            '#ffffbf',
                            '#fee090',
                            '#fdae61',
                            '#f46d43',
                            '#d73027',
                            '#a50026'
                        ]
                    },
                    text: ['高', '低'],
                    calculable: true
                },
                series: [
                    {

                        name: '高校数量',
                        type: 'map',
                        roam: true,
                        map: 'china',
                        emphasis: {
                            label: {
                                show: true
                            }
                        },
                        data: uniData
                    }
                ]
            })
            //console.log(uniData)
            float_coloumn_frame.setOption({
                legend: {
                    data: ['高校数量'],
                    orient: 'horizontal',
                    textStyle: {
                        color: '#fff'
                    },
                    bottom: 10
                },
                xAxis: {
                    data: convertXData(uniData)
                },
                series: [
                    {

                        name: '高校数量',
                        type: 'bar',
                        data: [],
                        data: convertYData(uniData)
                    }
                ]
            });
        })
}

