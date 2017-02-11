import React from 'react';
import {BASE_PRIMARY_COLOR} from '../constans/styles';


class Button extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        var divStyles = {
            display:'flex',
            justifyContent:'center',
            padding:'15px 0px'
        };
        var styles = {
            color: '#42b983',
            fontSize: '16px',
            border: `1px solid ${BASE_PRIMARY_COLOR}`,
            width:'120px',
            height:'35px',
            backgroundColor:'white',
            borderRadius:'5px',
        };
        return (
            <div style={divStyles}>
                <button style={styles} onTouchTap={this.props.onTap}>
                    {this.props.text}
                </button>
            </div>
        );
    }
}

export default Button;
