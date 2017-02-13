import React from 'react';
import Mask from './Mask';
import Loading from 'react-loading';

class GlobalLoading extends React.Component {
    render() {
        const styles = {
            position: 'fixed',
            left: '50%',
            top: '50%',
            transform: 'translate(-50%, -50%)',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center'
        };
        if (!this.props.loading.isShow) {
            return null;
        }
        let loadingText = this.props.loading.text || '';
        return <div>
            <Mask isMask={this.props.loading.isMask === undefined
                ? true
                : this.props.loading.isMask}/>
            <div style={styles}>
                <Loading delay={0} type='spin' color='rgba(0,0,0,0.8)' width='30px' height='30px'/> {loadingText}</div>
        </div>;
    }
}

export default GlobalLoading;
