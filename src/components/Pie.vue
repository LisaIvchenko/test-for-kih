<template>
  <div class="chart-container">
    <pie-chart :data="chartData" :options="chartOptions"></pie-chart>
  </div>
</template>

<script>
import PieChart from '../PieChart';

export default {
  name: 'Pie',
  components: {
    PieChart,
  },
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
            backgroundColor: ['#41B883', '#E46651', '#00D8FF'],
            data: this.agesList,
          },
        ],
      },
    };
  },
  mounted() {
    this.renderChart(this.chartdata, this.options);
  },
};
</script>

<style scoped lang="scss">
  .chart-container {
    width: 400px;
    height: 400px;
  }
</style>
