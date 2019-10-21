import { FETCHING_DATA, FETCHING_DATA_SUCCESS, FETCHING_DATA_FAILURE } from "../constants"
import getDataApi from '../api';

export const getData = () => {
    return {
        type: FETCHING_DATA
    }
}


export const getDataSuccess = (newData, initialData = null) => {
    return {
        type: FETCHING_DATA_SUCCESS,
        newData,
        initialData
    }
}

export const getDataFailure = () => {
    return {
        type: FETCHING_DATA_FAILURE
    }
}

export const emptyDataStore = () => {
    return {
        type: 'EMPTY_DATA'
    }
}

export const fetchData = (type, filter, dateFilter, position) => {
    return (dispatch, getState) => {
        const state = getState();

        dispatch(getData())
        getDataApi(type, filter, dateFilter, position)
            .then(res => {
                console.log("RES", res)
                if (res !== false) {
                    console.log("entro")
                    if (state.dataReducer.data.length === 0) {
                        dispatch(getDataSuccess(res[1]))
                    } else {
                        dispatch(getDataSuccess(res[1], state.dataReducer.data))
                    }

                }

            })
            .catch((err) => console.log(9999, err))
    }
}

export const emptyData = () => {
    return (dispatch) => {
        dispatch(emptyDataStore())
    }
}