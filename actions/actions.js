// 同步action
export const SELECT_SUBREDDIT = 'SELECT_SUBREDDIT';
export const INVALIDATE_SUBREDDIT = 'INVALIDATE_SUBREDDIT';

// 异步action
export const REQUESET_POSTS = 'REQUESET_POSTS';
export const RECEIVE_POSTS = 'RECEIVE_POSTS';

// 用户选择要展示的subreddit
export function selectSubreddit (subreddit) {
  return {
    type: SELECT_SUBREDDIT,
    subreddit
  }
}

// 按“刷新”按钮更新subreddit
export function invalidateSubreddit (subreddit) {
  return {
    type: INVALIDATE_SUBREDDIT,
    subreddit
  }
}

// 发起网络请求的action
export function requestPosts (subreddit) {
  return {
    type: REQUESET_POSTS,
    subreddit
  }
}

// 收到请求响应时，会 dispatch receivePosts
export function receivePosts (subreddit, json) {
  return {
    type: RECEIVE_POSTS,
    subreddit,
    posts: json.data.children.map(child => child.data),
    receivedAt: Date.now()
  }
}
