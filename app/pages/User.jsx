import React from 'react';
import {getUser} from '../load';
import {toLogin} from '../business';
import Tab from '../components/Tab/Tab';
import UserDetail from '../components/UserDetail';
import UserItems from '../components/UserItems';
import GlobalLoading from '../components/GlobalLoading.jsx';

class User extends React.Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        if (this.props.userData === null) {
            getUser().then(data => {
                this.props.onLoadUser({userData: data});
            }).catch(err => {
                toLogin();
                console.log(err);
            });
        }

    }

    render() {
        if(!this.props.userData){
            return (
              <div>
              <GlobalLoading loading={{
                  isShow:true,
                  isMask:false
              }}/>
            <Tab style={{zIndex:101}}/>
        </div>
            );
        }
        return (
            <div>
                <UserDetail onShowNotice={this.props.onShowNotice} userData={this.props.userData}/>
                <UserItems/>
                <Tab/>
            </div>
        );
    }

}

export default User;
