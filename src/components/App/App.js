import { Component } from 'react'
import uuid from 'react-uuid'

import Header from '../Header'
import Main from '../Main'

export default class App extends Component {
  currentDate = new Date()

  state = {
    tasks: [
      {
        taskID: uuid(),
        text: 'Task from 12.09.2023',
        minutes: 0,
        seconds: 5,
        creationDate: new Date(1694478477337),
        expiredDate: null,
        isCompleted: false,
        isEditing: false,
      },
      {
        taskID: uuid(),
        text: 'Completed task',
        minutes: 0,
        seconds: 0,
        creationDate: new Date(),
        expiredDate: null,
        isCompleted: true,
        isEditing: false,
      },
      {
        taskID: uuid(),
        text: 'Editing task',
        minutes: 10,
        seconds: 0,
        creationDate: new Date(),
        expiredDate: null,
        isCompleted: false,
        isEditing: true,
      },
      {
        taskID: uuid(),
        text: 'Active task',
        minutes: 15,
        seconds: 0,
        creationDate: new Date(),
        expiredDate: null,
      },
    ],
    activeFilter: 'all',
  }

  componentDidMount() {
    const savedTasksList = JSON.parse(localStorage.getItem('tasksList'))

    if (savedTasksList) {
      this.setState({ tasks: [...savedTasksList] })
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.tasks !== this.state.tasks) {
      localStorage.setItem('tasksList', JSON.stringify(this.state.tasks))
    }
  }

  // Стрелочные функции не имеют всплытия, поэтому используем обычную, для того,
  // чтобы была возможность использовать ее в создании нашего state до этапа рендеринга страницы.
  // Во всех остальных случаях используем стрелочные функции.
  createTask(text, minutes, seconds, isCompleted = false, isEditing = false) {
    return {
      taskID: uuid(),
      text,
      minutes: parseInt(minutes),
      seconds: parseInt(seconds),
      isCompleted,
      isEditing,
      creationDate: new Date(),
      expiredDate: null,
    }
  }

  addTask = (text, mins, secs) => {
    const newTask = this.createTask(text, mins, secs)

    this.setState(({ tasks }) => {
      return {
        tasks: [...tasks, newTask],
      }
    })
  }

  findTask = (id) => {
    return this.state.tasks.findIndex((el) => el.taskID === id)
  }

  setActiveTasksFilter = (filter) => {
    this.setState({
      activeFilter: filter,
    })
  }

  filterTaskList = (tasks, filter) => {
    if (filter === 'active') {
      return tasks.filter((el) => !el.isCompleted)
    }

    if (filter === 'completed') {
      return tasks.filter((el) => el.isCompleted)
    }

    return tasks
  }

  markTask = (id) => {
    this.setState(({ tasks }) => {
      // Находим задачу в массиве нашего текущего state по ее ID.
      const idx = this.findTask(id)
      // Вытаскиваем найденый элемент.
      const oldElement = tasks[idx]
      // Создаем новый элемент из старого и изменяем его свойства.
      const newElement = {
        ...oldElement,
        isCompleted: !oldElement.isCompleted,
      }

      // Возвращаем новый массив задач, собирая его из элементов старого массива и нашей новой задачи.
      return {
        tasks: [...tasks.slice(0, idx), newElement, ...tasks.slice(idx + 1)],
      }
    })
  }

  updateTask = (id, minutes, seconds, creationDate, expiredDate, timerSecs) => {
    this.setState(({ tasks }) => {
      const idx = this.findTask(id)
      const oldElement = tasks[idx]
      const renewElement = {
        ...oldElement,
        minutes,
        seconds,
        creationDate,
        expiredDate,
        timerSecs,
      }

      return {
        tasks: [...tasks.slice(0, idx), renewElement, ...tasks.slice(idx + 1)],
      }
    })
  }

  deleteTask = (id) => {
    this.setState(({ tasks }) => {
      const idx = this.findTask(id)

      return {
        tasks: [...tasks.slice(0, idx), ...tasks.slice(idx + 1)],
      }
    })
  }

  clearCompletedTasks = () => {
    this.setState(({ tasks }) => {
      return {
        tasks: [...this.filterTaskList(tasks, 'active')],
      }
    })
  }

  render() {
    const { tasks, activeFilter } = this.state
    const tasksToRender = this.filterTaskList(tasks, activeFilter)

    return (
      <section className="todoapp">
        <Header addTask={this.addTask} />
        <Main
          updateTask={this.updateTask}
          tasksLeft={this.filterTaskList(tasks, 'active').length}
          tasksList={tasksToRender}
          filter={activeFilter}
          setFilter={this.setActiveTasksFilter}
          hasNoted={this.markTask}
          hasDeleted={this.deleteTask}
          clearCompleted={this.clearCompletedTasks}
          filterTasks={this.filterTaskList}
        />
      </section>
    )
  }
}
