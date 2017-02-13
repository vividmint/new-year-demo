import Moment from './Moment.jsx';
import React from 'react';
// import FaHeartO from 'react-icons/lib/fa/heart-o';


class SingleComment extends React.Component {
    constructor(props) {
        super(props);
        this.onShowCommentMenu = this.onShowCommentMenu.bind(this);
        this.toPersonHome =this.toPersonHome.bind(this);
        this.onCommentToggleLike = this.onCommentToggleLike.bind(this);
    }

    render(){
        const styles = {
                display:'flex',
                flexDirection:'column',
                borderBottom: '0.5px solid rgba(0,0,0,0.1)',
            },
            top = {
                display:'flex',
                padding:'8px 0px 4px 0px',
                justifyContent:'space-between'
            },
            topLeft = {
                display:'flex',
                alignItems:'center',
            },
            avatar = {
                height:38,
                width:38,
                borderRadius:'50%',
                marginRight:15

            },
            leftRight = {
                display:'flex',
                flexDirection:'column',
                justifyContent:'center'
            },
            nickname = {
                padding:'2px 0px',
                fontSize:14,
            },
            time = {
                padding:'2px 0px',
                fontSize:12
            },

            topRight = {
                display:'flex',
                fontSize:20,
                color:'rgb(170, 170, 170)'
            },
            like = {
                fontSize:20
            },
            bottom = {
                padding:'0px 0px 6px 0px',
                lineHeight:'22px',
                fontSize:15,
                textAlign:'justify'
            };
        const data = this.props.data;
        return (
          <div style={styles} onTouchTap={this.onShowCommentMenu}>
                <div style={top}>
                  <div style={topLeft}>
                    <img style={avatar} src={data.avatar} onTouchTap={this.toPerson} ></img>
                    <div style={leftRight}>
                      <div style={nickname} onTouchTap={this.toPersonHome}>{data.nickname}</div>
                      <div><Moment style={time} data={data}/></div>
                    </div>
                  </div>
                  <div style={topRight}>
                    <div style={like} onTouchTap={this.onCommentToggleLike}></div>
                  </div>
                </div>
                <div style={bottom}>{data.content}</div>
            </div>
        );

    }
    onShowCommentMenu(){
        //显示评论操作菜单
        this.props.onShowCommentMenu(this.props.data.id);
    }
    toPersonHome(e){
        e.stopPropagation(); //阻止跳转个人用户页事件冒泡

    }
    onCommentToggleLike(){
        // this.onCommentToggleLike(this.props.data.id);
    }
}
export default SingleComment;
