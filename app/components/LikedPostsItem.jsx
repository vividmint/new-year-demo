import React from 'react';
import ItemTop from './ItemTop.jsx';

class LikedPostsItem extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        let data = this.props.data;
        let showContent = this.pr;
        return (
            <div>
                <ItemTop data={data}/>
                {showContent}
            </div>
        );
    }

}

export default LikedPostsItem;
