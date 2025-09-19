/**
 * Standard ECharts Configuration Patterns
 * Use these as base configurations for consistency across the platform
 */

// Base chart configuration with responsive settings
const baseChartConfig = {
    // Responsive grid settings
    grid: {
        left: '3%',
        right: '4%',
        bottom: '3%',
        containLabel: true
    },
    
    // Standard tooltip configuration
    tooltip: {
        trigger: 'axis',
        axisPointer: {
            type: 'cross',
            label: {
                backgroundColor: '#6a7985'
            }
        },
        formatter: function(params) {
            // Custom formatter for consistent tooltip display
            let result = `${params[0].name}<br/>`;
            params.forEach(item => {
                result += `${item.marker} ${item.seriesName}: ${item.value.toLocaleString()}<br/>`;
            });
            return result;
        }
    },
    
    // Standard toolbox features
    toolbox: {
        feature: {
            saveAsImage: { title: 'Save' },
            dataZoom: { title: { zoom: 'Zoom', back: 'Reset' } },
            restore: { title: 'Restore' },
            dataView: { title: 'View Data', readOnly: false }
        }
    }
};

// Line chart pattern for time series data
export function createLineChart(container, data, options = {}) {
    const chart = echarts.init(container);
    
    const chartOption = {
        ...baseChartConfig,
        
        // X-axis for time series
        xAxis: {
            type: 'category',
            boundaryGap: false,
            data: data.dates || [],
            axisLabel: {
                rotate: 45,
                formatter: function(value) {
                    // Format date labels
                    return new Date(value).toLocaleDateString('en-US', {
                        month: 'short',
                        day: 'numeric'
                    });
                }
            }
        },
        
        // Y-axis with automatic formatting
        yAxis: {
            type: 'value',
            axisLabel: {
                formatter: function(value) {
                    // Format large numbers
                    if (value >= 1000000) {
                        return (value / 1000000).toFixed(1) + 'M';
                    } else if (value >= 1000) {
                        return (value / 1000).toFixed(1) + 'K';
                    }
                    return value;
                }
            }
        },
        
        // Series configuration
        series: data.series || [],
        
        // Custom color palette
        color: ['#667eea', '#ffa502', '#2ed573', '#ff4757', '#5f63d8'],
        
        // Animation settings
        animation: true,
        animationDuration: 1000,
        animationEasing: 'cubicOut',
        
        ...options
    };
    
    chart.setOption(chartOption);
    
    // Make chart responsive
    window.addEventListener('resize', () => {
        chart.resize();
    });
    
    return chart;
}

// Bar chart pattern for categorical data
export function createBarChart(container, data, options = {}) {
    const chart = echarts.init(container);
    
    const chartOption = {
        ...baseChartConfig,
        
        xAxis: {
            type: 'category',
            data: data.categories || [],
            axisLabel: {
                interval: 0,
                rotate: 30
            }
        },
        
        yAxis: {
            type: 'value',
            name: data.yAxisName || ''
        },
        
        series: [{
            name: data.seriesName || 'Value',
            type: 'bar',
            data: data.values || [],
            // Gradient color pattern
            itemStyle: {
                color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                    { offset: 0, color: '#667eea' },
                    { offset: 1, color: '#764ba2' }
                ])
            },
            emphasis: {
                itemStyle: {
                    color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                        { offset: 0, color: '#5f63d8' },
                        { offset: 1, color: '#6a4c93' }
                    ])
                }
            }
        }],
        
        ...options
    };
    
    chart.setOption(chartOption);
    
    window.addEventListener('resize', () => {
        chart.resize();
    });
    
    return chart;
}

// Pie chart pattern for composition data
export function createPieChart(container, data, options = {}) {
    const chart = echarts.init(container);
    
    const chartOption = {
        tooltip: {
            trigger: 'item',
            formatter: '{a} <br/>{b}: {c} ({d}%)'
        },
        
        legend: {
            orient: 'vertical',
            left: 'left',
            data: data.map(item => item.name)
        },
        
        series: [{
            name: options.seriesName || 'Distribution',
            type: 'pie',
            radius: ['40%', '70%'], // Donut chart
            avoidLabelOverlap: false,
            itemStyle: {
                borderRadius: 10,
                borderColor: '#fff',
                borderWidth: 2
            },
            label: {
                show: false,
                position: 'center'
            },
            emphasis: {
                label: {
                    show: true,
                    fontSize: '30',
                    fontWeight: 'bold'
                }
            },
            labelLine: {
                show: false
            },
            data: data
        }],
        
        color: ['#667eea', '#ffa502', '#2ed573', '#ff4757', '#5f63d8', '#fab1a0', '#74b9ff'],
        
        ...options
    };
    
    chart.setOption(chartOption);
    
    window.addEventListener('resize', () => {
        chart.resize();
    });
    
    return chart;
}

// Heatmap pattern for correlation data
export function createHeatmap(container, data, options = {}) {
    const chart = echarts.init(container);
    
    const chartOption = {
        ...baseChartConfig,
        
        xAxis: {
            type: 'category',
            data: data.xCategories || [],
            splitArea: {
                show: true
            }
        },
        
        yAxis: {
            type: 'category',
            data: data.yCategories || [],
            splitArea: {
                show: true
            }
        },
        
        visualMap: {
            min: data.min || 0,
            max: data.max || 100,
            calculable: true,
            orient: 'horizontal',
            left: 'center',
            bottom: '5%',
            color: ['#ff4757', '#ffa502', '#2ed573']
        },
        
        series: [{
            name: 'Heatmap',
            type: 'heatmap',
            data: data.values || [],
            label: {
                show: true
            },
            emphasis: {
                itemStyle: {
                    shadowBlur: 10,
                    shadowColor: 'rgba(0, 0, 0, 0.5)'
                }
            }
        }],
        
        ...options
    };
    
    chart.setOption(chartOption);
    
    window.addEventListener('resize', () => {
        chart.resize();
    });
    
    return chart;
}

// Real-time update pattern
export function updateChartData(chart, newData) {
    const option = chart.getOption();
    
    // Update series data
    if (newData.series) {
        option.series = newData.series;
    }
    
    // Update axis data
    if (newData.xAxis) {
        option.xAxis[0].data = newData.xAxis;
    }
    
    // Apply updates with animation
    chart.setOption(option, {
        notMerge: false,
        lazyUpdate: false,
        silent: false
    });
}

// Chart disposal pattern (important for memory management)
export function disposeChart(chart) {
    if (chart && !chart.isDisposed()) {
        chart.dispose();
    }
}

// Example usage:
/*
// Initialize a line chart
const container = document.getElementById('trafficChart');
const trafficData = {
    dates: ['2024-01-01', '2024-01-02', '2024-01-03'],
    series: [{
        name: 'Organic Traffic',
        type: 'line',
        data: [1200, 1320, 1010],
        smooth: true,
        areaStyle: { opacity: 0.1 }
    }]
};

const chart = createLineChart(container, trafficData);

// Update data later
updateChartData(chart, {
    series: [{
        name: 'Organic Traffic',
        type: 'line',
        data: [1200, 1320, 1010, 1150],
        smooth: true
    }]
});

// Clean up when done
disposeChart(chart);
*/