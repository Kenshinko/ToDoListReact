import { Component } from 'react';
import PropTypes from 'prop-types';

export default class TasksFilter extends Component {
	static defaultProps = {
		filter: 'all',
	};

	static propTypes = {
		setFilter: PropTypes.func.isRequired,
	};

	render() {
		const { filter, setFilter } = this.props;

		return (
			<ul className="filters">
				<li>
					<button
						className={filter === 'all' ? 'selected' : null}
						onClick={() => setFilter('all')}>
						All
					</button>
				</li>
				<li>
					<button
						className={filter === 'active' ? 'selected' : ''}
						onClick={() => setFilter('active')}>
						Active
					</button>
				</li>
				<li>
					<button
						className={filter === 'completed' ? 'selected' : null}
						onClick={() => setFilter('completed')}>
						Completed
					</button>
				</li>
			</ul>
		);
	}
}
