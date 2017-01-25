import 'babel-polyfill';
import { createStore, applyMiddleware } from 'redux';
// 引入中间件
import thunkMiddleware from 'redux-thunk';
import createLogger from 'redux-logger';
import rootReducer from './reducers/reducers';
import { selectSubreddit, invalidateSubreddit, requestPosts, receivePosts, fetchPosts } from './actions/actions';

const loggerMiddleware = createLogger();
const store = createStore(rootReducer, applyMiddleware(
  thunkMiddleware,  // 允许我们 dispatch() 函数
  loggerMiddleware  // 一个很便捷的 middleware，用来打印action日志
));

store.dispatch(selectSubreddit('reactjs'));
store.dispatch(fetchPosts('reactjs')).then(() => console.log(store.getState()));


/*
let unsubscribe = store.subscribe(() => {
  console.log(store.getState());
});
*/
