<template>
  <div :class="className" :id="id" :style="{height:height,width:width}"/>
</template>

<script>
import echarts from 'echarts'
import resize from './mixins/resize'

var rawData = {
  '马列主义毛邓思想':{
    $count:0,
    '毛泽东选集.第五卷-毛泽东':{
      $count:1
    },
    '毛泽东书信选集-毛泽东':{
      $count:1
    },
    '毛泽东的诗词艺术-毛泽东':{
      $count:1
    }
  },
  '经济':{
    $count:0,
    '解读中国经济-林毅夫':{
      $count:1
    }
  },
  '文化、科学、教育、体育':{
    $count:0,
    '如何高效学习-(加) 斯科特·扬':{
      $count:1
    }
  },
  '语言、文字':{
    $count:0,
    '六级单词一笑而过-周思成':{
      $count:1
    },
    '英文演讲-杜景平':{
      $count:1
    }
  },
  '文学':{
    $count:0,
    '平凡的世界.第一部.第2版-路遥':{
      $count:1
    },
    '人极-贾平凹':{
      $count:1
    },
    '古都-朱天心':{
      $count:1
    },
    '围城-钱钟书':{
      $count:2
    },
    '红高粱-莫言':{
      $count:1
    },
    '追风筝的人-侯赛尼 (Hosseini, Khaled)':{
      $count:1
    },
    '边城-沈从文':{
      $count:1
    },
    '活着-余华':{
      $count:1
    },
    '百年孤独-加西亚·马克斯 (Garcia Marquez, Gabriel)':{
      $count:1
    },
    '解忧杂货店-东野圭吾':{
      $count:1
    },
    '呼兰河传-萧红':{
      $count:1
    },
    '人间失格-太宰治':{
      $count:1
    },
    '假面山庄-东野圭吾':{
      $count:1
    }
  },
  '历史、地理':{
    $count:0,
    '历史的裂变-王觉仁':{
      $count:1
    },
    '历史岂有底稿.Ⅱ-侯兴国':{
      $count:1
    },
    '世界名将传奇-曾杨柳':{
      $count:1
    }
  },
  '自然科学总论':{
    $count:0,
    '科学的意义-卢恩斯 (Lewens, Tim) ':{
      $count:1
    },
    '科技应用文写作-邱飞廉':{
      $count:1
    }
  },
  '数理科学与化学':{
    $count:0,
    '线性代数题解手册-黄璞生, 赵冰, 赵生久':{
      $count:1
    },
    'MATLAB数值计算-Cleve B Moler':{
      $count:1
    }
  },
  '工业技术':{
    $count:0,
    '机器学习-周志华':{
      $count:1
    },
    'C语言经典编程282例-明日科技':{
      $count:2
    },
    'C语言教程:programming in C-Al Kelley, Ira Pohl':{
      $count:1
    },
    '人像摄影Photoshop-耿洪杰':{
      $count:1
    },
    '数据结构-严蔚敏':{
      $count:3
    },
    '算法导论-Cormen, Thomas H':{
      $count:1
    }
  },
  '综合性图书':{
    $count:0,
    'SCI投稿指南-王晓红':{
      $count:1
    }
  }
};

function convert(source, target, basePath) {
  for (var key in source) {
    var path = basePath ? (basePath + '.' + key) : key;
    if (key.match(/^\$/)) {

    }
    else {
      target.children = target.children || [];
      var child = {
        name: path
      };
      target.children.push(child);
      convert(source[key], child, path);
    }
  }

  if (!target.children) {
    target.value = source.$count;
  }else {
    target.children.push({
      name: basePath,
      value: source.$count,
    });
  }
}

var data = [];
convert(rawData, data, '');

var option = {
  title: {
    text: '图书借阅情况',
    subtext: '150105070028',
    left: 'leafDepth'
  },
  tooltip: {
    formatter: function (obj) {
      var str = '';
      var arr = obj.data.name.split("\.");
      if(arr.length>1){
        var name = arr[arr.length-1];
        var names = name.split("\-");
        str = '书名：'+names[0]+'<br/>作者：'+names[1]+'<br/>次数：'+obj.data.value;
      }else{
        str = '类名：'+arr[0]+'<br/>总次数：'+obj.data.value;
      }
      return str;
    },
    tooltip: {
      show: true
    }
  },
  series: [{
    name: '目录',
    type: 'treemap',
    visibleMin: 300,
    data: data.children,
    leafDepth: 1, //呈现层级，若为1加载时仅展开一层，接下来的每一层通过单击进入
    levels: [
      {
        itemStyle: {
          normal: {
            borderColor: '#555',
            borderWidth: 4,
            gapWidth: 4
          }
        }
      },
      {
        colorSaturation: [0.3, 0.6],
        itemStyle: {
          normal: {
            borderColorSaturation: 0.7,
            gapWidth: 2,
            borderWidth: 2
          }
        }
      },
      {
        colorSaturation: [0.3, 0.5],
        itemStyle: {
          normal: {
            borderColorSaturation: 0.6,
            gapWidth: 1
          }
        }
      },
      {
        colorSaturation: [0.3, 0.5]
      }
    ]
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
