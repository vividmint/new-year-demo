import React from 'react';
import UserNoticeList from '../components/UserNoticeList';
import {getNoticeList} from '../load';
import GlobalLoading from '../components/GlobalLoading.jsx';
import Tab from '../components/Tab/Tab.jsx';
import {toLogin} from '../business';

class UserNotice extends React.Component {
    constructor(props) {
        super(props);
        this.onLoadNoticeList = this.onLoadNoticeList.bind(this);
        this.onLoadMore = this.onLoadMore.bind(this);
        this.getFromId = this.getFromId.bind(this);

        this.state = {
            isLoadingEnd: false
        };

    }
    componentDidMount() {
        if (!this.props.userNoticeIdSets) {
            this.onLoadNoticeList();
        }
    }

    render() {
        console.log(this.state.isLoadingEnd);
        const styles = {
            height: '100%'
        };
        if (this.props.userNoticeIdSets !== null) {
            return (
                <div style={styles}>
                    <UserNoticeList onMarkAsRead={this.props.onMarkAsRead} onLoadMore={this.onLoadMore} isShowMore={this.props.isShowMore} isLoadingMore={this.props.isLoadingMore} data={this.props.userNoticeData} idSets={this.props.userNoticeIdSets}/>
                    <Tab/>
                </div>
            );
        } else {
            if (this.state.isLoadingEnd) {
                return (
                    <div>没有更多消息了_(:зゝ∠)_
                        <Tab/>
                    </div>
                );
            } else {
                return (
                    <div>
                        <GlobalLoading loading={{
                            isShow: true,
                            isMask: false
                        }}/>
                        <Tab/>
                    </div>
                );
            }
        }
    }

    getFromId() {
        //获取加载更多时候的初始noticeList id
        if (this.props.userNoticeIdSets) {
            let list = Array.from(this.props.userNoticeIdSets);
            let fromId = list[list.length - 1];
            return fromId;
        } else {
            return null;
        }
    }

    onLoadNoticeList() {
        getNoticeList({fromId: this.getFromId()}).then(result => {
            if (result.length === 0) {
                this.props.onShowNotice({message: '没有新消息了_(:зゝ∠)_', level: 'error'});
                this.setState({isLoadingEnd: true});
                return;
            }
            let idSets = this.props.userNoticeIdSets || new Set();

            let data = Object.assign({}, this.props.userNoticeData);
            for (let i = 0; i < result.length; ++i) {
                let id = result[i].id;
                idSets.add(id);
                data[id] = result[i];
            }
            this.props.onLoadUserNoticeData({data: data, idSets: idSets});
        }).catch(err => {
            console.log(err);
            if (err.code === 2015) {
                this.props.onShowNotice({message: '请登录！', level: 'error'});
                setTimeout(() => {
                    toLogin();
                }, 2000);
            }
        });
    }

    onLoadMore() {
        //当加载更多时
        if (this.props.isLoadingMore === false) {
            this.props.onLoading();
            this.onLoadNoticeList();
        }
    }

}
export default UserNotice;
