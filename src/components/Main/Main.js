import TaskList from '../TaskList';
import Footer from '../Footer';

const Main = ({
	tasks,
	tasksList,
	filter,
	setFilter,
	hasNoted,
	hasDeleted,
	clearCompleted,
	filterTasks,
}) => {
	return (
		<section className="main">
			<TaskList
				tasksList={tasksList}
				hasNoted={hasNoted}
				hasDeleted={(id) => hasDeleted(id)}
			/>
			<Footer
				tasks={tasks}
				tasksList={tasksList}
				filter={filter}
				setFilter={setFilter}
				clearCompleted={clearCompleted}
				filterTasks={filterTasks}
			/>
		</section>
	);
};

export default Main;
