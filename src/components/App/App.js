import { Component } from 'react';
import { formatDistanceToNow } from 'date-fns';
import uuid from 'react-uuid';

import Header from '../Header';
import Main from '../Main';

export default class App extends Component {
	currentDate = new Date();

	state = {
		tasks: [
			{
				taskID: uuid(),
				text: 'Completed task',
				creationDate: 'created 17 seconds ago',
				isCompleted: true,
				isEditing: false,
			},
			{
				taskID: uuid(),
				text: 'Editing task',
				creationDate: formatDistanceToNow(this.currentDate),
				isCompleted: false,
				isEditing: true,
			},
			{
				taskID: uuid(),
				text: 'Active task',
				creationDate: 'created 5 minutes ago',
				isCompleted: false,
				isEditing: false,
			},
		],
	};

	markTask = (id) => {
		this.setState(({ tasks }) => {
			const idx = tasks.findIndex((el) => el.taskID === id);
			tasks[idx].isCompleted = !tasks[idx].isCompleted;

			return {
				tasks: [...tasks],
			};
		});
	};

	deleteTask = (id) => {
		this.setState(({ tasks }) => {
			const idx = tasks.findIndex((el) => el.taskID === id);

			return {
				tasks: [...tasks.slice(0, idx), ...tasks.slice(idx + 1)],
			};
		});
	};

	render() {
		return (
			<section className="todoapp">
				<Header />
				<Main
					tasksList={this.state.tasks}
					hasNoted={this.markTask}
					hasDeleted={this.deleteTask}
				/>
			</section>
		);
	}
}
