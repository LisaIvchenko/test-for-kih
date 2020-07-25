<template>
  <div class="chart-container">
    <pie-chart :chart-data="chartData"></pie-chart>
  </div>
</template>

<script>
import PieChart from '../PieChart';

export default {
  name: 'Pie',
  components: {
    PieChart,
  },
  props: ['ages', 'loaded'],
  data() {
    return {
      chartData: {
        labels: ['моложе 20', '21-30', '31-40', '41-50', 'старше 50'],
        datasets: [
          {
            backgroundColor: [
              'rgba(222,254,199, .5)',
              'rgba(175,254,199, .5)',
              'rgba(177,222,117, .5)',
              'rgba(113,138,61, .5)',
              'rgba(94,218,126, .5)',
            ],
            borderColor: [
              'rgb(222,254,199)',
              'rgb(175,254,199)',
              'rgb(177,222,117)',
              'rgb(113,138,61)',
              'rgb(94,218,126)',
            ],
            hoverBackgroundColor: [
              'rgb(222,254,199)',
              'rgb(175,254,199)',
              'rgb(177,222,117)',
              'rgb(113,138,61)',
              'rgb(94,218,126)',
            ],
            data: this.ages,
          },
        ],
      },
    };
  },
  mounted() {
    if (this.loaded) {
      this.renderChart(this.chartData);
    }
  },
};
</script>

<style scoped lang="scss">
  .chart-container {
    /*width: 400px;*/
    height: 400px;
    margin-left: 64px;
    display: flex;
    align-items: center;
  }
</style>
