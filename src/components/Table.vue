<template>
    <div class="table-container">
      <form @submit="addPerson($event)">
        <input type="text"
               placeholder="first name"
               required
               v-model="firstName">
        <input type="text"
               placeholder="last name"
               required
               v-model="lastName">
        <input type="age"
               placeholder="age"
               required
               v-model="age">
        <input type="email"
               placeholder="e-mail"
               required
               v-model="email">
        <button class="submit-btn" type="submit">add note</button>
      </form>
      <div class="table-container-inner">
        <div class="table-header">
          <h2>id</h2>
          <h2>First Name</h2>
          <h2>Last Name</h2>
          <h2>Age</h2>
          <h2>E-mail</h2>
        </div>
        <div v-for="(person, id) of list"
             :key="person.id"
             v-bind:class="{ highlighted: id % 2 === 0 }"
             class="person-info-container">
          <p>{{ person.id }}</p>
          <p>{{ person.firstName }}</p>
          <p>{{ person.lastName }}</p>
          <p>{{ person.age }}</p>
          <p>{{ person.email }}</p>
          <button class="edit-btn"></button>
          <button class="remove-btn" @click="remove(id)"></button>
        </div>
      </div>
    </div>
</template>

<script>

export default {
  name: 'Table',
  components: {
  },
  data() {
    return {
      firstName: null,
      lastName: null,
      age: null,
      email: null,
    };
  },
  props: ['list'],
  methods: {
    addPerson(event) {
      event.preventDefault();
      const newPerson = {
        // символическая генерация нового id, нашли существующий макс id и прибавили 1
        id: Math.max(...this.list.map((el) => el.id)) + 1,
        firstName: this.firstName,
        lastName: this.lastName,
        age: this.age,
        email: this.email,
      };
      this.list.push(newPerson);
      this.list = this.list.sort((a, b) => b.firstName.localeCompare(a.firstName));
    },
    remove(id) {
      this.$delete(this.list, id);
    },
  },
};
</script>

<style scoped lang="scss">
  .table-container {
    display: flex;
  }

  .table-container-inner {
    max-width: 1170px;
    margin: 0 0 0 64px;
  }
  .person-info-container {
    display: grid;
    grid-template-columns: 1fr 4fr 4fr 1fr 4fr 1fr 1fr;
  }

  .table-header {
    display: grid;
    grid-template-columns: 1fr 4fr 4fr 1fr 4fr 1fr 1fr;
  }

  h2, p {
    text-align: left;
    padding-left: 16px;
    color: #1C1E57;
  }

  .highlighted {
    background: #e9fbf9;
  }

  form {
    display: flex;
    flex-direction: column;
    padding-top: 50px;
    margin-left: 64px;
  }

  input {
    box-sizing: border-box;
    height: 48px;
    width: 270px;
    margin: 16px 0;
    padding: 0 16px;
    border-radius: 8px;
    border: 1px solid #ABA7E5;
  }

  .submit-btn {
    height: 48px;
    width: 270px;
    border-radius: 8px;
    margin: 16px 0;
    background: #ABA7E5;
    border: 0;
    color: #ffffff;
    font-size: 24px;
  }

  :focus {
    outline-color: #5AD157;
  }

  .edit-btn {
    border: 0;
    background: 50% 50% transparent url("../assets/edit.svg") no-repeat;
    background-size: 20px;
    transition: all .3s;

    &:hover {
      background-size: 25px;
    }
  }

  .remove-btn {
    border: 0;
    background: 50% 50% transparent url("../assets/delete.svg") no-repeat;
    background-size: 20px;
    transition: all .3s;

    &:hover {
      background-size: 25px;
    }
  }
</style>
