import React from 'react';
import {render} from 'react-dom';
import Item from './Item/Item.jsx';
import map from 'lodash/map';
import More from './More.jsx';
import Loading from './Loading.jsx';
import FaSpinner from 'react-icons/lib/fa/spinner';

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
            justifyContent:'center'
        };
        const spinner = {
            color: '#AAAAAA',
            fontSize: '28px',
            paddingBottom: '62px',
        };
        let ItemArr = map(this.props.list, (id,i) => {
            return (<Item key={'item' + i} data={this.props.data[id]} id={this.props.data[id].id}/>);
        });
        let moreButton = null;
        if (this.props.showMore) {
            moreButton = <More onTap={this.props.onLoadMore} text="加载更多"/>;
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
