
<script>
import { Line } from 'vue-chartjs'
export default {
  name: "lineChart",
    extends: Line,
  props: {
    chartData:{
      type: Object,
      default: null,
      required:true
    },
    options:{
      type: Object,
      default: null
    }
  },
  mounted () {
    this.renderChart(this.chartData, {responsive: true, maintainAspectRatio: false})
  },

  watch:{
    chartData:function(){
      this.renderChart(this.chartData, {responsive: true, maintainAspectRatio: false})
    }
}
  }
</script>
<style>

</style>