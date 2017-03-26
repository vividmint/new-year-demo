import {timeFromNow} from '../utils';
import React from 'react';

class Moment extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        const styles = Object.assign({
            color:'#b3b3b3',
            fontSize:'14px',
            letterSpacing:'0.8px',
        },this.props.style);
        if (this.props.data.date) {
            return (
                <div style={styles}>{timeFromNow(new Date(this.props.data.date*1000))}
                </div>
            );
        }else{
            return null;
        }
    }
}
export default Moment;
