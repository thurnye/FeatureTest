import  { configureStore} from '@reduxjs/toolkit'
import userReducer from './userSlice'




const store = configureStore({
    reducer: {
        userLog: userReducer,
    }
})



export default store;