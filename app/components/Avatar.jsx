import React from 'react';
import {render} from 'react-dom';

class Avatar extends React.Component {
    render() {
        const styles = {
            height :'40px',
            width: '40px',
            marginRight:'15px',
            borderRadius:'50%'
        };
        return <div >
            <img style={styles} src={this.props.data.avatar}></img>
        </div>;
    }
}

export default Avatar;
