import React from 'react';
import {render} from 'react-dom';

class UserName extends React.Component {
    render(){
        return <div>
      {this.props.data.nickname}
    </div>;
    }
}

export default UserName;
