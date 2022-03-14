import { combineReducers } from "redux";
import { dataReducer } from "./getData";
const Reducers = combineReducers({
    counter:dataReducer
})

export default Reducers;