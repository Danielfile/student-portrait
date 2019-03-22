<template>
  <div :class="className" :id="id" :style="{height:height,width:width}"/>
</template>

<script>
import echarts from 'echarts'
import resize from './mixins/resize'

var dataMap = {};
function dataFormatter(obj) {
  var pList = ['北京','天津','河北','山西','内蒙古','辽宁','吉林','黑龙江','上海','江苏','浙江','安徽','福建','江西','山东','河南','湖北','湖南','广东','广西','海南','重庆','四川','贵州','云南','西藏','陕西','甘肃','青海','宁夏','新疆'];
  var temp;
  for (var year = 2002; year <= 2003; year++) {
    var max = 0;
    var sum = 0;
    temp = obj[year];
    for (var i = 0, l = temp.length; i < l; i++) {
      max = Math.max(max, temp[i]);
      sum += temp[i];
      obj[year][i] = {
          name : pList[i],
          value : temp[i]
      }
    }
    obj[year + 'max'] = Math.floor(max / 100) * 100;
    obj[year + 'sum'] = sum;
  }
  return obj;
}

dataMap.dataGDP = dataFormatter({
  //max : 60000,
  2003:[5007.21,2578.03,6921.29,2855.23,2388.38,6002.54,2662.08,4057.4,6694.23,12442.87,9705.02,3923.11,4983.67,2807.41,12078.15,6867.7,4757.45,4659.99,15844.64,2821.11,713.96,2555.72,5333.09,1426.34,2556.02,185.09,2587.72,1399.83,390.2,445.36,1886.35],
  2002:[4315,2150.76,6018.28,2324.8,1940.94,5458.22,2348.54,3637.2,5741.03,10606.85,8003.67,3519.72,4467.55,2450.48,10275.5,6035.48,4212.82,4151.54,13502.42,2523.73,642.73,2232.86,4725.01,1243.43,2312.82,162.04,2253.39,1232.03,340.65,377.16,1612.6]
});


var option = {
  baseOption: {
    timeline: {
      // y: 0,
      axisType: 'category',
      // realtime: false,
      // loop: false,
      autoPlay: true,
      // currentIndex: 2,
      playInterval: 2000,
      // controlStyle: {
      //     position: 'left'
      // },
      data: [
        '2002-01-01','2003-01-01','2004-01-01',
        {
          value: '2005-01-01',
          tooltip: {
            formatter: '{b} GDP达到一个高度'
          },
          symbol: 'diamond',
          symbolSize: 16
        }
      ],
      label: {
        formatter : function(s) {
          return (new Date(s)).getFullYear();
        }
      }
    },
    title: {
      subtext: '数据来自国家统计局'
    },
    tooltip: {},
    legend: {
      x: 'right',
      data: ['GDP'],
      selected: {
          
      }
    },
    calculable : true,
    grid: {
      top: 80,
      bottom: 100
    },
    xAxis: [
    {
      'type':'category',
      'axisLabel':{'interval':0},
      'data':[
        '北京','\n天津','河北','\n山西','内蒙古','\n辽宁','吉林','\n黑龙江',
        '上海','\n江苏','浙江','\n安徽','福建','\n江西','山东','\n河南',
        '湖北','\n湖南','广东','\n广西','海南','\n重庆','四川','\n贵州',
        '云南','\n西藏','陕西','\n甘肃','青海','\n宁夏','新疆'
      ],
      splitLine: {show: false}
    }
    ],
    yAxis: [
      {
        type: 'value',
        name: 'GDP（亿元）',
        // max: 53500
        max: 30000
      }
    ],
    series: [
      {name: 'GDP', type: 'bar'}
    ]
  },
  options: [
    {
      title: {text: '2002全国宏观经济指标'},
      series: [
        {data: dataMap.dataGDP['2002']}
      ]
    },
    {
      title : {text: '2003全国宏观经济指标'},
      series : [
        {data: dataMap.dataGDP['2003']}
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
