import React, { lazy, Suspense } from 'react';
import { Router } from '@reach/router';
const Landing = lazy(() => import('./Landing'));

const Loading = () => <div>Loading...</div>;

const App = () => (
	<Suspense fallback={Loading}>
		<Router>
			<Landing path="/" />
		</Router>
	</Suspense>
);

export default App;
