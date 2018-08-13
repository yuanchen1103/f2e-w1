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
        <input type="text"
               v-model="text"
               placeholder="Go to a Movie..."
               :class="{warn: textBlank}"
               @keyup.enter="addTodo">
        <button @click="addTodo">
          <!-- <img src="./assets/img/plus-icon.svg" alt="" style="height: 15px;"> -->
          <i class="fas fa-plus"
             style="color: #fff;"></i>
        </button>
      </div>
      <!-- all -->
      <div v-if="allFilter">
        <List v-for="todo in importantFilterAll"
              :key="todo.index"
              :todo="todo"
              @complete-todo="completeTodo"
              @cancel-todo="cancelTodo"
              @delete-todo="deleteTodo"
              @star-todo="starTodo"
              @unstar-todo="unstarTodo"
              @show-detail="showDetail" />
        <List v-for="todo in unimportantFilterAll"
              :key="todo.index"
              :todo="todo"
              @complete-todo="completeTodo"
              @cancel-todo="cancelTodo"
              @delete-todo="deleteTodo"
              @star-todo="starTodo"
              @unstar-todo="unstarTodo"
              @show-detail="showDetail" />
      </div>

      <!-- todo -->
      <div v-if="todoFilter">
        <List v-for="todo in importantFilterTodo"
              :key="todo.index"
              :todo="todo"
              @complete-todo="completeTodo"
              @cancel-todo="cancelTodo"
              @delete-todo="deleteTodo"
              @star-todo="starTodo"
              @unstar-todo="unstarTodo"
              @show-detail="showDetail" />
        <List v-for="todo in unimportantFilterTodo"
              :key="todo.index"
              :todo="todo"
              @complete-todo="completeTodo"
              @cancel-todo="cancelTodo"
              @delete-todo="deleteTodo"
              @star-todo="starTodo"
              @unstar-todo="unstarTodo"
              @show-detail="showDetail" />
      </div>

      <!-- completed -->
      <div v-if="completedFilter">
        <List v-for="todo in importantFilterCompleted"
              :key="todo.index"
              :todo="todo"
              @complete-todo="completeTodo"
              @cancel-todo="cancelTodo"
              @delete-todo="deleteTodo"
              @star-todo="starTodo"
              @unstar-todo="unstarTodo"
              @show-detail="showDetail" />
        <List v-for="todo in unimportantFilterCompleted"
              :key="todo.index"
              :todo="todo"
              @complete-todo="completeTodo"
              @cancel-todo="cancelTodo"
              @delete-todo="deleteTodo"
              @star-todo="starTodo"
              @unstar-todo="unstarTodo"
              @show-detail="showDetail" />
      </div>

      <div class="line"></div>
      <div class="filter">
        <p @click="sortAll"
           :class="{ active: allFilter }">All</p>
        <p @click="sortTodo"
           :class="{ active: todoFilter }">Todo</p>
        <p @click="sortCompleted"
           :class="{ active: completedFilter }">Completed</p>
      </div>
    </div>

    <modal name="modal"
           :height="'auto'"
           :width="300"
           :scrollable="true"
           @before-open="beforeOpen"
           :clickToClose="false">
      <div style="margin-left: 20px; margin-right: 20px; padding-bottom: 20px;">
        <p style="margin-top: 30px; text-align: center; font-size: 18px; margin-bottom: 0;"
           v-if="!isEdit">{{ modalData.title }}</p>
        <input type="text"
               placeholder="ex: 2018-06-12"
               style="width: 260px; margin-top: 30px; margin-bottom: 10px;"
               v-model="modalData.title"
               v-if="isEdit">
        <p v-if="!isEdit"
           @click="editTodo"
           style="text-align: center; font-size:12px; margin-bottom: 10px; color: #b8b8b8; cursor: pointer">
          <i class="far fa-edit"></i>
        </p>
        <p style="margin-bottom: 5px; margin-left: 5px;">Date:</p>
        <input type="text"
               placeholder="ex: 2018-06-12"
               style="width: 260px;"
               v-model="modalData.date">
        <p style="margin-bottom: 5px; margin-left: 5px; margin-top: 20px;">Comments:</p>
        <input type="text"
               placeholder="Add..."
               style="width: 260px;"
               @keyup.enter="addComments()"
               v-model="commentText">
        <div v-for="item in modalData.comments"
             :key="item.index">
          <div class="comment-item">
            <span>{{item}}</span>
            <!-- <img src="./assets/img/delete.svg" alt="" style="height: 14px; float: right; margin-top: 5px; cursor: pointer;" @click.stop="deleteComment(item)"> -->
            <i class="far fa-trash-alt"
               style="float: right; margin-top: 5px; color: #b8b8b8; cursor: pointer;"
               @click.stop="deleteComment(item)"></i>
          </div>
        </div>
        <button style="width: 260px; margin-left: 0; margin-top: 20px; color: #fff;"
                @click="closeDetail">Close and Save</button>
      </div>

    </modal>
    <a href="https://github.com/yuanchen1103/f2e-w1"
       class="github-corner"
       aria-label="View source on Github">
      <svg width="80"
           height="80"
           viewBox="0 0 250 250"
           style="fill:#fff; color:#151513; position: absolute; top: 0; border: 0; right: 0;"
           aria-hidden="true">
        <path d="M0,0 L115,115 L130,115 L142,142 L250,250 L250,0 Z"></path>
        <path d="M128.3,109.0 C113.8,99.7 119.0,89.6 119.0,89.6 C122.0,82.7 120.5,78.6 120.5,78.6 C119.2,72.0 123.4,76.3 123.4,76.3 C127.3,80.9 125.5,87.3 125.5,87.3 C122.9,97.6 130.6,101.9 134.4,103.2"
              fill="currentColor"
              style="transform-origin: 130px 106px;"
              class="octo-arm"></path>
        <path d="M115.0,115.0 C114.9,115.1 118.7,116.5 119.8,115.4 L133.7,101.6 C136.9,99.2 139.9,98.4 142.2,98.6 C133.8,88.0 127.5,74.4 143.8,58.0 C148.5,53.4 154.0,51.2 159.7,51.0 C160.3,49.4 163.2,43.6 171.4,40.1 C171.4,40.1 176.1,42.5 178.8,56.2 C183.1,58.6 187.2,61.8 190.9,65.4 C194.5,69.0 197.7,73.2 200.1,77.6 C213.8,80.2 216.3,84.9 216.3,84.9 C212.7,93.1 206.9,96.0 205.4,96.6 C205.1,102.4 203.0,107.8 198.3,112.5 C181.9,128.9 168.3,122.5 157.7,114.1 C157.9,116.9 156.7,120.9 152.7,124.9 L141.0,136.5 C139.8,137.7 141.6,141.9 141.8,141.8 Z"
              fill="currentColor"
              class="octo-body"></path>
      </svg>
    </a>
  </div>
</template>

<script>
import moment from 'moment';
import List from './components/List';

export default {
  name: 'app',
  components: {
    List
  },
  data() {
    return {
      isEdit: false,
      text: '',
      textBlank: false,
      allFilter: true,
      todoFilter: false,
      completedFilter: false,
      modalData: {},
      commentText: '',
      todos: [
        {
          title: 'Have a lunch with Kate',
          completed: false,
          important: true,
          comments: ['6:00pm', 'the new restaurant'],
          date: '2018-06-04'
        },
        {
          title: 'Do my homework',
          completed: false,
          important: false,
          comments: [],
          date: '2018-06-02'
        },
        {
          title: 'Prepare tests',
          completed: true,
          important: false,
          comments: [],
          date: '2018-06-01'
        }
      ]
    };
  },
  computed: {
    date() {
      return moment().format('DD');
    },
    month() {
      return moment()
        .format('MMM')
        .toUpperCase();
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
      return this.todos.filter(
        todo => todo.important === true && todo.completed === false
      );
    },
    unimportantFilterTodo() {
      return this.todos.filter(
        todo => todo.important === false && todo.completed === false
      );
    },
    importantFilterCompleted() {
      return this.todos.filter(
        todo => todo.important === true && todo.completed === true
      );
    },
    unimportantFilterCompleted() {
      return this.todos.filter(
        todo => todo.important === false && todo.completed === true
      );
    }
  },
  methods: {
    addTodo() {
      if (this.text === '') {
        this.textBlank = true;
      } else {
        this.textBlank = false;
        this.todos.unshift({
          title: this.text,
          completed: false,
          important: false,
          comments: [],
          date: ''
        });
        this.text = '';
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
    editTodo() {
      this.isEdit = true;
    },
    sortCompleted() {
      this.allFilter = false;
      this.todoFilter = false;
      this.completedFilter = true;
    },
    showDetail(todo) {
      const todoIndex = this.todos.indexOf(todo);
      this.$modal.show('modal', { todo: todo, todoIndex: todoIndex });
    },
    closeDetail() {
      this.$modal.hide('modal');
      this.isEdit = false;
    },
    beforeOpen(event) {
      this.modalData = event.params.todo;
      this.modalData.index = event.params.todoIndex;
    },
    addComments() {
      if (this.commentText === '') {
        console.log('blank');
      } else {
        this.todos[this.modalData.index].comments.unshift(this.commentText);
        this.commentText = '';
      }
    },
    deleteComment(item) {
      const commentIndex = this.todos[this.modalData.index].comments.indexOf(
        item
      );
      this.todos[this.modalData.index].comments.splice(commentIndex, 1);
    }
  }
};
</script>

<style lang="scss">
.github-corner:hover .octo-arm {
  animation: octocat-wave 560ms ease-in-out;
}
@keyframes octocat-wave {
  0%,
  100% {
    transform: rotate(0);
  }
  20%,
  60% {
    transform: rotate(-25deg);
  }
  40%,
  80% {
    transform: rotate(10deg);
  }
}
@media (max-width: 500px) {
  .github-corner:hover .octo-arm {
    animation: none;
  }
  .github-corner .octo-arm {
    animation: octocat-wave 560ms ease-in-out;
  }
}
</style>
