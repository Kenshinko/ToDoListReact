import { Component } from 'react';

export default class TaskActive extends Component {
	render() {
		const { text, creationDate, isCompleted, isEditing, hasNoted, hasDeleted } =
			this.props;

		return (
			<li className={isEditing ? 'editing' : isCompleted ? 'completed' : null}>
				<div className="view">
					<input
						className="toggle"
						type="checkbox"
						defaultChecked={isCompleted ? true : null}
						onClick={hasNoted}></input>
					<label>
						<span className="description">{text}</span>
						<span className="created">{creationDate}</span>
					</label>
					<button className="icon icon-edit"></button>
					<button className="icon icon-destroy" onClick={hasDeleted}></button>
				</div>
				{isEditing ? (
					<input
						type="text"
						className="edit"
						placeholder="Editing task"></input>
				) : null}
			</li>
		);
	}
}
