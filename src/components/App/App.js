import { useCallback, useEffect, useState } from 'react'
import { nanoid } from 'nanoid'
import { add } from 'date-fns'

import NewTaskForm from '../NewTaskForm'
import TasksList from '../TasksList'
import TasksFilter from '../TasksFilter'

const App = () => {
  const initialTasksList = [
    {
      taskID: '101',
      text: 'Task from 12.09.2023',
      creationDate: new Date(1694478477337),
      isCompleted: false,
      isEditing: false,
      timer: false,
      timerSecs: 5,
    },
    {
      taskID: '102',
      text: 'Completed task',
      creationDate: new Date(),
      isCompleted: true,
      isEditing: false,
      timer: false,
      timerSecs: 5 * 60 + 25,
    },
    {
      taskID: '103',
      text: 'Editing task',
      creationDate: new Date(),
      isCompleted: false,
      isEditing: true,
      timer: false,
      timerSecs: 15 * 60,
    },
    {
      taskID: '104',
      text: 'Active task',
      creationDate: new Date(),
      timer: false,
      timerSecs: 6 * 60 + 30,
    },
  ]

  let [tasksList, setTasksList] = useState(initialTasksList)
  const [activeFilter, setActiveFilter] = useState('all')

  const createTask = (text, mins, secs) => {
    const creationDate = new Date()
    const expiredDate = add(creationDate, {
      years: 0,
      months: 0,
      weeks: 0,
      days: 0,
      hours: 0,
      minutes: mins,
      seconds: secs,
    })
    const timerSecs = parseInt(mins) * 60 + parseInt(secs)

    return {
      taskID: nanoid(),
      text,
      isCompleted: false,
      isEditing: false,
      creationDate,
      expiredDate,
      timer: false,
      timerSecs,
    }
  }

  const addTask = (task) => {
    const { text, mins, secs } = task
    setTasksList((tasksList) => [...tasksList, createTask(text, mins, secs)])
  }

  const deleteTask = (id) => {
    const idx = findTask(id)
    setTasksList((tasksList) => tasksList.toSpliced(idx, 1))
  }

  const findTask = (id) => {
    return tasksList.findIndex((el) => el.taskID == id)
  }

  const toggleTaskProperty = (tasks, id, prop, value = null) => {
    const idx = findTask(id)
    const oldItem = tasks[idx]
    const newItem = { ...oldItem, [prop]: value || !oldItem[prop] }

    return tasks.toSpliced(idx, 1, newItem)
  }

  const toggleTaskCompleted = (id) => {
    setTasksList((tasksList) => toggleTaskProperty(tasksList, id, 'isCompleted'))
  }

  const toggleTaskEditing = (id) => {
    setTasksList((tasksList) => toggleTaskProperty(tasksList, id, 'isEditing'))
  }

  const changeTaskText = (id, text) => {
    setTasksList((tasksList) => toggleTaskProperty(tasksList, id, 'text', text))
  }

  const filterTaskList = (tasks, filter) => {
    if (filter === 'active') {
      return tasks.filter((task) => !task.isCompleted)
    }

    if (filter === 'completed') {
      return tasks.filter((task) => task.isCompleted)
    }

    return tasks
  }

  const clearCompletedTasks = () => {
    setTasksList((tasksList) => [...filterTaskList(tasksList, 'active')])
  }

  const handleSetTimer = (id, boolean) => {
    setTasksList((tasksList) => toggleTaskProperty(tasksList, id, 'timer', boolean))
  }

  const counting = useCallback(() => {
    setTasksList((tasksList) => {
      const allTimersFalse = tasksList.every((task) => !task.timer)

      if (allTimersFalse) {
        return tasksList
      }

      return tasksList.map((task) => {
        if (task.timerSecs <= 0) {
          return { ...task, timer: false }
        }
        if (task.timer && task.timerSecs > 0) {
          return { ...task, timerSecs: task.timerSecs - 1 }
        }
        return task
      })
    })
  }, [])

  const tasksLeft = filterTaskList(tasksList, 'active').length

  useEffect(() => {
    const savedTasksList = JSON.parse(localStorage.getItem('tasksList'))

    if (savedTasksList) {
      setTasksList([...savedTasksList])
    }

    const taskTimer = setInterval(() => counting(), 1000)
    return () => clearInterval(taskTimer)
  }, [])

  useEffect(() => {
    localStorage.setItem('tasksList', JSON.stringify(tasksList))
  }, [tasksList])

  return (
    <div className="todoapp">
      <header className="header">
        <h1>todos</h1>
        <NewTaskForm addTask={addTask} />
      </header>
      <main className="main">
        <TasksList
          tasksList={filterTaskList(tasksList, activeFilter)}
          hasNoted={toggleTaskCompleted}
          hasEdit={toggleTaskEditing}
          updateText={changeTaskText}
          deleteTask={deleteTask}
          handleSetTimer={handleSetTimer}
        />
      </main>
      <footer className="footer">
        <span className="todo-count">{tasksLeft} items left</span>
        <TasksFilter activeFilter={activeFilter} setFilter={setActiveFilter} />
        <button className="clear-completed" onClick={clearCompletedTasks}>
          Clear completed
        </button>
      </footer>
    </div>
  )
}

export default App
