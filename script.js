var app = new Vue({
  el: '#app',
  data: {
    todo: '',
    todos: [],
    filteredTodos: []
  },
  methods: {
    onSubmit() {
      this.filteredTodos.push({
        "id": this.guid(),
        "text": this.todo,
        "completed": false
      });
      this.todo = "";
      this.todos = this.filteredTodos;
      localStorage.setItem("todos", JSON.stringify(this.todos));
    },
    toggleCompleted(inId) {
      this.filteredTodos.forEach((todo) => {
        if(todo.id === inId) {
          todo.completed = !todo.completed;
        }
      });
      this.todos = this.filteredTodos;
      localStorage.setItem("todos", JSON.stringify(this.todos));
    },
    deleteTodo(inId) {
      for(let i = 0; i < this.filteredTodos.length; ++i) {
        if(this.filteredTodos[i].id === inId) {
          this.filteredTodos.splice(i, 1);
        }
      }
      this.todos = this.filteredTodos;
      localStorage.setItem("todos", JSON.stringify(this.todos));
    },
    showCompleted() {
      this.filteredTodos = this.todos;
      this.filteredTodos = this.filteredTodos.filter((todo) => {
        return todo.completed;
      });
      //this.filteredTodos = this.todos;
    },
    showUnCompleted() {
      this.filteredTodos = this.todos;
      this.filteredTodos = this.filteredTodos.filter((todo) => {
        return !todo.completed;
      });
      //this.filteredTodos = this.todos;
    },
    showAll() {
      this.filteredTodos = this.todos;
    },
    guid() {
      return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
        var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
        return v.toString(16);
      });
    }
  },
  mounted() {
    let todos = JSON.parse(localStorage.getItem("todos"));
    this.filteredTodos = todos;
    this.todos = todos;
  },
  computed: {
    disableShowCompleted() {
      let countCompletedArray = this.todos.filter((todo) => {
        return todo.completed;
      });
      console.log(countCompletedArray.length);
      return countCompletedArray.length === 0;
    },
    disableShowUnCompleted() {
      let countUnCompletedArray = this.todos.filter((todo) => {
        return !todo.completed;
      });
      console.log(countUnCompletedArray.length);
      return countUnCompletedArray.length === 0;
    }
  }
});
