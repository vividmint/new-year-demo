import FaLineChart from 'react-icons/lib/fa/line-chart';
import React from 'react';

class Score extends React.Component{
    render() {
        const button = {
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center'
            },
            icon = {
                fontSize: 32,
                color: 'rgba(0,0,0,0.6)'
            },
            name = {
                fontSize: 16,
                padding: '10px 0px',
                color: 'rgba(0, 0, 0, 0.8)'
            };
        return (
          <div style={button}>
              <FaLineChart style={icon} onTouchTap={this.toHotListHash}/>
              <div style={name} onTouchTap={this.toHotListHash}>热门帖</div>
          </div>
        );
    }
}
export default Score;
