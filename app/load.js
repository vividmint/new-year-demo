import {
    request
} from './utils.js';
import {
    toLogin
} from './business';
import {
    LIST_DEFAULT_LENTH
} from './constans/config.js';
const loadStatus = {
    getList: false,
};
/**
获取首页帖子列表
*/
export function getList(params) {
    if (loadStatus.getList) {
        return;
    }
    loadStatus.getList = true;
    let url = '/api/posts';
    if (params.type === 'hot') {
        url = '/api/hot';
    } else if (params.type === 'liked') {
        url = '/api/posts/like';
    } else if (params.type === 'posted') {
        url = '/api/posts/self';
    }
    url = `${url}?pageSize=${LIST_DEFAULT_LENTH}`;
    if (params.fromId) {
        url += `&fromId=${params.fromId}`;
    }
    return request({
        url: url
    }).then(result => {
        loadStatus.getList = false;
        if (result.code === 200) {
            return result.data;
        } else {
            return Promise.reject(result);
        }
    });
}
/**
 * 获取热门帖子列表
 */
export function getHotList(params) {
    let url = '/api/hot/?pageSize=15';
    if (params.fromId) {
        url += `&fromId=${params.fromId}`;
    }
    return request({
        url: url
    }).then(result => {
        if (result.code === 200) {
            return result.data;
        } else {
            return Promise.reject(result);
        }
    });
}


/**
获取单个帖子
*/
export function getPost(params) {
    return request({
        url: `/api/post?id=${params.postId}`
    }).then(result => {
        // this.props.onLoadDetail({data: result.data});
        //调用评论列表的api
        // this.getCommentList();
        if (result.code === 200) {
            return result.data;
        } else {
            return Promise.reject(result);
        }
    });
}
/**
 * 删除一条帖子
 */
export function deletePost(params) {
    return request({
        method: 'DELETE',
        url: '/api/post',
        body: {
            id: params.id
        }
    }).then(result => {
        if (result.code === 200) {
            return Promise.resolve(result.data);
        } else {
            return Promise.reject(result);

        }
    });
}
/**
获取评论列表
*/
export function getComments(params) {
    if (loadStatus.getComments) {
        return;
    }
    loadStatus.getComments = true;
    let url = `/api/comments/?postId=${params.postId}&pageSize=8`;
    if (params.fromId) {
        url += `&fromId=${params.fromId}`;
    }
    return request({
        url
    }).then(result => {
        loadStatus.getComments = false;
        //获取当前帖子的评论列表
        if (result.code === 200) {
            return result.data;
        } else {
            return Promise.reject(result);
        }
    });
}

/**
发送评论
*/

export function postComment(params) {
    return request({
        method: 'POST',
        url: '/api/comment',
        body: {
            postId: params.postId,
            content: params.content
        }
    }).then(result => {
        if (result.code === 200) {
            return result.data;
        } else {
            return Promise.reject(result);
        }

    });
}


/**
删除评论
*/
export function deleteComment(params) {
    return request({
        method: 'DELETE',
        url: '/api/comment/',
        body: {
            id: params.commentId
        }
    }).then(result => {
        if (result.code === 200) {
            return Promise.resolve(result.data);
        } else {
            return Promise.reject(result);

        }
    });
}
/**
 * 点赞评论
 */
export function postCommentLike(params) {
    return request({
        method: 'POST',
        url: '/api/like/comment',
        body: {
            id: params.commentId
        }
    }).then(result => {
        if (result.code === 200) {
            return Promise.resolve(result.data);
        } else {
            toLogin();
            return Promise.reject(result);

        }
    });
}

/**
 * 获取用户个人资料
 * @param  {[type]} params [description]
 * @return {[type]}        [description]
 */
export function getUser() {
    return request({
        url: '/api/profile/'
    }).then(result => {
        if (result.code === 200) {
            return Promise.resolve(result.data);
        } else {
            return Promise.reject(result);

        }
    });
}

/**
 * 获取赞过的帖子
 */
export function getLikedPosts(params) {
    let url = '/api/posts/like/?pageSize=15';
    if (params.fromId) {
        url += `&fromId=${params.fromId}`;
    }
    return request({
        url: url
    }).then(result => {
        if (result.code === 200) {
            return Promise.resolve(result.data);
        } else {
            return Promise.reject(result);

        }
    });
}

/**
 * 点赞
 * @param  {[type]} params [description]
 * @return {[type]}        [description]
 */
export function postLike(params) {
    return request({
        method: 'POST',
        url: '/api/like/post',
        body: {
            id: params.postId
        }
    }).then(result => {
        if (result.code === 200) {
            return result.data;
        } else {
            return Promise.reject(result);
        }
    });
}

/**
 * 取消点赞
 * @param  {[type]} params [description]
 * @return {[type]}        [description]
 */
export function deleteLike(params) {
    return request({
        method: 'DELETE',
        url: '/api/like/post',
        body: {
            id: params.postId
        }
    }).then(result => {
        if (result.code === 200) {
            return result.data;
        } else {
            return Promise.reject(result);
        }
    });
}

/**
 * 发布帖子
 */
export function postText(params) {
    return request({
        'method': 'POST',
        'url': '/api/post',
        'body': params.body
    }).then(result => {
        if (result.code === 200) {
            return result.data;
        } else {
            return Promise.reject(result);
        }
    });
}

/**
 * 举报帖子
 */
export function reportPost(params) {
    return request({
        method: 'POST',
        url: '/api/report',
        body: {
            postId: params.postId,
            content: params.content
        }
    }).then(result => {
        if (result.code === 200) {
            return result.data;
        } else {
            return Promise.reject(result);
        }
    });
}
/**
 * 获取用户通知数
 */
export function getNoticeCount() {
    return request({
        url: '/api/notice/count'
    }).then(result => {
        if (result.code === 200) {
            console.log(result);
            return result.data;
        } else {
            return Promise.reject(result);
        }
    });
}
