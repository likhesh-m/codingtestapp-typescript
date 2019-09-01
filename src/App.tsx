import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import './App.css';

import { Dashboard, UserDetail, AddUser, PageNotFound } from './components';

const App: React.SFC = () => {
	return (
		<Router>
			<Switch>
				<Route exact path="/" component={Dashboard} />
				<Route exact path="/users" component={AddUser} />
				<Route path="/users/:id" component={UserDetail} />
				<Route component={PageNotFound} />
			</Switch>
		</Router>
	);
};

export default App;
