import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import authReducer from "../features/auth/authSlice";
import propertyReducer from "../features/properties/propertySlice";

import { githubReducer } from "./github/github.slice";
import { githubApi } from "./github/github.api";

import categoryReducer from "../sections/categorySlite";
import postReducer from "../sections/postsSlite";

export const store = configureStore({
	reducer: {

		properties: propertyReducer,
		auth: authReducer,
		[githubApi.reducerPath]: githubApi.reducer,
		github: githubReducer,
		category: categoryReducer,
		post: postReducer,
	},
	middleware: (getDefaultMiddleware) => {
		return getDefaultMiddleware({
		  serializableCheck: false,
		});
	  },
});

setupListeners(store.dispatch);

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;