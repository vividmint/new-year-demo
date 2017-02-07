import {
    request
} from './utils.js';
import {toLogin} from './business';
/**
获取首页帖子列表
*/
export function getList(params) {
    let url = '/api/posts?pageSize=15';
    if (params.fromId) {
        url += `&fromId=${params.fromId}`;
    }
    return request({
        url
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
获取评论列表
*/
export function getComments(params) {
    let url = `/api/comments/?postId=${params.postId}?&pageSize=8`;
    if (params.fromId) {
        url += `&fromId=${params.fromId}`;
    }
    return request({
        url
    }).then(result => {
        //获取当前帖子的评论列表
        console.log(result);
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
 * 获取用户个人资料
 * @param  {[type]} params [description]
 * @return {[type]}        [description]
 */
export function getUser() {
    return request({
        url: '/api/profile/'
    }).then(result =>{
        if (result.code === 200) {
            return Promise.resolve(result.data);
        } else {
            toLogin();
            return Promise.reject(result);

        }
    });
}

/**
 * 点赞
 * @param  {[type]} params [description]
 * @return {[type]}        [description]
 */
export function postLike(params){
    return request({
        method: 'POST',
        url: '/api/like/post',
        body: {
            id: params.postId
        }
    }).then(result => {
        if (result.code === 200) {
            return result.data;
        } else{
            return Promise.reject(result);
        }
    });
}

/**
 * 取消点赞
 * @param  {[type]} params [description]
 * @return {[type]}        [description]
 */
export function deleteLike(params){
    return request({
        method: 'DELETE',
        url: '/api/like/post',
        body: {
            id: params.postId
        }
    }).then(result => {
        if (result.code === 200) {
            return result.data;
        } else{
            return Promise.reject(result);
        }
    });
}

/**
 * 发布帖子
 */
export function postText (params){
    return request({
        'method': 'POST',
        'url': '/api/post',
        'body': params.body
    }).then(result => {
        if (result.code === 200) {
            return result.data;
        } else{
            return Promise.reject(result);
        }
    });
}
