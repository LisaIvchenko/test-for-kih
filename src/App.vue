<template>
  <div id="app">
    <Pie :chart-data="ages" v-bind:ages="ages" v-bind:loaded="loaded" v-if="loaded"/>
    <Table v-bind:list="list"/>
  </div>
</template>

<script>
import Table from './components/Table.vue';
import Pie from './components/Pie.vue';

export default {
  name: 'App',
  data() {
    return {
      loaded: false,
      list: [],
      ages: [0, 0, 0, 0, 0],
    };
  },
  components: {
    Table,
    Pie,
  },
  mounted() {
    fetch('http://vuetask.kih.ru/api.php')
      .then((response) => response.json())
      .then((response) => {
        this.list = response.sort((a, b) => b.firstName.localeCompare(a.firstName));
        this.countAges();
      });
  },
  methods: {
    countAges() {
      this.list.forEach((el) => {
        if (el.age <= 20) {
          this.ages[0] += 1;
        }
        if (el.age > 20 && el.age <= 30) {
          this.ages[1] += 1;
        }
        if (el.age > 30 && el.age <= 40) {
          this.ages[2] += 1;
        }
        if (el.age > 40 && el.age <= 50) {
          this.ages[3] += 1;
        }
        if (el.age > 50) {
          this.ages[4] += 1;
        }
      });
      console.log(this.ages);
      this.loaded = true;
    },
  },
};
</script>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}

button {
  cursor: pointer;
}
</style>
