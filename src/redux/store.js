import { configureStore } from '@reduxjs/toolkit';
import axios from 'axios';
import {
  persistStore, persistReducer,
  FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER
} from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { BASE_URL } from '../Components/Common/constant';
// import { clearSession } from '../utilities';
import { rootReducer } from './slices';
// import logger from "react-logger"


// creating and persisting redux store
const persistConfig = { key: 'root', storage };

const persistedReducer = persistReducer(persistConfig, rootReducer)

export const store = configureStore({
  reducer: persistedReducer,

  // Restrict Redux Devtool in Production
  devTools: process.env.NODE_ENV !== "production",
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        // Ignore these action types
        ignoredActions: ['persist/PERSIST', FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
        // Ignore these field paths in all actions
        ignoredActionPaths: ['meta.arg', 'payload.timestamp'],
        // Ignore these paths in the state
        ignoredPaths: ['items.dates'],
      },
    }),

});

export const persistor = persistStore(store);

// ------------------------ axios interceptor request -------------------------
axios.interceptors.request.use((request) => {
 
  let accessToken = typeof window !== "undefined" ? window.localStorage.getItem("token") : null;

  // let accessToken = "eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsIng1dCI6IkxUNW9QMy1fMUVsTjdJYXRhQk9pS1pmMzh3QSIsImtpZCI6IkxUNW9QMy1fMUVsTjdJYXRhQk9pS1pmMzh3QSJ9.eyJuYmYiOjE2NjU3NTI1MjYsImV4cCI6MTY5Njg1NjUyNiwiaXNzIjoiaHR0cHM6Ly9saWZldGFiLm91dHNldGEuY29tIiwiY2xpZW50X2lkIjoibGlmZXRhYi5vdXRzZXRhLmNvbS5yZXNvdXJjZS1vd25lciIsInNjb3BlIjpbIm9wZW5pZCIsIm91dHNldGEiLCJwcm9maWxlIl0sInN1YiI6IkE5M3dlQUc5IiwiYXV0aF90aW1lIjoxNjY1NzUyNTI2LCJpZHAiOiJpZHNydiIsImVtYWlsIjoidmlhYW4yMDE0QGdtYWlsLmNvbSIsImZhbWlseV9uYW1lIjoiR2FyZyIsImdpdmVuX25hbWUiOiJWaWFhbiIsIm5hbWUiOiJWaWFhbiBHYXJnIiwibmFtZWlkIjoiQTkzd2VBRzkiLCJvdXRzZXRhOmFjY291bnRVaWQiOiJhbVJ4MDJaOSIsIm91dHNldGE6aXNQcmltYXJ5IjoiMSIsIm91dHNldGE6c3Vic2NyaXB0aW9uVWlkIjoibm1EUFBBUm0iLCJvdXRzZXRhOnBsYW5VaWQiOiJabU4zeXdRMiIsIm91dHNldGE6YWRkT25VaWRzIjpbXSwiYW1yIjpbInBhc3N3b3JkIl0sImF1ZCI6ImxpZmV0YWIub3V0c2V0YS5jb20iLCJpYXQiOjE2NjU3NTI1MjZ9.DqE9qkTRlmKOLMxQpxNQE5rmuz5t_2mJTg9v-23oTqKu88vQtBpztNniBsJk-yMNuSzABbeyijZsJGvKiv_3YyB_Oa8JjDjhKDgTO5pb8yfyIf18--4af6G7etjhxiTMpK5ZMOZ6W03DHDdapZ79HeRmBQFQCNflVncK7yDpTMwDYT-T_rhjs3ntK6Rw7nTIkzx96N0V4d5sfLoGe05xxobKx1e_DlirhhZhJDnUc_N83YToW1hbNxS5Fl6vII1NAtUhex2s2DTilvX3yftyO_Yd2sy0LdapkdJk-M3g6ZDQ0Or8Iz5GeJmgmZo2BjQ9bF2eoTyoy5gE0zGd4MrzhA"//typeof window !== "undefined" ? window.localStorage.getItem("token") : null;
//  let deviceToken = typeof window !== "undefined" ? device_token : null;
  let UTCOffset = new Date().getTimezoneOffset();
 
  // let UTCOffset = 330;

  // UTCOffset = (UTCOffset);
  request.headers.set('authorization', accessToken)
  request.headers.set('utcoffset' , UTCOffset)
  request.headers.set('language' , "en")
  // request.headers.common["authorization"] = "eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsIng1dCI6IkxUNW9QMy1fMUVsTjdJYXRhQk9pS1pmMzh3QSIsImtpZCI6IkxUNW9QMy1fMUVsTjdJYXRhQk9pS1pmMzh3QSJ9";
  // request.headers.common["utcoffset"] = UTCOffset;
  // request.headers.common["language"] = "en";
  request.baseURL = BASE_URL;
 
  return request;
},
  (error) => {
    return Promise.reject(error);
  }
);

// ------------------------ axios interceptor response -------------------------
axios.interceptors.response.use((response) => {
  return response;
},
  (error) => {
    switch (error.response?.status) {
      case 401:
        // clearSession();
        break;
      case 400:
        // toast.error(error.response.data.message);
        break;
      default:
        break;
      // toast.error('Something really went wrong, please try again');
    }
    return Promise.reject(error);
  }
);


