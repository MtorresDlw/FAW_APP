import React from 'react';
import ReactDOM from 'react-dom';
import './assets/css/style.css';

import Dashboard from './modules/dashboard/components/dashboard';

const App = () => {
    return (
        <div>
            <Dashboard />
        </div>
    );
}

ReactDOM.render(<App/>, document.getElementById('root'));
