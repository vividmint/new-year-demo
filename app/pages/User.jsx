import React from 'react';
import {render} from 'react-dom';
import Tab from '../components/Tab/Tab.jsx';

class User extends React.Component {

    render() {
        const avatar = {
            width: 50,
            height: 50
        };
        return (
            <div>User lalala
                <Tab/>
            </div>
        );
    }
}

export default User;
