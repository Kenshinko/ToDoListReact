import { Component } from 'react'
import PropTypes from 'prop-types'

export default class NewTaskForm extends Component {
  addNewTask = this.props.addTask

  state = {
    taskText: '',
    minutes: '',
    seconds: '',
  }

  static propTypes = {
    addNewTask: PropTypes.func,
  }

  handleTaskText = (event) => {
    this.setState({
      taskText: event.target.value,
    })
  }

  handleTaskMins = (event) => {
    this.setState({
      minutes: event.target.value,
    })
  }

  handleTaskSecs = (event) => {
    this.setState({
      seconds: event.target.value,
    })
  }

  handleKeyDown = (event) => {
    // Вторая проверка на пустую строку.
    if (event.key === 'Enter' && this.state.taskText.trim()) {
      // Функция addTask пробрасывается пропсами из компонента App.
      this.addNewTask(this.state.taskText, this.state.minutes, this.state.seconds)

      this.setState({
        taskText: '',
      })
    }
  }

  // onChange мониторит изменения в инпуте.
  // onKeyDown смотрит за нажатием клавиши Enter.
  // value используется только в связке с onChange.
  // Разница между value и defaultValue в том, что последний рендерится только один раз.
  render() {
    return (
      <form className="new-todo-form">
        <input
          className="new-todo"
          placeholder="Task"
          autoFocus
          required
          value={this.state.taskText}
          onKeyDown={this.handleKeyDown}
          onChange={this.handleTaskText}
        />
        <input
          type="number"
          min="0"
          className="new-todo-form__timer"
          placeholder="Min"
          required
          value={this.state.minutes}
          onChange={this.handleTaskMins}
        />
        <input
          type="number"
          min="0"
          className="new-todo-form__timer"
          placeholder="Sec"
          required
          value={this.state.seconds}
          onChange={this.handleTaskSecs}
        />
      </form>
    )
  }
}
