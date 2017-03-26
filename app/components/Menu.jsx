import React from 'react';
import {BASE_PRIMARY_COLOR} from '../constans/styles';

class Menu extends React.Component {
    constructor(props){
        super(props);
    }
    render(){
        var menus = this.props.menus;
        var menusComponent = menus.map((v,i)=>{
            let style = Object.assign({
                padding: '13px 2px',
                margin:'8px',
                backgroundColor: 'rgb(255,255,255)',
                borderRadius:11,
                color:`${BASE_PRIMARY_COLOR}`,
                fontSize:17
            },v.style);
            if(i===(menus.length-1)){
                style.borderBottom = 'none';
            }
            if(i===(menus.length-2)){
                style.borderBottomWidth = 4;
            }
            return (<div key={i} onTouchTap={v.onTap} style={style}>{v.text || '确定'}</div>);
        });

        return (<div>
          {menusComponent}
        </div>);
    }
}
export default Menu;
