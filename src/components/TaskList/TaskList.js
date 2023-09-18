import React from 'react';

import Task from '../Task';

const TaskList = ({ tasks, hasNoted, hasDeleted }) => {
	const taskList = tasks.map((task) => {
		return (
			<Task
				key={task.taskID}
				hasNoted={() => hasNoted(task.taskID)}
				hasDeleted={() => hasDeleted(task.taskID)}
				{...task}
			/>
		);
	});

	return <ul className="todo-list">{taskList}</ul>;
};

export default TaskList;
