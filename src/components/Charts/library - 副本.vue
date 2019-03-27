<template>
  <div :class="className" :id="id" :style="{height:height,width:width}"/>
</template>

<script>
import echarts from 'echarts'
import resize from './mixins/resize'
import $ from 'jquery'

var d;
var option = {
  title: {
    text: '图 书 馆',
    left: '50%',
    textAlign: 'center'
  },
  grid: {
    left: 0,
    right: 20,
    bottom: 100,
    top: 30
  },
  tooltip: {
    formatter: function(params) {
      if (params.componentSubType == 'pictorialBar') {
        return '电影：' + params.name + '</br> 豆瓣评分：' + (params.value * 1 + 10).toFixed(1);
      }
    }
  },
  xAxis: {
    data: []
  },
  yAxis: {
    splitLine: {
      show: false
    },
    axisLine: {
      show: false
    }
  },
  series: [{
    type: 'bar',
    barWidth: 1,
    data: [],
    animationDelay: function(idx) {
        return idx * 100;
    }
  }, {
    type: 'pictorialBar',
    symbolPosition: 'end',
    symbolRotate: 165,
    symbolOffset: ['20%', '100%'],
    data: [],
    animationDelay: function(idx) {
      return idx * 100 + 500;
    }
  }, {
    type: 'graph',
    data: [{
      x: 0,
      y: 0,
      symbolSize: 0
    }, {
      name: 'btn',
      x: 0,
      y: 10,
      symbolSize: 30
    }],
    itemStyle: {
      normal: {
        color: 'transparent',
        borderWidth: 1,
        borderColor: '#555'
      }
    }
  }]
};
var setData = (function() {
  var mark = 1;
  return function() {
    var pics = [];
    for (var i = 0; i < d.subjects.length; i++) {
      pics.push({
        value: ((d.subjects[i].rating.average || 0.1) - 10).toFixed(1),
        symbol: 'image://http://img3' + d.subjects[1].images.small.substr(11),
        symbolSize: ['48.75', '75'],
        name: d.subjects[i].title
      })
    }
    if (mark % 2 === 0) {
      pics.sort(function(a, b) {
        return (mark / 2 | Math.round(Math.random())) % 2 === 0 ? (b.value - a.value) : (a.value - b.value)
      })
    }
    //console.log(pics);
    option.series[0].data = pics;
    option.series[1].data = pics;
    myChart.setOption(option);
    mark++;
  }
})();
$.ajax({
  type: "GET",
  url: "http://api.douban.com/v2/movie/in_theaters",
  dataType: "jsonp",
  success: function(data) {
    d = data;
    setData();
  }
});

var myChart;
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
      myChart.on('click', function(params) {
        if (params.name == 'btn') {
            setData();
        }
    })
    }
  }
}
</script>
