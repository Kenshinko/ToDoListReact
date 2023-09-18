import { Component } from 'react'
import PropTypes from 'prop-types'

export default class TasksFilter extends Component {
  static defaultProps = {
    filter: 'all',
  }

  static propTypes = {
    setFilter: PropTypes.func.isRequired,
  }

  setActiveButton = (filter, className) => {
    return filter === className ? 'selected' : null
  }

  render() {
    const { filter, setFilter } = this.props

    return (
      <div className="filters">
        <label className={this.setActiveButton(filter, 'all')}>
          <input
            className="radiobutton"
            type="radio"
            name="filter"
            value="all"
            checked={filter === 'all'}
            onChange={() => setFilter('all')}
          />
          All
        </label>
        <label className={this.setActiveButton(filter, 'active')}>
          <input
            className="radiobutton"
            type="radio"
            name="filter"
            value="active"
            checked={filter === 'active'}
            onChange={() => setFilter('active')}
          />
          Active
        </label>
        <label className={this.setActiveButton(filter, 'completed')}>
          <input
            className="radiobutton"
            type="radio"
            name="filter"
            value="completed"
            checked={filter === 'completed'}
            onChange={() => setFilter('completed')}
          />
          Completed
        </label>
      </div>
    )
  }
}
