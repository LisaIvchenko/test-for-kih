<template>
  <div id="app">
    <h1>Тестовое задание для Кубань-Информ-Холдинг-Юг</h1>
    <form @submit.prevent="addPerson()">
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
      <input type="number"
             placeholder="age"
             min="0" max="110"
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
      <button class="cancel-btn"
              type="reset"
              @click="cancel()">cancel</button>
    </form>
    <Pie :chart-data="ages"
         v-bind:ages="ages"
         v-bind:loaded="loaded"
         v-if="loaded"/>
    <table>
      <tr>
        <th>id</th>
        <th>First Name</th>
        <th>Last Name</th>
        <th>Age</th>
        <th>E-mail</th>
      </tr>
      <tr v-for="person of list"
          :key="person.id">
        <td>{{ person.id }}</td>
        <td>{{ person.firstName }}</td>
        <td>{{ person.lastName }}</td>
        <td>{{ person.age }}</td>
        <td>{{ person.email }}</td>
        <td><button class="edit-btn" @click="edit(person.id)"></button></td>
        <td><button class="remove-btn" @click="remove(person.id)"></button></td>
      </tr>
    </table>
  </div>
</template>

<script>
import Pie from './components/Pie.vue';

export default {
  name: 'App',
  data() {
    return {
      loaded: false,
      list: [],
      ages: [0, 0, 0, 0, 0],
      firstName: null,
      lastName: null,
      age: null,
      email: null,
      isEditing: false,
      editingId: null,
      editedPerson: null,
      apiUrl: 'http://vuetask.kih.ru/api.php',
    };
  },
  components: {
    Pie,
  },
  mounted() {
    fetch(this.apiUrl)
      .then((response) => response.json())
      .then((response) => {
        this.list = response.sort((a, b) => b.firstName.localeCompare(a.firstName));
        this.countAges();
        this.loaded = true;
      });
  },
  methods: {
    countAges() {
      this.ages[0] = this.list.reduce((acc, el) => (acc + (el.age <= 20)), 0);
      this.ages[1] = this.list.reduce((acc, el) => (acc + (el.age > 20 && el.age <= 30)), 0);
      this.ages[2] = this.list.reduce((acc, el) => (acc + (el.age > 30 && el.age <= 40)), 0);
      this.ages[3] = this.list.reduce((acc, el) => (acc + (el.age > 40 && el.age <= 50)), 0);
      this.ages[4] = this.list.reduce((acc, el) => (acc + (el.age > 50)), 0);
    },
    async addPerson() {
      if (!this.isEditing) {
        const newPerson = {
          // символическая генерация нового id, так как с апи ничего не приходит
          id: this.list.length !== 0 ? Math.max(...this.list.map((el) => el.id)) + 1 : 1,
          firstName: this.firstName,
          lastName: this.lastName,
          age: this.age,
          email: this.email,
        };
        this.list.push(newPerson);
        try {
          const response = await fetch(this.apiUrl, {
            method: 'POST',
            body: JSON.stringify(newPerson),
            headers: {
              'Content-Type': 'application/json',
            },
          });
          const json = await response.json();
          console.log('Sent:', JSON.stringify(json));
        } catch (error) {
          console.error('Error:', error);
        }
        this.countAges();
        this.sortList();
        this.clearForm();
      }
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
      fetch(`${this.apiUrl}/edit-item/${this.editedPerson[0].id}`, {
        method: 'PATCH',
        body: JSON.stringify({
          editedValues,
        }),
      }).then((response) => {
        response.json().then((res) => {
          console.log(res);
        });
      }).catch((err) => {
        console.error(err);
      });
      this.countAges();
      this.sortList();
      this.clearForm();
    },
    clearForm() {
      this.firstName = '';
      this.lastName = '';
      this.age = '';
      this.email = '';
    },
    sortList() {
      this.list = this.list.sort((a, b) => b.firstName.localeCompare(a.firstName));
    },
    cancel() {
      this.isEditing = false;
    },
    remove(id) {
      this.list = this.list.filter((el) => el.id !== id);
      fetch(`${this.apiUrl}/delete-item/${id}`, {
        method: 'DELETE',
      })
        .then((res) => res.text())
        .then((res) => console.log(res));
      this.countAges();
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
  },
};
</script>

<style lang="scss">
@mixin responsive($screen-width) {
  @media (max-width: $screen-width) {
    @content
  }
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  box-sizing: border-box;
  margin-bottom: 64px;

  @include responsive(1200px) {
    padding: 0 16px;
  }
}

h1 {
  flex-basis: 100%;
  margin: 64px 0 32px;

  @include responsive(768px) {
    margin: 32px 0 0;
  }
}

button {
  cursor: pointer;
}

body {
  margin: 0;
}

table {
  width: 100%;
  max-width: 1170px;
}

td {
  height: 48px;
  text-align: left;
  line-break: anywhere;
  padding: 8px 20px 0;
}

tr:nth-child(even) {
  background-color: rgba(187, 215, 170, 0.59);
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
  margin-bottom: 32px;

  @include responsive(768px) {
    margin: 0;
  }
}

input {
  box-sizing: border-box;
  height: 48px;
  width: 270px;
  margin: 16px 0;
  padding: 0 16px;
  border-radius: 8px;
  border: 1px solid rgb(113,138,61);
}

.submit-btn,
.cancel-btn {
  height: 48px;
  width: 270px;
  border-radius: 8px;
  border: 0;
  color: #ffffff;
  font-size: 24px;
}

.submit-btn {
  background: rgb(113,138,61);
  margin: 16px 0 8px;
}

.cancel-btn {
  background: rgb(177,222,117);
  margin-bottom: 32px;
}

:focus {
  outline-color: #5AD157;
}

.edit-btn {
  border: 0;
  background: 50% 50% transparent url("./assets/edit.svg") no-repeat;
  background-size: 20px;
  transition: all .3s;
  width: 48px;
  height: 48px;

  &:hover {
    background-size: 25px;
  }
}

.remove-btn {
  border: 0;
  background: 50% 50% transparent url("./assets/delete.svg") no-repeat;
  background-size: 20px;
  transition: all .3s;
  width: 48px;
  height: 48px;

  &:hover {
    background-size: 25px;
  }
}

/* Force table to not be like tables anymore */
table, thead, tbody, th, td, tr {
  @include responsive(768px) {
    display: block;
  }
}

/* Hide table headers (but not display: none;, for accessibility) */
th {
  @include responsive(768px) {
    position: absolute;
    top: -9999px;
    left: -9999px;
  }
}

td {
  /* Behave  like a "row" */
  @include responsive(768px) {
    border: none;
    border-bottom: 1px solid #eee;
    position: relative;
    padding-left: 50%;
  }
  &::before {
    /* Now like a table header */
    position: absolute;
    /* Top/left values mimic padding */
    top: 6px;
    left: 6px;
    width: 45%;
    padding-right: 10px;
    white-space: nowrap;
  }
}

@media only screen and (max-width: 760px)  {
  /*
  Label the data
  */
  td:nth-of-type(1):before { content: "id"; }
  td:nth-of-type(2):before { content: "First name"; }
  td:nth-of-type(3):before { content: "Last name"; }
  td:nth-of-type(4):before { content: "Age"; }
  td:nth-of-type(5):before { content: "Email"; }
  td:nth-of-type(6):before { content: "Edit?"; }
  td:nth-of-type(7):before { content: "Remove?"; }
}
</style>
