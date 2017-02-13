import React from 'react';
import FaLineChart from 'react-icons/lib/fa/line-chart';
import FaCalendar from 'react-icons/lib/fa/calendar';
import FaBook from 'react-icons/lib/fa/book';
import MdEventNote from 'react-icons/lib/md/event-note';
import MdEvent from 'react-icons/lib/md/event';
import FaBuildingO from 'react-icons/lib/fa/building-o';
import FaSearch from 'react-icons/lib/fa/search';
import FaBarChart from 'react-icons/lib/fa/bar-chart';
// import FaPencil from 'react-icons/lib/fa/pencil';
// import FaSignOut from 'react-icons/lib/fa/sign-out';

class UserTopItems extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        const styles = {
                display: 'flex',
                width: '100%',
                height: '100%'
            },
            columnItem = {
                display: 'flex',
                flex: 1,
                flexDirection: 'column',
                borderRight: '0.8px solid rgba(0,0,0,0.1)'
            },
            columnLastItem = {
                display: 'flex',
                flex: 1,
                flexDirection: 'column'
            },
            item = {
                padding: '16px 10px 6px 10px',
                display: 'flex',
                flex: 1,
                alignItems: 'center',
                flexDirection: 'column',
                borderBottom: '0.8px solid rgba(0,0,0,0.1)'
            };
        const button = {
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                textDecoration: 'none'
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
                <div style={columnItem}>
                    <div style={item}>
                      <a style={button} href={'/score'}>
                          <FaBarChart style={icon}/>
                          <div style={name}>成绩</div>
                      </a>

                    </div>
                    <div style={item}>
                      <a style={button} href={'http://gpa.fyscu.com/'}>
                          <FaLineChart style={icon}/>
                          <div style={name}>绩点</div>
                      </a>
                    </div>

                </div>

                <div style={columnItem}>
                    <div style={item}>
                      <a style={button} href={'/exam'}>
                          <MdEventNote style={icon}/>
                          <div style={name}>考表</div>
                      </a>
                    </div>
                    <div style={item}>
                        <a style={button} href={'/examAgain'}>
                            <MdEvent style={icon}/>
                            <div style={name}>补缓考</div>
                        </a>
                    </div>

                </div>
                <div style={columnItem}>
                    <div style={item}>
                        <a style={button} href={'/major'}>
                            <FaCalendar style={icon}/>
                            <div style={name}>课表</div>
                        </a>
                    </div>
                    <div style={item}>
                      <a style={button} href={'/book'}>
                          <FaBook style={icon}/>
                          <div style={name}>图书</div>
                      </a>
                    </div>
                </div>

                <div style={columnLastItem}>

                    <div style={item}>
                      <a style={button} href={'http://scuinfo.com/course'}>
                          <FaSearch style={icon}/>
                          <div style={name}>查询课程</div>
                      </a>
                    </div>
                    <div style={item}>
                      <a style={button} href={'http://scuinfo.com/classroom'}>
                          <FaBuildingO style={icon}/>
                          <div style={name}>空教室</div>
                      </a>
                    </div>
                </div>

            </div>

        );
    }

}
export default UserTopItems;
