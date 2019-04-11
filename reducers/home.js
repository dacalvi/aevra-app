let initialState = {
    userType: ''
}

const home = (state = initialState, action) => {
    switch (action.type) {
        case 'SET_USERTYPE_CLIENT':
            return { userType: 'cliente'};
            break;
        case 'SET_USERTYPE_PROFESIONAL':
            return { userType: 'profesional'};
            break;
        default:
            return state;
            break;
    }
    return state;
};

export default home