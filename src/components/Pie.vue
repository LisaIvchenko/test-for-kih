<template>
  <div class="chart-container">
    <pie-chart :data="chartData" :options="chartOptions" v-if="loaded"></pie-chart>
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
      chartOptions: {
        hoverBorderWidth: 20,
      },
      chartData: {
        hoverBackgroundColor: 'red',
        hoverBorderWidth: 10,
        labels: ['моложе 20', '21-30', '31-40', '41-50', 'старше 50'],
        datasets: [
          {
            label: 'Data One',
            backgroundColor: ['#DEFEC7', '#AFFEC7', '#B1DE75', '#718a3d', '#5EDA  7E'],
            data: this.ages,
          },
        ],
      },
    };
  },
  mounted() {
    if (this.loaded) {
      console.log(this.ages, 'snt');
      this.renderChart(this.chartData, this.options);
    }
  },
};
</script>

<style scoped lang="scss">
  .chart-container {
    width: 400px;
    height: 400px;
  }
</style>
