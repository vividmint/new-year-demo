import React from 'react';
import BottomButtons from '../BottomButtons.jsx';
import Fold from '../Fold.jsx';
import ItemTop from '../ItemTop.jsx';
import {setHash} from '../../utils.js';

class Item extends React.Component {
    constructor(props) {
        super(props);
        let data = this.props.data;
        let content = data.content;
        let regex = content.match(/([\s\S]*?)\n{4}/);
        let foldContent = '';
        let isShowFoldButton = false;
        let isFold = true;
        if(regex){
            foldContent = regex[0];
            isShowFoldButton = true;
        }else{
            isShowFoldButton = content.length > 150;
            if(isShowFoldButton){
                foldContent = data.content.substring(0, 149).concat('......');
            }else{
                foldContent = data.content;
            }
        }
        if(this.props.isShowFoldButton===false){
            isShowFoldButton = false;
            isFold = false;
        }
        this.state = {
            foldContent,
            allContent:this.props.data.content,
            isShowFoldButton,
            isFold: isFold
        };
        this.toDetailHash = this.toDetailHash.bind(this);
        this.onToggleFold = this.onToggleFold.bind(this);
    }
    onToggleFold() {
        //折叠toggle
        this.setState({
            isFold: !this.state.isFold
        });
    }
    toDetailHash() {
        //跳转帖子详情页
        let id = this.props.data.id;
        setHash(`page=detail&id=${id}`);
    }
    render() {
        let styles = {
                padding: '12px 25px 4px 25px',
                borderBottom: '15px solid #F2F2F2',
                backgroundColor:'white'
            },
            contentStyles = {
                padding: '4px 0px 10px 0px',
                overflow: 'hidden',
                lineHeight: '25px',
                whiteSpace: 'pre-wrap',
                textAlign: 'justify',
            };
        let data = this.props.data;
        let foldComponent = this.state.isShowFoldButton?(<Fold foldText={this.state.isFold?'展开全文':'收起'} onToggleFold={this.onToggleFold}/>):null;
        return (
            <div style={styles}>
                <ItemTop data={data}/>
                <div>
                    <div style={contentStyles} onTouchTap={this.toDetailHash}>{this.state.isFold?this.state.foldContent:this.state.allContent}</div>
                    {foldComponent}
                </div>
                <BottomButtons showNotice={this.props.showNotice} data={data} likeCount={data.likeCount} commentCount={data.commentCount} onToggleLike={this.props.onToggleLike} onToggleOther={this.props.onToggleOther}/>
            </div>
        );
    }
}

export default Item;
