import { Component } from 'react'
import PropTypes from 'prop-types'
import { add, parseJSON, formatDistanceToNow, differenceInSeconds } from 'date-fns'

export default class Task extends Component {
  static defaultProps = {
    isCompleted: false,
    isEditing: false,
  }

  static propTypes = {
    updateTask: PropTypes.func.isRequired,
    hasNoted: PropTypes.func.isRequired,
    hasDeleted: PropTypes.func.isRequired,
  }

  state = {
    taskID: this.props.taskID,
    taskText: this.props.text,
    minutes: this.props.minutes,
    seconds: this.props.seconds,
    creationDate: parseJSON(this.props.creationDate),
    expiredDate: parseJSON(this.props.expiredDate),
    timer: null,
    timerSecs: this.props.timerSecs,
  }

  componentDidMount() {
    this.setExpiredDate()

    if (!Number.isNaN(this.state.timerSecs)) {
      this.setState(({ creationDate, expiredDate }) => {
        return { timerSecs: differenceInSeconds(expiredDate, creationDate) }
      })
    }
  }

  componentWillUnmount() {
    clearInterval(this.state.timer)
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.state.timerSecs === 0 && prevState.timerSecs !== 0) {
      this.setStopTimer()
      this.props.hasNoted()
    }

    if (this.state.timer !== prevState.timer) {
      return this.props.updateTask(
        this.state.taskID,
        Math.floor(this.state.timerSecs / 60),
        this.state.timerSecs % 60,
        this.state.creationDate,
        this.state.expiredDate,
        this.state.timerSecs
      )
    }
  }

  setStartTimer = () => {
    if (this.state.timer) return

    this.setState({
      timer: setInterval(() => {
        if (this.state.timerSecs <= 0) return

        this.setState(({ timerSecs }) => {
          return {
            timerSecs: timerSecs - 1,
          }
        })
      }, 1000),
    })
  }

  setStopTimer = () => {
    if (!this.state.timer) return

    this.setState({
      timer: null,
    })
    clearInterval(this.state.timer)
  }

  setExpiredDate = () => {
    this.setState(({ creationDate }) => {
      return {
        expiredDate: add(creationDate, {
          years: 0,
          months: 0,
          weeks: 0,
          days: 0,
          hours: 0,
          minutes: this.state.minutes,
          seconds: this.state.seconds,
        }),
      }
    })
  }

  renderTimer = (delta) => {
    const minutes = Math.floor(delta / 60)
    const seconds = delta % 60

    return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`
  }

  render() {
    const { hasNoted, isCompleted, hasDeleted } = this.props

    return (
      <div className="view">
        <input className="toggle" type="checkbox" defaultChecked={isCompleted ? true : null} onClick={hasNoted}></input>
        <label>
          <span className="title">{this.state.taskText}</span>
          <span className="description">
            <button className="icon icon-play" onClick={this.setStartTimer}></button>
            <button className="icon icon-pause" onClick={this.setStopTimer}></button>
            <span className="counter">{this.renderTimer(this.state.timerSecs)}</span>
          </span>
          <span className="created">{formatDistanceToNow(this.state.creationDate)}</span>
        </label>
        <button className="icon icon-edit"></button>
        <button className="icon icon-destroy" onClick={hasDeleted}></button>
      </div>
    )
  }
}
