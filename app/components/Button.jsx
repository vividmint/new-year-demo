import React from 'react';
import {BASE_PRIMARY_COLOR} from '../constans/styles';


class Button extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        var styles = {
            display:'flex',
            justifyContent:'center',
            backgroundColor:'#F2F2F2',
            paddingBottom:4
        };
        var button = {
            color: '#42b983',
            fontSize: '16px',
            border: `1px solid ${BASE_PRIMARY_COLOR}`,
            width:'120px',
            height:'35px',
            backgroundColor:'white',
            borderRadius:'5px',
        };
        return (
            <div style={styles}>
                <button style={button} onTouchTap={this.props.onTap}>
                    {this.props.text}
                </button>
            </div>
        );
    }
}

export default Button;
