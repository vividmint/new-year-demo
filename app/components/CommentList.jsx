import React from 'react';
import SingleComment from './SingleComment';

class CommentList extends React.Component {
    constructor(props) {
        super(props);

    }

    render() {
        const styles = {
            display: 'flex',
            flexDirection: 'column',
            backgroundColor: 'white'
        };
        let commentComponentArr = [];
        for(let item of this.props.commentIdSets){
            commentComponentArr.push(<SingleComment onShowCommentMenu={this.props.onShowCommentMenu} key={'comment' +item} data={this.props.commentData[item]}/>);
        }
        return (
            <div style={styles}>
                {commentComponentArr}
            </div>
        );
    }
}
export default CommentList;
