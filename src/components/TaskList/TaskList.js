import React from 'react'
import PropTypes from 'prop-types'

import Task from '../Task'

const TaskList = ({ updateTask, tasksList, hasNoted, hasDeleted }) => {
  const taskList = tasksList.map((task) => {
    return (
      <li key={task.taskID} className={task.isEditing ? 'editing' : task.isCompleted ? 'completed' : null}>
        <Task
          updateTask={updateTask}
          hasNoted={() => hasNoted(task.taskID)}
          hasDeleted={() => hasDeleted(task.taskID)}
          {...task}
        />
        {task.isEditing ? <input type="text" className="edit" placeholder="Editing task"></input> : null}
      </li>
    )
  })

  return <ul className="todo-list">{taskList}</ul>
}

TaskList.propTypes = {
  tasksList: PropTypes.array.isRequired,
}

export default TaskList
