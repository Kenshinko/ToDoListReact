import PropTypes from 'prop-types'

import TaskCount from '../TaskCount'
import TasksFilter from '../TasksFilter'

const Footer = ({ tasks, filter, setFilter, clearCompleted, filterTasks }) => {
  return (
    <footer className="footer">
      <TaskCount tasks={tasks} filterTasks={filterTasks} />
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
