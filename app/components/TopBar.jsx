import React from 'react';
import FaClose from 'react-icons/lib/fa/close';
import FaCheck from 'react-icons/lib/fa/check';
import {BASE_PRIMARY_COLOR} from '../constans/styles';

class TopBar extends React.Component {
    constructor(props) {
        super(props);

    }
    render() {
        const top = {
                display: 'flex',
                alignItems: 'center',
                height: 42,
                backgroundColor: `${BASE_PRIMARY_COLOR}`
            },
            topButton = {
                fontSize: 22,
                padding: '0px 20px',
                alignItems: 'center',
                justifyContent: 'center'
            },
            description = {
                display: 'flex',
                flex: 1,
                fontSize: 18,
                justifyContent: 'center'

            };

        return (
          <div style={top}>
              <div style={topButton} onTouchTap={this.props.onCancle}><FaClose/></div>
              <div style={description}>{this.props.text}</div>
              <div style={topButton} onTouchTap={this.props.onSend}><FaCheck/></div>
          </div>
        );}

}

export default TopBar;
