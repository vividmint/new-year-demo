import React from 'react';
import {getNoticeList} from '../load';

class UserNotice extends React.Component {
    constructor(props) {
        super(props);
    }
    componentDidMount() {
        getNoticeList({fromId: null}).then(data => {
            console.log(data);
        });
    }
    render() {
        const styles = {
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                padding: '15px 0px 10px 0px',
                borderBottom: '1px solid rgba(0,0,0,0.1)'
            },
            button = Object.assign({
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                flex: 1
            }, _button),
            _button = {
                borderRight: '1px solid rgba(0,0,0,0.1)'
            },
            name = {
                paddingRight: 10,
                color: 'rgba(0,0,0,0.6)'
            },
            count = {
                color: 'rgba(0,0,0,0.8)',
                fontSize: 18
            };

        if (this.props.userNoticeCount !== null) {
            console.log(this.props.userNoticeCount);
            return (
                <div style={styles}>
                    <a style={Object.assign(button, _button)}>
                        <span style={name}>评论</span>
                        <span style={count}>{this.props.userNoticeCount.replyCount}</span>
                    </a>
                    <a style={button}>
                        <span style={name}>赞</span>
                        <span style={count}>{this.props.userNoticeCount.likeCount}</span>
                    </a>
                </div>
            );
        }

    }
}

export default UserNotice;
