import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import authReducer from "./reducer/authReducer";
import PostReducer from "./reducer/postReducer";
import UserReducer from "./reducer/userReducer";
import SingleReducer from "./reducer/singleReducer";

const persistConfig = {
  key: "root",
  storage,
};

const reducer = combineReducers({
  auth: authReducer,
  post: PostReducer,
  user: UserReducer,
  currUser: SingleReducer,
});

const middleware = [thunk];

const persistedReducer = persistReducer(persistConfig, reducer);
const store = createStore(
  persistedReducer,
  composeWithDevTools(applyMiddleware(...middleware))
);

const persistor = persistStore(store);

export { store, persistor };
