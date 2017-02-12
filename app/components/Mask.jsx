import React from 'react';
/**
 * 蒙版
 */
class Mask extends React.Component {
    render(){
        const styles={
            backgroundColor:'black',
            filter:'alpha(Opacity=30)',
            opacity:'0.1',
            position:'fixed',
            left:0,
            top:0,
            zIndex:100,
            height:'100%',
            width:'100%'
        };
        const hide = {
            display:'none'
        };
        return(<div onTouchTap={()=>{
            this.props.onTap && this.props.onTap();
        }} style={this.props.isMask?styles:hide}></div>);
    }
}
export default Mask;
