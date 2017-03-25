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
            backgroundColor: 'white',
            padding:'0px 25px',
            marginBottom:15
        };
        let commentComponentArr = [];
        for(let item of this.props.commentIdSets){
            commentComponentArr.push(<SingleComment onCommentToggleLike={this.props.onCommentToggleLike} onShowCommentMenu={this.props.onShowCommentMenu} key={'comment' +item} data={this.props.commentData[item]}/>);
        }
        return (
            <div style={styles}>
                {commentComponentArr}
            </div>
        );
    }
}
export default CommentList;
