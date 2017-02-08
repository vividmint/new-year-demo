import React from 'react';
import Item from './Item/Item.jsx';
import map from 'lodash/map';
import More from './More.jsx';
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
            justifyContent:'center',
            backgroundColor:'#F2F2F2',
            marginBottom:50
        };
        const spinner = {
            color: '#AAAAAA',
            fontSize: '50px',
            padding:'10px 0px'
        };
        let ItemArr = map(this.props.list, (id,i) => {
            return (<Item key={'item' + i} list={this.props.list} onToggleLike={this.props.onToggleLike} data={this.props.data[id]} id={this.props.data[id].id} onToggleOther={this.props.onToggleOther}/>);
        });
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
