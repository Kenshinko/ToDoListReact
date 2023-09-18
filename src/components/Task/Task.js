import { Component } from 'react'
import PropTypes from 'prop-types'

export default class TaskActive extends Component {
  static defaultProps = {
    isCompleted: false,
    isEditing: false,
  }

  static propTypes = {
    hasNoted: PropTypes.func.isRequired,
    hasDeleted: PropTypes.func.isRequired,
  }

  render() {
    const { text, creationDate, isCompleted, hasNoted, hasDeleted } = this.props

    return (
      <div className="view">
        <input className="toggle" type="checkbox" defaultChecked={isCompleted ? true : null} onClick={hasNoted}></input>
        <label>
          <span className="description">{text}</span>
          <span className="created">{creationDate}</span>
        </label>
        <button className="icon icon-edit"></button>
        <button className="icon icon-destroy" onClick={hasDeleted}></button>
      </div>
    )
  }
}
