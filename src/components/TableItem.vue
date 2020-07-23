<template>
    <div class="table-item">
      <p  :key="person.email">{{ person.email }}</p>
    </div>
</template>

<script>
export default {
  name: 'TableItem',
  props: ['person'],
};
</script>

<style scoped>

</style>
