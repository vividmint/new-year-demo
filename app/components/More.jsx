
import React from 'react';
import {render} from 'react-dom';


class More extends React.Component {
    constructor(props) {
        super(props);
        this.handleClick = this.handleClick.bind(this);
    }
    handleClick(e) {
        this.props.onTap(e);
    }
    render() {
        var divStyles = {
            display:'flex',
            justifyContent:'center',
            marginBottom:'65px',
        };
        var styles = {
            color: '#42b983',
            fontSize: '16px',
            border: '1px solid #42b983',
            width:'120px',
            height:'35px',
            backgroundColor:'white',
            borderRadius:'5px',
        };
        return (
            <div style={divStyles}>
                <button style={styles} onTouchTap={this.handleClick.bind(this)}>
                    {this.props.text}
                </button>
            </div>
        );
    }
}

export default More;
