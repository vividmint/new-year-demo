import React from 'react';
import FaMusic from 'react-icons/lib/fa/music';
import FaBomb from 'react-icons/lib/fa/bomb';
import {setHash} from '../utils';
import MdShoppingCart from 'react-icons/lib/md/shopping-cart';
import FaHeart from 'react-icons/lib/fa/heart';


class UserBottomItems extends React.Component {
    constructor(props) {
        super(props);
        this.toHotListHash = this.toHotListHash.bind(this);

    }

    render() {

        const styles={
                display: 'flex',
            },
            item = {
                padding: '16px 10px 6px 10px',
                display: 'flex',
                flex: 1,
                alignItems: 'center',
                flexDirection: 'column',
                borderBottom: '0.8px solid rgba(0,0,0,0.1)',
                borderRight: '0.8px solid rgba(0,0,0,0.1)'
            },
            button = {
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                textDecoration:'none'
            },
            icon = {
                fontSize: 26,
                color: 'rgba(0,0,0,0.7)',
                // color:`${BASE_PRIMARY_COLOR}`
            },
            name = {
                fontSize: 16,
                padding: '10px 0px',
                color: 'rgba(0, 0, 0, 0.6)'
            };

        return (
              <div style={styles}>
                  <div style={item}>
                      <a style={button} href={'/fm'}>
                          <FaMusic style={icon}/>
                          <div style={name}>神奇海螺</div>
                      </a>
                  </div>
                  <div style={item}>
                      <a style={button} href={'http://xiaoqu.qq.com/mobile/barindex.html?_bid=128&_wv=1027&bid=130899'}>
                          <MdShoppingCart style={icon}/>
                          <div style={name}>跳蚤市场</div>
                      </a>
                  </div>
                  <div style={item}>
                      <a style={button}>
                          <FaBomb style={icon} onTouchTap={this.toHotListHash}/>
                          <div style={name} onTouchTap={this.toHotListHash}>热门帖</div>
                          </a>
                  </div>
                  <div style={item}>
                    <a style={button}>
                        <FaHeart style={icon} href={'http://scuinfo.com/tag/%E5%B7%9D%E5%A4%A7%E8%A1%A8%E7%99%BD'} />
                        <div style={name}>表白</div>
                        </a>
                  </div>
              </div>
        );
    }

    toHotListHash() {//跳转热门帖子列表
        setHash('page=hot');
    }

}

export default UserBottomItems;
