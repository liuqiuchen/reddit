import { combineReducers } from 'redux';
import { SELECT_SUBREDDIT, INVALIDATE_SUBREDDIT, REQUESET_POSTS, RECEIVE_POSTS } from '../actions/actions';

function selectedSubreddit (state, action) {
  if(state === undefined) {
    state = 'reactjs';
    return state;
  }
  switch (action.type) {
    case SELECT_SUBREDDIT:
      return action.subreddit;
      break;
    default:
      return state;
  }
}

function posts (state, action) {
  if(state === undefined) {
    return state = {
      isFetching: false,  // 显示正在加载的进度条
      didInvalidate: false, // 数据是否过期
      items: [] // 存放列表信息本身
    };
  }

  switch (action.type) {
    case INVALIDATE_SUBREDDIT:
      return Object.assign({}, state, {
        didInvalidate: true
      });
      break;
    case REQUESET_POSTS:
      break;
    case RECEIVE_POSTS:
      break;
    default:
      return state;
  }
}
