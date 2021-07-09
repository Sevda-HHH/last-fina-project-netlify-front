import { applyMiddleware, createStore } from "redux";
import logger from 'redux-logger'
import thunk from 'redux-thunk'
import { reducers } from "./reducers";

const middlewares = applyMiddleware(logger, thunk)
export const store = createStore(reducers, middlewares)