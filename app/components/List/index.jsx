import React from 'react';
import Item from '../Item';
import Button from '../Button';
import Loading from 'react-loading';
import {INDEX_LIST_LOAD_MORE_DISTANCE} from '../../constans/config';
import {getDocumentHeight} from '../../utils.js';
import Css from './List.css';

class List extends React.Component {
    constructor(props) {
        super(props);
        this.onScroll = this.onScroll.bind(this);
    }

    render() {
        const styles = {
            overflow: 'scroll',
            flex: '0 1 auto',
            height: '100%'
        };
        const spinnerBox = {
            display: 'flex',
            justifyContent: 'center',
            backgroundColor: '#F2F2F2',
            marginBottom: 50,
            paddingBottom: 10
        };
        const titles = {
            display: 'flex',
            justifyContent: 'center',
            margin: '15px 0px 10px 0px'
        };
        const title = {
            border: '1px solid skyblue',
            padding: '3px 10px',
            color: '#AAAAAA'
        };
        const active = Object.assign({}, title, {
            color: 'white',
            backgroundColor: 'skyblue'
        });
        let ItemArr = [];
        let page = getHash('page');
        let nav = null;
        console.log(page);

        nav = <div style={titles}>
            <div style={page === 'index'
                ? active
                : title}>最新</div>
            <div style={page === 'hot'
                ? active
                : title}>热门</div>

        </div>;
        for (let id of this.props.idSets) {
            ItemArr.push(<Item key={'item' + id} onToggleLike={this.props.onToggleLike} data={this.props.data[id]} onToggleOther={this.props.onToggleOther}/>);
        }

        let moreButton = null;
        if (this.props.isShowMore) {
            moreButton = <Button onTap={() => {
                this.props.onLoadMore();
            }} text="查看更多"/>;
        }
        let loading = null;
        if (this.props.isLoadingMore) {
            loading = <Loading type='spin' delay={0} color='#AAAAAA' height='25px' width='25px'/>;
        }
        return (
            <div id="homeList" ref={listDom => {
                this.listDom = listDom;
            }} className={Css.listContainer} onScroll={this.onScroll} style={styles}>
                {nav}
                {ItemArr}
                {moreButton}
                <div style={spinnerBox}>{loading}</div>
            </div>
        );
    }
    componentDidMount() {
        if (sessionStorage.getItem('overflowY')) {
            let y = sessionStorage.getItem('overflowY');
            this.listDom.scrollTop = y;
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
        //this.listDom.scrollTop  屏幕顶部距离页面顶部的距离
        let overflowY = this.listDom.scrollTop;
        sessionStorage.setItem('overflowY', overflowY); //记录当前浏览位置

        if (distance <= INDEX_LIST_LOAD_MORE_DISTANCE && distance > 0) {
            this.props.onLoadMore();
        }
    }
    onScrollTop() {
        sessionStorage.setItem('overflowY', overflowY); //记录当前浏览位置
    }
}

export default List;
