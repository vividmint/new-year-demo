import React from 'react';

class CommentMenu extends React.Component {
    constructor(props){
        super(props);
        console.log(this.props.postId,this.props.id);
    }
    render(){
        const reply = {
                padding: '15px 0px',
                backgroundColor: 'white',
                borderBottom: '0.8px solid rgb(242, 242, 242)'
            },
            deleteButton = {
                display: this.props.commentData.author === 1
            ? 'block'
            : 'none',
                padding: '15px 0px',
                backgroundColor: 'white',
                borderBottom: '4px solid rgb(242, 242, 242)'
            },
            cancle={
                padding: '15px 0px',
                backgroundColor: 'white'
            };
        return(
      <div>
          <div style={reply}>回复</div>
        <div onTouchTap={this.props.deleteComment.bind(this, {
            postId: this.props.postId,
            commentId: this.props.id
        })} style={deleteButton}>删除评论</div>
        <div onTouchTap={this.props.onRemoveNotice} style={cancle}>取消</div>
      </div>
        );
    }
}
export default CommentMenu;
