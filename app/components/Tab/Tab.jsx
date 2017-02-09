import React from 'react';
import {setHash} from '../../utils.js';
import TiHome from 'react-icons/lib/ti/home';
import MdAddCircle from 'react-icons/lib/md/add-circle';
import MdAccountCircle from 'react-icons/lib/md/account-circle';
//import TiCompass from 'react-icons/lib/ti/compass';

class Tab extends React.Component {
    toHomeHash(){
      //跳转首页
        window.location.hash= '#page=index';
    }

    toUserHash(){
      //跳转用户主页
        window.location.hash= '#page=user';
    }
    render() {
        const styles = {
            position: 'fixed',
            display: 'flex',
            flex: '0 1 50px',
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'white',
            flexDirection: 'row',
            alignItems: 'center',
            textAlign:'center',
            borderTop: '1px solid #F2F2F2',
            fontSize:'32px',
            padding:'5px 0px 8px 0px',
            color:'#AAAAAA',
        };
        const buttonStyles = {
            flex:1
        };
        return (
                <div style={styles}>
                    <div onTouchTap={setHash.bind(this,'page=index')} style={buttonStyles}><TiHome /></div>
                    <div  onTouchTap={setHash.bind(this,'page=sendText')} style={buttonStyles}><MdAddCircle /></div>
                    <div onTouchTap={setHash.bind(this,'page=user')} style={buttonStyles}><MdAccountCircle /></div>
                </div>
        );
    }
}

export default Tab;
