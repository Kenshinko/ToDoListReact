const TaskActive = ({ text, creationDate, isCompleted, isEditing }) => {
	return (
		<li className={isEditing ? 'editing' : isCompleted ? 'completed' : null}>
			<div className="view">
				<input
					className="toggle"
					type="checkbox"
					checked={isCompleted ? true : null}></input>
				<label>
					<span className="description">{text}</span>
					<span className="created">{creationDate}</span>
				</label>
				<button className="icon icon-edit"></button>
				<button className="icon icon-destroy"></button>
			</div>
			{isEditing ? (
				<input type="text" className="edit" placeholder="Editing task"></input>
			) : null}
		</li>
	);
};

export default TaskActive;
