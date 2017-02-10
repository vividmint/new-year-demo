import React from 'react';
import {getHotList} from '../load';
import List from '../components/List.jsx';
import Tab from '../components/Tab/Tab';


class Hot extends React.Component {
    constructor(props) {
        super(props);
        // this.onLoadHotList = this.onLoadHotList.bind(this);
    }
    getFromId() {
        //获取加载更多时候的初始评论id
        return null;
    }
    componentDidMount() {
        if (this.props.hotPostsData === null) {
            getHotList({fromId: null}).then((data) => {
                let _data = {},
                    idSets = new Set();
                for (let i = 0; i < data.length; ++i) {
                    let id = data[i].id;
                    _data[id] = data[i];
                    idSets.add(id);
                }
                this.props.onLoadHotList({hotPostsData: _data, hotPostsIdSets: idSets, fromId: this.getFromId()});
            }).catch(err => {
                console.log('请求错误');
                console.log(err);
            });
        }
    }
    render() {
        console.log(this.props.hotPostsIdSets);
        return (
            <div>
                <List hotPostsData={this.props.hotPostsData} hotPostsIdSets={this.props.hotPostsIdSets}/>
                <Tab/>
            </div>
        );
    }
}
export default Hot;
