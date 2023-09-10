import { Component } from 'react';

export default class TasksFilter extends Component {
	// filterTasks = this.props.filterTasks;
	filter = this.props.filter;
	setFilter = this.props.setFilter;

	render() {
		return (
			<ul className="filters">
				<li>
					<button
						className={this.filter === 'all' ? 'selected' : null}
						onClick={() => this.setFilter('all')}>
						All
					</button>
				</li>
				<li>
					<button
						className={this.filter === 'active' ? 'selected' : ''}
						onClick={() => this.setFilter('active')}>
						Active
					</button>
				</li>
				<li>
					<button
						className={this.filter === 'completed' ? 'selected' : null}
						onClick={() => this.setFilter('completed')}>
						Completed
					</button>
				</li>
			</ul>
		);
	}
}
