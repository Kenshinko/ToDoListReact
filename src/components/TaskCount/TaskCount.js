const TaskCount = ({ tasks, filterTasks }) => {
	const activeTasks = filterTasks(tasks, 'active');

	return <span className="todo-count">{activeTasks.length} items left</span>;
};

export default TaskCount;
