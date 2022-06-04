const GET_ADMINS = '/explore-page/getAdmins'

const addAllAdmins = (admins) => {
    return {
        type: GET_ADMINS,
        payload: admins
    }
}


export const getAllAdminsThunk = () => async (dispatch) => {
    const response = await fetch('/api/users/admins')
    const admins = await response.json()
    dispatch(addAllAdmins(admins)) //admins is an obj
}

let initialState = {}


export default function adminsReducer(state=initialState, action){
    let newState;
    switch(action.type){
        case GET_ADMINS:
            newState = {...state}
            newState['admins'] = Object.values(action.payload)
            return newState
        default:
            return state;
    }
}
