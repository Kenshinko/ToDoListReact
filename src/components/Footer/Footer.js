import PropTypes from 'prop-types'

import TaskCount from '../TaskCount'
import TasksFilter from '../TasksFilter'

const Footer = ({ tasksLeft, filter, setFilter, clearCompleted, filterTasks }) => {
  return (
    <footer className="footer">
      <TaskCount tasksLeft={tasksLeft} />
      <TasksFilter filterTasks={filterTasks} filter={filter} setFilter={setFilter} />
      <button className="clear-completed" onClick={clearCompleted}>
        Clear completed
      </button>
    </footer>
  )
}

Footer.propTypes = {
  clearCompleted: PropTypes.func.isRequired,
}

export default Footer
