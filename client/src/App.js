import React, { Suspense } from 'react';
import Loader from 'react-loader-spinner';
import { Route, Switch } from 'react-router-dom';

// Styles
import './App.css';
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css';

// Get pages
import Home from './pages/Home';

// Lazy loaded routes

function App() {
	return (
		<div className='App'>
			<div className='App-Page-Content'>
				<Suspense
					fallback={
						<Loader className='load-spinner' type='TailSpin' color='#0089FA' height={100} width={100} />
					}
				>
					<Switch>
						<Route exact path='/' component={Home} />
					</Switch>
				</Suspense>
			</div>
		</div>
	);
}

export default App;
