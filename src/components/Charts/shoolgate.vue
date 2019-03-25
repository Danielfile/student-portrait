<template>
  <div :class="className" :id="id" :style="{height:height,width:width}"/>
</template>

<script>
import echarts from 'echarts'
import resize from './mixins/resize'
import { timestampToTime } from '@/utils/myDate'

var data = [
  [0, 0, '西 门', '1546323001000'],
  [0, 0, '东北门', '1546394903000'],
  [0, 0, '东 门', '1547181799000'],
  [0, 0, '东 门', '1550993023000'],
  [0, 0, '西 门', '1551515967000'],
  [0, 0, '东 门', '1552286577000'],
  [0, 0, '西 门', '1554001297000']
];  //data[0]、data[1]默认？不知如何修改。

var option = {
  backgroundColor: '#cafbfe',
  xAxis: {
    show: false,
    type: 'value',
    min: 0,
    max: 8
  },
  yAxis: {
    show: false,
    type: 'value',
    min: 0,
    max: 4
  },
  grid: {
    bottom: 0,
    top: 0,
    left: 0,
    right: 0
  },
  tooltip: {
    formatter: function (obj) {
      if(obj.name == ""){
        return timestampToTime(Number(obj.data[3]));
      }
      return ;
    },
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
  series: [{
    type: 'custom',
    name: 'custom',
    itemStyle: {
      normal: {
        color: new echarts.graphic.LinearGradient(0,0,0,1, [
          {offset: 0, color: '#52a5b4'},
          {offset: 1, color: '#14b7f0'}
        ]),
        shadowBlur: 20,
        shadowOffsetX: -15,
        shadowOffsetY: 15,
        shadowColor: 'rgba(0,0,0,0.8)'
      },
      emphasis: {
        color: new echarts.graphic.LinearGradient(0.5,0,0.5,1, [
            {offset: 0, color: '#63E4FBCC'},
            {offset: 1, color: '#028BBBCC'}
        ])
      }
    },
    renderItem: function(params, api) {
      var value = api.value(2);
      var name = timestampToTime(api.value(3)).split(' ')[0];
      var d = 30 * Math.random() + 40;
      var coord = api.coord([params.dataIndexInside + 1, (params.dataIndexInside) % 3 + 1]);
      var x = coord[0];
      var y = coord[1];
      var points = {
        left: [x - d, y],
        right: [x + d, y],
        top: [x, y - d],
        bottom: [x, y + d]
      }
      var labelWidth = 17;
      var labelHeight = 9;
      return {
        type: 'group',
        children: [
          {
            type: 'polygon',
            shape: {
              points: [points.left, points.top, points.right, points.bottom, points.left]
            },
            style: api.style(),
            styleEmphasis: api.styleEmphasis()
          },
          {
            type: 'group',
            children: [
              {
                type: 'text',
                style: {
                  text: value,
                  x: x - labelWidth,
                  y: y - labelHeight,
                  fill: '#fff',
                  font: 'normal 16px "Microsoft YaHei", sans-serif'
                }
              }
            ]
          },
          {
            type: 'text',
            style: {
              text: name,
              x: x - (name.length * 5),
              y: y - d - 18,
              fill: '#8492A6',
              font: 'normal 16px "Microsoft YaHei", sans-serif'
            }
          }
        ]
      }
    },
    data: data,
    animationDuration: 1500,
    animationEasing: 'sinusoidalInOut',
    animationDelay: function(idx) {
      return idx * 300;
    }
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
    }
  }
}
</script>
