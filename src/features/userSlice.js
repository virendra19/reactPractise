import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";


const initialState = {
    loading: false,
    error: null,
    userData: [],
    updateStoreData: {}
}


export const createUser = createAsyncThunk("createUser", async (data, { rejectWithValue }) => {

    // const postApi = await axios.post("https://65ae80dc1dfbae409a74fab0.mockapi.io/ApiForm", data)
    // try {
    //     const result = postApi.data
    //     return result
    // } catch (error) {
    //     console.log('error: ', error);
    //     return rejectWithValue(error)
    // }

    const postApi = await fetch("https://65ae80dc1dfbae409a74fab0.mockapi.io/ApiForm", {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
            "Content-type": "application/json"
        },
    })
    try {
        const result = await postApi.json()

        return result
    } catch (error) {
        return rejectWithValue(error)
    }
})



export const getUser = createAsyncThunk("readData", async (rejectWithValue) => {
    const getApi = await fetch("https://65ae80dc1dfbae409a74fab0.mockapi.io/ApiForm")
    try {
        const result = await getApi.json()
        return result
    } catch (error) {
        return rejectWithValue(error)
    }
})

export const deleteUser = createAsyncThunk("userDelete", async (id, rejectWithValue) => {
    try {
        const deleteApi = await axios.delete(`https://65ae80dc1dfbae409a74fab0.mockapi.io/ApiForm/${id}`)
        return id
    } catch (error) {
        rejectWithValue(error)

    }
})

export const updateUser = createAsyncThunk("userUpdate", async (inputVal, { rejectWithValue }) => {
    console.log('inputVal: ', inputVal);
    let id = inputVal?.id
    let fname = inputVal?.fname
    let email = inputVal?.email
    let pnumber = inputVal?.pnumber

    try {
        const updateApi = await fetch(`https://65ae80dc1dfbae409a74fab0.mockapi.io/ApiForm/${id}`, {
            method: "PUT",
            body: JSON.stringify({ fname, email, pnumber }),
            headers: {
                'Content-type': "application/json"
            }
        })

        return updateApi

    } catch (error) {
        rejectWithValue(error)

    }

})


export const userDetails = createSlice({
    name: "userDetails",
    initialState,
    reducers: {
        setUpdateStoreData: (state, action) => {
            state.updateStoreData = action.payload
        }
    },
    extraReducers(builder) {
        builder
            .addCase(createUser.pending, (state) => {
                state.loading = true
            })
            .addCase(createUser.fulfilled, (state, action) => {
                state.loading = false,
                    state.userData.push(action.payload)
            })
            .addCase(createUser.rejected, (state, action) => {
                state.loading = false,
                    state.userData = action.payload
            })
            .addCase(getUser.pending, (state) => {
                state.loading = true
            })
            .addCase(getUser.fulfilled, (state, action) => {
                state.loading = false
                state.userData = action.payload
            })
            .addCase(getUser.rejected, (state, action) => {
                state.loading = false
                state.userData = action.payload
            })
            .addCase(deleteUser.pending, (state) => {
                state.loading = true
            })
            .addCase(deleteUser.fulfilled, (state, action) => {
                state.loading = false
                let id = action.payload
                if (id) {
                    state.userData = state.userData.filter((item) => item.id !== id)
                }
            })
            .addCase(deleteUser.rejected, (state, action) => {
                state.loading = false
                state.userData = action.payload
            })
            .addCase(updateUser.pending, (state) => {
                state.loading = true
            })
            .addCase(updateUser.fulfilled, (state, action) => {
                console.log('action: ', action);
                state.loading = false
                state.userData = state.userData.map((item) => item?.id === action.payload.id ? action.payload : item)

            })
            .addCase(updateUser.rejected, (state, action) => {
                state.loading = false
                state.userData = action.payload
            })
    }
})

export const { setUpdateStoreData } = userDetails.actions
export default userDetails.reducer;