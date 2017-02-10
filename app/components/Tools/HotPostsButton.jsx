//import FaSmileO from 'react-icons/lib/fa/smile-o';
import FaBomb from 'react-icons/lib/fa/bomb';
import React from 'react';
import {setHash} from '../../utils';

class HotPostsButton extends React.Component {
    constructor(props) {
        super(props);
        this.toHotListHash = this.toHotListHash.bind(this);
    }
    render() {
        const styles = {
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center'
            },
            icon = {
                fontSize: 32,
                color: 'rgba(0,0,0,0.6)'
            },
            name = {
                fontSize: 16,
                padding: '10px 0px',
                color: 'rgba(0, 0, 0, 0.8)'
            };
        return (
            <div style={styles}>
                <FaBomb style={icon} onTouchTap={this.toHotListHash}/>
                <div style={name}>热门帖</div>
            </div>
        );
    }

    toHotListHash() {
            //跳转热门帖子列表
        setHash('page=hot');
    }
}
export default HotPostsButton;
