import React from 'react';
import {BASE_PRIMARY_COLOR} from '../../constans/styles';
import {INDEX_LIST_LOAD_MORE_DISTANCE} from '../../constans/config';
import FaHeartO from 'react-icons/lib/fa/heart-o';
import TiMessages from 'react-icons/lib/ti/messages';
import {formatTime, setHash, getDocumentHeight} from '../../utils';
import {markAsRead} from '../../load';
import Css from './UserNoticeList.css';
import Button from '../Button';
import Loading from 'react-loading';
import GlobalLoading from '../GlobalLoading';

class UserNoticeList extends React.Component {
    constructor(props) {
        super(props);
        this.toDetailHash = this.toDetailHash.bind(this);
        this.onScroll = this.onScroll.bind(this);
    }
    componentDidMount() {
        this.props.onMarkAsRead();
        markAsRead().then(() => {}).catch(err => {
            console.log(err);
        });
        if (sessionStorage.getItem('overflowY')) {
            let y = sessionStorage.getItem('overflowY');
            this.listDom.scrollTop = y;
        }
    }
    render() {
        let moreButton = null;
        if (this.props.loadingState.isShowMore) {
            moreButton = <Button onTap={() => {
                this.props.onLoadMore();
            }} text="查看更多"/>;
        }
        let loading = null;
        if (this.props.loadingState.isLoadingMore) {
            loading = <Loading type='spin' delay={0} color='#AAAAAA' height='25px' width='25px'/>;
        }

        const item = {
                padding: '0px 25px',
                backgroundColor:'white'
            },
            itemTop = {
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                padding: '15px 0px 8px 0px',
                letterSpacing: 0.2
            },
            topLeft = {
                display: 'flex',
                alignItems: 'center'
            },
            iconStyle = {
                fontSize: 16,
                color: `${BASE_PRIMARY_COLOR}`,
                marginRight: 8
            },
            message = {
                color: 'rgba(0,0,0,0.6)',
                fontSize: 15
            },
            timeStyle = {
                color: '#AAAAAA',
                fontSize: 14
            },
            comment = {
                lineHeight: 1.5,
                letterSpacing: 0.3,
                color: 'rgba(0,0,0,0.8)',
                textAlign: 'justify',
                paddingBottom: 6
            },
            itemBottom = {
                paddingBottom: 20,
                fontSize: 15
            },
            preview = {
                padding: 10,
                backgroundColor: 'rgba(0, 0, 0, 0.03)',
                color: 'rgba(0,0,0,0.7)'
            },
            bar = {
                backgroundColor: '#F2F2F2',
                width: '100%',
                height: 10
            },
            spinnerBox = {
                display: 'flex',
                justifyContent: 'center',
                backgroundColor: '#F2F2F2',
                marginBottom: 50,
                paddingBottom: 10
            };
        const noMoreStyle = {
            color:'#AAAAAA'
        };

        let likeItem = null,
            likedAction = null,
            commentItem = null,
            noticeList = [];
        if (this.props.idSets !== null) {
            let idArr = Array.from(this.props.idSets);
            let data = this.props.data;

            for (let i = 0; i < idArr.length; ++i) {
                if (data[idArr[i]].action === 'likePost' || data[idArr[i]].action === 'likeComment') {
                    if (data[idArr[i]].action === 'likePost') {
                        likedAction = '帖子';
                    } else if (data[idArr[i]].action === 'likeComment') {
                        likedAction = '评论';
                    }

                    let previewContent = data[idArr[i]].originContent;
                    let time = new Date(data[idArr[i]].date * 1000);
                    let _time = formatTime(time);
                    let id = data[idArr[i]].postId;

                    likeItem = (
                        <div key={'like-' + idArr[i]}>
                            <div style={item}>
                                <div style={itemTop}>
                                    <div style={topLeft}>
                                        <FaHeartO style={iconStyle}/>
                                        <span style={message}>有人赞了你的{likedAction}</span>
                                    </div>
                                    <div style={timeStyle}>{_time}</div>
                                </div>
                                <div style={itemBottom}>
                                    <div style={preview} onTouchTap={this.toDetailHash.bind(this, id)}>
                                        <div className={Css.preview}>{previewContent}</div>
                                    </div>
                                </div>
                            </div>
                            <div style={bar}></div>
                        </div>

                    );
                    noticeList.push(likeItem);
                }

                if (data[idArr[i]].action === 'replyPost') {
                    let time = new Date(data[idArr[i]].date * 1000);
                    let _time = formatTime(time);
                    let previewContent = data[idArr[i]].originContent;
                    let id = data[idArr[i]].postId;

                    commentItem = (
                        <div key={'comment-' + idArr[i]}>
                            <div style={item}>
                                <div style={itemTop}>
                                    <div style={topLeft}>
                                        <TiMessages style={iconStyle}/>
                                        <span style={message}>有人回复了你的帖子</span>
                                    </div>
                                    <div>
                                        <div style={timeStyle}>{_time}</div>
                                    </div>
                                </div>
                                <div style={comment}>
                                    {data[idArr[i]].content}
                                </div>
                                <div style={itemBottom}>
                                    <div style={preview} onTouchTap={this.toDetailHash.bind(this, id)}>
                                        <div className={Css.preview}>{previewContent}</div>
                                    </div>
                                </div>
                            </div>
                            <div style={bar}></div>
                        </div>
                    );
                    noticeList.push(commentItem);
                }
            }

            let noMore = null;
            if (this.props.isLoadingEnd) {
                noMore = <div style={noMoreStyle}>没有更多帖子了_(:зゝ∠)_</div>;
                loading = null;
            }
            return (
                <div className={Css.noticeContainer} style={{
                    height: '100%',
                    overflowY: 'scroll'
                }} onScroll={this.onScroll} ref={listDom => {
                    this.listDom = listDom;
                }}>
                    {noticeList}
                    {moreButton}
                    <div style={spinnerBox}>{loading}{noMore}</div>
                </div>
            );
        } else {
            return (<GlobalLoading/>);
        }
    }
    onScroll() {
        if (this.props.isLoadingEnd) {
            return;
        }
        //下拉刷新
        let documentHeight = getDocumentHeight({element: this.listDom}); //整个页面的高度
        let distance = documentHeight - (this.listDom.scrollTop + window.screen.height);
        //window.screen.height  屏幕的高度
        //window.document.body.scrollTop  屏幕顶部距离页面顶部的距离

        let overflowY = this.listDom.scrollTop;
        sessionStorage.setItem('overflowY', overflowY); //记录当前浏览位置
        if (distance <= INDEX_LIST_LOAD_MORE_DISTANCE && distance > 0) {
            this.props.onLoadMore();
        }
    }
    toDetailHash(id) {
        setHash(`page=detail&id=${id}`);
    }
}
export default UserNoticeList;
