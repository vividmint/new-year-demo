import React from 'react';

class Fold extends React.Component {
    constructor(props) {
        super(props);
        this.handleClick = this.handleClick.bind(this);
    }
    handleClick() {
        this.props.foldHandle();
    }
    render() {
        const styles = {
            display: 'inline-block',
            border: '1px solid #AAAAAA',
            color: '#AAAAAA',
            borderRadius: '35px',
            height: '25px',
            textAlign: 'center',
            lineHeight: '25px',
            fontSize: '14px',
            padding: '0px 15px',
            cursor: 'pointer',
            margin:'0px 0px 15px 0px'
        };
        const hide ={
            display:'none'
        };

        return (
            <div onTouchTap={this.handleClick} style={this.props.content.length>150?styles:hide}>
                {this.props.foldText.text}
            </div>
        );
    }
}
export default Fold;
