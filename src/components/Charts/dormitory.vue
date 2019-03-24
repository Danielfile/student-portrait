<template>
  <div :class="className" :id="id" :style="{height:height,width:width}"/>
</template>

<script>
import echarts from 'echarts'
import resize from './mixins/resize'

function dataFormatter(obj) {
  if(init) return obj;
  var pList = [];
  for(var i=0; i<60; i++){
    if(i<10) pList[i] = '0'+i;
    else pList[i] = i+'';
  }
  for(var i=0; i<24; i++){
    var now = 0;
    var sum = 0;
    for(var j=0; j<60; j++){
      now = Math.round(Math.random()*19);
      sum += now;
      obj[i][j] = {
          name : pList[i],
          value : now
      };
    }
  }
  return obj;
}
var init = false;
var dataGate = dataFormatter({
  0:[], 1:[], 2:[], 3:[], 4:[], 5:[], 6:[], 7:[],
  8:[], 9:[],10:[], 11:[], 12:[], 13:[], 14:[], 15:[],
  16:[], 17:[], 18:[], 19:[], 20:[], 21:[], 22:[], 23:[]
});


var option = {
  baseOption: {
    timeline: {
      axisType: 'category',
      autoPlay: true,
      playInterval: 2000,
      data: [
        '8:23:03', '10:25:12', '11:45:59', '15:07:15', '15:57:15',
        {
          value: '18:01:21',         
          symbol: 'diamond',
          symbolSize: 16
        }
      ],
      tooltip: {
        formatter: '{b}'
      },
      label: {
        formatter : function(s) {
          return s.split(":")[0];
        }
      }
    },
    title: {
      subtext: '2019-04-01'
    },
    tooltip: {
      formatter: function (obj) {
        if(obj.dataType=="undefined"){  //鼠标移动到条形图不显示内容
           return ;
        }
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
        '00','\n01','02','\n03','04','\n05','06','\n07','08','\n09',
        '10','\n11','12','\n13','\n14','\n15','16','\n17','18','\n19',
        '20','\n21','22','\n23','\n24','\n25','26','\n27','28','\n29',
        '30','\n31','32','\n33','34','\n35','36','\n37','38','\n39',
        '40','\n41','42','\n43','44','\n45','46','\n47','48','\n49',
        '50','\n51','52','\n53','54','\n55','56','\n57','58','\n59'
      ],
      splitLine: {show: false}
    }
    ],
    yAxis: [
      {
        type: 'value',
        name: '次数',
        max: 20
      }
    ],
    series: [
      {
        name: '', 
        type: 'bar',
        itemStyle: {
          normal: {
            color: 'rgba(66,99,129,0.8)',
            label: {
              show: true,
              textStyle: {
                color: '#009'
              },
              position:  [0, -10],
              formatter(p) {
                return p.value > 0 ? p.value : ''
              }
            }
          }
        }
      }
    ]
  },
  options: [
    {
      title: {text: '星期天'},
      series: [
        {data: dataGate[8]}
      ]
    },
    {
      title : {text: '星期天'},
      series : [
        {data: dataGate[10]}
      ]
    },
    {
      title: {text: '星期天'},
      series: [
        {data: dataGate[11]}
      ]
    },
    {
      title : {text: '星期天'},
      series : [
        {data: dataGate[15]}
      ]
    },
    {
      title: {text: '星期天'},
      series: [
        {data: dataGate[15]}
      ]
    },
    {
      title : {text: '星期天'},
      series : [
        {data: dataGate[18]}
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
