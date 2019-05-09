<template>
  <div :class="className" :id="id" :style="{height:height,width:width}"/>
</template>

<script>
import echarts from 'echarts'
import resize from './mixins/resize'

var nodes = [{
    x: '9',
    y: '4',
    name: '宿舍',
    img: 'data-1547632686885-o5Rfi3tyk.png'
  },
  {
    x: '4',
    y: '9',
    name: '西大食堂',
    img: 'data-1547633192258-2EYYUDdcd.png'
  },
  {
    x: '0',
    y: '0',
    name: '五教',
    img: 'data-1547633192258-2EYYUDdcd.png',
    alarm: '在这时间最多哦！--8h20min'
  },
  {
    x: '7',
    y: '3',
    name: '利联',
    img: 'data-1547633094304-08Q_2YEvH.png'
  },
  {
    x: '12',
    y: '12',
    name: '里仁图书馆',
    img: 'data-1547632915872-WZMUphq72.png'
  },
  {
    x: '11',
    y: '0',
    name: '四体',
    img: 'data-1547632915872-WZMUphq72.png'
  }
]
var links = [{
    source: '宿舍',
    target: '西大食堂',
    name: '07:18'
  },
  {
    source: '西大食堂',
    target: '利联',
    name: '12:35'
  },
  {
    source: '利联',
    target: '宿舍',
    name: '12:52'
  },
  {
    source: '宿舍',
    target: '里仁图书馆',
    name: '13:41'
  },
  {
    source: '里仁图书馆',
    target: '五教',
    name: '14:37'
  },
  {
    source: '西大食堂',
    target: '五教',
    name: '18:33'
  },
  {
    source: '五教',
    target: '四体',
    name: '22:09'
  },
  {
    source: '四体',
    target: '宿舍',
    name: '22:09'
  }
]
var charts = {
  nodes: [],
  links: [],
  linesData: []
}
var dataMap = new Map()
for (var j = 0; j < nodes.length; j++) {
  var x = parseInt(nodes[j].x)
  var y = parseInt(nodes[j].y)
  var node = {
    name: nodes[j].name,
    value: [x, y],
    symbolSize: 50,
    alarm: nodes[j].alarm,
    //symbol: 'image:///asset/get/s/' + nodes[j].img, //图片问题暂未解决
    itemStyle: {
      normal: {
        color: '#12b5d0',
      }
    }
  }
  dataMap.set(nodes[j].name, [x, y])
  charts.nodes.push(node)
}
for (var i = 0; i < links.length; i++) {
  var link = {
    source: links[i].source,
    target: links[i].target,
    label: {
      normal: {
          show: true,
          formatter: links[i].name
      }
    },
    lineStyle: {
      normal: {
        color: '#14b7f0',
        curveness: 0
      }
    }
  }
  charts.links.push(link)
  // 组装动态移动的效果数据
  var lines = [{
    coord: dataMap.get(links[i].source)
  }, {
    coord: dataMap.get(links[i].target)
  }]
  charts.linesData.push(lines)
}
var option = {
  backgroundColor: '#D7EBFF',
  title: {
    text: '150105070028 路线图',
    subtext: '2019-5-9 星期四'
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
  xAxis: {
    show: false,
    type: 'value'
  },
  yAxis: {
    show: false,
    type: 'value'
  },
  series: [{
    type: 'graph',
    layout: 'none',
    coordinateSystem: 'cartesian2d',
    symbolSize: 50,
    label: {
      normal: {
        show: true,
        position: 'bottom',
        color: '#12b5d0'
      }
    },
    lineStyle: {
      normal: {
        width: 2,
        shadowColor: 'none'
      }
    },
    edgeSymbolSize: 8,
    data: charts.nodes,
    links: charts.links,
    itemStyle: {
      normal: {
        label: {
          show: true,
          formatter: function(item) {
            return item.data.name
          }
        }
      }
    }
  }, {
    name: 'A',
    type: 'lines',
    coordinateSystem: 'cartesian2d',
    z: 1,
    effect: {
      show: true,
      trailLength: 0,
      symbol: 'arrow',
      color: '#12b5d0',
      symbolSize: 8
    },
    lineStyle: {
      normal: {
        curveness: 0
      }
    },
    data: charts.linesData
  }]
};
var myChart;
// 用于告警的动态效果
setInterval(() => {
  var dataI = []
  for (var n = 0; n < nodes.length; n++) {
    var alarm = nodes[n].alarm
    if (alarm !== null && alarm !== '' && alarm !== undefined) {
      option.series[0].data[n].symbolSize = 60
      option.series[0].data[n].label = {
        normal: {
          color: '#DC143C'
        }
      }
      option.series[0].itemStyle.normal.label.formatter = function(item) {
        if (item.data.alarm !== undefined) {
          return item.data.name + '\n[ ' + item.data.alarm + ' ]'
        } else {
          return item.data.name
        }
      }
      dataI.push(n)
    }
  }
  myChart.setOption(option)
  setTimeout(() => {
    for (var m = 0; m < dataI.length; m++) {
      option.series[0].data[dataI[m]].symbolSize = 50
      option.series[0].data[dataI[m]].label = {
        normal: {
          color: '#12b5d0'
        }
      }
      option.series[0].itemStyle.normal.label.formatter = function(item) {
        return item.data.name
      }
    }
    myChart.setOption(option)
  }, 2000)
}, 4000);


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
      myChart = echarts.init(document.getElementById(this.id))
      myChart.setOption(option)
    }
  }
}
</script>
