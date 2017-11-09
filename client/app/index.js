import React from 'react';
import ReactDOM from 'react-dom';
import './assets/css/global.css';
import 'normalize.css';

import Dashboard from './modules/dashboard/components/dashboard';

const App = () => {
    return (
        <div>
            <Dashboard />
        </div>
    );
}

ReactDOM.render(<App/>, document.getElementById('root'));
