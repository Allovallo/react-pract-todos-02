import React, { Component } from 'react';
import './styles/base.scss';
import TodoList from './components/TodoList/TodoList';
import initialTodos from '../src/todos.json';
import TodoEditor from './components/TodoEditor/TodoEditor';
import { nanoid } from 'nanoid';

class App extends Component {
  state = {
    todos: initialTodos,
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

  render() {
    const { todos } = this.state;

    const totalTodos = todos.length;
    const completedTodosCount = todos.reduce(
      (total, todo) => (todo.completed ? total + 1 : total),
      0
    );

    return (
      <div>
        <h1>Стан компонента</h1>
        <div>
          <p>Загальна кількість todo'шек: {totalTodos}</p>
          <p>Кількість виконаних todo'шек: {completedTodosCount}</p>
        </div>
        <TodoEditor onSubmit={this.addTodo} />
        <TodoList
          todos={todos}
          onDeleteTodo={this.deleteTodo}
          onToggleCompleted={this.toggleCompleted}
        />
      </div>
    );
  }
}

export default App;
