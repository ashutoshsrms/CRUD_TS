import { configureStore } from "@reduxjs/toolkit";
import PostReducer from "../redux/features/PostSlice";
import { useDispatch } from 'react-redux'

// export default configureStore({
//   reducer: {
//     app: PostReducer,
//   },
// });

const store = configureStore({
  reducer: PostReducer
})
export type RootState = ReturnType<typeof store.getState>

export type AppDispatch = typeof store.dispatch
export const useAppDispatch: () => AppDispatch = useDispatch // Export a hook that can be reused to resolve types

export default store