import React from 'react';
import {getDocumentHeight} from '../utils.js';
import Loading from '../components/Loading.jsx';
import List from '../components/List.jsx';
import Tab from '../components/Tab/Tab.jsx';
import {getList, postLike, deleteLike, deletePost} from '../load';
import {toLogin} from '../business';
import {INDEX_LIST_LOAD_MORE_DISTANCE} from '../constans/config';
import Menu from '../components/Menu';

class Home extends React.Component {
    constructor(props) {
        super(props);
        this.onLoadMore = this.onLoadMore.bind(this);
        this.getFromId = this.getFromId.bind(this);
        this.getList = this.getList.bind(this);
        this.onToggleLike = this.onToggleLike.bind(this);
        this.onToggleOther = this.onToggleOther.bind(this);
        this.deletePost = this.deletePost.bind(this);
        this.reportPost = this.reportPost.bind(this);
        let idSets = null,type = this.props.page;
        if(type === 'index'){
            idSets = this.props.idSets;
        }else if(type === 'hot'){
            idSets = this.props.hotIdSets;
        }else if(type === 'liked'){
            idSets = this.props.likedIdSets;
        }
        this.state = {
            type,
            idSets
        };

    }


    componentWillReceiveProps(nextProps){
        console.log('will',nextProps);
        let type = nextProps.page,idSets = null;

        if(type === 'index'){
            if(nextProps.idSets === this.state.idSets){
                return;
            }
            if(!nextProps.idSets){
                this.setState({idSets:null,isLoadingEnd:false});
                // this.props.onLoading();
                this.getList({
                    type
                });
                return;
            }
            idSets = nextProps.idSets;
        }else if(type === 'hot'){
            if(nextProps.hotIdSets === this.state.idSets){
                return;
            }
            idSets = nextProps.hotIdSets;
            if(!nextProps.hotIdSets){
                this.setState({idSets:null,isLoadingEnd:false});

                // this.props.onLoading();
                this.getList({
                    type
                });
                return;
            }
        }else if(type === 'liked'){
            if(nextProps.likedIdSets === this.state.idSets){
                return;
            }
            if(!nextProps.likedIdSets){
                this.setState({idSets:null,isLoadingEnd:false});
                // this.props.onLoading();
                this.getList({
                    type
                });
                return;
            }
            idSets = nextProps.likedIdSets;
        }
        this.setState({
            type,
            idSets
        });
    }
    componentDidMount() {
        console.log('didMount',this.state);
        if (!this.state.idSets) {
            let type = this.state.type;
            this.getList({
                type
            });
        }
        window.onscroll = () => {
            if(this.state.isLoadingEnd){
                return;
            }
            //下拉刷新
            let documentHeight = getDocumentHeight(); //整个页面的高度
            let distance = documentHeight - (window.document.body.scrollTop + window.screen.height);
            //window.screen.height  屏幕的高度
            //window.document.body.scrollTop  屏幕顶部距离页面顶部的距离
            if (distance <= INDEX_LIST_LOAD_MORE_DISTANCE && distance > 0) {
                this.onLoadMore({fromId: this.getFromId(),type:this.state.type});
            }
        };

    }
    getList(params){
        let type = params.type;
        getList({type,fromId: this.getFromId()}).then(data => {
            if(data.length===0){
                this.setState({
                    isLoadingEnd:true
                });
                return;
            }
            let _data = Object.assign({},this.props.data),
                idSets = new Set();
            for (let i = 0; i < data.length; ++i) {
                let id = data[i].id;
                _data[id] = data[i];
                idSets.add(id);
            }
          //设置初始的data,idSets,已经加载更多按钮是展示的，设置本次加载的列表中的最后一个id
            this.props.onLoadList({data: _data,type, idSets: idSets, fromId: this.getFromId()});
        }).catch(err => {
            if(err.code===2015||err.code===1003){
          //未登录
                this.props.onShowNotice({message: '请登录！', level: 'error'});
                setTimeout(() => {
                    toLogin();
                    return;
                }, 2000);
                return;
            }
            console.log(err);
        });
    }
    render() {
        let condition = null;
        if (this.state.idSets === null) {
            return <Loading/>;
        } else if (this.state.idSets && this.state.idSets.size === 0) {
            return <div>没有帖子</div>;
        } else {
            console.log(this.state);
            return (
                <div >
                    <List data={this.props.data} idSets={this.state.idSets} onToggleLike={this.onToggleLike} onLoadMore={this.onLoadMore} isShowMore={this.props.isShowMore} isLoadingMore={this.props.isLoadingMore} onToggleOther={this.onToggleOther}/>
                    <Tab/>
                </div>
            );
        }
    }

    getFromId() {
        //获取加载更多时候的初始帖子id
        if (this.state.idSets) {
            let list = Array.from(this.state.idSets);
            let fromId = list[list.length - 1];
            return fromId;
        } else {
            return null;
        }
    }

    onLoadMore(params) {
        //当加载更多时
        let type = params.type;
        if (this.props.isLoadingMore === false) {
            this.props.onLoading();
            getList({type:type,fromId: params.fromId}).then(data => {
                if(data.length===0){
                    this.setState({
                        isLoadingEnd:true
                    });
                    return;
                }
                let _data = this.props.data;
                for (let i = 0; i < data.length; ++i) {
                    let id = data[i].id;
                    this.state.idSets.add(id);
                    _data[id] = data[i];
                }
                this.props.onLoadList({data: _data, type,idSets: this.state.idSets});
            }).catch(err => {
                console.log('请求错误');
                console.log(err);
                this.props.onLoadMoreError();
            });
        }
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
                }
            });
        } else {
            //已经点过赞
            deleteLike({postId: itemId}).catch(err => {
                if (err.code === 2015) {
                    //未登录
                    this.props.onRemoveNotice();
                    this.props.onShowNotice({message: '请登录！', level: 'error'});
                    setTimeout(() => {
                        toLogin();
                    }, 2000);
                } else {
                    //点赞失败
                    this.props.onRemoveNotice();
                    this.props.onShowNotice({message: '取消点赞失败！', level: 'error'});
                    setTimeout(() => {
                        toLogin();
                    }, 2000);
                }
            });
        }
    }
    deletePost(params) {
        let itemId = params.id;
        deletePost({id: itemId}).then(() => {
            this.props.onRemoveNotice();
            this.props.onShowNotice({message: '删除成功！', level: 'success'});
            this.props.onRemovePost({id: itemId});
        }).catch(err => {
            console.log(err);
            this.props.onRemoveNotice();
            this.props.onShowNotice({message: '删除失败！', level: 'error'});
        });
    }
    reportPost(id) {}
    onToggleOther(params) {
        let itemId = params.id;
        let menus = [];
        if (params.author === 1 || params.level === 1) {
            menus.push({
                text: '删除',
                onTap: () => {
                    this.deletePost({id: itemId});
                }
            });
        }
        menus.push({
            text: '举报',
            onTap: () => {
                console.log('tap remove');
                this.reportPost({postId: itemId});
            }
        });
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

}

export default Home;
