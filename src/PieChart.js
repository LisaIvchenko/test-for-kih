import { Doughnut } from 'vue-chartjs';

export default {
  extends: Doughnut,
  props: ['data', 'options'],
  mounted() {
    this.renderChart(this.data, {
      animation: {
        duration: 700,
        easing: 'linear',
      },
      legend: { position: 'right' },
      tooltips: {
        backgroundColor: '#0a332a',
        bodyFontColor: '#EFFEC7',
        titleFontColor: '#EFFEC7',
        titleFontSize: 20,
        borderColor: '#EFFEC7',
        borderWidth: 1,
        mode: 'label',
      },
    });
  },
};
