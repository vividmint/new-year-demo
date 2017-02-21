import React from 'react';
import {render} from 'react-dom';
import {getHash, setHash, getTime} from './utils.js';
import {REPORT_TEXT} from './constans/config';
import Home from './pages/Home';
import User from './pages/User';
import UserNotice from './pages/UserNotice';
import Signin from './pages/Signin';
import SendText from './pages/SendText';
import Search from './pages/Search';
import Detail from './pages/Detail';
import GlobalLoading from './components/GlobalLoading';
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
            hotIdSets: null, //热门帖子列表id集合
            likedIdSets: null, //喜欢的帖子列表id集合
            postedIdSets: null, //发过的帖子列表id集合
            commentData: {}, //评论数据
            page: page, //当前页面
            userData: null, //当前登录用户信息
            isShowMore: false, //是否展示加载更多按钮
            isLoadingMore: false, //是否正在加载更多
            noticeDialog: {
                type: 'tips', //弹窗类型
                isShowMenu: false
            },
            globalLoading: {
                isShow: false,
                isMask: true,
                text: ''
            },
            reportId: null,
            userNoticeCount: {
                count: null,
                likeCount: null,
                replyCount: null
            },
            userNoticeData: null,
            userNoticeIdSets: null

        };

        this.onLoadList = this.onLoadList.bind(this); //载入列表
        this.onLoadDetail = this.onLoadDetail.bind(this); //加载帖子详情页
        this.onLoadDetailFail = this.onLoadDetailFail.bind(this); //帖子详情加载失败
        this.onToggleLike = this.onToggleLike.bind(this); //点赞帖子
        this.onLoadMoreError = this.onLoadMoreError.bind(this); //
        this.onShowNotice = this.onShowNotice.bind(this); //更改弹窗样式并展示
        this.onRemoveComment = this.onRemoveComment.bind(this); //删除评论
        this.onAddComment = this.onAddComment.bind(this); //增加评论
        this.onRemoveNotice = this.onRemoveNotice.bind(this); //清除弹窗
        this.onLoadCommentList = this.onLoadCommentList.bind(this); //加载评论列表
        this.onLoadCommentListEnd = this.onLoadCommentListEnd.bind(this); //加载评论列表
        this.onLoadUser = this.onLoadUser.bind(this); //加载用户信息
        this.onLoading = this.onLoading.bind(this); //设置首页列表为加载中
        this.onAddPost = this.onAddPost.bind(this); //当添加文章
        this.onRemovePost = this.onRemovePost.bind(this); //当删除文章
        this.onCommentToggleLike = this.onCommentToggleLike.bind(this); //点赞评论
        this.closeGlobalLoading = this.closeGlobalLoading.bind(this);
        this.showGlobalLoading = this.showGlobalLoading.bind(this);
        this.resetIdSets = this.resetIdSets.bind(this); //重置idSets
        this.onReportPost = this.onReportPost.bind(this); //当点击举报按钮
        this.onLoadUserNoticeCount = this.onLoadUserNoticeCount.bind(this); //加载用户通知数
        this.onLoadUserNoticeData = this.onLoadUserNoticeData.bind(this); //加载用户的通知列表
        this.onMarkAsRead = this.onMarkAsRead.bind(this);

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
            pageContainer = (<Detail onLoadDetailFail={this.onLoadDetailFail} loading={this.state.globalLoading} onReportPost={this.onReportPost} showGlobalLoading={this.showGlobalLoading} closeGlobalLoading={this.closeGlobalLoading} onRemovePost={this.onRemovePost} onLoadMore={this.onLoadMore} onLoadCommentListEnd={this.onLoadCommentListEnd} onLoading={this.onLoading} onLoadMoreError={this.onLoadMoreError} isLoadingMore={this.state.isLoadingMore} onAddComment={this.onAddComment} onCommentToggleLike={this.onCommentToggleLike} onRemoveComment={this.onRemoveComment} onRemoveNotice={this.onRemoveNotice} onShowNotice={this.onShowNotice} onToggleLike={this.onToggleLike} onLoadDetail={this.onLoadDetail} commentData={this.state.commentData} onLoadCommentList={this.onLoadCommentList} data={this.state.data
                ? (this.state.data[id]?this.state.data[id]:null)
                : null}/>);
        } else if (this.state.page === 'user') {
            pageContainer = (<User onLoadUserNoticeCount={this.onLoadUserNoticeCount} userNoticeCount={this.state.userNoticeCount} showGlobalLoading={this.showGlobalLoading} closeGlobalLoading={this.closeGlobalLoading} onRemoveNotice={this.onRemoveNotice} onShowNotice={this.onShowNotice} userData={this.state.userData} onLoadUser={this.onLoadUser} onLoadLikedPosts={this.onLoadLikedPosts} onLoadMore={this.onLoadMore} onLoadMoreError={this.onLoadMoreError} isLoadingMore={this.state.isLoadingMore} loading={this.state.globalLoading}/>);
        } else if (this.state.page === 'sendText') {
            pageContainer = (<SendText topText='发布' placeholder='写下你想说的话' showCheckBox={true} page={this.state.page} showGlobalLoading={this.showGlobalLoading} closeGlobalLoading={this.closeGlobalLoading} onAddPost={this.onAddPost} data={this.state.data} userData={this.state.userData} onShowNotice={this.onShowNotice}/>);
        } else if (this.state.page === 'advise') {
            pageContainer = (<SendText topText='反馈' showCheckBox={true} page={this.state.page} value='#建议#' showGlobalLoading={this.showGlobalLoading} closeGlobalLoading={this.closeGlobalLoading} onAddPost={this.onAddPost} data={this.state.data} userData={this.state.userData} onShowNotice={this.onShowNotice}/>);
        } else if (this.state.page === 'report') {
            pageContainer = (<SendText topText={`${REPORT_TEXT}`} showCheckBox={false} placeholder='报告描述' reportId={this.state.reportId} page={this.state.page} showGlobalLoading={this.showGlobalLoading} closeGlobalLoading={this.closeGlobalLoading} onAddPost={this.onAddPost} data={this.state.data} userData={this.state.userData} onShowNotice={this.onShowNotice}/>);
        } else if (this.state.page === 'index' || this.state.page === 'posted' || this.state.page === 'hot' || this.state.page === 'liked') {
            pageContainer = (<Home userNoticeCount={this.state.userNoticeCount} onReportPost={this.onReportPost} resetIdSets={this.resetIdSets} page={this.state.page} idSets={this.state.idSets} hotIdSets={this.state.hotIdSets} likedIdSets={this.state.likedIdSets} postedIdSets={this.state.postedIdSets} onShowNotice={this.onShowNotice} onToggleLike={this.onToggleLike} onRemoveNotice={this.onRemoveNotice} onLoading={this.onLoading} onLoadList={this.onLoadList} onLoadMore={this.onLoadMore} onLoadMoreError={this.onLoadMoreError} data={this.state.data} isLoadingMore={this.state.isLoadingMore} isShowMore={this.state.isShowMore} onRemovePost={this.onRemovePost} closeGlobalLoading={this.closeGlobalLoading} showGlobalLoading={this.showGlobalLoading}/>);
        } else if (this.state.page === 'signin') {
            pageContainer = (<Signin/>);
        } else if (this.state.page === 'notice') {
            pageContainer = (<UserNotice isLoadingMore={this.state.isLoadingMore} onShowNotice={this.onShowNotice} userNoticeIdSets={this.state.userNoticeIdSets} userNoticeData={this.state.userNoticeData} onLoadUserNoticeData={this.onLoadUserNoticeData} userNoticeData={this.state.userNoticeData} onLoadMore={this.onLoadMore} isShowMore={this.props.isShowMore} onLoading={this.onLoading} onMarkAsRead={this.onMarkAsRead}/>);
        } else if (this.state.page === 'search') {
            pageContainer = (<Search/>);
        } else {
            pageContainer = (
                <div>404页面不存在</div>
            );
        }
        let styles = {
            // overflowY:this.state.noticeDialog.isShowMenu?'hidden':''//控制页面是否可以滚动，menu弹窗出现时不能滚动
        };
        return (
            <div style={styles}>
                {pageContainer}
                <Notice onTapMask={this.onRemoveNotice} noticeDialog={this.state.noticeDialog}/>
                <GlobalLoading loading={this.state.globalLoading}/>
            </div>
        );
    }

    onShowNotice(params) {
        //更改弹窗的样式类型并展示
        this.setState({
            noticeDialog: {
                type: params.type || 'tips',
                isShowMenu: params.type === 'menu'
                    ? true
                    : false
            }
        });
        //弹窗
        // console.log(this.state.noticeDialog.type);
        popNotice(params);
    }

    onLoadCommentListEnd(params) {
        //停止加载评论
        let data = this.state.data;
        data[params.postId].isLoadingCommentEnd = true;
        this.setState({data: data});
    }
    onLoadDetailFail(params) {
        let data = {};
        data[params.postId] = {};
        this.setState({data});
        //加载帖子错误
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

    resetIdSets() {
        this.setState({idSets: null});
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
        let idSets = params.idSets;
        if (params.type === 'index') {
            this.setState({data: params.data, idSets: idSets, isShowMore: true, isLoadingMore: false});

        }

        if (params.type === 'hot') {
            this.setState({data: params.data, hotIdSets: idSets, isShowMore: true, isLoadingMore: false});
        }

        if (params.type === 'liked') {
            this.setState({data: params.data, likedIdSets: idSets, isShowMore: true, isLoadingMore: false});

        }
        if (params.type === 'posted') {
            this.setState({data: params.data, postedIdSets: idSets, isShowMore: true, isLoadingMore: false});

        }
        // console.log(this.state);

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

    onRemoveNotice() {
        //移除通知弹窗和蒙版
        this.setState({
            noticeDialog: Object.assign(this.state.noticeDialog, {
                isMask: false,
                type: 'tips',
                isShowMenu: false
            })
        });
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

    onLoadDetail(params) {
        //加载详情页
        let data = this.state.data || {};
        if (this.state.data === null || (this.state.data && !this.state.data[params.data.id]) ) {
            data[params.data.id] = params.data;
            this.setState({data: data, isShowMore: true, isLoadingMore: false});
        }

    }

    onAddPost(params) {
        let idSets = this.state.idSets,
            data = this.state.data;
        let id = params.insertId;
        let obj = {};
        let list = [];
        if (idSets) {
            list = Array.from(idSets);
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
    onRemovePost(params) {
        //移除某条帖子
        let idSets = this.state.idSets;
        if (idSets) {
            idSets.delete(params.id);
            this.setState({idSets: idSets});
        }

    }
    onCommentToggleLike(params) {
        let commentId = params.commentId,
            commentData = this.state.commentData;
        commentData[commentId].like = commentData[commentId].like === 1
            ? 0
            : 1;
        if (commentData[commentId].like === 1) {
            commentData[commentId].likeCount += 1;
        } else {
            commentData[commentId].likeCount -= 1;
        }
        this.setState({commentData: commentData});
    }
    closeGlobalLoading() {
        this.setState({
            globalLoading: {
                isShow: false
            }
        });
    }
    showGlobalLoading(params) {
        this.setState({
            globalLoading: Object.assign({
                isShow: true
            }, params)
        });
    }
    onReportPost(params) {
        this.setState({reportId: params.postId});
    }
    onLoadUserNoticeCount(params) {
        this.setState({
            userNoticeCount: {
                count: params.count,
                likeCount: params.likeCount,
                replyCount: params.replyCount
            }
        });
    }
    onLoadUserNoticeData(params) {
        this.setState({userNoticeData: params.data, userNoticeIdSets: params.idSets, isShowMore: true, isLoadingMore: false});
    }
    onMarkAsRead(){
        this.setState({
            userNoticeCount:{
                count: 0,
                likeCount: 0,
                replyCount: 0
            }
        });
    }

}

render(
    <App style={{
        height: '100%'
    }}/>, document.querySelector('.container'));
