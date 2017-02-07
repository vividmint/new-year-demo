import React from 'react';
import NotificationSystem from 'react-notification-system';
import Mask from './Mask';

let _notificationSystem = null;
let _currentNotice = {}; //当前弹窗
export function popNotice(params) {
    var _params = Object.assign(params, {
        message: params.message,
        level: params.level,
        position: params.position || 'tc',
        autoDismiss: params.autoDismiss === undefined
            ? 1.5
            : params.autoDismiss,
        dismissible: false,
        type:'tips'
    });
    _currentNotice = _notificationSystem.addNotification(_params);
    return  _currentNotice;
}
export function removeNotice(params) {
    params = params || _currentNotice;
    return  _notificationSystem.removeNotification(params);
}
export class Notice extends React.Component {
    constructor(props) {
        super(props);
        _notificationSystem = null;
        this.state = {
            style:{
                Containers: {
                    DefaultStyle: {
                        width: window.document.documentElement.clientWidth,
                        padding: 0,
                        margin: 0
                    }
                },
                NotificationItem: {
                    DefaultStyle: {
                        margin: 0,
                        height: 42,
                        borderWidth: '0px',
                        boxShadow: null,
                        borderRadius: 0,
                        textAlign: 'center',
                        fontSize: 14,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center'
                    }
                },

                error: { // Applied only to the success notification item
                    color: 'red'
                }
            }
        };

    }
    componentDidMount() {
        _notificationSystem = this.refs.notificationSystem;
    }
    onCancel(){
        removeNotice(_currentNotice);
        this.setState({
            isMask:false
        });
    }
    shouldComponentUpdate(nextProps,nextState){
        return true;
    }
    componentWillReceiveProps(nextProps){
        let style = this.state.style;
        // console.log('this',this.props);
        // console.log('next',nextProps);

        // console.log(this.props.type,nextProps.type);
        if(nextProps.noticeDialog.type==='menu'){
            style.NotificationItem.DefaultStyle = Object.assign(style.NotificationItem.DefaultStyle,{
                height: 75,
                fontSize:16,
                display:'inline',
                color:'rgba(0,0,0,0.8)',
                padding:'8px 0px',
                bottom:0
            });
            this.setState({
                style:style,
                isMask:true
            });
        }else{
            style.NotificationItem.DefaultStyle =  {
                margin: 0,
                height: 42,
                borderWidth: '0px',
                boxShadow: null,
                borderRadius: 0,
                textAlign: 'center',
                fontSize: 14,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
            };
            this.setState({
                style:style,
                isMask:false
            });
        }
        if(nextProps.noticeDialog.isMask!==undefined){
            this.setState({
                isMask:nextProps.noticeDialog.isMask
            });
        }
    }
    render() {
        return (<div><NotificationSystem style={this.state.style} ref="notificationSystem"/>
      <Mask onTap={this.onCancel.bind(this)} isMask={this.state.isMask}/>

    </div>
        );
    }
}
