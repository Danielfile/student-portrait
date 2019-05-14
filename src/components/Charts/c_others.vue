<template>
  <div :class="className" :id="id" :style="{height:height,width:width}"/>
</template>

<script>
import echarts from 'echarts'
import resize from './mixins/resize'

var cellSize = [130, 90];
var pieRadius = 40;

function getVirtulData() {
  var date = +echarts.number.parseDate('2019-03-01');
  var end = +echarts.number.parseDate('2019-04-01');
  var dayTime = 3600 * 24 * 1000;
  var data = [];
  for (var time = date; time < end; time += dayTime) {
    data.push([
      echarts.format.formatTime('yyyy-MM-dd', time),
      Math.floor(Math.random() * 10000)
    ]);
  }
  return data;
}

function getPieSeries(scatterData, chart) {
  return echarts.util.map(scatterData, function (item, index) {
    var center = chart.convertToPixel('calendar', item);
    return {
      id: index + 'pie',
      type: 'pie',
      center: center,
      label: {
        normal: {
          formatter: '',
          position: 'inside'
        }
      },
      radius: pieRadius,
      data: [
        {name: '超市', value: Math.round(Math.random() * 10)},
        {name: '浴室', value: Math.round(Math.random() * 1)},
        {name: '其它', value: Math.round(Math.random() * 10)}
      ]
    };
  });
}

var scatterData = getVirtulData();

var option = {
  backgroundColor: '#D7EBFF',
  tooltip : {
    formatter: '{b}消费占比：{d}%',
    tooltip: {
      show: true
    }
  },
  toolbox: {  
    show: true,  
    itemSize: 20,
    itemGap: 30,
    right: 20,
    orient: 'vertical',
    color: ['#1e90ff','#22bb22','#4b0082','#d2691e'],
    feature: {
      saveAsImage: {  
        pixelRatio: 2  
      }
    }
  },
  color:['#5F868B', '#78C5CD','#A0E0E0'],
  legend: {
    data: ['超市', '浴室', '其它'],
    bottom: 20
  },
  calendar: {
    top: 'middle',
    left: 'center',
    orient: 'vertical',
    cellSize: cellSize,
    yearLabel: {
      margin: 50,
      textStyle: {
        fontSize: 30
      }
    },
    dayLabel: {
      margin: 20,
      firstDay: 1,
      textStyle: {
        fontSize: 20,
        color: '#314561'
      },
      nameMap: ['星期日', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六']
    },
    monthLabel: {
      nameMap: 'cn',
      margin: 30,
      textStyle: {
        fontSize: 25,
        color: '#314561'
      }
    },
    range: ['2019-03']
  },
  series: [{
    id: 'label',
    type: 'scatter',
    coordinateSystem: 'calendar',
    symbolSize: 1,
    label: {
      normal: {
        show: true,
        formatter: function (params) {
          return echarts.format.formatTime('dd', params.value[0]);
        },
        offset: [-cellSize[0] / 2 + 10, -cellSize[1] / 2 + 10],
        textStyle: {
          color: '#314561',
          fontSize: 16
        }
      }
    },
    data: scatterData
  }]
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
      this.chart.setOption({
        series: getPieSeries(scatterData, this.chart)
      })
    }
  }
}
</script>
