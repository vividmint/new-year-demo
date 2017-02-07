import React from 'react';

class Loading extends React.Component{
    render(){
        var styles = {
            margin:'5px 0px 0px 2px',
        };
        if(!this.props.data){
            return <div style={styles}>loading</div>;
        }
    }
}

export default Loading;
