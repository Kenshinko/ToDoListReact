import TaskList from '../TaskList';
import Footer from '../Footer';

const Main = ({ tasksList }) => {
	return (
		<section className="main">
			<TaskList tasks={tasksList} />
			<Footer />
		</section>
	);
};

export default Main;
