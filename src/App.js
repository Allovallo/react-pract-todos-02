import React, { Component } from 'react';
import './styles/base.scss';
import TodoList from './components/TodoList/TodoList';
import initialTodos from '../src/todos.json';
import TodoEditor from './components/TodoEditor/TodoEditor';
import Filter from 'components/TodoFilter/TodoFilter';
import { nanoid } from 'nanoid';

class App extends Component {
  state = {
    todos: [],
    filter: '',
  };

  deleteTodo = todoId => {
    this.setState(prevState => ({ todos: prevState.todos.filter(todo => todo.id !== todoId) }));
  };

  toggleCompleted = todoId => {
    this.setState(prevState => ({
      todos: prevState.todos.map(todo => {
        if (todo.id === todoId) {
          console.log('Знайшли потрібний todo!');
          return {
            ...todo,
            completed: !todo.completed,
          };
        }
        return todo;
      }),
    }));
  };

  addTodo = text => {
    const todo = {
      id: nanoid(),
      text: text,
      completed: false,
    };
    this.setState(prevState => ({ todos: [...prevState.todos, todo] }));
  };

  changeFilter = event => {
    this.setState({ filter: event.currentTarget.value });
  };

  getVisibleTodos = () => {
    const normalizedFilter = this.state.filter.toLowerCase();
    return this.state.todos.filter(todo => todo.text.toLowerCase().includes(normalizedFilter));
  };

  componentDidMount() {
    console.log('App componentDidMount');

    const todos = localStorage.getItem('todos');
    // console.log(todos);
    const parsedTodos = JSON.parse(todos);
    // console.log(parsedTodos);
    if (parsedTodos) {
      this.setState({ todos: parsedTodos });
    }
  }

  componentDidUpdate(prevProps, prevState) {
    console.log('App componentDidUpdate');

    if (this.state.todos !== prevState.todos) {
      console.log('Оновилося поле todos, записую todos в сховище!');

      localStorage.setItem('todos', JSON.stringify(this.state.todos));
    }
  }

  render() {
    console.log('App render');
    const { todos, filter } = this.state;

    const totalTodos = todos.length;
    const completedTodosCount = todos.reduce(
      (total, todo) => (todo.completed ? total + 1 : total),
      0
    );

    const visibleTodos = this.getVisibleTodos();

    return (
      <div>
        <h1>Стан компонента</h1>
        <div>
          <p>Загальна кількість todo'шек: {totalTodos}</p>
          <p>Кількість виконаних todo'шек: {completedTodosCount}</p>
        </div>

        <Filter value={filter} onChange={this.changeFilter} />

        <TodoEditor onSubmit={this.addTodo} />

        <TodoList
          todos={visibleTodos}
          onDeleteTodo={this.deleteTodo}
          onToggleCompleted={this.toggleCompleted}
        />
      </div>
    );
  }
}

export default App;
