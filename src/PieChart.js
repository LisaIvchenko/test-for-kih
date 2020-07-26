import { Doughnut, mixins } from 'vue-chartjs';

const { reactiveProp } = mixins;

export default {
  name: 'Pie',
  extends: Doughnut,
  mixins: [Doughnut, reactiveProp],
  mounted() {
    this.renderChart(this.chartData, {
      animation: {
        duration: 700,
        easing: 'linear',
      },
      legend: { display: true },
      tooltips: {
        backgroundColor: '#0a332a',
        bodyFontColor: '#EFFEC7',
        titleFontColor: '#EFFEC7',
        titleFontSize: 20,
        borderColor: '#EFFEC7',
        borderWidth: 1,
        mode: 'label',
      },
      responsive: true,
    });
  },
};
