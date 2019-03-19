<template>
  <div :class="className" :id="id" :style="{height:height,width:width}"/>
</template>

<script>
import echarts from 'echarts'
import resize from './mixins/resize'

const xData = (function() {
  const data = []
  for (let i = 1; i < 31; i++) {
    data.push('第'+ i + '天')
  }
  return data
}())
var option = {
  backgroundColor: '#304156',
  title: {
    text: '食 堂',
    x: '20',
    top: '20',
    textStyle: {
      color: '#fff',
      fontSize: '22'
    },
    subtextStyle: {
      color: '#90979c',
      fontSize: '16'
    }
  },
  toolbox: {  
    show: true,  
    itemSize: 20,
    itemGap: 30,
    right: 10,
    color: ['#1e90ff','#22bb22','#4b0082','#d2691e'],
    backgroundColor: 'rgba(31,45,61,0.3)',
    feature: {  
      dataView: {show:true},  
      saveAsImage: {  
        pixelRatio: 2  
      },
      magicType: {
        show: true,
        title: {
            line: '动态类型切换-折线图',
            bar: '动态类型切换-柱形图',
            tiled: '动态类型切换-平铺'
        },
        type: ['line', 'bar', 'tiled']
      },
      restore: {
        show: true,
        title: '还原',
        color: 'black'
      }
    }
  },
  tooltip: {
    trigger: 'axis',
    axisPointer: {
      textStyle: {
        color: '#fff'
      }
    }
  },
  grid: {
    left: '5%',
    right: '5%',
    borderWidth: 0,
    top: 150,
    bottom: 95,
    textStyle: {
      color: '#fff'
    }
  },
  legend: {
    x: '5%',
    top: '10%',
    textStyle: {
      color: '#90979c'
    },
    data: ['早上', '中午', '晚上', '班级平均']
  },
  calculable: true,
  xAxis: [{
    type: 'category',
    axisLine: {
      lineStyle: {
        color: '#90979c'
      }
    },
    splitLine: {
      show: false
    },
    axisTick: {
      show: false
    },
    splitArea: {
      show: false
    },
    axisLabel: {
      interval: 0

    },
    data: xData
  }],
  yAxis: [{
    type: 'value',  // 表示个人一天消费
    min: 0,
    max: 30,
    interval: 5,
    splitLine: {
      show: false
    },
    axisLine: {
      lineStyle: {
        color: '#90979c'
      }
    },
    axisTick: {
      show: false
    },
    splitArea: {
      show: false
    }
  },
  {
    type: 'value',  // 表示班级均分
    min: 0,
    max: 30,
    interval: 5,
    splitLine: {
      show: false
    },
    axisLine: {
      lineStyle: {
        color: '#90979c'
      }
    },
    axisTick: {
      show: false
    },
    axisLabel: {
      show: false
    },
    axisLine: {
      show: false
    },
    splitArea: {
      show: false
    }
  }],
  dataZoom: [{
    show: true,
    height: 30,
    xAxisIndex: [
      0
    ],
    bottom: 30,
    start: 10,
    end: 80,
    handleIcon: 'path://M306.1,413c0,2.2-1.8,4-4,4h-59.8c-2.2,0-4-1.8-4-4V200.8c0-2.2,1.8-4,4-4h59.8c2.2,0,4,1.8,4,4V413z',
    handleSize: '110%',
    handleStyle: {
      color: '#d3dee5'

    },
    textStyle: {
      color: '#fff' },
    borderColor: '#90979c'

  }, {
    type: 'inside',
    show: true,
    height: 15,
    start: 1,
    end: 35
  }],
  series: [{
    name: '早上',
    type: 'bar',
    yAxisIndex: 1,
    stack: 'one',
    barMaxWidth: 35,
    barGap: '10%',
    itemStyle: {
      normal: {
        color: 'rgba(0,191,183,1)',
        label: {
          show: true,
          textStyle: {
            color: '#fff'
          },
          position: 'insideTop',
          formatter(p) {
            return p.value > 0 ? p.value : ''
          }
        }
      }
    },
    data: [
      4.5, 3.5, 0.0, 5.0, 3.0, 4.5, 2.8, 2.5, 0.0, 8.0,
      4.0, 0.0, 3.5, 2.8, 1.0, 5.5, 2.5, 1.5, 3.0, 0.0,
      2.8, 4.5, 2.5, 2.8, 0.0, 0.0, 2.5, 1.5, 2.8, 0.0
    ]
  },

  {
    name: '中午',
    type: 'bar',
    yAxisIndex: 1,
    stack: 'one',
    itemStyle: {
      normal: {
        color: 'rgba(88,191,183,1)',
        barBorderRadius: 0,
        label: {
          show: true,
          position: 'insideTop',
          formatter(p) {
            return p.value > 0 ? p.value : ''
          }
        }
      }
    },
    data: [
      8.0, 10.0, 12.0, 7.5, 10.0, 7.8, 9.5, 0.0, 6.0, 10.5,
      9.0, 8.0, 9.5, 8.0, 7.5, 8.0, 10.0, 7.5, 8.5, 0.0,
      7.5, 4.5, 7.5, 8.0, 6.0, 6.5, 7.5, 8.0, 6.5, 6.5
    ]
  },
  {
    name: '晚上',
    type: 'bar',
    yAxisIndex: 1,
    stack: 'one',
    itemStyle: {
      normal: {
        color: 'rgba(151,191,183,1)',
        barBorderRadius: 0,
        label: {
          show: true,
          position: 'insideTop',
          formatter(p) {
            return p.value > 0 ? p.value : ''
          }
        }
      }
    },
    data: [
      10.0, 8.0, 11.0, 8.5, 8.0, 9.5, 10.5, 7.0, 8.0, 8.0,
      11.5, 9.0, 8.0, 11.5, 7.5, 8.0, 8.5, 9.0, 7.5, 0.0,
      8.0, 7.5, 6.5, 5.5, 7.5, 7.0, 0.0, 7.5, 7.0, 8.0
    ]
  }, 
  {
    name: '班级平均',
    type: 'line',
    symbolSize: 10,
    symbol: 'circle',
    itemStyle: {
      normal: {
        color: 'rgba(252,230,48,1)',
        barBorderRadius: 0,
        label: {
          show: true,
          position: 'top',
          formatter(p) {
            return p.value > 0 ? p.value : ''
          }
        }
      }
    },
    data: [
      18.0, 20.5, 19.8, 21.3, 19.9, 20.8, 21.8, 18.6, 20.7, 22.5,
      19.9, 21.3, 22.0, 18.8, 19.7, 20.5, 21.8, 19.7, 23.0, 18.7,
      18.9, 19.9, 21.0, 20.1, 19.8, 20.5, 19.4, 19.3, 18.9, 19.5
    ]
  }
  ]
};


export default {
  mixins: [resize],
  props: {
    className: {
      type: String,
      default: 'chart'
    },
    id: {
      type: String,
      default: 'chart'
    },
    width: {
      type: String,
      default: '200px'
    },
    height: {
      type: String,
      default: '200px'
    }
  },
  data() {
    return {
      chart: null
    }
  },
  mounted() {
    this.initChart()
  },
  beforeDestroy() {
    if (!this.chart) {
      return
    }
    this.chart.dispose()
    this.chart = null
  },
  methods: {
    initChart() {
      this.chart = echarts.init(document.getElementById(this.id))
      this.chart.setOption(option)
    }
  }
}
</script>
