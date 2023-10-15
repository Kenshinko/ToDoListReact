import Task from '../Task'

const TasksList = ({ tasksList, hasNoted, hasEdit, updateText, deleteTask, handleSetTimer }) => {
  const confirmTaskEdit = (event, id) => {
    event.preventDefault()
    hasEdit(id)
  }

  const handleTaskText = (text, id) => {
    updateText(id, text)
  }

  const renderedTasksList = tasksList.map((task) => {
    const { taskID, text, isCompleted, isEditing } = task

    return (
      <li key={taskID} className={isEditing ? 'editing' : isCompleted ? 'completed' : null}>
        <Task
          task={task}
          hasNoted={hasNoted}
          hasEdit={hasEdit}
          deleteTask={deleteTask}
          handleSetTimer={handleSetTimer}
        />
        {isEditing ? (
          <form onSubmit={(event) => confirmTaskEdit(event, taskID)}>
            <input
              type="text"
              className="edit"
              autoFocus
              value={text || ''}
              onChange={({ target }) => handleTaskText(target.value, taskID)}
              required
            ></input>
            <button style={{ display: 'none' }}></button>
          </form>
        ) : null}
      </li>
    )
  })

  return <ul className="todo-list">{renderedTasksList}</ul>
}

export default TasksList
