import Title from '../Title';
import NewTaskForm from '../NewTaskForm';

const Header = () => {
	return (
		<header className="header">
			<Title />
			<NewTaskForm />
		</header>
	);
};

export default Header;
