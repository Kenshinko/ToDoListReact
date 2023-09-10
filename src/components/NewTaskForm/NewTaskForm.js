import { Component } from 'react';

export default class NewTaskForm extends Component {
	state = {
		inputValue: '',
	};

	handleChange = (event) => {
		this.setState({
			inputValue: event.target.value,
		});
	};

	handleKeyDown = (event) => {
		// Вторая проверка на пустую строку.
		if (event.key === 'Enter' && this.state.inputValue.trim()) {
			// Функция addTask пробрасывается пропсами из компонента App.
			const addNewTask = this.props.addTask;
			addNewTask(this.state.inputValue);

			this.setState({
				inputValue: '',
			});
		}
	};

	// onChange мониторит изменения в инпуте.
	// onKeyDown смотрит за нажатием клавиши Enter.
	// value используется только в связке с onChange.
	// Разница между value и defaultValue в том, что последний рендерится только один раз.
	render() {
		return (
			<input
				className="new-todo"
				placeholder="What needs to be done?"
				autoFocus
				onChange={this.handleChange}
				onKeyDown={this.handleKeyDown}
				value={this.state.inputValue}
			/>
		);
	}
}
