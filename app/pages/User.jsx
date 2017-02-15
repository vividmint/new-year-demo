import React from 'react';
import {getUser, getNoticeCount} from '../load';
import {toLogin} from '../business';
import Tab from '../components/Tab/Tab';
import UserDetail from '../components/UserDetail';
import GlobalLoading from '../components/GlobalLoading.jsx';
import Box from '../components/Box.jsx';
import FaBellO from 'react-icons/lib/fa/bell-o';
import {BASE_PRIMARY_COLOR} from '../constans/styles';
import FaAngleRight from 'react-icons/lib/fa/angle-right';

class User extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            userNoticeCount: {
                count: null,
                likeCount: null,
                replyCount: null
            }
        };
        this.onAdvise = this.onAdvise.bind(this);
    }

    componentDidMount() {
        if (this.props.userData === null) {
            getUser().then(data => {
                this.props.onLoadUser({userData: data});

                getNoticeCount().then(data => {
                    // this.props.onLoadUserNoticeCount({count:data.count,likeCount:data.likeCount,replyCount:data.replyCount});
                    this.setState({
                        userNoticeCount: {
                            count: data.count,
                            likeCount: data.likeCount,
                            replyCount: data.replyCount
                        }
                    });
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
            // {
            //     text: '通知',
            //     href: '#page=notice',
            //     key: 'notice'
            // },
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
                href: 'http://scuinfo.com/course',
                key: 'searchCourse'
            }, {
                text: '空教室',
                href: 'ttp://scuinfo.com/classroom',
                key: 'room'
            }
        ];
        const entertainmentService = [
            {
                text: '神奇海螺',
                href: '/fm',
                key: 'fm'
            }, {
                text: '绩点',
                href: 'http://gpa.fyscu.com/',
                key: 'gpa'
            }, {
                text: '热门帖',
                href: '#page=hot',
                key: 'hot'
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
                alignItems: 'center'
            },
            bar = {
                paddingBottom: '10px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                backgroundColor: '#F2F2F2',
                width: '100%',
            },
            noticeBarStyle = {
                backgroundColor: 'rgba(0,0,0,0.4)',
                borderRadius: 5,
                color: 'white',
                padding: '6px 3px 6px 8px',
            },
            bell = {
                // color: `${BASE_PRIMARY_COLOR}`,
                marginRight: 15,
                fontSize: 16,
                marginTop:-2
            },
            text = {
                fontSize: 15,
                marginRight: 8,
            },
            angle={
                marginTop:-4,
                fontSize:18,
            };
        let noticeBar = null;
        if (this.state.userNoticeCount) {
            noticeBar = <div style={bar}><div style={noticeBarStyle}><FaBellO style={bell}/>
                <span><span style={text}>{this.state.userNoticeCount.count}条新消息</span><FaAngleRight style={angle}/></span>
            </div></div>;
        }
        if (this.props.userData) {
            return (
                <div style={styles}>
                    <UserDetail onRemoveNotice={this.props.onRemoveNotice} onShowNotice={this.props.onShowNotice} userData={this.props.userData} onAdvise={this.onAdvise}/> {noticeBar}
                    <Box list={classService} title="scuinfo服务"/>
                    <Box list={entertainmentService} title="其他"/>
                    <Tab count={this.state.userNoticeCount.count || null}/>
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
