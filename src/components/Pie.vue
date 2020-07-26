<template>
  <div class="chart-container">
    <pie-chart :chart-data="chartData"
               style="position: relative; width:80vw; max-width: 400px"></pie-chart>
  </div>
</template>

<script>
import PieChart from '../PieChart';

export default {
  name: 'Pie',
  components: {
    PieChart,
  },
  props: {
    ages: {
      type: Array,
    },
    loaded: {
      type: Boolean,
    },
  },
  data() {
    return {
      chartData: {
        labels: ['моложе 20', '21-30', '31-40', '41-50', 'старше 50'],
        legend: {
          display: false,
        },
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
};
</script>

<style scoped lang="scss">
.chart-container {
  display: flex;
  align-items: center;
  margin: 32px;
  max-height: 500px;
}
</style>
