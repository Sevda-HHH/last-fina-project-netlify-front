import { combineReducers } from "redux";
import { userReducer } from "./user";
import { contactReducer } from "./contact";
import { countryReducer } from "./country";
import { blogReducer } from "./blogs";
import { appoitmentReducer } from "./appointment";

export const reducers = combineReducers({ appoitmentReducer, userReducer, countryReducer, contactReducer, blogReducer })