import { formatDistanceToNow, parseJSON } from 'date-fns'

const Task = ({ task, hasNoted, hasEdit, deleteTask, handleSetTimer }) => {
  const { text, taskID, isCompleted, creationDate, timerSecs } = task

  const renderTimer = (delta) => {
    const mins = Math.floor(delta / 60)
    const secs = delta % 60

    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`
  }

  return (
    <div className="view">
      <input
        className="toggle"
        type="checkbox"
        defaultChecked={isCompleted ? true : null}
        onClick={() => hasNoted(taskID)}
      ></input>
      <label>
        <span className="title">{text}</span>
        <span className="description">
          <button className="icon icon-play" onClick={() => handleSetTimer(taskID, true)}></button>
          <button className="icon icon-pause" onClick={() => handleSetTimer(taskID, false)}></button>
          <span className="counter">{renderTimer(timerSecs)}</span>
        </span>
        <span className="created">{formatDistanceToNow(parseJSON(creationDate))}</span>
      </label>
      <button className="icon icon-edit" onClick={() => hasEdit(taskID)}></button>
      <button className="icon icon-destroy" onClick={() => deleteTask(taskID)}></button>
    </div>
  )
}

export default Task
