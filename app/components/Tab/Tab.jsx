import React from 'react';
import TiHome from 'react-icons/lib/ti/home';
import MdAddCircle from 'react-icons/lib/md/add-circle';
import MdAccountCircle from 'react-icons/lib/md/account-circle';
//import TiCompass from 'react-icons/lib/ti/compass';

class Tab extends React.Component {
    constructor(props) {
        super(props);
        this.toHomeHash = this.toHomeHash.bind(this);
        this.toUserHash = this.toUserHash.bind(this);
        this.toSendTextHash = this.toSendTextHash.bind(this);
    }

    render() {
        const styles = Object.assign({
            position: 'fixed',
            display: 'flex',
            flex: '0 1 50px',
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'white',
            flexDirection: 'row',
            alignItems: 'center',
            textAlign: 'center',
            borderTop: '0.5px solid rgba(0,0,0,0.1)',
            boxShadow:'0.5px 0.5px 0.5px 0.5px rgba(0, 0, 0, 0.05)',
            fontSize: '32px',
            padding: '5px 0px 8px 0px',
            color: '#AAAAAA'
        }, this.props.style);
        const buttonStyles = {
            flex: 1
        };
        return (
            <div style={styles}>
                <div onTouchTap={this.toHomeHash} style={buttonStyles}><TiHome/></div>
                <div onTouchTap={this.toSendTextHash} style={buttonStyles}><MdAddCircle/></div>
                <div onTouchTap={this.toUserHash} style={buttonStyles}><MdAccountCircle/></div>
            </div>
        );
    }
    toHomeHash() {
        //跳转首页
        if (this.props.page === 'index') {
            this.props.onRefresh();
        } else {
            window.location.hash = '#page=index';
        }
    }
    toSendTextHash() {
        window.location.hash = '#page=sendText';
    }
    toUserHash() {
        //跳转用户主页
        window.location.hash = '#page=user';
    }
}

export default Tab;
