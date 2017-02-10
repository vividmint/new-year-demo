import React from 'react';
import List from '../components/List.jsx';
import {getLikedPosts} from '../load';
import Tab from '../components/Tab/Tab';
import {BASE_PRIMARY_COLOR} from '../constans/styles';


class UserLiked extends React.Component {
    constructor(props) {
        super(props);
        this.getLikedPosts = this.getLikedPosts.bind(this);
        this.getFromId = this.getFromId.bind(this);
    }
    componentDidMount(){
        if (this.props.likedPostsData === null) {
            this.getLikedPosts({fromId:this.getFromId()});
        }
    }

    getFromId() {
        return null;
    }
    render() {
        const top={
            position:'fixd',
            top:0,
            height:42,
            width:'100%',
            textAlign:'center',
            color:'white',
            backgroundColor:`${BASE_PRIMARY_COLOR}`,
            padding:'10px 0px',
            fontSize:17
        };
        return (
            <div>
                <div style={top}>赞过</div>
                <List likedPostsData={this.props.likedPostsData} likedPostsIdSets={this.props.likedPostsIdSets}/>
                <Tab/>
            </div>
        );
    }
    getLikedPosts() {
        getLikedPosts({fromId: null}).then(data => {
            let _data = {},
                idSets = new Set();
            for (let i = 0; i < data.length; ++i) {
                let id = data[i].id;
                _data[id] = data[i];
                idSets.add(id);
            }
            this.props.onLoadLikedPosts({likedPostsData: _data, likedPostsIdSets: idSets, fromId: this.getFromId()});
        }).catch(err => {
            console.log('请求错误');
            console.log(err);
        });
    }

}

export default UserLiked;
