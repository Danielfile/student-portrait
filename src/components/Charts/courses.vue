<template>
  <div :class="className" :id="id" :style="{height:height,width:width}"/>
</template>

<script>
import echarts from 'echarts'
import resize from './mixins/resize'
import * as d3 from "d3"

var stratify = d3.stratify()
  .parentId(function(d) {
    return d.id.substring(0, d.id.lastIndexOf(".")); 
  });

var rawData = [
  {id: "e-commerce", value: "", name:"电子商务专业"},

  {id: "e-commerce.degree", value: "", name:"学位课"},
  {id: "e-commerce.degree.math", value: "", name:"高数"},
  {id: "e-commerce.degree.math.I", value: "83", name:"高数I"},
  {id: "e-commerce.degree.math.II", value: "81", name:"高数II"},
  {id: "e-commerce.degree.math.III", value: "77", name:"高数III"},
  {id: "e-commerce.degree.math.IV", value: "89", name:"高数IV"},
  {id: "e-commerce.degree.pe", value: "", name:"体育"},
  {id: "e-commerce.degree.pe.I", value: "86", name:"体育I"},
  {id: "e-commerce.degree.pe.II", value: "77", name:"体育II"},
  {id: "e-commerce.degree.pe.III", value: "83", name:"体育III"},
  {id: "e-commerce.degree.pe.IV", value: "87", name:"体育IV"},
  {id: "e-commerce.degree.peTest", value: "", name:"体测"},
  {id: "e-commerce.degree.peTest.I", value: "67", name:"体测I"},
  {id: "e-commerce.degree.peTest.II", value: "73", name:"体测II"},
  {id: "e-commerce.degree.peTest.III", value: "77", name:"体测III"},
  {id: "e-commerce.degree.peTest.IV", value: "76", name:"体测IV"},
  {id: "e-commerce.degree.manage", value: "", name:"管理"},
  {id: "e-commerce.degree.manage.management", value: "82", name:"管理学"}, 
  {id: "e-commerce.degree.manage.accounting", value: "90", name:"会计学"}, 
  {id: "e-commerce.degree.manage.statistics", value: "88", name:"统计学"}, 
  {id: "e-commerce.degree.manage.financial", value: "88", name:"财务管理"}, 
  {id: "e-commerce.degree.commerce", value: "", name:"商务"},
  {id: "e-commerce.degree.commerce.strategy", value: "80", name:"电子商务战略管理"}, 
  {id: "e-commerce.degree.commerce.information", value: "75", name:"管理信息系统"},
  {id: "e-commerce.degree.commerce.marketing", value: "73", name:"网络营销"}, 
  {id: "e-commerce.degree.commerce.website", value: "84", name:"电子商务网站设计与开发"},
  {id: "e-commerce.degree.others", value: "", name:"其它"},
  {id: "e-commerce.degree.others.microcosmic", value: "84", name:"微观经济学"},
  {id: "e-commerce.degree.others.macroscopic", value: "59", name:"宏观经济学"},
  {id: "e-commerce.degree.others.politics-I", value: "99", name:"毛泽东思想和中国特色社会主义理论体系概论I"}, 
  {id: "e-commerce.degree.others.politics-II", value: "81", name:"毛泽东思想和中国特色社会主义理论体系概论II"}, 
  

  {id: "e-commerce.english", value: "", name:"英语"},//英语
  {id: "e-commerce.english.english", value: "", name:"英语"},
  {id: "e-commerce.english.english.I", value: "77", name:"英语I"},
  {id: "e-commerce.english.english.II", value: "76", name:"英语II"},
  {id: "e-commerce.english.english.III", value: "73", name:"英语III"},
  {id: "e-commerce.english.english.IV", value: "78", name:"英语IV"},

  {id: "e-commerce.politics", value: "", name:"政治"},//政治
  {id: "e-commerce.politics.politics", value: "", name:"政治"},//政治
  {id: "e-commerce.politics.politics.situationI", value: "92", name:"形势与政策I"},
  {id: "e-commerce.politics.politics.situationII", value: "77", name:"形势与政策II"},
  {id: "e-commerce.politics.politics.situationIII", value: "80", name:"形势与政策III"},
  {id: "e-commerce.politics.politics.situationIV", value: "83", name:"形势与政策IV"},

  {id: "e-commerce.history", value: "", name:"历史"}, //历史
  {id: "e-commerce.history.history", value: "", name:"历史"},
  {id: "e-commerce.history.history.history", value: "80", name:"历史"},

  {id: "e-commerce.compute", value: "", name:"计算机"}, //计算机
  {id: "e-commerce.compute.theory", value: "", name:"计算机理论"}, //计算机理论

  {id: "e-commerce.electronic-commerce", value: "", name:"电子商务"}, //电子商务
  {id: "e-commerce.electronic-commerce.electronic-commerce", value: "", name:"电子商务"},
  {id: "e-commerce.electronic-commerce.electronic-commerce.introduction-to-EC", value: "87", name:"电子商务导论"},
  
  {id: "e-commerce.others", value: "", name:"其它"},
  {id: "e-commerce.others.others", value: "", name:"其它"},
  {id: "e-commerce.others.others.probability", value: "71", name:"概率论"},
  {id: "e-commerce.others.others.entrepreneurship", value: "88", name:"创新创业教育"},
];

var root = stratify(rawData)
  .sum(function(d) {
    return d.value;
  })
  .sort(function(a, b) {
    return b.value - a.value;
  });
var maxDepth = 0;
var level_0='', level_1='';
var seriesData = root.descendants().map(function (node) {
  maxDepth = Math.max(maxDepth, node.depth);
  var val = node.value;
  var dep = node.depth;
  if(val>=90 && val<=100) dep += 1; //突出高于90分的课程
  else if(val<60) dep += 2; //突出低于60分的课程
  if(level_0=='' && dep==0) level_0 = node.data.name;
  if(level_1=='' && dep==1) level_1 = node.data.name;
  return [
    val,
    dep,
    node.id,
    node.data.name
  ];
});
var pieces = [];
var content = [level_0, level_1,'课程','良','优','差'];
for (var i = 0; i <= maxDepth+2; i++) {
  pieces.push({value: i, label:content[i]});
}

function renderItem(params, api) {
  var context = params.context;
  if (!context.layout) {
    d3.pack()
      .size([api.getWidth() - 2, api.getHeight() - 2])
      .padding(3)(root);

    context.layout = {};
    root.descendants().forEach(function (node) {
      context.layout[node.id] = {
        x: node.x,
        y: node.y,
        r: node.r,
        isLeaf: !node.children || !node.children.length
      };
    });
  }

  var nodePath = api.value(2);
  var itemLayout = context.layout[nodePath];
  var nodeName = '';
  var textFont = api.font({
    fontSize: 12,
    fontFamily: 'Arial'
  });

  if (itemLayout.isLeaf && itemLayout.r > 10) {
    nodeName = nodePath.slice(nodePath.lastIndexOf('.') + 1).split(/(?=[A-Z][^A-Z])/g).join('\n');
    nodeName = echarts.format.truncateText(nodeName, itemLayout.r, textFont, '.');
  }
  if(itemLayout.r<=10){
    //处理半径r
    var temp = itemLayout.r - 6.0;
    if(temp>0) itemLayout.r = temp * 2.5;
    else itemLayout.r = 0.25;
  }

  return {
    type: 'circle',
    shape: {
      cx: itemLayout.x,
      cy: itemLayout.y,
      r: itemLayout.r
    },
    z2: api.value(1) * 2,
    style: api.style({
      text: nodeName,
      textFont: textFont,
      textPosition: 'inside'
    }),
    styleEmphasis: api.style({
      text: nodeName,
      textPosition: 'inside',
      textFont: textFont,
      stroke: 'rgba(0,0,0,0.5)',
      lineWidth: 3
    })
  };
}

var option = {
  backgroundColor: '#D7EBFF',
  xAxis: {
    axisLine: {show: false},
    axisTick: {show: false},
    axisLabel: {show: false},
    splitLine: {show: false}
  },
  yAxis: {
    axisLine: {show: false},
    axisTick: {show: false},
    axisLabel: {show: false},
    splitLine: {show: false}
  },
  tooltip: {
    formatter: function (obj) {
      var str = '';
      var i = obj.data[2].split('\.').length; //表示第几级目录
      switch(i){
        case 1: str = obj.data[3]; break;
        case 2: str = obj.data[3]; break;
        case 3: str = obj.data[3]; break;
        case 4: str = '课程：'+obj.data[3]+'<br/>成绩：'+obj.data[0]; break;
        default: break;
      }
      return str;
    },
    tooltip: {
      show: true
    }
  },
  visualMap: {
    //show: false,
    type: 'piecewise',
    bottom: 40,
    pieces: pieces,
    dimension: 1,
    inRange: {
      color: ['#6e6e6e', '#808080', '#aeaeae', '#98FB98', '#33ff33', '#ff0000',]
    }
  },
  series: {
    type: 'custom',
    renderItem: renderItem,
    encode: {
      tooltip: 0,
      itemName: 2
    },
    data: seriesData
  }
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
