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
var from_pop = 0
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

function set_clear_op() {
    if (from_pop) {
        from_pop = 0;
        var clear_op = float_coloumn_frame.getOption()
        for (var i = 0; i < clear_op.series.length; i++) {
            clear_op.series[i] = []
        }
        float_coloumn_frame.setOption(clear_op, true)
    }
}

function showGDP() {
    document.getElementById('select-type').value = 'gdp'
    set_clear_op()
    fetch('http://127.0.0.1:1949/gdp')
        .then(res => res.json())
        .then(gdpData => {
            geoMap.setOption({
                visualMap: {
                    left: 'right',
                    min: 2000,
                    max: 140000,
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
                title: {
                    text: 'TOP 5 （单位：亿元）',
                    textStyle: {
                        color: '#fff'

                    }
                },
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
    document.getElementById('select-type').value = 'university'
    set_clear_op()
    fetch('http://127.0.0.1:1949/edu')
        .then(res => res.json())
        .then(uniData => {
            geoMap.setOption({
                visualMap: {
                    left: 'right',
                    min: 1,
                    max: 200,
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
                title: {
                    text: 'TOP 5 （单位：所）',
                    textStyle: {
                        color: '#fff'

                    }
                },
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

function showI18n() {
    document.getElementById('select-type').value = 'i18n'
    set_clear_op()
    fetch('http://127.0.0.1:1949/i18n')
        .then(res => res.json())
        .then(i18nData => {
            console.log(i18nData)
            geoMap.setOption({
                visualMap: {
                    left: 'right',
                    min: 400000,
                    max: 500000000,
                    text: ['高', '低'],
                    calculable: true
                },
                series: [
                    {
                        name: '进出口贸易额',
                        type: 'map',
                        roam: true,
                        map: 'china',
                        emphasis: {
                            label: {
                                show: true
                            }
                        },
                        data: i18nData
                    }
                ]
            })
            float_coloumn_frame.setOption({
                title: {
                    text: 'TOP 5 （单位：千万美元）',
                    textStyle: {
                        color: '#fff'

                    }
                },
                legend: {
                    data: ['进出口贸易额'],
                    orient: 'horizontal',
                    textStyle: {
                        color: '#fff'
                    },
                    bottom: 10
                },
                xAxis: {
                    data: convertXData(i18nData)
                },
                series: [
                    {

                        name: '进出口贸易额',
                        type: 'bar',
                        data: [],
                        data: convertYData(i18nData)
                    }
                ]
            });
        })
}

function showProduction() {
    document.getElementById('select-type').value = 'production'
    set_clear_op()
    fetch('http://127.0.0.1:1949/production')
        .then(res => res.json())
        .then(prodData => {
            console.log(prodData)
            geoMap.setOption({
                visualMap: {
                    left: 'right',
                    min: 800,
                    max: 55000,
                    text: ['高', '低'],
                    calculable: true
                },
                series: [
                    {
                        name: '第二产业增加值',
                        type: 'map',
                        roam: true,
                        map: 'china',
                        emphasis: {
                            label: {
                                show: true
                            }
                        },
                        data: prodData
                    }
                ]
            })
            float_coloumn_frame.setOption({
                title: {
                    text: 'TOP 5 （单位：亿元）',
                    textStyle: {
                        color: '#fff'

                    }
                },
                legend: {
                    data: ['第二产业增加值'],
                    orient: 'horizontal',
                    textStyle: {
                        color: '#fff'
                    },
                    bottom: 10
                },
                xAxis: {
                    data: convertXData(prodData)
                },
                series: [
                    {

                        name: '第二产业增加值',
                        type: 'bar',
                        data: [],
                        data: convertYData(prodData)
                    }
                ]
            });
        })
}

function showPop() {
    document.getElementById('select-type').value = 'population'
    set_clear_op()
    fetch('http://127.0.0.1:1949/population')
        .then(res => res.json())
        .then(popData => {
            var city = [], country = [], sum = []
            for (var i = 0; i < popData.length; i++) {
                city.push({ name: popData[i].name, value: popData[i].city })
                country.push({ name: popData[i].name, value: popData[i].countryside })
                sum.push({ name: popData[i].name, value: popData[i].countryside + popData[i].city })
            }
            geoMap.setOption({
                visualMap: {
                    left: 'right',
                    min: 300,
                    max: 13000,
                    text: ['高', '低'],
                    calculable: true
                },
                series: [
                    {
                        name: '总人口',
                        type: 'map',
                        roam: true,
                        map: 'china',
                        data: sum
                    },
                ]
            })
            float_coloumn_frame.setOption({
                title: {
                    text: 'TOP 5 （单位：万人）',
                    textStyle: {
                        color: '#fff'

                    }
                },
                legend: {
                    data: ['总人口'],
                    orient: 'horizontal',
                    textStyle: {
                        color: '#fff'
                    },
                    bottom: 10
                },
                xAxis: {
                    data: convertXData(sum)
                },
                series: [
                    {

                        name: '总人口',
                        type: 'bar',
                        data: [],
                        data: convertYData(sum)
                    }
                ]
            });
        })
}

