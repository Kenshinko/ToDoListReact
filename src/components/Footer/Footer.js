import TaskCount from '../TaskCount';
import TasksFilter from '../TasksFilter';

const Footer = () => {
	return (
		<footer className="footer">
			<TaskCount />
			<TasksFilter />
			<button className="clear-completed">Clear completed</button>
		</footer>
	);
};

export default Footer;
