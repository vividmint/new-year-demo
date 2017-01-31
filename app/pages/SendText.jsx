import React from 'react';
import {render} from 'react-dom';
import FaClose from 'react-icons/lib/fa/close';
import FaCheck from 'react-icons/lib/fa/check';
// import Textarea from 'react-textarea-autosize';
import Css from '../Components/anonymity.css';


class SendText extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            anonymous: true,
            isSwitchInit:true,//按钮是否初始化
            text: '匿名'
        };
    }

    changeSign() {
        this.setState({
            isSwitchInit:false,
            anonymous:!this.state.anonymous,
            text: this.state.anonymous
                ? '匿名'
                : '实名'
        });
    }
    // toggle(){}
    render() {
        const styles = {
                color: 'white',
                width: '100%',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                height: '100%'

            },
            top = {
                display: 'flex',
                alignItems: 'center',
                height: 42,
                backgroundColor: '#42b983'
            },
            topButton = {
                fontSize: 22,
                padding: '0px 20px',
                alignItems: 'center',
                justifyContent: 'center'
            },
            description = {
                display: 'flex',
                flex: 1,
                fontSize: 18,
                justifyContent: 'center'

            },
            inputStyles = {
                flex: '1 1 auto',
                flexGrow: 'auto',
                resize: 'none',
                fontSize: 18,
                padding: '10px',
                borderStyle: 'none',
                outline: 'none'
            },
            bottom = {
                display: 'flex',
                alignItems: 'center',
                color: '#AAAAAA',
                padding: '15px 0px',
                backgroundColor: 'white',
                borderTop: '0.5px solid rgb(242, 242, 242)'
            },
            anonymous = {
                color: '#42b983',
                textAlign: 'center',
                fontSize:18,
            },
            choice = {
                padding: '5px 10px',
                borderRadius: '50px',
                width: 20,
                height: 12,
                backgroundColor:'#42b983',
                position: 'relative',
                margin:'0px 20px'

            },
            circle = {
                width: 20,
                height: 20,
                position: 'absolute',
                left: 19,
                top:1,
                borderRadius: '50%',
                backgroundColor:'white'
            };
        let switchButtonClassName = Css.buttonStaticRight;
        if(!this.state.isSwitchInit){
            switchButtonClassName = this.state.anonymous?Css.rightToLeft:Css.leftToRight;
        }
        return (
            <div>
                <div style={styles}>
                    <div style={top}>
                        <div style={topButton}><FaClose/></div>
                        <div style={description}>发送</div>
                        <div style={topButton}><FaCheck/></div>
                    </div>
                    <textarea style={inputStyles}></textarea>
                    <div style={bottom}>
                        <div style={choice}>
                            <div className={switchButtonClassName} onTouchTap={this.changeSign.bind(this)}></div>
                        </div>
                        <div style={anonymous}>{this.state.text}</div>
                    </div>
                </div>
            </div>

        );
    }
}

export default SendText;
