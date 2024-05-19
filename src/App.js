import React, { Component } from 'react';
import './styles/base.scss';
import TodoList from './components/TodoList/TodoList';
import initialTodos from '../src/todos.json';
import TodoEditor from './components/TodoEditor/TodoEditor';
import Filter from 'components/TodoFilter/TodoFilter';
import Modal from 'components/Modal/Modal';
import Tabs from 'components/Tabs/Tabs';
import Clock from 'components/Clock/Clock';
import IconButton from 'components/IconButton/IconButton';
import tabs from '../src/tabs.json';
import { ReactComponent as AddIcon } from './icons/add.svg';

import { nanoid } from 'nanoid';

class App extends Component {
  state = {
    todos: initialTodos,
    filter: '',
    showModal: false,
  };

  componentDidMount() {
    const todos = localStorage.getItem('todos');
    const parsedTodos = JSON.parse(todos);

    if (parsedTodos) {
      this.setState({ todos: parsedTodos });
    }
  }

  componentDidUpdate(prevProps, prevState) {
    // console.log('App componentDidUpdate');

    const nextTodos = this.state.todos;
    const prevTodos = prevState.todos;

    if (nextTodos !== prevTodos) {
      console.log('Оновилося поле todos, записую todos в сховище!');

      localStorage.setItem('todos', JSON.stringify(nextTodos));
    }

    // if (nextTodos.length > prevTodos.length && prevTodos.length !== 0) {
    //   this.toggleModal();
    // }
  }

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
    this.toggleModal();
  };

  changeFilter = event => {
    this.setState({ filter: event.currentTarget.value });
  };

  getVisibleTodos = () => {
    const normalizedFilter = this.state.filter.toLowerCase();
    return this.state.todos.filter(todo => todo.text.toLowerCase().includes(normalizedFilter));
  };

  toggleModal = () => {
    this.setState(({ showModal }) => ({
      showModal: !showModal,
    }));
  };

  render() {
    console.log('App render');
    const { todos, filter, showModal } = this.state;

    const totalTodos = todos.length;
    const completedTodosCount = todos.reduce(
      (total, todo) => (todo.completed ? total + 1 : total),
      0
    );

    const visibleTodos = this.getVisibleTodos();

    return (
      <div>
        <Clock />

        <Tabs items={tabs} />

        <IconButton onClick={this.toggleModal} aria-label="Додати todo">
          <AddIcon width="40" height="40"></AddIcon>
        </IconButton>

        {/* <button type="button" onClick={this.toggleModal}>
          Відкрити Модалку!
        </button> */}
        <h1>Стан компонента</h1>

        {showModal && (
          <Modal onClose={this.toggleModal}>
            <TodoEditor onSubmit={this.addTodo} />
            {/* <h1>Привіт, це контент модалки як children</h1>
            <p>
              text text text text text text text text text text text text text text text text text
              text text text text text text text text text text text text text text text text text{' '}
              text text
            </p>
            <button type="button" onClick={this.toggleModal}>
              Закрити Модалку!
            </button> */}
          </Modal>
        )}
        <div>
          <p>Загальна кількість todo'шек: {totalTodos}</p>
          <p>Кількість виконаних todo'шек: {completedTodosCount}</p>
        </div>

        <Filter value={filter} onChange={this.changeFilter} />

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
