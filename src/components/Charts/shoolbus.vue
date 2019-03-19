<template>
  <div :class="className" :id="id" :style="{height:height,width:width}"/>
</template>

<script>
import echarts from 'echarts'
import resize from './mixins/resize'

var graphData = [
  [
    1546323001000,
    2
  ],
  [
    1546394903000,
    4
  ],
  [
    1546681383000,
    2
  ],
  [
    1546733039000,
    5
  ],
  [
    1547179649000,
    1
  ],
  [
    1550993023000,
    1
  ],
  [
    1551061463000,
    4
  ],
  [
    1551515967000,
    2
  ],
  [
    1551666319000,
    2
  ],
  [
    1552114187000,
    2
  ],
  [
    1552286577000,
    2
  ],
  [
    1552890802000,
    1
  ],
  [
    1553495367000,
    2
  ],
  [
    1554001297000,
    4
  ]
];
var links = graphData.map(function (item, idx) {
  return {
    source: idx,
    target: idx + 1
  };
});
links.pop();

function getVirtulData(year) {
  year = year || '2019';
  var date = +echarts.number.parseDate(year + '-01-01');
  var end = +echarts.number.parseDate((+year + 1) + '-01-01');
  var dayTime = 3600 * 24 * 1000;
  var data = [];
  for (var time = date; time < end; time += dayTime) {
    data.push([
      echarts.format.formatTime('yyyy-MM-dd', time),
      Math.floor(Math.random() * 10)
    ]);
  }
  return data;
}


var option = {
  backgroundColor: '#D7EBFF',
  title: {
    text: '校 车',
    x: '20',
    top: '20',
    textStyle: {
      color: '#5291FF',
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
    orient: 'vertical',
    color: ['#1e90ff','#22bb22','#4b0082','#d2691e'],
    feature: {
      saveAsImage: {  
        pixelRatio: 2  
      }
    }
  },
  calendar: {
    top: 'middle',
    left: 'center',
    orient: 'horizontal',
    cellSize: 70,
    yearLabel: {
      margin: 50,
      textStyle: {
        fontSize: 30
      }
    },
    dayLabel: {
      firstDay: 1,
      nameMap: 'cn'
    },
    monthLabel: {
      nameMap: 'cn',
      margin: 15,
      textStyle: {
        fontSize: 20,
        color: '#999'
      }
    },
    range: ['2019-01-01', '2019-03-31']
  },
  visualMap: {
    min: 0,
    max: 10,
    type: 'piecewise',
    left: 'center',
    bottom: 20,
    inRange: {
      color: ['#C7DBFF',  '#5291FF']
    },
    seriesIndex: [1],
    orient: 'horizontal'
  },
  series: [{
    type: 'graph',
    edgeSymbol: ['none', 'arrow'],
    coordinateSystem: 'calendar',
    links: links,
    symbolSize: function (graphData) {
        return graphData[1]*5;
    },
    calendarIndex: 0,
    itemStyle: {
      normal: {
        color: 'yellow',
        shadowBlue: 9,
        shadowOffsetX: 1.5,
        shadowOffsetY: 3,
        shadowColor: '#555'
      }
    },
    lineStyle: {
      normal: {
        color: '#354453',
        width: 1,
        opacity: 0.6
      }
    },
    data: graphData,
    z: 20
  }, 
  {
    type: 'heatmap',
    coordinateSystem: 'calendar',
    label: {
      normal: {
        show: true,
        formatter: function (params) {
            var d = echarts.number.parseDate(params.value[0]);
            return d.getDate();
        },
        textStyle: {
            color: '#000',
            fontSize: 18
        }
      }
    },
    data: getVirtulData(2019)
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
