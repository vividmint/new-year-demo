import React from 'react';
import FaClose from 'react-icons/lib/fa/close';
import FaCheck from 'react-icons/lib/fa/check';
import styles from './anonymity.css';
import {setHash} from '../../utils';
import {toLogin} from '../../business';
import {postText} from '../../load';
import {BASE_PRIMARY_COLOR} from '../../constans/styles';


class SendText extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            secret: true, //是否匿名
            text: '', //输入框文字内容
        };
        this.onCancle = this.onCancle.bind(this);
        this.onSend = this.onSend.bind(this);
        this.onChange = this.onChange.bind(this);
        this.onChangeSign = this.onChangeSign.bind(this);
    }
    componentDidMount() {
        //使得评论框自动聚焦
        this.textInput.focus();
        setTimeout(() => {
            this.textInput.focus(); //移动端需要延迟加载
        }, 100);
    }
    render() {
        const style = {
                color: 'white',
                display: 'flex',
                flexDirection: 'column',
                height: '100%'
            },
            top = {
                display: 'flex',
                alignItems: 'center',
                height: 42,
                backgroundColor: `${BASE_PRIMARY_COLOR}`,
            },
            topButton = {
                fontSize: 22,
                padding: '0px 20px',
                alignItems: 'center',
                justifyContent: 'center'
            },
            description = {
                display: 'flex',
                flex: 1,
                fontSize: 18,
                justifyContent: 'center'

            },
            inputStyles = {
                // flex: '1 1 auto',
                // flexGrow: 'auto',
                fontSize: 16,
                boxSizing: 'border-box',
                resize: 'none',
                outline: 'none',
                padding: '10px 6px',
                height: 180,
                display: 'flex',
                width: '100%',
                border: 'none'
            },
            bottom = {
                display: 'flex',
                justifyContent: 'space-between',
                width: '100%',
                alignItems: 'center',
                color: '#AAAAAA',
                padding: '10px 20px',
                backgroundColor: '#F2F2F2',
                borderTop: '0.8px solid rgb(236, 234, 234)'
            },
            bottomLeft={
                display: 'flex',
                alignItems: 'center',
            },
            text = {
                textAlign: 'center',
                fontSize: 18,
                color: '#AAAAAA',
                marginLeft:10
            },
            textActive = {
                color: '#42b983',
                textAlign: 'center',
                fontSize: 18,
                marginLeft:10
            },
            send =  {
                color: '#AAAAAA',
                textAlign: 'center',
                fontSize: 16,
                borderStyle:'solid',
                borderWidth:1,
                borderColor:'rgb(170, 170, 170)',
                padding: '3px 13px',
                borderRadius:20
            },
            _send = {
                color:`${BASE_PRIMARY_COLOR}`,
                borderColor:`${BASE_PRIMARY_COLOR}`,
            };
        return (
            <div>
                <div style={style}>
                    <div style={top}>
                        <div style={topButton} onTouchTap={this.onCancle}><FaClose/></div>
                        <div style={description}>发布</div>
                        <div style={topButton} onTouchTap={this.onSend}><FaCheck/></div>
                    </div>
                    <textarea placeholder="写下你想说的话" className={styles.input} style={inputStyles} ref={(input) => {
                        this.textInput = input;
                    }} value={this.state.text} onChange={this.onChange}></textarea>
                    <div style={bottom}>
                        <div style={bottomLeft}>
                            <input type="checkbox" checked={this.state.secret} onChange={this.onChangeSign} className={styles['check-switch']} data-role="check-switch"></input>
                            <div style={this.state.secret
                                ? textActive
                                : text}>匿名</div>
                        </div>
                        <div style={!this.state.text?send:Object.assign(send,_send)} onTouchTap={this.onSend} >发布</div>
                    </div>
                </div>
            </div>

        );
    }
    onChange(e) {
        //处理input框change事件
        this.setState({text: e.target.value});
    }
    onChangeSign() {
        this.setState({
            //toggle是否匿名
            secret: !this.state.secret
        });
    }
    onCancle() {
        //取消发送，返回上一页
        if (this.props.data === null || this.props.userData === null) {
            setHash('page=index');
            return;
        }
        window.history.back();
    }
    onSend() {
        // 发送post请求
        if (this.state.text === '') {
            this.props.onShowNotice({message: '帖子内容不能为空！', level: 'error'});
        } else {
            postText({
                body: {
                    secret: this.state.secret,
                    content: this.state.text
                }
            }).then(data => {
                this.props.onShowNotice({message: '发布成功！', level: 'success'});
                this.props.onAddPost(data);
                setTimeout(() => {
                    setHash('page=index');
                }, 2000);
            }).catch(err => {
                this.props.onShowNotice({
                    message: err.message || '发布失败！',
                    level: 'error'
                });
                if (err.code === 2015) {
                    //未登录
                    toLogin();
                }
            });
        }

    }

}

export default SendText;
