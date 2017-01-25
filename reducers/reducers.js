import 'babel-polyfill';
import {combineReducers} from 'redux';
import {SELECT_SUBREDDIT, INVALIDATE_SUBREDDIT, REQUESET_POSTS, RECEIVE_POSTS} from '../actions/actions';

function selectedSubreddit(state, action) {
    if (typeof state === 'undefined') {
        state = 'reactjs';
    }
    switch (action.type) {
        case SELECT_SUBREDDIT:
            return action.subreddit;
            break;
        default:
            return state;
    }
    return state;
}

// 处理指定帖子
function posts(state, action) {
    if (typeof state === 'undefined') {
        state = {
            isFetching: false, // 显示正在加载的进度条
            didInvalidate: false, // 数据是否过期
            items: [] // 存放列表信息本身
        };
    }

    switch (action.type) {
        case INVALIDATE_SUBREDDIT:
            return Object.assign({}, state, {didInvalidate: true});
            break;
        case REQUESET_POSTS:
            return Object.assign({}, state, {
                isFetching: true,
                didInvalidate: false
            });
            break;
        case RECEIVE_POSTS:
            return Object.assign({}, state, {
                isFetching: false,
                didInvalidate: false,
                items: action.posts,
                lastUpdated: action.receivedAt
            });
            break;
        default:
            return state;
    }
    return state;
}

function postsBySubreddit(state, action) {
    if (typeof state === 'undefined') {
        state = {};
    }
    switch (action.type) {
        case INVALIDATE_SUBREDDIT:
        case REQUESET_POSTS:
        case RECEIVE_POSTS:
            return Object.assign({}, state, {
                [action.subreddit]: posts(state[action.subreddit], action)
            });
            break;
        default:
            return state;
    }
    return state;
}

const rootReducer = combineReducers({selectedSubreddit, postsBySubreddit});

export default rootReducer;
