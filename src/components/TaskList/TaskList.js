import React from 'react';
import Task from '../Task';

const TaskList = ({ tasks }) => {
	const taskList = tasks.map((task) => {
		return <Task key={task.taskID} {...task} />;
	});

	return <ul className="todo-list">{taskList}</ul>;
};

export default TaskList;
