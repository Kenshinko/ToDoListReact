import TaskList from '../TaskList';
import Footer from '../Footer';

const Main = ({ tasksList, hasNoted, hasDeleted }) => {
	return (
		<section className="main">
			<TaskList
				tasks={tasksList}
				hasNoted={(id) => hasNoted(id)}
				hasDeleted={(id) => hasDeleted(id)}
			/>
			<Footer />
		</section>
	);
};

export default Main;
