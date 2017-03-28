import React from 'react';
import Css from './Detail.css';
import {getHash, setHash} from '../../utils.js';
import {REPORT_TEXT} from '../../constans/config';
import {
    getPost,
    getComments,
    postComment,
    deleteComment,
    deletePost,
    postLike,
    deleteLike,
    postCommentLike,
    deleteCommentLike,
    getUser,
    block,
    whiteList
} from '../../load';
import GlobalLoading from '../../components/GlobalLoading.jsx';
import Item from '../../components/Item';
import Textarea from 'react-textarea-autosize';
import CommentList from '../../components/CommentList';
import {toLogin} from '../../business';
import Menu from '../../components/Menu';

class Detail extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            commentContainerHeight: 63, //评论框组件高度
        };
        this.onLoadMoreComment = this.onLoadMoreComment.bind(this);
        this.getFromId = this.getFromId.bind(this); //获取最后一条评论id
        this.onHeightChange = this.onHeightChange.bind(this); //当评论框高度变化时
        this.onPostComment = this.onPostComment.bind(this); //当发送评论
        this.onShowCommentMenu = this.onShowCommentMenu.bind(this); //操作评论事件
        this.onToggleLike = this.onToggleLike.bind(this); //当点赞
        this.onDeleteComment = this.onDeleteComment.bind(this); //删除评论
        this.onCommentToggleLike = this.onCommentToggleLike.bind(this); //点赞评论
        this.onToggleOther = this.onToggleOther.bind(this); //当点击...
        this.onDeletePost = this.onDeletePost.bind(this); //当删除文章

    }
    componentDidMount() {
        document.body.scrollTop = 0;
        let postId = getHash('id');
        if (!this.props.data) {
            getPost({postId: postId}).then(data => {
                if (Array.isArray(data)) {
                    this.props.onShowNotice({message: '帖子不存在！', level: 'error'});
                    setTimeout(() => {
                        this.props.onLoadDetailFail({postId: postId, message: '帖子不存在'});
                        return;
                    }, 1500);

                }
                this.props.onLoadDetail({data});
                this.getCommentList({postId});
            }).catch(err => {
                console.log(err);
            });

        } else {
            if (!this.props.data.commentIdSets && !this.props.data.isLoadingCommentEnd) {
                //调用评论列表的api
                this.getCommentList({postId});
            }
        }
    }

    render() {
        const styles = {
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            height: '100%',
            backgroundColor:'white'
        };
        const main = {
            overflow: 'auto',
            margin: `0px 0px ${this.state.commentContainerHeight}px 0px`
        };
        if (this.props.data !== null) {
            let data = this.props.data;
            if (Object.keys(data).length === 0) {
                return <div>帖子不存在</div>;
            }
            let commentList = data.commentIdSets
                ? (<CommentList onCommentToggleLike={this.onCommentToggleLike} commentData={this.props.commentData} commentIdSets={data.commentIdSets} onShowCommentMenu={this.onShowCommentMenu}/>)
                : (<GlobalLoading loading={{
                    isShow: true,
                    isMask: false
                }}/>);
            return (
                <div className={Css.detailContainer} style={styles} ref={listDom => {
                    this.listDom = listDom;
                }}>
                    <div style={main}>
                        <Item isShowFoldButton={false} onToggleLike={this.onToggleLike} data={data} onToggleOther={this.onToggleOther}/> {commentList}
                    </div>
                    <DetailCommentInput onPostComment={this.onPostComment} onShowNotice={this.props.onShowNotice} onHeightChange={this.onHeightChange}/>
                </div>
            );
        } else {
            return (<GlobalLoading loading={{
                isShow: true,
                isMask: false
            }}/>);
        }
    }

    onDeletePost(params) {
        this.props.showGlobalLoading();
        let itemId = params.id;
        deletePost({id: itemId}).then(() => {
            this.props.onRemoveNotice();
            this.props.closeGlobalLoading();
            this.props.onShowNotice({message: '删除成功！', level: 'success'});
            this.props.onRemovePost({id: itemId});
            setHash('page=index');
        }).catch(err => {
            console.log(err);
            this.props.onRemoveNotice();
            this.props.closeGlobalLoading();
            this.props.onShowNotice({message: '删除失败！', level: 'error'});
        });
    }
    onToggleOther(params) {
        let itemId = params.id;
        let menus = [];
        menus.push({
            text: `${REPORT_TEXT}`,
            onTap: () => {
                console.log('tap remove');
                this.props.onRemoveNotice();
                this.props.onReportPost({postId: itemId});
                window.location.hash = ('page=report');
            }
        });
        if (params.author === 1 || params.level === 1) {
            menus.push({
                text: '删除',
                onTap: () => {
                    this.onDeletePost({id: itemId});
                }
            });
        }
        if (params.level === 1) {
            menus.push({
                text: '拉黑',
                onTap: () => {
                    block({postId: itemId});
                    this.props.onRemoveNotice();
                    this.props.onShowNotice({message: '拉黑成功！', level: 'success'});
                }
            }, {
                text: '白名单',
                onTap: () => {
                    whiteList({postId: itemId});
                    this.props.onRemoveNotice();
                    this.props.onShowNotice({message: '已设置白名单！', level: 'success'});
                }
            });
        }
        menus.push({
            text: '取消',
            onTap: () => {
                this.props.onRemoveNotice();
            }
        });

        this.props.onShowNotice({
            type: 'menu',
            level: 'success',
            dismissible: true,
            autoDismiss: 0,
            position: 'bc',
            children: (<Menu menus={menus}/>)
        });
    }
    onPostComment(params) {
        //发布评论
        this.props.showGlobalLoading();
        postComment({postId: this.props.data.id, content: params.content}).then(data => {
            this.props.closeGlobalLoading();
            this.props.onShowNotice({message: '发送成功！', level: 'success'});
            this.props.onAddComment({postId: this.props.data.id, commentId: data.id, nickname: data.nickname, avatar: data.avatar, content: params.content});
        }).catch(err => {
            console.log(err);
            if (err.code === 2015) {
                this.props.closeGlobalLoading();
                this.props.onShowNotice({message: '请登录！', level: 'error'});
                setTimeout(() => {
                    toLogin();
                }, 2000);

            }
        });
    }
    getFromId() {
        //获取加载更多时候的初始评论id
        if (this.props.data.commentIdSets) {
            return Array.from(this.props.data.commentIdSets).pop();
        } else {
            return null;
        }
    }
    getCommentList(params) {
        //加载评论
        let postId = params.postId;
        getComments({postId}).then(data => {
            let _data = {};
            let commentIdSets = new Set();
            for (let i = 0; i < data.length; ++i) {
                let id = data[i].id;
                _data[id] = data[i];
                commentIdSets.add(id);
            }
            this.props.onLoadCommentList({commentIdSets: commentIdSets, data: _data, postId});
        }).catch(err => {
            console.log(err);
        });
    }

    onLoadMoreComment(params) {
        console.log('here loadmore');
        //加载更多评论
        let postId = getHash('id');
        getComments({postId: postId, fromId: params.fromId}).then(data => {
            console.log('response', data);
            if (data.length === 0) {
                this.props.onLoadCommentListEnd({postId});
                return;
            }
            let _data = {};
            let commentIdSets = new Set();
            for (let i = 0; i < data.length; ++i) {
                let id = data[i].id;
                _data[id] = data[i];
                commentIdSets.add(id);
            }
            this.props.onLoadCommentList({commentIdSets, data: _data, postId, fromId: params.fromId});

        }).catch((err) => {
            console.log('err', err);
        });
    }

    onHeightChange(height) {
        //设置评论框高度变化
        this.setState({commentContainerHeight: height});
    }

    onShowCommentMenu(id) {
        //弹出评论菜单
        let menus = [];
        let comment = this.props.commentData[id];
        if (comment.author) {
            //是作者
            menus.push({
                text: '删除评论',
                onTap: () => {
                    console.log('tap remove');
                    this.onDeleteComment({postId: this.props.data.id, commentId: comment.id});
                }
            }, {
                text: '取消',
                onTap: () => {
                    this.props.onRemoveNotice();
                }
            });
            this.props.onShowNotice({
                type: 'menu',
                level: 'success',
                dismissible: true,
                autoDismiss: 0,
                position: 'bc',
                children: (<Menu menus={menus}/>)
            });
        }
    }

    onDeleteComment(params) {
        this.props.showGlobalLoading();
        deleteComment({commentId: params.commentId}).then(() => {
            this.props.onRemoveNotice();
            this.props.closeGlobalLoading();
            this.props.onShowNotice({message: '删除成功！', level: 'success', dismissible: true, autoDismiss: 2});
            this.props.onRemoveComment(params);
        }).catch(err => {
            this.props.onRemoveNotice();
            console.log(err);
            this.props.closeGlobalLoading();
            this.props.onShowNotice({message: '删除失败！', level: 'error', dismissible: true, autoDismiss: 2});
        });

    }
    onToggleLike(params) {
        //点赞某条帖子
        let itemId = params.id;
        this.props.onToggleLike(params);
        //点赞toggle
        if (params.like === 1) {
            postLike({postId: itemId}).catch(err => {
                if (err.code === 2015) {
                    //未登录
                    this.props.onShowNotice({message: '请登录！', level: 'error'});
                    setTimeout(() => {
                        toLogin();
                    }, 2000);
                } else {
                    //点赞失败
                    this.props.onShowNotice({message: '点赞失败！', level: 'error'});
                    setTimeout(() => {
                        toLogin();
                    }, 2000);
                }
            });
        } else {
            //已经点过赞
            deleteLike({postId: itemId}).catch(err => {
                if (err.code === 2015) {
                    //未登录
                    this.props.onShowNotice({message: '请登录！', level: 'error'});
                    setTimeout(() => {
                        toLogin();
                    }, 2000);
                } else {
                    //点赞失败
                    this.props.onShowNotice({message: '取消点赞失败！', level: 'error'});
                    setTimeout(() => {
                        toLogin();
                    }, 2000);
                }
            });
        }
    }
    onCommentToggleLike(params) {
        if (this.props.commentData[params.commentId].like === 0) {
            postCommentLike({commentId: params.commentId, postId: this.props.data.id}).catch(err => {
                console.log(err);
            });
        } else if (this.props.commentData[params.commentId].like === 1) {
            deleteCommentLike({commentId: params.commentId, postId: this.props.data.id}).catch(err => {
                console.log(err);
            });
        }
        this.props.onCommentToggleLike({commentId: params.commentId});
    }

}
/**
评论框组件
*/
class DetailCommentInput extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            text: '', //文本框的内容
            lastText: '' //上次发送的评论内容
        };
        this.onChange = this.onChange.bind(this); //当评论框内容改变的时候
        this.onClickSend = this.onClickSend.bind(this); //当点击发送按钮
        this.onInputFocus = this.onInputFocus.bind(this); //当评论框获得焦点
        this.onInputBlur = this.onInputBlur.bind(this); //当评论框失去焦点
    }
    componentDidMount() {}

    shouldComponentUpdate(nextProps, nextState) {
        if (nextState.text !== this.state.text) {
            return true;
        } else {
            return false;
        }
    }
    componentDidUpdate() {
        let height = this.commentContainer.offsetHeight;
        if (this.state.commentContainerHeight !== height) {
            this.props.onHeightChange(height);
        }
    }
    render() {
        const commentStyles = {
            position: 'fixed',
            boxSizing: 'border-box',
            width: '100%',
            display: 'flex',
            color: 'rgba(0,0,0,0.8)',
            backgroundColor: 'white',
            fontSize: '16px',
            padding: '13px 15px',
            bottom: 0,
            borderTop: '0.5px solid rgba(0,0,0,0.1)',
            boxShadow: '0.5px 0.5px 0.5px 0.5px rgba(0, 0, 0, 0.05)'
        };
        const inputStyles = {
            flex: '1 1 auto',
            backgroundColor: '#F2F2F2',
            borderRadius: '5px',
            borderStyle: 'none',
            outline: 'none',
            minHeight: '26px',
            lineHeight: '26px',
            fontSize: '16px',
            resize: 'none',
            padding: '5px 6px',
            marginRight: 8
        };
        const HideSend = {
            color: '#AAAAAA',
            flex: '0 1 35px',
            padding: '4px 0px',
            fontSize: '17px',
            textAlign: 'center'
        };
        const sendActive = {
            flex: '0 1 35px',
            padding: '4px 0px',
            color: '#42b983',
            fontSize: '17px',
            textAlign: 'center'
        };
        return (
            <div ref={(commentInput) => {
                this.commentContainer = commentInput;
            }} style={commentStyles}>
                <Textarea onFocus={e => {
                    this.onInputFocus(e);
                }} onBlur={e => {
                    this.onInputBlur(e);
                }} maxRows={5} style={inputStyles} onChange={this.onChange} placeholder='发表评论' value={this.state.text}></Textarea>
                <div style={this.state.text
                    ? sendActive
                    : HideSend} onTouchTap={this.onClickSend}>发送</div>
            </div>
        );
    }

    onInputBlur() {}
    onInputFocus() {
        getUser().catch(err => {
            console.log(err);
            if (err.code === 1003) {
                this.props.onShowNotice({message: '请登录！', level: 'error'});
                setTimeout(() => {
                    toLogin();
                }, 1500);
            }
        });
        setTimeout(() => {
            document.body.scrollTop = document.body.scrollHeight;
        }, 400);
    }
    onChange(e) {
        //处理input框change事件
        this.setState({text: e.target.value});
    }
    onClickSend() {
        //发布评论
        if (this.state.text === '') {
            this.props.onShowNotice({message: '留言内容不能为空！', level: 'error'});
            return;
        } else if (this.state.text === this.state.lastText) {
            this.props.onShowNotice({message: '已有相同留言！', level: 'error'});
            return;
        } else if (this.state.text) {
            this.props.onPostComment({content: this.state.text});
            this.setState({lastText: this.state.text});
            this.setState({text: ''});
        }
    }

}

export default Detail;
