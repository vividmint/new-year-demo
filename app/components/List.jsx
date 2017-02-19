import React from 'react';
import Item from './Item';
import Button from './Button';
import Loading from 'react-loading';
import {INDEX_LIST_LOAD_MORE_DISTANCE} from '../constans/config';
import {getDocumentHeight} from '../utils.js';

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
            <div ref={listDom=>{
                this.listDom = listDom;
            }} onScroll={this.onScroll} style={styles}>
                {ItemArr}
                {moreButton}
                <div style={spinnerBox}>{loading}</div>
            </div>
        );
    }

    onScroll() {
        if (this.props.isLoadingEnd) {
            return;
        }
        //下拉刷新
        let documentHeight = getDocumentHeight({
            element:this.listDom
        }); //整个页面的高度
        let distance = documentHeight - (this.listDom.scrollTop + window.screen.height);
        //window.screen.height  屏幕的高度
        //window.document.body.scrollTop  屏幕顶部距离页面顶部的距离
        if (distance <= INDEX_LIST_LOAD_MORE_DISTANCE && distance > 0) {
            this.props.onLoadMore();
        }
    }
}

export default List;
