import React from 'react';
import {getDocumentHeight} from '../utils.js';
import Loading from '../components/Loading.jsx';
import List from '../components/List.jsx';
import Tab from '../components/Tab/Tab.jsx';
import {getList, postLike, deleteLike} from '../load';
import {toLogin} from '../business';
import {INDEX_LIST_LOAD_MORE_DISTANCE} from '../constans/config';
import Menu from '../components/Menu';


class Home extends React.Component {
    constructor(props) {
        super(props);
        this.onLoadMore = this.onLoadMore.bind(this);
        this.getFromId = this.getFromId.bind(this);
        this.onToggleLike = this.onToggleLike.bind(this);
        this.onToggleOther = this.onToggleOther.bind(this);

    }

    getFromId() {
        //获取加载更多时候的初始帖子id
        if (this.props.list) {
            let fromId = this.props.list[this.props.list.length - 1];
            return fromId;
        } else {
            return null;
        }
    }

    componentDidMount() {
        if (this.props.list === null) {
            getList({fromId: this.getFromId()}).then(data => {
                let _data = {},
                    list = [];
                for (let i = 0; i < data.length; ++i) {
                    let id = data[i].id;
                    _data[id] = data[i];
                    list.push(id);
                }
                //设置初始的data,list,已经加载更多按钮是展示的，设置本次加载的列表中的最后一个id
                this.props.onLoadList({data: _data, list: list, fromId: this.getFromId()});
            }).catch(err => {
                console.log('请求错误');
                console.log(err);
                this.setState({isShowLoading: false, list: []});
            });
        }
        window.onscroll = () => {
            //下拉刷新
            let documentHeight = getDocumentHeight(); //整个页面的高度
            let distance = documentHeight - (window.document.body.scrollTop + window.screen.height);
            //window.screen.height  屏幕的高度
            //window.document.body.scrollTop  屏幕顶部距离页面顶部的距离
            if (distance <= INDEX_LIST_LOAD_MORE_DISTANCE && distance > 0) {
                this.onLoadMore({fromId: this.getFromId()});
            }
        };

    }
    render() {
        if (this.props.list === null) {
            return <Loading/>;
        } else if (this.props.list && this.props.list.length === 0) {
            return <div>没有帖子</div>;
        } else {
            return (
                <div >
                    <List data={this.props.data} list={this.props.list} onToggleLike={this.onToggleLike} onLoadMore={this.onLoadMore} isShowMore={this.props.isShowMore} isLoadingMore={this.props.isLoadingMore} onToggleOther={this.onToggleOther}/>
                    <Tab/>
                </div>
            );
        }
    }

    onLoadMore(params) {
        //当加载更多时
        if (this.props.isLoadingMore === false) {
            this.props.onLoading();
            getList({fromId: params.fromId}).then(data => {
                let _data = this.props.data,
                    list = [];
                for (let i = 0; i < data.length; ++i) {
                    let id = data[i].id;
                    if (!data[id]) {
                        list.push(id);
                    }
                    _data[id] = data[i];
                }
                list = this.props.list.concat(list);
                this.props.onLoadMore({data: _data, list: list, fromId: this.getFromId()});
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
    onToggleOther(params){
        let itemId = params.id;
        let menus = [];
        if(params.author===1){
            menus.push({
                text:'删除',
                onTap:()=>{
                    console.log('tap remove');
                    this.deleteComment({
                        postId: itemId
                    });
                }
            });
        }
        menus.push({
            text:'举报',
            onTap:()=>{
                console.log('tap remove');
                this.deleteComment({
                    postId: itemId
                });
            }
        });
        menus.push({
            text:'取消',
            onTap:()=>{
                this.props.onRemoveNotice();
            }
        });
        this.props.onShowNotice({
            type: 'menu',
            level: 'success',
            dismissible: true,
            autoDismiss: 0,
            position: 'bc',
            children:(
              <Menu menus={menus}/>
            )
          //   children: (
          //     <div>
          //         <div style={{
          //             padding: '15px 0px',
          //             backgroundColor: 'white',
          //             borderBottom: '0.8px solid rgb(242, 242, 242)'
          //         }}>分享到微博</div>
          //         <div style={{
          //             padding: '15px 0px',
          //             backgroundColor: 'white',
          //             borderBottom: '0.8px solid rgb(242, 242, 242)'
          //         }}>举报</div>
          //         <div style={{
          //             padding: '15px 0px',
          //             backgroundColor: 'white',
          //             borderBottom: '4px solid rgb(242, 242, 242)'
          //         }}>删除</div>
          //       <div style={{
          //           padding: '15px 0px',
          //           backgroundColor: 'white'
          //       }}>取消</div>
          //     </div>
          // )
        });

    }

}

export default Home;
