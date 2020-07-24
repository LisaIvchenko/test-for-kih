<template>
    <div class="table-container">
      <form @submit="addPerson($event)">
        <input type="text"
               placeholder="first name"
               required
               maxlength="30"
               v-model="firstName">
        <input type="text"
               placeholder="last name"
               required
               maxlength="30"
               v-model="lastName">
        <input type="age"
               placeholder="age"
               required
               v-model="age">
        <input type="email"
               placeholder="e-mail"
               maxlength="30"
               required
               v-model="email">
        <button class="submit-btn" type="submit" v-if="!isEditing">add note</button>
        <button class="submit-btn"
                type="submit"
                v-if="isEditing"
                @click="submitEdit($event)">edit note</button>
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
          <button class="edit-btn" @click="edit(person.id)"></button>
          <button class="remove-btn" @click="remove(person.id)"></button>
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
      isEditing: false,
      editingId: null,
      editedPerson: null,
    };
  },
  props: ['list'],
  methods: {
    addPerson(event) {
      event.preventDefault();
      if (!this.isEditing) {
        const newPerson = {
          // символическая генерация нового id, нашли существующий макс id и прибавили 1
          id: this.list.length !== 0 ? Math.max(...this.list.map((el) => el.id)) + 1 : 1,
          firstName: this.firstName,
          lastName: this.lastName,
          age: this.age,
          email: this.email,
        };
        this.list.push(newPerson);
        this.list = this.list.sort((a, b) => b.firstName.localeCompare(a.firstName));
        this.clearForm();
      }
    },
    remove(id) {
      this.list = this.list.filter((el) => el.id !== id);
    },
    edit(id) {
      this.isEditing = true;
      this.editingId = id;
      this.editedPerson = this.list.filter((el) => el.id === id);
      this.firstName = this.editedPerson[0].firstName;
      this.lastName = this.editedPerson[0].lastName;
      this.age = this.editedPerson[0].age;
      this.email = this.editedPerson[0].email;
    },
    submitEdit(event) {
      event.preventDefault();
      const editedValues = {
        id: this.editedPerson[0].id,
        firstName: this.firstName,
        lastName: this.lastName,
        age: this.age,
        email: this.email,
      };
      this.list = this.list.map((el) => (el.id === this.editedPerson[0].id ? editedValues : el));
      this.isEditing = false;
      this.clearForm();
    },
    clearForm() {
      this.firstName = '';
      this.lastName = '';
      this.age = '';
      this.email = '';
    },
  },
};
</script>

<style scoped lang="scss">
  .table-container {
    display: flex;
    margin-bottom: 64px;
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
