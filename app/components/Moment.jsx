import moment from 'moment';
import React from 'react';
import {render} from 'react-dom';
import momentFromNow from 'moment-from-now';

moment.locale('zh-cn', {
    relativeTime: {
        future: '%s后',
        past: '%s前',
        s: '秒',
        m: '一分钟',
        mm: '%d分钟',
        h: '一个小时',
        hh: '%d小时',
        d: '一天',
        dd: '%d天',
        M: '一月',
        MM: '%d月',
        y: '一年',
        yy: '%d年'
    }
});


class Moment extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            time: null
        };
    }
    componentDidMount() {
        let time = moment(this.props.data.date*1000).fromNow();
        this.setState({time: time});
    }

    render() {
        const styles = {
            color:'#b3b3b3',
            fontSize:'14px',
            letterSpacing:'0.8px',
        };
        if (this.state.time) {
            return (
                <div style={styles}>{this.state.time}
                </div>
            );
        }else{
            return null;
        }
    }
}

export default Moment;
