import React from 'react';
import BottomButtons from '../BottomButtons.jsx';
import Fold from '../Fold.jsx';
import ItemTop from '../ItemTop.jsx';
import {setHash} from '../../utils.js';

class Item extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            preview: null, //预览的文字
            isFold: true, //帖子是否处于预览状态，是的话处于预览
        };
        this.toDetailHash = this.toDetailHash.bind(this);
        this.foldHandle = this.foldHandle.bind(this);
    }
    componentDidMount() {
        let data = this.props.data;
        let preview;
        if (this.props.data.content) {
            preview = data.content.length > 150
                ? data.content.substring(0, 149).concat('......')
                : data.content;
        } else {
            preview = data.title;
        }
        this.setState({preview: preview, idFold: true});
    }

    foldHandle() {
        //折叠toggle
        this.setState({
            isFold: this.props.data.content
                ? !this.state.isFold
                : true
        });
    }
    toDetailHash() {
        //跳转帖子详情页
        let id = this.props.data.id;
        setHash(`page=detail&id=${id}`);
    }
    render() {
        let styles = {
                padding: '15px 25px 4px 25px',
                borderBottom: '15px solid #F2F2F2'
            },
            contentStyles = {
                padding: '6px 0px 10px 0px',
                overflow: 'hidden',
                lineHeight: '25px',
                whiteSpace: 'pre-wrap',
                textAlign: 'justify'
            };
        let data = this.props.data;
        let isFold = this.state.isFold;
        let preview = this.state.preview;

        let showContent = null;
        showContent = preview
            ? isFold
                ? preview
                : data.content
            : data.content;

        return (
            <div style={styles}>
                <ItemTop data={data}/>
                <div>
                    <div style={contentStyles} onTouchTap={this.toDetailHash}>{showContent}</div>
                    <Fold onTouchTap={this.foldHandle} foldText={isFold
                        ? {
                            text: '展开全文'
                        }
                        : {
                            text: '收起'
                        }} content={data.content
                        ? data.content
                        : data.title} foldHandle={this.foldHandle}/>

                </div>
                <BottomButtons showNotice={this.props.showNotice} data={data} likeCount={data.likeCount} commentCount={data.commentCount} onToggleLike={this.props.onToggleLike} onToggleOther={this.props.onToggleOther}/>
            </div>
        );
    }
}

export default Item;
