import React from 'react';
import {render} from 'react-dom';
import Tab from '../components/Tab/Tab.jsx';
import Item from '../components/Item/Item.jsx';
import {request, getHash} from '../utils.js';
import Avatar from '../components/Avatar.jsx';
import UserName from '../components/UserName.jsx';
import Moment from '../components/Moment.jsx';
import Loading from '../components/Loading.jsx';
import BottomButtons from '../components/BottomButtons.jsx';
import Textarea from 'react-textarea-autosize';


class Detail extends React.Component {
    constructor(props) {
        super(props);
    }
    componentDidMount(){
        let id = getHash('id');
        if(!this.props.data || !this.props.data[id]){
            request({
                url:`/api/post?id=${id}`
            }).then(result=>{
                // console.log(result);
                result.data.id = id;//todos 上线记得删除
                this.props.onLoadDetail({
                    data:result.data
                });
            });
        }
        console.log(this.props.data);
    }

    render() {
        const styles = {
            display:'flex',
            flexDirection:'column',
            justifyContent:'space-between',
            backgroundColor: 'white',
            margin: '0px 0px 120px 0px',
            padding: '0px 20px 10px 20px',

        };
        const mainStyles = {
            overflow:'scroll',
        };
        const topStyles = {
            paddingTop:'15px',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center'
        };
        const userStyles = {
            display: 'flex',
            alignItems: 'center'
        };
        const contentStyles = {
            margin: '10px 0px 12px 0px',
            overflow: 'hidden',
            lineHeight: '25px',
            whiteSpace: 'pre-wrap'
        };

        let id = getHash('id');
        if (this.props.data) {
            let data = this.props.data[id];
            return (
          <div style={styles}>
              <div style={mainStyles}>
                <div style={topStyles}>
                    <div style={userStyles}>
                        <Avatar data={{avatar: data.avatar}}/>
                        <UserName data={{nickname: data.nickname}}/>
                    </div>
                        <Moment data={{date: data.date}}/>
                    </div>
                <div style={contentStyles}>{data.content}</div>
                <BottomButtons likeCount={this.props.data[id].likeCount} commentCount={this.props.data[id].commentCount}/>
              </div>
              <DetailCommentInput/>
              <Tab/>
          </div>
            );
        } else {
            return (
                <div><Loading/></div>
            );
        }

    }
}

class DetailCommentInput extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            text: '',//文本框的内容
        };
        this.handleChange = this.handleChange.bind(this);

    }
    handleChange(e) {
      //处理input框change事件
        this.setState({text: e.target.value});
    }
    clickSend() {
      //发布评论
        if (this.state.text) {
            this.props.clickSend({comment: this.state.text});
        }
    }
    render(){
        const commentStyles = {
            borderTop: '0.8px solid #F0F0F0',
            boxSizing: 'border-box',
            display: 'flex',
            justifyContent: 'flex-start',
            alignItems: 'center',
            color: 'rgba(0,0,0,0.8)',
            backgroundColor:'white',
            fontSize: '16px',
            padding: '5px 15px',
            position:'fixed',
            bottom:50,
            left:0,
            width:'100%',
            flex: '0 1 50px',
        };
        const inputStyles = {
            flex:'6',
            backgroundColor: '#F2F2F2',
            borderRadius: '5px',
            borderStyle: 'none',
            outline: 'none',
            width: '100%',
            padding: '5px 8px',
            margin: '10px 40px 10px 0px',
            minHeight: '22px',
            lineHeight: '22px',
            fontSize: '16px',
            resize: 'none',
        };
        const noSendButton = {
            flex:'6',
            backgroundColor: '#F2F2F2',
            borderRadius: '5px',
            borderStyle: 'none',
            outline: 'none',
            width: '100%',
            padding: '5px 8px',
            margin: '10px 0px',
            minHeight: '22px',
            lineHeight: '22px',
            fontSize: '16px',
            resize: 'none',
        };
        const HideSend = {
            display:'none'
        };
        const sendActive = {
            flex:'1',
            position:'absolute',
            right:12,
            top:18,
            color: '#42b983',
            fontSize: '16px',
            textAlign: 'center',
        };
        return (
  <div style={commentStyles}>
     <Textarea maxRows={5} ref={(input) => {
         this.textInput = input;
     }} style={this.state.text?inputStyles:noSendButton} onChange={this.handleChange} placeholder='发表评论' value={this.state.text}></Textarea>
   <div style={this.state.text?sendActive:HideSend}  onTouchTap={this.clickSend.bind(this)}>发送</div>
  </div>
        );
    }
}

export default Detail;
