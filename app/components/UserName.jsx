import React from 'react';

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

export default UserName;
