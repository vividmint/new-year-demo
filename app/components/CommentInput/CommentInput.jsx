import React from 'react';
import {render} from 'react-dom';
import Css from './CommentInput.css';
import Textarea from 'react-textarea-autosize';

class CommentInput extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            text: '',//文本框的内容
        };
        this.handleChange = this. handleChange.bind(this);

    }
    componentDidMount() {
        //使得评论框自动聚焦
        this.textInput.focus();
        setTimeout(() => {
            this.textInput.focus();
        }, 100);
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
    render() {
        const styles = {
            width: '100%',
            boxSizing: 'border-box',
            display: 'flex',
            justifyContent: 'flex-start',
            alignItems: 'center',
            color: 'rgba(0,0,0,0.8)',
            fontSize: '16px',
            padding: '15px 0px 10px 0px'
        };
        const inputStyles = {
            backgroundColor: '#F2F2F2',
            borderRadius: '5px',
            borderStyle: 'none',
            outline: 'none',
            width: '100%',
            padding: '5px 8px',
            marginRight: '40px',
            minHeight: '22px',
            lineHeight: '22px',
            fontSize: '16px',
            resize: 'none'
        };
        const send = {
            position: 'absolute',
            top: '20px',
            right: '0px',
            color: '#AAAAAA',
            fontSize: '16px',
            textAlign: 'center'
        };
        const sendActive = {
            position: 'absolute',
            top: '23px',
            right: '0px',
            color: '#42b983',
            fontSize: '16px',
            textAlign: 'center'
        };

        return (
            <div className={Css.commentInput} style={styles}>
                <Textarea maxRows={5} ref={(input) => {
                    this.textInput = input;
                }} style={inputStyles} onChange={this.handleChange} placeholder='发表评论' value={this.state.text}></Textarea>
                <div style={this.state.text
                    ? sendActive
                    : send} onTouchTap={this.clickSend.bind(this)}>发送</div>
            </div>
        );
    }

}

export default CommentInput;
