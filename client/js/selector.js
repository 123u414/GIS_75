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
                update_data('高校数量', res);
            } else if (formData.type == 'gdp') {
                geoMap.setOption({
                    visualMap: {
                        min: 2000,
                        max: 140000,
                    }
                });
                update_data('GDP数据', res,'TOP 5')
            }

        })
        .catch(error => console.error('Error:', error));
});

geoMap.on('click', function (params) {
    formData = {
        name: params.name,
        type: document.getElementById('select-type').value,
    }
    if (params.name) {
        fetch('http://127.0.0.1:1949/history', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(formData)
        }).then(response => response.json())
            .then(res => {
                var xdata = [], ydata = [];
                for (var i = 0; i < res.length; i++) {
                    var tmpydata = res[i].year;
                    if (tmpydata) {
                        xdata.push(res[i].year)
                    }
                }
                console.log(xdata)
                for (var i = 0; i < res.length; i++) {
                    var tmpydata = res[i].value;
                    if (tmpydata) {
                        ydata.push(res[i].value)
                    }
                }
                float_coloumn_frame.setOption({
                    title: {
                        text: `${formData.name}历史${formData.type}数据`,
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
            })
    }


});
