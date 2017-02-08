import React from 'react';

/**
 *
 *
 *
 *  <Menu menus={[
 *  {
 *  text:"删除评论",
 *  onTap:()=>{
 *  console.log('tap')
 *  },
 *
 *  }
 *
 *  ]}/>
 */


class Menu extends React.Component {
    constructor(props){
        super(props);
    }
    render(){
        var menus = this.props.menus;
        var menusComponent = menus.map((v,i)=>{
            let style = Object.assign({
                padding: '15px 0px',
                backgroundColor: 'white',
                borderBottomStyle: 'solid',
                borderBottomWidth:0.8,
                borderBottomColor:'rgb(242,242,242)'
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
