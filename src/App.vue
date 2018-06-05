<template>
  <div id="app">
    <div class="main-card">
      <div style="margin-bottom: 35px;">
         <div style="display: inline-block">
            <div class="date">{{ date }}</div>
            <div class="month-year">
               <div class="month">{{ month }}</div>
               <div class="year">{{ year }}</div>
            </div>
         </div>
         <div class="day">{{ day }}</div>
      </div>
      <div style="margin-bottom: 20px;">
         <input type="text" v-model="text" placeholder="Go to a Movie..." :class="{warn: textBlank}">
         <button @click="addTodo">
            <img src="./assets/img/plus-icon.svg" alt="" style="height: 15px;">
         </button>
      </div>
      <!-- all -->
      <div v-if="allFilter">
        <List v-for="todo in importantFilterAll" :key="todo.index" :todo="todo" @complete-todo="completeTodo" @cancel-todo="cancelTodo" @delete-todo="deleteTodo" @star-todo="starTodo" @unstar-todo="unstarTodo"/>
        <List v-for="todo in unimportantFilterAll" :key="todo.index" :todo="todo" @complete-todo="completeTodo" @cancel-todo="cancelTodo" @delete-todo="deleteTodo" @star-todo="starTodo" @unstar-todo="unstarTodo"/>
      </div>

      <!-- todo -->
      <div v-if="todoFilter">
        <List v-for="todo in importantFilterTodo" :key="todo.index" :todo="todo" @complete-todo="completeTodo" @cancel-todo="cancelTodo" @delete-todo="deleteTodo" @star-todo="starTodo" @unstar-todo="unstarTodo"/>
        <List v-for="todo in unimportantFilterTodo" :key="todo.index" :todo="todo" @complete-todo="completeTodo" @cancel-todo="cancelTodo" @delete-todo="deleteTodo" @star-todo="starTodo" @unstar-todo="unstarTodo"/>
      </div>

      <!-- completed -->
      <div v-if="completedFilter">
        <List v-for="todo in importantFilterCompleted" :key="todo.index" :todo="todo" @complete-todo="completeTodo" @cancel-todo="cancelTodo" @delete-todo="deleteTodo" @star-todo="starTodo" @unstar-todo="unstarTodo"/>
        <List v-for="todo in unimportantFilterCompleted" :key="todo.index" :todo="todo" @complete-todo="completeTodo" @cancel-todo="cancelTodo" @delete-todo="deleteTodo" @star-todo="starTodo" @unstar-todo="unstarTodo"/>
      </div>

      <div class="line"></div>
      <div class="filter">
         <p @click="sortAll" :class="{ active: allFilter }">All</p>
         <p @click="sortTodo" :class="{ active: todoFilter }">Todo</p>
         <p @click="sortCompleted" :class="{ active: completedFilter }">Completed</p>
      </div>
    </div>
  </div>
</template>

<script>
import moment from 'moment'
import List from './components/List'

export default {
  name: 'app',
  components: {
    List
  },
  data () {
    return {
      text: '',
      textBlank: false,
      allFilter: true,
      todoFilter: false,
      completedFilter: false,
      todos: [
        {
          title: 'Have a lunch with Kate',
          completed: false,
          important: true,
          comments: [
            '123',
            '456'
          ],
          date: ''
        },
        {
          title: 'Do my homework',
          completed: false,
          important: false,
          comments: [],
          date: '2018-03-19'
        },
        {
          title: 'Prepare tests',
          completed: true,
          important: false,
          comments: [],
          date: '2018-03-19'
        },
      ]
    }
  },
  computed: {
    date() {
      return moment().format('DD');
    },
    month() {
      return moment().format('MMM').toUpperCase();
    },
    year() {
      return moment().format('YYYY');
    },
    day() {
      return moment().format('dddd');
    },
    importantFilterAll() {
      return this.todos.filter(todo => todo.important === true);
    },
    unimportantFilterAll() {
      return this.todos.filter(todo => todo.important === false);
    },
    importantFilterTodo() {
      return this.todos.filter(todo => (todo.important === true && todo.completed === false));
    },
    unimportantFilterTodo() {
      return this.todos.filter(todo => (todo.important === false && todo.completed === false));
    },
    importantFilterCompleted() {
      return this.todos.filter(todo => (todo.important === true && todo.completed === true));
    },
    unimportantFilterCompleted() {
      return this.todos.filter(todo => (todo.important === false && todo.completed === true));
    }
  },
  methods: {
    addTodo() {
      if(this.text === ''){
        this.textBlank = true;
      }
      else {
        this.textBlank = false;
        this.todos.unshift({
          title: this.text,
          completed: false,
          important: false,
          comments: [],
          date: ''
        });
        this.text = ''
      }
    },
    completeTodo(todo) {
      const todoIndex = this.todos.indexOf(todo);
      this.todos[todoIndex].completed = true;
    },
    cancelTodo(todo) {
      const todoIndex = this.todos.indexOf(todo);
      this.todos[todoIndex].completed = false;
    },
    deleteTodo(todo) {
      const todoIndex = this.todos.indexOf(todo);
      this.todos.splice(todoIndex, 1);
    },
    starTodo(todo) {
      const todoIndex = this.todos.indexOf(todo);
      this.todos[todoIndex].important = true;
    },
    unstarTodo(todo) {
      const todoIndex = this.todos.indexOf(todo);
      this.todos[todoIndex].important = false;
    },
    sortAll() {
      this.allFilter = true;
      this.todoFilter = false;
      this.completedFilter = false;
    },
    sortTodo() {
      this.allFilter = false;
      this.todoFilter = true;
      this.completedFilter = false;
    },
    sortCompleted() {
      this.allFilter = false;
      this.todoFilter = false;
      this.completedFilter = true;
    }
  }
}
</script>

<style lang="scss">

</style>
