import React from 'react';

class UserItems extends React.Component {
    render() {
        const styles={
                display:'flex',
                width:'100%',
                height:'100%'
            },
            columnItem={
                display: 'flex',
                flexDirection: 'column',
                width:'100%',
                height:'100%',
                borderRight:'0.5px solid rgb(242, 242, 242)'
            },
            columnLastItem={
                display: 'flex',
                flexDirection: 'column',
                width:'100%',
                height:'100%'
            },
            item={
                width:'100%',
                height:'100%',
                padding:'48px',
                display: 'flex',
                alignItems:'center',
                flexDirection: 'column',
                borderBottom:'0.5px solid rgb(242, 242, 242)'
            };
        return (
            <div style={styles}>
                <div style={columnItem}>
                    <div style={item}>1</div>
                    <div style={item}>1</div>
                    <div style={item}>1</div>

                </div>
                <div style={columnItem}>
                    <div style={item}>1</div>
                    <div style={item}>1</div>
                    <div style={item}>1</div>

                </div>
                <div style={columnLastItem}>
                    <div style={item}>1</div>
                    <div style={item}>1</div>
                    <div style={item}>1</div>

                </div>
            </div>
        );
    }
}

export default UserItems;
