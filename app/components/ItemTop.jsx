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
                    <UserName gender={this.props.data.gender} nickname={this.props.data.nickname}/>
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
            height :'40px',
            width: '40px',
            marginRight:'15px',
            borderRadius:'50%'
        };
        return <div >
            <img style={styles} src={this.props.data.avatar}></img>
        </div>;
    }
}

class UserName extends React.Component {
    render() {
        let nickname = null;
        if (this.props.gender === 0) {
            nickname = this.props.nickname+'·未知';
        } else {
            nickname = this.props.gender === 1
                ? this.props.nickname + '·男'
                : this.props.nickname + '·女';
        }
        return <div>
            {nickname}
        </div>;
    }
}
export default ItemTop;
