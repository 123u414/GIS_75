var formData
document.getElementById('data-form').addEventListener('submit', function (event) {
    event.preventDefault();
    formData = {
        year: document.getElementById('select-year').value,
        type: document.getElementById('select-type').value,
        order: document.getElementById('select-order').value
    }

    fetch('http://127.0.0.1:1949/search', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
    })
        .then(response => response.json())
        .then(res => {
            geoMap.setOption({
                series: [{
                    data: res
                }
                ]

            })
            if (formData.type == 'university') {
                geoMap.setOption({
                    visualMap: {
                        min: 1,
                        max: 200,
                    }
                });
                update_data('高校数量', res, 'TOP 5 （单位：所）');
            } else if (formData.type == 'gdp') {
                geoMap.setOption({
                    visualMap: {
                        min: 2000,
                        max: 140000,
                    }
                });

                update_data('GDP数据', res, 'TOP 5 （单位：亿元）')

            } else if (formData.type == 'population') {
                geoMap.setOption({
                    visualMap: {
                        min: 300,
                        max: 13000,
                    }
                });
                update_data('总人口', res, 'TOP 5 （单位：万人）')
            } else if (formData.type == 'production') {
                geoMap.setOption({
                    visualMap: {
                        min: 800,
                        max: 55000,
                    }
                });
                update_data('第二产业增加值', res, 'TOP 5 （单位：亿元）')
            } else if (formData.type == 'i18n') {
                geoMap.setOption({
                    visualMap: {
                        min: 400000,
                        max: 500000000,
                    }
                });
                update_data('进出口贸易额', res, 'TOP 5 （单位：千万美元）')
            }

        })


});

geoMap.on('click', function (params) {
    formData = {
        name: params.name,
        type: document.getElementById('select-type').value,
    }
    if (params.name && params.name != '台湾省') {
        fetch('http://127.0.0.1:1949/history', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(formData)
        }).then(response => response.json())
            .then(res => {
                var unit, data_type;
                if (formData.type === 'gdp') {
                    data_type = '国民生产总值'
                    if (formData.name != '澳门特别行政区' && formData.name != '香港特别行政区') {
                        unit = '亿元'
                    } else if (formData.name === '澳门特别行政区') {
                        unit = '亿澳门元'
                    } else {
                        unit = '百万港元'
                    }
                } else if (formData.type === 'university') {
                    unit = '所'
                    data_type = '高校数量'
                } else if (formData.type === 'population') {
                    unit = '万人'
                    data_type = '城乡人口'
                } else if (formData.type === 'i18n') {
                    unit = '千美元'
                    data_type = '进出口贸易额'
                } else if (formData.type === 'production') {
                    unit = '亿元'
                    data_type = '第二产业增加值'
                }
                if (formData.type != 'population') {
                    var xdata = [], ydata = [];
                    for (var i = 0; i < res.length; i++) {
                        var tmpydata = res[i].year;
                        if (tmpydata) {
                            xdata.push(res[i].year)
                        }
                    }
                    for (var i = 0; i < res.length; i++) {
                        var tmpydata = res[i].value;
                        if (tmpydata) {
                            ydata.push(res[i].value)
                        }
                    }
                    float_coloumn_frame.setOption({
                        title: {
                            text: `${formData.name}历史${data_type}数据 (单位:${unit})`,
                            textStyle: {
                                color: '#fff'
                            }
                        },
                        xAxis: {
                            type: 'category',
                            data: xdata
                        },
                        yAxis: {
                            type: 'value'
                        },
                        series: [
                            {
                                type: 'line',
                                data: ydata
                            }
                        ],
                    })
                } else {
                    from_pop = 1;
                    var xdata = [], ydata1 = [], ydata2 = [];
                    for (var i = 0; i < res.length; i++) {
                        var tmpydata = res[i].year;
                        if (tmpydata) {
                            xdata.push(res[i].year)
                        }
                    }
                    for (var i = 0; i < res.length; i++) {
                        var tmpydata = res[i].city;
                        if (tmpydata) {
                            ydata1.push(res[i].city)
                            ydata2.push(res[i].countryside)
                        }
                    }
                    float_coloumn_frame.setOption({
                        title: {
                            text: `${formData.name}历史${data_type}数据 (单位:${unit})`,
                            textStyle: {
                                color: '#fff'
                            }
                        },
                        legend: {
                            data: ['城市人口', '乡村人口'],
                            orient: 'horizontal',
                            textStyle: {
                                color: '#fff'
                            },
                            bottom: 10
                        },
                        xAxis: {
                            type: 'category',
                            data: xdata
                        },
                        yAxis: {
                            type: 'value'
                        },
                        series: [
                            {
                                name: '城市人口',
                                type: 'line',
                                data: ydata1
                            },
                            {
                                name: '乡村人口',
                                type: 'line',
                                data: ydata2
                            }
                        ],
                    })
                }

            })
    } else if (params.name == '台湾省') {
        set_clear_op()
        float_coloumn_frame.setOption({
            title: {
                text: `数据暂缺`,
                textStyle: {
                    color: '#fff'
                }
            },
            xAxis: {
                type: 'category',
                data: []
            },
            yAxis: {
                type: 'value'
            },
            series: [
                {
                    type: 'line',
                    data: []
                }
            ],
        })
    }
});
