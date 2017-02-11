import React from 'react';

class Fold extends React.Component {
    constructor(props) {
        super(props);
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
        return (
            <div onTouchTap={this.props.onToggleFold} style={styles}>
                {this.props.foldText}
            </div>
        );
    }
}
export default Fold;
