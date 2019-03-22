<template>
  <div class="chart-container">
     <chart width="100%" height="100%"/>
  </div>
</template>

<script>
import Chart from '@/components/Charts/c_others'

export default {
  name: 'Canteen',
  components: { Chart }
}
</script>

<style scoped>
.chart-container{ /*加上scoped 避免全局样式被污染*/
	position: absolute;
	height: 90%;
	width: 90%;
	top: 2.5%;
	left: 5%;
}
</style>
