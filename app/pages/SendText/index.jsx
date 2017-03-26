import React from 'react';
import TopBar from '../../components/TopBar';
import styles from './anonymity.css';
import {setHash} from '../../utils';
import {toLogin} from '../../business';
import {postText, getUser, reportPost} from '../../load';
import {BASE_PRIMARY_COLOR} from '../../constans/styles';

class SendText extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            secret: true, //是否匿名
            text: this.props.value
                ? this.props.value
                : '', //输入框文字内容
        };
        this.onCancle = this.onCancle.bind(this);
        this.onSend = this.onSend.bind(this);
        this.onChange = this.onChange.bind(this);
        this.onChangeSign = this.onChangeSign.bind(this);
    }
    componentDidMount() {
        getUser().catch(err => {
            console.log(err);
            if (err.code === 1003) {
                this.props.onShowNotice({message: '请登录！', level: 'error'});
                setTimeout(() => {
                    toLogin();
                }, 1500);
            }
        });
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
                flexDirection: 'row-reverse',
                width: '100%',
                alignItems: 'center',
                padding: '10px 20px',
                backgroundColor: '#F2F2F2',
                borderTop: '0.8px solid rgb(236, 234, 234)'
            },
            bottomLeft = {
                display: 'flex',
                alignItems: 'center'
            },
            text = {
                textAlign: 'center',
                fontSize: 18,
                color: 'rgb(170, 170, 170)',
                marginLeft: 10
            },
            _text = {
                color: `${BASE_PRIMARY_COLOR}`
            },
            send = {
                color: '#AAAAAA',
                textAlign: 'center',
                fontSize: 15,
                borderStyle: 'solid',
                borderWidth: 1,
                borderColor: 'rgb(170, 170, 170)',
                padding: '4px 12px',
                borderRadius: 20
            },
            _send = {
                color: `${BASE_PRIMARY_COLOR}`,
                borderColor: `${BASE_PRIMARY_COLOR}`
            };
        return (
            <div>
                <div style={style}>
                    <TopBar text={this.props.topText} onCancle={this.onCancle} onSend={this.onSend}/>
                    <textarea placeholder={this.props.placeholder || ''} className={styles.input} style={inputStyles} ref={(input) => {
                        this.textInput = input;
                    }} value={this.state.text} onChange={this.onChange}></textarea>
                    <div style={bottom}>
                        <div style={!this.state.text
                            ? send
                            : Object.assign(send, _send)} onTouchTap={this.onSend}>SEND</div>
                        <div style={this.props.showCheckBox
                            ? bottomLeft
                            : {
                                display: 'none'
                            }}>
                            <input type="checkbox" checked={this.state.secret} onChange={this.onChangeSign} className={styles['check-switch']} data-role="check-switch"></input>
                            <div style={this.state.secret
                                ? Object.assign(text, _text)
                                : text}>匿名</div>
                        </div>
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
            this.props.onShowNotice({message: '内容不能为空！', level: 'error'});
        } else {
            this.props.showGlobalLoading();
            if (this.props.page === 'sendText' || this.props.page=== 'advise') {
                postText({
                    body: {
                        secret: this.state.secret,
                        content: this.state.text
                    }
                }).then(data => {
                    this.props.closeGlobalLoading();
                    this.props.onShowNotice({message: '发布成功！', level: 'success'});
                    this.props.onAddPost(data);
                    setTimeout(() => {
                        setHash('page=index');
                    }, 1000);
                }).catch(err => {
                    this.props.closeGlobalLoading();
                    this.props.onShowNotice({
                        message: err.message || '发布失败！',
                        level: 'error'
                    });
                    if (err.code === 2015) {
                        //未登录
                        toLogin();
                    }
                });
            } else if (this.props.page === 'report') {
                reportPost({postId: this.props.reportId, content: this.state.text}).then(() => {
                    this.props.closeGlobalLoading();
                    this.props.onShowNotice({message: '举报成功！', level: 'success'});
                    setTimeout(() => {
                        window.history.back();
                    }, 1000);
                }).catch(err => {
                    this.props.closeGlobalLoading();
                    this.props.onShowNotice({
                        message: err.message || '举报失败！',
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

}

export default SendText;
