import { useState } from 'react'

const NewTaskForm = ({ addTask }) => {
  const initialTask = {
    text: '',
    mins: '',
    secs: '',
  }
  const [task, setTask] = useState(initialTask)
  const { text, mins, secs } = task

  const useHandleTask = (prop, value) => {
    setTask((task) => {
      return { ...task, [prop]: value }
    })
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    if (text.trim()) {
      addTask({ text, mins, secs })
      setTask(initialTask)
    }
  }

  return (
    <form className="new-todo-form" onSubmit={(event) => handleSubmit(event)}>
      <input
        className="new-todo"
        placeholder="Task"
        autoFocus
        value={text}
        onChange={({ target }) => useHandleTask('text', target.value)}
        required
      />
      <input
        type="number"
        min="0"
        max="59"
        className="new-todo-form__timer"
        placeholder="Min"
        value={mins}
        onChange={({ target }) => useHandleTask('mins', target.value)}
        required
      />
      <input
        type="number"
        min="0"
        max="59"
        className="new-todo-form__timer"
        placeholder="Sec"
        value={secs}
        onChange={({ target }) => useHandleTask('secs', target.value)}
        required
      />
      <button style={{ display: 'none' }}></button>
    </form>
  )
}

export default NewTaskForm
