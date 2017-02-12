import React from 'react';
import Item from './Item';
import Button from './Button';
import Loading from 'react-loading';

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
            marginBottom: 50,
            paddingBottom:10
        };
        let ItemArr = [];
        for (let id of this.props.idSets) {
            ItemArr.push(<Item key={'item' + id} onToggleLike={this.props.onToggleLike} data={this.props.data[id]} onToggleOther={this.props.onToggleOther}/>);
        }

        let moreButton = null;
        if (this.props.isShowMore) {
            moreButton = <Button onTap={this.props.onLoadMore} text="查看更多"/>;
        }
        let loading = null;
        if (this.props.isLoadingMore) {
            loading = <Loading type='spin' delay={0} color='#AAAAAA' height='25px' width='25px'/>;
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
