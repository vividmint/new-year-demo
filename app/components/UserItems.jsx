import React from 'react';
import HotPostsButton from './Tools/HotPostsButton';

class UserItems extends React.Component {
    render() {
        const styles={
                display:'flex',
                width:'100%',
                height:'100%'
            },
            columnItem={
                display: 'flex',
                flex:1,
                flexDirection: 'column',
                borderRight:'0.5px solid rgb(242, 242, 242)'
            },
            columnLastItem={
                display: 'flex',
                flex:1,
                flexDirection: 'column',
            },
            item={
                padding:'20px 26px 10px 26px',
                display: 'flex',
                flex:1,
                alignItems:'center',
                flexDirection: 'column',
                borderBottom:'0.5px solid rgb(242, 242, 242)'
            };
        return (
            <div style={styles}>
                <div style={columnItem}>
                    <div style={item}><HotPostsButton/></div>
                    <div style={item}><HotPostsButton/></div>
                    <div style={item}><HotPostsButton/></div>

                </div>
                <div style={columnItem}>
                    <div style={item}><HotPostsButton/></div>
                    <div style={item}><HotPostsButton/></div>
                    <div style={item}><HotPostsButton/></div>

                </div>
                <div style={columnLastItem}>
                    <div style={item}><HotPostsButton/></div>
                    <div style={item}><HotPostsButton/></div>
                    <div style={item}><HotPostsButton/></div>

                </div>
            </div>
        );
    }
}

export default UserItems;
