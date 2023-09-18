import PropTypes from 'prop-types';

const TaskCount = ({ tasks, filterTasks }) => {
	const activeTasks = filterTasks(tasks, 'active');

	return <span className="todo-count">{activeTasks.length} items left</span>;
};

TaskCount.propTypes = {
	filterTasks: PropTypes.func.isRequired,
};

export default TaskCount;
