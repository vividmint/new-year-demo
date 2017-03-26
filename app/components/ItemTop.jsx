import React from 'react';
import Moment from './Moment';

class ItemTop extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        let topStyles = {
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center'
            },
            userStyles = {
                display: 'flex',
                alignItems: 'center'
            };
        return (

            <div style={topStyles}>
                <div style={userStyles}>
                    <Avatar data={{
                        avatar: this.props.data.avatar
                    }}/>
                    <UserName gender={this.props.data.gender} secret={this.props.data.secret} nickname={this.props.data.nickname}/>
                </div>
                <Moment data={{
                    date: this.props.data.date
                }}/>
            </div>
        );
    }
}

class Avatar extends React.Component {
    render() {
        const styles = {
            height: '40px',
            width: '40px',
            marginRight: '15px',
            borderRadius: '50%'
        };
        return <div >
            <img style={styles} src={this.props.data.avatar}></img>
        </div>;
    }
}

class UserName extends React.Component {
    render() {
        let nickname = null;
        if (this.props.secret === 0) {
          //实名
            nickname = this.props.nickname;
        } else {
          //匿名
            if (this.props.gender === 1) {
                nickname = '某同学·男';
            } else if (this.props.gender === 2) {
                nickname = '某同学·女';
            } else {
                nickname = '某同学·未知';
            }
        }

        return <div>
            {nickname}
        </div>;
    }
}
export default ItemTop;
