import React from 'react';
import {render} from 'react-dom';
import {getHash, setHash,getTime} from './utils.js';
import Home from './pages/Home';
import User from './pages/User';
import SendText from './pages/SendText';
import Detail from './pages/Detail.jsx';
import injectTapEventPlugin from 'react-tap-event-plugin';
import {popNotice, removeNotice, Notice} from './components/Notice';
injectTapEventPlugin(); //给所有组件添加onTouchTap事件

class App extends React.Component {
    constructor(props) {
        super(props);
        const page = getHash('page') || 'index'; //当前页面,默认首页
        this.state = {
            data: null, //所有的内容
            idSets: null, //帖子列表的id集合
            commentData: {}, //评论数据
            page: page, //当前页面
            userData: null, //当前登录用户信息
            isShowMore: false, //是否展示加载更多按钮
            isLoadingMore: false, //是否正在加载更多
            showMoreComment: {
                isShowMoreComment: false, //是否展示加载更多评论
                isLoadingMoreComment: false, //是否正在加载更多评论
            },
            noticeDialog: {
                type: 'tips', //弹窗类型
            }
        };
        this.onLoadList = this.onLoadList.bind(this); //载入首页列表
        this.onLoadMore = this.onLoadMore.bind(this); //加载更多帖子
        this.onLoadDetail = this.onLoadDetail.bind(this); //加载帖子详情页
        this.onToggleLike = this.onToggleLike.bind(this); //点赞帖子
        this.onToggleOther = this.onToggleOther.bind(this); //点击三点点
        this.onLoadMoreError = this.onLoadMoreError.bind(this); //
        this.onShowNotice = this.onShowNotice.bind(this); //更改弹窗样式并展示
        this.onRemoveComment = this.onRemoveComment.bind(this); //删除评论
        this.onAddComment = this.onAddComment.bind(this); //增加评论
        this.onRemoveNotice = this.onRemoveNotice.bind(this); //清除弹窗
        this.onLoadCommentList = this.onLoadCommentList.bind(this); //加载评论列表
        this.onLoadUser = this.onLoadUser.bind(this); //加载用户信息
        this.onLoading = this.onLoading.bind(this); //设置首页列表为加载中
        this.onAddPost = this.onAddPost.bind(this); //
        this.onRemovePost = this.onRemovePost.bind(this);

        window.onhashchange = () => {
            //当url里的hash发生变化的时候
            let page = getHash('page') || 'index'; //获取当前hash值
            if (page !== this.state.page) {
                this.setState({page: page});
            }
        };
    }
    render() {
        let pageContainer = null;
        if (this.state.page === 'detail') {
            let id = getHash('id');
            pageContainer = (<Detail onAddComment={this.onAddComment} onRemoveComment={this.onRemoveComment} onRemoveNotice={this.onRemoveNotice} onShowNotice={this.onShowNotice} onToggleLike={this.onToggleLike} onLoadDetail={this.onLoadDetail} commentData={this.state.commentData} onLoadCommentList={this.onLoadCommentList} data={this.state.data
                ? this.state.data[id]
                : null}/>);
        } else if (this.state.page === 'user') {
            pageContainer = (
                <div>
                    <User userData={this.state.userData} onLoadUser={this.onLoadUser}/>
                </div>
            );
        } else if (this.state.page === 'sendText') {
            pageContainer = (<SendText onAddPost={this.onAddPost} data={this.state.data} userData={this.state.userData} onShowNotice={this.onShowNotice} style={{
                height: '100%'
            }}/>);
        } else {
            pageContainer = (<Home idSets={this.state.idSets} onShowNotice={this.onShowNotice} onToggleLike={this.onToggleLike} onRemoveNotice={this.onRemoveNotice} onToggleOther={this.onToggleOther} onLoading={this.onLoading} onLoadList={this.onLoadList} onLoadMore={this.onLoadMore} onLoadMoreError={this.onLoadMoreError} data={this.state.data} isLoadingMore={this.state.isLoadingMore} isShowMore={this.state.isShowMore} onRemovePost={this.onRemovePost} />);
        }

        return (
            <div>
                {pageContainer}
                <Notice onTapMask={this.onRemoveNotice} noticeDialog={this.state.noticeDialog}/>
            </div>
        );
    }
    onShowNotice(params) {
        //更改弹窗的样式类型并展示
        this.setState({
            noticeDialog: {
                type: params.type || 'tips'
            }
        });
        //弹窗
        console.log(this.state.noticeDialog.type);
        popNotice(params);
    }

    onLoadCommentList(params) {
        //加载评论列表
        let data = this.state.data;
        if (data[params.postId].commentIdSets) {
            for (let item of params.commentIdSets) {
                data[params.postId].commentIdSets.add(item);
            }
        } else {
            data[params.postId].commentIdSets = params.commentIdSets;
        }
        this.setState({
            commentData: Object.assign(this.state.commentData, params.data),
            data: data
        });
    }

    onLoadUser(params) {
        //加载user页
        this.setState({userData: params.userData});
    }

    onLoading() {
        //正在加载
        this.setState({isLoadingMore: true, isShowMore: false});
    }
    onLoadList(params) {
        //获取帖子list
        this.setState({data: params.data, idSets: params.idSets, isShowMore: true, isLoadingMore: false});
    }

    onLoadMore(params) {
        //加载更多
        this.setState({isShowMore: true, data: params.data, isLoadingMore: false, idSets: params.idSets});
    }
    onLoadMoreError() {
        //加载出错
        this.setState({isShowMore: false, idSets: []});
    }
    onRemoveComment(params) {
        //删除评论后改变评论list
        let data = this.state.data;
        data[params.postId].commentIdSets.delete(params.commentId);
        this.setState({data: data});
    }

    onAddComment(params) {
        //增加评论后改变评论list
        let data = this.state.data;
        if (data[params.postId].commentIdSets) {
            data[params.postId].commentIdSets.add(params.commentId);
        } else {
            data[params.postId].commentIdSets = params.commentIdSets;
        }
        let commentData = {};
        commentData[params.commentId] = {
            avatar: params.avatar,
            nickname: params.nickname,
            author: 1,
            id: params.commentId,
            likeCount: 0,
            like: 0,
            content: params.content,
            date: getTime()
        };
        this.setState({
            commentData: Object.assign(this.state.commentData, commentData),
            data: data
        });
    }

    onRemoveNotice(params) {
        //移除通知弹窗和蒙版
        this.setState({
            noticeDialog: Object.assign(this.state.noticeDialog, {
                isMask: false,
                type: 'tips'
            })
        });
        // console.log(this.state.noticeDialog);
        removeNotice();
    }

    onToggleLike(params) {
        //点赞某条帖子
        let data = this.state.data;
        let itemId = params.id;
        data[itemId].like = params.like === 1
            ? 0
            : 1;
        if (params.like === 1) {
            data[itemId].likeCount = params.likeCount + 1;
        } else {
            data[itemId].likeCount = params.likeCount - 1;
        }
        this.setState({data: data});
    }
    onToggleOther(params) {
        //点开某条帖子的三点点
        let data = this.state.data;
        let itemId = params.id;
    }

    onLoadDetail(params) {
        //加载详情页
        let data = {};
        if (this.state.data === null) {
            data[params.data.id] = params.data;
            this.setState({data: data});
        }
    }

    onAddPost(params) {
        let idSets = this.state.idSets,data=this.state.data;
        let id = params.insertId;
        let obj= {};
        let list = Array.from(idSets);

        if (idSets) {
            list.unshift(id);
        } else {
            setHash('page=index');
            return;
        }
        obj[id] = {
            avatar: params.avatar,
            nickname: params.nickname,
            author: 1,
            id: id,
            likeCount: 0,
            like: 0,
            content: params.content,
            date: getTime()
        };
        this.setState({
            idSets: new Set(list),
            data: Object.assign(data, obj)
        });
    }
    onRemovePost(params){
        let idSets = this.state.idSets;
        idSets.delete(params.id);
        this.setState({idSets: idSets});
    }
}

render(
    <App style={{
        height: '100%'
    }}/>, document.querySelector('.container'));
