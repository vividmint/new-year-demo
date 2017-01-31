import React from 'react';
import {render} from 'react-dom';
import {request} from '../utils.js';
import Loading from '../components/Loading.jsx';
import List from '../components/List.jsx';
import Tab from '../components/Tab/Tab.jsx';

class Home extends React.Component{
    constructor(props){
        super(props);
        this.onLoadMore = this.onLoadMore.bind(this);

    }
    componentDidMount(){
        if(this.props.list===null){
            request({
                url:'/api/hot'
            }).then(result => {
                let data = {},
                    list = [],
                    fromId = '';
                for (let i = 0; i < result.data.length; ++i) {
                    let id = result.data[i].id,
                        content = result.data[i].content,
                        avatar = result.data[i].avatar,
                        nickname = result.data[i].nickname,
                        date = result.data[i].date,
                        likeCount = result.data[i].likeCount,
                        commentCount = result.data[i].commentCount;
                    data[id] = {};
                    data[id].id = id;
                    data[id].content = content;
                    data[id].avatar = avatar;
                    data[id].nickname = nickname;
                    data[id].date = date;
                    data[id].likeCount = likeCount;
                    data[id].commentCount = commentCount;
                    list.push(id);
                }
                fromId = list[list.length - 1];
          //设置初始的data,list,已经加载更多按钮是展示的，设置本次加载的列表中的最后一个id
                this.props.onLoadList({
                    data:data,
                    list:list,
                    fromId:fromId
                });
            }).catch((e) => {
                console.log('请求错误');
                console.log(e);
                this.setState({isShowLoading: false, isShowError:true,list: []});
            });
        }
    }
    onLoadMore() {
        request({
            url:`/api/hot?fromId=${this.props.fromId}&pageSize=15`
        }).then(result => {
            //console.log(result);
            let data = this.props.data,
                list = [];
            let fromId = '';
            for (let i = 0; i < result.data.length; ++i) {
                let id = result.data[i].id,
                    content = result.data[i].content,
                    avatar = result.data[i].avatar,
                    nickname = result.data[i].nickname,
                    date = result.data[i].date;
                // if (!data[id]) {
                list.push(id);
                // }
                data[id] = {};
                data[id].id = id;
                data[id].content = content;
                data[id].avatar = avatar;
                data[id].nickname = nickname;
                data[id].date = date;

            }
            fromId = list[list.length - 1];
            list = this.props.list.concat(list);
            this.props.onLoadMore({
                data:data,
                list:list,
                fromId:fromId
            });
        }).catch((e) => {
            console.log('请求错误');
            console.log(e);
            this.setState({isShowLoading: false, isShowError:true,list: []});
        });
    }

    render(){
        if (this.props.list === null) {
            return <Loading/>;
        } else if (this.props.list && this.props.list.length === 0) {
            return <div>没有帖子</div>;
        } else {
            return (
            <div >
                <List data={this.props.data} list={this.props.list} onLoadMore={this.onLoadMore} showMore={this.props.showMore} isLoadingMore={this.props.isLoadingMore}/>
                <Tab />
            </div>
            );
        }
    }
}

export default Home;
