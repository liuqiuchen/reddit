import 'babel-polyfill'; // 支持Promise fetch

// 同步action
export const SELECT_SUBREDDIT = 'SELECT_SUBREDDIT';
export const INVALIDATE_SUBREDDIT = 'INVALIDATE_SUBREDDIT';

// 异步action
export const REQUESET_POSTS = 'REQUESET_POSTS';
export const RECEIVE_POSTS = 'RECEIVE_POSTS';

// 用户选择要展示的subreddit
export function selectSubreddit(subreddit) {
    return {type: SELECT_SUBREDDIT, subreddit}
}

// 按“刷新”按钮更新subreddit
export function invalidateSubreddit(subreddit) {
    return {type: INVALIDATE_SUBREDDIT, subreddit}
}

// 发起网络请求的action
export function requestPosts(subreddit) {
    return {type: REQUESET_POSTS, subreddit}
}

// 收到请求响应时，会 dispatch receivePosts
export function receivePosts(subreddit, json) {
    return {
        type: RECEIVE_POSTS,
        subreddit,
        posts: json.data.children.map(child => child.data),
        receivedAt: Date.now()
    }
}

// thunk action creator
// 使用：store.dispatch(fetchPosts('reactjs'))
export function fetchPosts(subreddit) {
    /*
  Thunk middleware 知道如何处理函数
  这里把 dispatch 方法通过参数的形式传给函数
  以此让它自己也能 dispatch action
   */
    return function(dispatch) {
        // 更新state状态
        dispatch(requestPosts(subreddit));

        // thunk middleware可以有返回值，返回值当做dispatch方法的返回值传递
        // 并不是一定要返回
        return fetch(`http://www.subreddit.com/r/${subreddit}.json`)
            .then(response => response.json())
            .then(json => {console.log(json);dispatch(receivePosts(subreddit, json))})
            .catch(err => console.log(err));
    }
}
