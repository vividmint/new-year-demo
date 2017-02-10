import React from 'react';
import {getUser} from '../load';
import Tab from '../components/Tab/Tab';
import UserDetail from '../components/UserDetail';
import UserItems from '../components/UserItems';

class User extends React.Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        if (this.props.userData === null) {
            getUser().then(data => {
                this.props.onLoadUser({userData: data});
            }).catch(err => {
                console.log(err);
            });
        }
        
    }

    render() {
        return (
            <div>
                <UserDetail userData={this.props.userData}/>
                <UserItems/>
                <Tab/>
            </div>
        );
    }


}

export default User;
