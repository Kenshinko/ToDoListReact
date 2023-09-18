import React from 'react'
import PropTypes from 'prop-types'

import Task from '../Task'

const TaskList = ({ tasksList, hasNoted, hasDeleted }) => {
  const taskList = tasksList.map((task) => {
    return (
      <Task
        key={task.taskID}
        hasNoted={() => hasNoted(task.taskID)}
        hasDeleted={() => hasDeleted(task.taskID)}
        {...task}
      />
    )
  })

  return <ul className="todo-list">{taskList}</ul>
}

TaskList.propTypes = {
  tasksList: PropTypes.array.isRequired,
}

export default TaskList
