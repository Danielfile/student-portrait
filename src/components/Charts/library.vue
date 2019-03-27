<template>
  <div :class="className" :id="id" :style="{height:height,width:width}"/>
</template>

<script>
import echarts from 'echarts'
import resize from './mixins/resize'
import { timestampToTime } from '@/utils/myDate'
import $ from 'jquery'

var d;
var flag = false; //记录是否打印了图片网址
var option = {
  title: {
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
        if(!flag){
          console.log(params.data.symbol); //如果不刷新，则图片可能显示不出来
          flag = true;
        }
        return '自习室：' + params.name 
        + '</br> 开始时间：' + timestampToTime(params.data.times[0].start) 
        + '</br> 结束时间：' + timestampToTime(params.data.times[1].end);
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
    for (var i = 0; i < d[2].records.length; i++) {
      var start = Number(d[2].records[i].start);
      var end = Number(d[2].records[i].end);
      var time = (end - start)/6480000;
      pics.push({
        value: ((time || 0.1) - 10).toFixed(1),
        symbol: 'image://http://img3' + d[1].images[0].small.substr(11),  //显示学生图片
        symbolSize: ['48.75', '75'],
        times: [{start},{end}],  //将自习起始时间作为数据传入
        name: d[2].records[i].local  //自习教室
      })
    }
    if (mark % 2 === 0) {
      pics.sort(function(a, b) {
        return (mark / 2 | 0) % 2 === 0 ? (b.value - a.value) : (a.value - b.value)
      })
    }
    option.title.text = '打卡之 ' + d[0].id + ' 同学';
    option.series[0].data = pics;
    option.series[1].data = pics;
    myChart.setOption(option);
    mark++;
  }
})();

$.ajax({
  type: "GET",
  url: "http://www.heiyour.com/student-portrait//library-datas.php",
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
