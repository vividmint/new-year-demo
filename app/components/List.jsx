import React from 'react';
import Item from './Item/Item.jsx';
import More from './More.jsx';
import FaSpinner from 'react-icons/lib/fa/spinner';
import {getHash} from '../utils';

class List extends React.Component {
    constructor(props) {
        super(props);
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
            marginBottom: 50
        };
        const spinner = {
            color: '#AAAAAA',
            fontSize: '50px',
            padding: '10px 0px'
        };
        let hash = getHash().page;
        console.log(hash);
        let ItemArr = [];
        if (hash === 'index') {
            for (let id of this.props.idSets) {
                ItemArr.push(<Item key={'item' + id} onToggleLike={this.props.onToggleLike} data={this.props.data[id]} onToggleOther={this.props.onToggleOther}/>);
            }
        }
        else if(hash==='userLiked'){
            if (this.props.likedPostsIdSets) {
                // console.log(this.props.likedPostsData);
                for (let id of this.props.likedPostsIdSets) {
                    ItemArr.push(<Item key={'likedItem' + id} data={this.props.likedPostsData[id]}/>);
                }
            }
        }
        else if(hash==='hot'){
            if (this.props.hotPostsIdSets) {
                console.log(this.props.hotPostsData);
                for (let id of this.props.hotPostsIdSets) {
                    ItemArr.push(<Item key={'hotItem' + id} data={this.props.hotPostsData[id]}/>);
                }
            }
        }

        let moreButton = null;
        if (this.props.isShowMore) {
            moreButton = <More onTap={this.props.onLoadMore} text="查看更多"/>;
        }
        let loading = null;
        if (this.props.isLoadingMore) {
            loading = <FaSpinner style={spinner}/>;
        }
        return (
            <div style={styles}>
                {ItemArr}
                {moreButton}
                <div style={spinnerBox}>{loading}</div>
            </div>
        );
    }
}

export default List;
