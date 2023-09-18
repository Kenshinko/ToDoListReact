import ReactDOM from 'react-dom/client';
import Header from './components/Header';
import Main from './components/Main';

import './/style.css';

const mockTasks = [
	{
		taskID: 1,
		text: 'Completed task',
		creationDate: 'created 17 seconds ago',
		isCompleted: true,
		isEditing: false,
	},
	{
		taskID: 2,
		text: 'Editing task',
		creationDate: 'created 5 minutes ago',
		isCompleted: false,
		isEditing: true,
	},
	{
		taskID: 3,
		text: 'Active task',
		creationDate: 'created 5 minutes ago',
		isCompleted: false,
		isEditing: false,
	},
];

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render([
	<Header key="header" />,
	<Main tasksList={mockTasks} key="main" />,
]);
