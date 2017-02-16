import React from 'react';
import Item from './Item';
import Button from './Button';
import Loading from 'react-loading';
import ReactDOM from 'react-dom';
import {getDocumentHeight} from '../utils.js';
import {INDEX_LIST_LOAD_MORE_DISTANCE} from '../constans/config';

class List extends React.Component {
    constructor(props) {
        super(props);
        this.bindEvents = this.bindEvents.bind(this);
        // this.removeEvents = this.removeEvents.bind(this);
        this.onScroll = this.onScroll.bind(this);
    }
    componentDidMount() {
        this.bindEvents();
    }
    bindEvents() {
        const list = ReactDOM.findDOMNode(this.listDom);
        console.log(list);
        list.addEventListener('scroll', this.onScroll);

    }
    removeEvents() {
        const list = ReactDOM.findDOMNode(this.listDom);
        list.removeEventListener('scroll', this.onScroll);
    }
    componentWillUnmount() {
        this.removeEvents();
    }

    onScroll() {
        console.log('test22');
        // if (this.props.isLoadingEnd) {
        //     return;
        // }
        // //下拉刷新
        // let documentHeight = getDocumentHeight(); //整个页面的高度
        // let distance = documentHeight - (window.document.body.scrollTop + window.screen.height);
        // //window.screen.height  屏幕的高度
        // //window.document.body.scrollTop  屏幕顶部距离页面顶部的距离
        // console.log(distance);
        // if (distance <= INDEX_LIST_LOAD_MORE_DISTANCE && distance > 0) {
        //     this.props.onLoadMore();
        // }
    }
    render() {
        const styles = {
            overflow: 'scroll',
            flex: '0 1 auto'
        };
        const spinnerBox = {
            display: 'flex',
            justifyContent: 'center',
            backgroundColor: '#F2F2F2',
            marginBottom: 50,
            paddingBottom: 10
        };
        let ItemArr = [];
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
            <div ref={dom=>{
                this.listDom = dom;
            }} onScroll={this.onScroll.bind(this)} style={styles}>
                {ItemArr}
                {moreButton}
                <div style={spinnerBox}>{loading}</div>
            </div>
        );
    }
}

export default List;
