let initialState = {
    jwtToken : ''
}
const login = (state = initialState, action) => {
    switch (action.type) {
        case 'LOGIN':
            return { jwtToken: action.payload};
            break;
        default:
            return state;
            break;
    }
    return state;
};

export default login