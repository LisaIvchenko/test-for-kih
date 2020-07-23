<template>
  <div id="app">
    <Table v-bind:list="list"/>
  </div>
</template>

<script>
import Table from './components/Table.vue';

export default {
  name: 'App',
  data() {
    return {
      list: [],
    };
  },
  components: {
    Table,
  },
  mounted() {
    fetch('http://vuetask.kih.ru/api.php')
      .then((response) => response.json())
      .then((response) => {
        this.list = response.sort((a, b) => b.firstName.localeCompare(a.firstName));
      });
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
