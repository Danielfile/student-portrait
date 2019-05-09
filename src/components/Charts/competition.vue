<template>
  <div :class="className" :id="id" :style="{height:height,width:width}"/>
</template>

<script>
import echarts from 'echarts'
import resize from './mixins/resize'

// var imgPath = ['http://bmob-cdn-15355.b0.upaiyun.com/2017/12/01/bee4341c4089af7980b87074a77479ad.png']
var option = {
  backgroundColor: '#D7EBFF',
  color: ['#00c2ff', '#f9cf67', '#e92b77'],
  legend: {
    show: true,
    bottom: 45,
    center: 0,
    itemWidth: 25, // 图例标记的图形宽度。[ default: 25 ]
    itemHeight: 14, // 图例标记的图形高度。[ default: 14 ]
    itemGap: 21, // 图例每项之间的间隔。[ default: 10 ]横向布局时为水平间隔，纵向布局时为纵向间隔。
    textStyle: {
      fontSize: 14,
      color: '#314561'
    },
    data: ['2016', '2017', '2018'],
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
  radar: [{
      
    indicator: [{
        text: '运动项',
        max: 100
      },
      {
        text: '数学项',
        max: 100
      },
      {
        text: '英语项',
        max: 100
      },
      {
        text: '创新项',
        max: 100
      },
      {
        text: '其它项',
        max: 100
      }
    ],

    textStyle: {
      color: 'red'
    },
    center: ['50%', '50%'],
    radius: 300,
    startAngle: 90,
    splitNumber: 3,
    orient: 'horizontal', // 图例列表的布局朝向,默认'horizontal'为横向,'vertical'为纵向.
    // shape: 'circle',
    // backgroundColor: {
    //    image:imgPath[0]
    // },
    name: {
      formatter: '{value}',
      textStyle: {
        fontSize: 14, //外圈标签字体大小
        color: '#5b81cb' //外圈标签字体颜色
      }
    },
    splitArea: { // 坐标轴在 grid 区域中的分隔区域，默认不显示。
      show: true,
      areaStyle: { // 分隔区域的样式设置。
        color: ['#141c42', '#141c42'], // 分隔区域颜色。分隔区域会按数组中颜色的顺序依次循环设置颜色。默认是一个深浅的间隔色。
      }
    },
    // axisLabel:{//展示刻度
    //    show: true
    // },
    axisLine: { //指向外圈文本的分隔线样式
      lineStyle: {
        color: '#153269'
      }
    },
    splitLine: {
      lineStyle: {
        color: '#113865', // 分隔线颜色
        width: 1, // 分隔线线宽
      }
    }
  }, ],
  series: [{
    name: '雷达图',
    type: 'radar',
    itemStyle: {
      emphasis: {
        lineStyle: {
          width: 4
        }
      }
    },
    data: [{
      name: '2016',
      value: [30, 0, 55, 0, 60],
      content:['校运动会二等奖','','英语四级470分','','计算机二级86分'],
      areaStyle: {
        normal: { // 单项区域填充样式
          color: {
            type: 'linear',
            x: 0, //右
            y: 0, //下
            x2: 1, //左
            y2: 1, //上
            colorStops: [{
                offset: 0,
                color: '#00c2ff'
            }, {
                offset: 0.5,
                color: 'rgba(0,0,0,0)'
            }, {
                offset: 1,
                color: '#00c2ff'
            }],
            globalCoord: false
          },
          opacity: 1 // 区域透明度
        }
      },
      symbolSize: 2.5, // 单个数据标记的大小，可以设置成诸如 10 这样单一的数字，也可以用数组分开表示宽和高，例如 [20, 10] 表示标记宽为20，高为10。
      label: {                    // 单个拐点文本的样式设置                            
        normal: {  
          show: true,             // 单个拐点文本的样式设置。[ default: false ]
          position: 'top',        // 标签的位置。[ default: top ]
          distance: 2,            // 距离图形元素的距离。当 position 为字符描述值（如 'top'、'insideRight'）时候有效。[ default: 5 ]
          color: '#00c2ff',          // 文字的颜色。如果设置为 'auto'，则为视觉映射得到的颜色，如系列色。[ default: "#fff" ]
          fontSize: 14,           // 文字的字体大小
          formatter:function(params) { 
            var i=0;
            while(params.data.value[i]!=params.value) i++;
            return params.data.content[i];  
          }  
        }  
      },
      itemStyle: {
        normal: { //图形悬浮效果
          borderColor: '#00c2ff',
          borderWidth: 2.5
        }
      },
      // lineStyle: {
      //   normal: {
      //     opacity: 0.5// 图形透明度
      //   }
      // }
    }, {
        name: '2017',
        value: [77, 60, 73, 46, 66],
        content:['马拉松比赛省一等奖','数学建模省三等奖','英语留级452分','启迪杯校一等奖','普通话89分'],
        symbolSize: 2.5,
        label: {                                              
          normal: {  
            show: true, 
            position: 'top',
            distance: 2, 
            color: '#f9cf67',
            fontSize: 14,
            formatter:function(params) { 
              var i=0;
              while(params.data.value[i]!=params.value) i++;
              return params.data.content[i];  
            }  
          }  
      },
        itemStyle: {
          normal: {
            borderColor: '#f9cf67',
            borderWidth: 2.5,
          }
        },
        areaStyle: {
          normal: { // 单项区域填充样式
            color: {
              type: 'linear',
              x: 0, //右
              y: 0, //下
              x2: 1, //左
              y2: 1, //上
              colorStops: [{
                offset: 0,
                color: '#f9cf67'
              }, {
                offset: 0.5,
                color: 'rgba(0,0,0,0)'
              }, {
                offset: 1,
                color: '#f9cf67'
              }],
              globalCoord: false
            },
            opacity: 1 // 区域透明度
          }
        },
        // lineStyle: {
        //   normal: {
        //     opacity: 0.5// 图形透明度
        //   }
        // }
    }, {
        name: '2018',
        value: [0, 0, 0, 82, 77],
        content:['','','','三创赛国家三等奖','教师资格证、会计从业资格证'],
        symbolSize: 2.5,
        label: {                                              
          normal: {  
            show: true, 
            position: 'top',
            distance: 2, 
            color: '#e92b77',
            fontSize: 14,
            formatter:function(params) { 
              var i=0;
              while(params.data.value[i]!=params.value) i++;
              return params.data.content[i];  
            }  
          }  
      },
        itemStyle: {
          normal: {
            borderColor: '#e92b77',
            borderWidth: 2.5,
          }
        },
        areaStyle: {
          normal: { // 单项区域填充样式
            color: {
              type: 'linear',
              x: 0, //右
              y: 0, //下
              x2: 1, //左
              y2: 1, //上
              colorStops: [{
                offset: 0,
                color: '#e92b77'
              }, {
                offset: 0.5,
                color: 'rgba(0,0,0,0)'
              }, {
                offset: 1,
                color: '#e92b77'
              }],
              globalCoord: false
            },
            opacity: 1 // 区域透明度
          }
        }
    }]
  }, ]
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
