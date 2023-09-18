import PropTypes from 'prop-types'

const TaskCount = ({ tasksLeft }) => {
  return <span className="todo-count">{tasksLeft} items left</span>
}

TaskCount.propTypes = {
  tasksLeft: PropTypes.number.isRequired,
}

export default TaskCount
