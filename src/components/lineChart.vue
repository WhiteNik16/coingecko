<template>
  <div>
    <apexcharts type="line" :width="isOpenAllFiltersWith" :options="options" :series="series"></apexcharts>
  </div>
</template>
<script>
import VueApexCharts from 'vue-apexcharts'
export default {
  name: "lineChart",
  components: {
    apexcharts: VueApexCharts,
  },
  data: function() {
    return {
      options: {
        chart: {
          id: 'Line-chart'
        },
        colors: ['#00faf3'],
        xaxis: {
          type: "datetime",
          // categories: this.chartData.labels
        }
      },
      title: {
        text: this.chartData.label,
        align: 'left',
        style: {
          fontSize: "16px",
          color: '#666'
        },
      },
        series: [{
          name:this.chartData.label,
          data: this.chartData.data
        }],
      }
    },
  props: {
    chartData: {
      type: Object,
      required: true,
    },
  },
  watch: {
    chartData: function(){
      this.xaxis={
        categories: this.chartData.labels,
        type: "datetime",
      }
      this.series = [{
        data: this.chartData.data
      }]


    }
  },
  computed:{
    isOpenAllFiltersWith(){
      console.log(document.documentElement.clientWidth)
      if (document.documentElement.clientWidth <= 768) {
        return '98%'
      }
      return '70%'
    }
  }
}
</script>
<style></style>
