import Title from '../Title'
import NewTaskForm from '../NewTaskForm'

const Header = ({ addTask }) => {
  return (
    <header className="header">
      <Title />
      <NewTaskForm addTask={addTask} />
    </header>
  )
}

export default Header
