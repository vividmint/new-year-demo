import React from 'react';
import LikedPostsItem from './LikedPostsItem';

class LikedPostsList extends React.Component {
    constructor(props) {
        super(props);
    }
    render(){
        let likedItemArr = [];
        if(this.props.data){
            for(let id of this.props.likedPostsIdSets){
                likedItemArr.push(<LikedPostsItem key={'likedItem' +id}  data={this.props.data[id]}/>);
            }
        }
        return (<div>
        {likedItemArr}
      </div>);
    }

}

export default LikedPostsList;
