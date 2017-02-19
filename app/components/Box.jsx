/* * 九宫格
 */
import React from 'react';
import {BASE_PRIMARY_COLOR} from '../constans/styles';
import FaMusic from 'react-icons/lib/fa/music';
import FaBomb from 'react-icons/lib/fa/bomb';
import MdShoppingCart from 'react-icons/lib/md/shopping-cart';
import FaLineChart from 'react-icons/lib/fa/line-chart';
import FaCalendar from 'react-icons/lib/fa/calendar';
import FaBook from 'react-icons/lib/fa/book';
import MdEventNote from 'react-icons/lib/md/event-note';
import MdEvent from 'react-icons/lib/md/event';
import FaBuildingO from 'react-icons/lib/fa/building-o';
import FaSearch from 'react-icons/lib/fa/search';
import FaBarChart from 'react-icons/lib/fa/bar-chart';
import A from './A';


class Box extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        const styles = {
            display: 'flex',
            flexWrap: 'wrap',
            borderBottom:'0.8px solid rgba(0,0,0,0.1)',
            width: '100%',
        };

        var itemStyle = {
                padding: '20px 10px 6px 10px',
                display: 'flex',
                flex: 1,
                flexBasis: 'calc(100% / 3)',
                flexGrow: 0,
                alignItems: 'center',
                flexDirection: 'column',
            },
            button = {
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                textDecoration: 'none'
            },
            icon = {
                fontSize: 24,
                color: 'rgba(0,0,0,0.7)',
            },
            name = {
                fontSize: 14,
                padding: '10px 0px',
                color: 'rgba(0, 0, 0, 0.6)'
            };
        const bar = {
            backgroundColor: 'rgba(0,0,0,0.03)',
            color: 'rgba(0,0,0,0.6)',
            fontSize: 15,
            width: '100%',
            display: 'flex',
            padding: '10px 8px 8px 8px',
        };
        const ICON_MAP = {
            // 'notice':<TiMessages style={icon}/>,
            'exam': <MdEventNote style={icon}/>,
            'examAgain': <MdEvent style={icon}/>,
            'schedule': <FaCalendar style={icon}/>,
            'room': <FaBuildingO style={icon}/>,
            'searchCourse': <FaSearch style={icon}/>,
            'score': <FaBarChart style={icon}/>,
            'book': <FaBook style={icon}/>,
            'secondaryMarket': <MdShoppingCart style={icon}/>,
            'hot': <FaBomb style={icon}/>,
            'fm': <FaMusic style={icon}/>,
            'gpa': <FaLineChart style={icon}/>
        };
        let list = this.props.list;
        let listLength = list.length;
        let remainder = listLength % 3; //余数
        let bottomItemIndexArr = [];

        if (remainder === 0) {
            //如果余数为0，说明最后一行的3个都需要去掉底部bottom
            for (let i = 1; i <= 3; i++) {
                bottomItemIndexArr.push(listLength - i);
            }
        } else if (remainder > 0) {
                //如果列表的项目数除以3余数大于0，则后面的那几个去掉底部bottom
            for (let i = 1; i <= remainder; i++) {
                bottomItemIndexArr.push(listLength - i);
            }
        }
        const boxItems = this.props.list.map((item, index) => {
            itemStyle = Object.assign({}, itemStyle, {borderRight: '0.8px solid rgba(0,0,0,0.1)',borderBottom:'0.8px solid rgba(0,0,0,0.1)'});
            if ((index + 1) % 3 === 0) {
                    //最右边的那几个
                itemStyle = Object.assign({}, itemStyle, {borderRight: '0px solid #fff'});
            }

            if(bottomItemIndexArr.indexOf(index)>-1){
                itemStyle = Object.assign({}, itemStyle, {borderBottom: '0px solid #fff'});
            }
            return (
                    <div key={'item_' + index} style={itemStyle}>
                        <A style={button} href={item.href}>
                            {ICON_MAP[item.key]}
                            <div style={name}>{item.text}</div>
                        </A>
                    </div>
            );
        });
        return (
                <div style={styles}>
                    <div style={bar}>{this.props.title}</div>
                    {boxItems}
                </div>
        );
    }

    }

export default Box;
