import React from 'react';
import TiHome from 'react-icons/lib/ti/home';
import MdAddCircle from 'react-icons/lib/md/add-circle';
import MdAccountCircle from 'react-icons/lib/md/account-circle';
//import TiCompass from 'react-icons/lib/ti/compass';
import {BASE_PRIMARY_COLOR} from '../../constans/styles';

class Tab extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        const styles = Object.assign({
            position: 'fixed',
            display: 'flex',
            flex: '0 1 50px',
            left: 0,
            right: 0,
            bottom: 0,
            alignItems: 'center',
            textAlign: 'center',
            borderTop: '0.5px solid rgba(0,0,0,0.1)',
            boxShadow: '0.5px 0.5px 0.5px 0.5px rgba(0, 0, 0, 0.05)',
            backgroundColor: 'rgb(255,255,255)',
            padding: '9px 0px'
        }, this.props.style);

        const itemStyle = {
            flex: 1,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            textDecoration: 'none',
        };
        const iconStyle = {
            color: '#AAAAAA',
            fontSize: '32px'
        };
        let bubbleStyle = {
            height: 18,
            minWidth: 18,
            padding: '2px 5px',
            color: 'rgb(255,255,255)',
            borderRadius: 20,
            position: 'absolute',
            fontSize: 10,
            top: -3,
            left:18,
            backgroundColor: `${BASE_PRIMARY_COLOR}`
        };
        const tabList = [
            {
                href: '#page=index',
                key: 'home'
            }, {
                href: '#page=sendText',
                key: 'plus'
            }, {
                href: '#page=user',
                key: 'user',
                bubble: this.props.count
                    ? true
                    : false
            }
        ];
        /**
         * {
         * type:"count",
         * value:1866
         * }
         *
         * {
         * type:"dot",
         * value:true
         * }
         */

        const tabMap = {
            'home': <TiHome style={iconStyle}/>,
            'plus': <MdAddCircle style={iconStyle}/>,
            'user': <MdAccountCircle style={iconStyle}/>
        };
        const iconContainerStyle = {
            position: 'relative',
            display:'inline'
        };

        let tabComponent = tabList.map((item, index) => {
            let bubble = null;
            if (item.bubble) {
                bubble = <div style={bubbleStyle}>{this.getCountLength()}</div>;
            }
            return (
              <div style={itemStyle} key={'icon_' + index}>
                <a href={item.href}  style={iconContainerStyle}>
                    {tabMap[item.key]}
                    {bubble}
                </a>
              </div>

            );

        });
        return (
            <div style={styles}>
                {tabComponent}
            </div>
        );
    }
    getCountLength(){
        if(this.props.count>=10000){
            let n = Math.floor(this.props.count/1000);
            return `${n}k`;
        }else{
            return this.props.count;
        }
    }
}
export default Tab;
