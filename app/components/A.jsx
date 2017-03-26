import React from 'react';

class A extends React.Component {
    constructor(props) {
        super(props);
        this.onTap = this.onTap.bind(this);
    }
    onTap(url) {
        window.location.href = url;
    }

    render() {
        return (
            <div onTouchTap={this.onTap.bind(this, this.props.href)} style={this.props.style}>
                {this.props.children}
            </div>
        );
    }
}
export default A;
