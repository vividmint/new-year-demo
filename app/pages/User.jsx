import React from 'react';
import {getUser, getNoticeCount} from '../load';
import {toLogin} from '../business';
import Tab from '../components/Tab';
import UserDetail from '../components/UserDetail';
import GlobalLoading from '../components/GlobalLoading.jsx';
import Box from '../components/Box.jsx';

class User extends React.Component {
    constructor(props) {
        super(props);
        this.onAdvise = this.onAdvise.bind(this);
    }

    componentDidMount() {
        if (this.props.userData === null) {
            getUser().then(data => {
                this.props.onLoadUser({userData: data});

                getNoticeCount().then(data => {
                    this.props.onLoadUserNoticeCount({count: data.count, likeCount: data.likeCount, replyCount: data.replyCount});
                }).catch(err => {
                    console.log(err);
                });
            }).catch(err => {
                if (err.code === 2015 || err.code === 1003) {
                    toLogin();
                }
                console.log(err);
            });
        }

    }
    render() {
        const classService = [
            {
                text: '成绩',
                href: '/score',
                key: 'score'
            }, {
                text: '考表',
                href: '/exam',
                key: 'exam'
            }, {
                text: '补缓考',
                href: '/examAgain',
                key: 'examAgain'
            }, {
                text: '课表',
                href: '/major',
                key: 'schedule'
            }, {
                text: '图书',
                href: '/book',
                key: 'book'
            }, {
                text: '查询课程',
                href: '/course',
                key: 'searchCourse'
            }
            // {
            //     text: '空教室',
            //     href: 'ttp://scuinfo.com/classroom',
            //     key: 'room'
            // }
        ];
        const entertainmentService = [
            {
                text: '神奇海螺',
                href: 'http://music.163.com/#/djradio?id=1136006',
                key: 'fm'
            }, {
                text: '绩点',
                href: 'http://gpa.fyscu.com/',
                key: 'gpa'
            }, {
                text: '跳蚤市场',
                href: 'http://xiaoqu.qq.com/mobile/barindex.html?_bid=128&_wv=1027&bid=130899',
                key: 'secondaryMarket'
            }
        ];
        const styles = {
            paddingBottom: 50,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            backgroundColor:'#F2F2F2',
        };
        if (this.props.userData) {
            return (
                <div style={styles}>
                    <UserDetail userNoticeCount={this.props.userNoticeCount} onRemoveNotice={this.props.onRemoveNotice} onShowNotice={this.props.onShowNotice} userData={this.props.userData} onAdvise={this.onAdvise}/>
                    <Box list={classService} title="scuinfo服务"/>
                    <Box list={entertainmentService} title="其他"/>
                    <Tab count={this.props.userNoticeCount.count || null}/>
                </div>
            );

        } else {
            return (
                <div>
                    <GlobalLoading loading={{
                        isShow: true,
                        isMask: false
                    }}/>
                    <Tab style={{
                        zIndex: 101
                    }}/>
                </div>
            );
        }
    }
    onAdvise() {
        //跳转反馈页
        window.location.hash = ('page=advise');
    }

}

export default User;
