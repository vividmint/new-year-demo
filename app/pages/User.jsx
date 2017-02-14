import React from 'react';
import {getUser, getNoticeCount} from '../load';
import {toLogin} from '../business';
import Tab from '../components/Tab/Tab';
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

                // getNoticeCount().then(data => {
                //     console.log(data);
                // }).catch(err => {
                //     console.log(err);
                // });
            }).catch(err => {
                toLogin();
                console.log(err);
            });
        }

    }

    render() {
        const styles = {
            paddingBottom: 50

        };
        if (!this.props.userData) {
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

        const classService = [
            {
                text: '通知',
                href: '#page=notice',
                key: 'notice'
            }, {
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
        return (
            <div style={styles}>
                <UserDetail onRemoveNotice={this.props.onRemoveNotice} onShowNotice={this.props.onShowNotice} userData={this.props.userData} onAdvise={this.onAdvise}/>
                <Box list={classService} title="scuinfo服务"/>
                <Box list={entertainmentService} title="其他"/>
                <Tab/>
            </div>
        );
    }
    onAdvise() {
        //跳转反馈页
        window.location.hash = ('page=advise');
    }

}

export default User;
