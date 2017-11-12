import React, { Component } from 'react';
import styles from './css/dashboard.css';

import Header from './header';

class Dashboard extends Component {

    render() {

        return (
            <div className="dashboard">
                <Header />
            </div>
        );
    }
}

export default Dashboard;
