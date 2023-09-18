import { Component } from 'react';
import { formatDistanceToNow } from 'date-fns';
import uuid from 'react-uuid';

import Header from '../Header';
import Main from '../Main';

export default class App extends Component {
	currentDate = new Date();

	state = {
		tasks: [
			this.createTask('Completed task', true, false),
			this.createTask('Editing task', false, true),
			this.createTask('Active task'),
		],
		activeFilter: 'all',
	};

	// Стрелочные функции не имеют всплытия, поэтому используем обычную, для того,
	// чтобы была возможность использовать ее в создании нашего state до этапа рендеринга страницы.
	// Во всех остальных случаях используем стрелочные функции.
	createTask(text, isCompleted = false, isEditing = false) {
		return {
			taskID: uuid(),
			text,
			creationDate: formatDistanceToNow(new Date()),
			isCompleted,
			isEditing,
		};
	}

	addTask = (text) => {
		const newTask = this.createTask(text);

		this.setState(({ tasks }) => {
			return {
				tasks: [...tasks, newTask],
			};
		});
	};

	findTask = (id) => {
		return this.state.tasks.findIndex((el) => el.taskID === id);
	};

	setActiveTasksFilter = (filter) => {
		this.setState({
			activeFilter: filter,
		});
	};

	filterTaskList = (tasks, filter) => {
		if (filter === 'active') {
			return tasks.filter((el) => !el.isCompleted);
		}

		if (filter === 'completed') {
			return tasks.filter((el) => el.isCompleted);
		}

		return tasks;
	};

	markTask = (id) => {
		this.setState(({ tasks }) => {
			// Находим задачу в массиве нашего текущего state по ее ID.
			const idx = this.findTask(id);
			// Вытаскиваем найденый элемент.
			const oldElement = tasks[idx];
			// Создаем новый элемент из старого и изменяем его свойства.
			const newElement = {
				...oldElement,
				isCompleted: !oldElement.isCompleted,
			};

			// Возвращаем новый массив задач, собирая его из элементов старого массива и нашей новой задачи.
			return {
				tasks: [...tasks.slice(0, idx), newElement, ...tasks.slice(idx + 1)],
			};
		});
	};

	deleteTask = (id) => {
		this.setState(({ tasks }) => {
			const idx = this.findTask(id);

			return {
				tasks: [...tasks.slice(0, idx), ...tasks.slice(idx + 1)],
			};
		});
	};

	clearCompletedTasks = () => {
		this.setState(({ tasks }) => {
			return {
				tasks: [...this.filterTaskList(tasks, 'active')],
			};
		});
	};

	render() {
		const { tasks, activeFilter } = this.state;
		const tasksToRender = this.filterTaskList(tasks, activeFilter);

		return (
			<section className="todoapp">
				<Header addTask={this.addTask} />
				<Main
					tasks={tasks}
					tasksList={tasksToRender}
					filter={activeFilter}
					setFilter={this.setActiveTasksFilter}
					hasNoted={this.markTask}
					hasDeleted={this.deleteTask}
					clearCompleted={this.clearCompletedTasks}
					filterTasks={this.filterTaskList}
				/>
			</section>
		);
	}
}
