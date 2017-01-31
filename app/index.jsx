import React from 'react';
import {render} from 'react-dom';
import {getHash} from './utils.js';
import Home from './pages/Home.jsx';
import User from './pages/User.jsx';
import SendText from './pages/SendText.jsx';
import Detail from './pages/Detail.jsx';
import injectTapEventPlugin from 'react-tap-event-plugin';
injectTapEventPlugin();

class App extends React.Component {
    constructor(props) {
        console.log('constructor');
        super(props);
        const page = getHash('page');
        this.state = {
            page: page || 'index',//当前页面
            data: null,//所有的内容
            list: null,//列表的ids
            fromId: null,//当前列表中最后一个id
            showMore: false,//是否展示加载更多按钮
            isLoadingMore: false,//是否正在加载更多
        };
        this.onLoadList = this.onLoadList.bind(this);
        this.onLoadMore = this.onLoadMore.bind(this);
        this.onLoadDetail = this.onLoadDetail.bind(this);

        window.onhashchange = ()=>{
            let page = getHash('page');//获取当前hash值
            this.setState({
                page:page
            });
        };
    }

    clickHome(){
        this.setState({
            page:'index'
        });
    }

    clickUser(){
        this.setState({
            page:'user'
        });
    }
    clickSendText(){
        this.setState({
            page:'sendText'
        });
    }

    onLoadList(params){
        //获取list
        this.setState({data: params.data, list: params.list, showMore: true, fromId: params.fromId});
    }
    onLoadMore(params){
        //加载更多
        this.setState({showMore: true, data: params.data, list: params.list, fromId: params.fromId});
    }

    onLoadDetail(params){
        //加载详情页
        let data = {};
        if(this.state.data===null){
            data[params.data.id] = params.data;
            this.setState({
                data:data
            });
        }else{
            data = this.state.data;
            data[params.data.id] = params.data;
            this.setState({
                data:data
            });
        }
    }
    componentWillMount(){
        console.log('componentWillMount');
    }
    componentDidMount(){
        console.log('componentDidMount');
    }
    componentWillUnmount(){
        console.log('componentWillUnmount');
    }
    render() {
        console.log('render');
        console.log(this.state);
        if(this.state.page==='detail'){
            return (<Detail onLoadDetail={this.onLoadDetail} data={this.state.data}/>);
        }
        else if(this.state.page==='user'){
            return (<div>
              <User data={this.props.data}/>
              </div>);
        }else if(this.state.page==='sendText'){
            return(<SendText style={{height:'100%'}}/>);
        }
        else{
            return (<Home onLoadList={this.onLoadList} onLoadMore={this.onLoadMore} data={this.state.data} list={this.state.list} clickMore={this.loadMore} showMore={this.state.showMore} />);
        }

    }
}

render(<App style={{height:'100%'}} />, document.querySelector('.container'));
