let initialState = {
    registrationData : {},
    registrationDataID: {},
    registrationDataLocation: {}
}
const register = (state = initialState, action) => {
    switch (action.type) {
        case 'SAVE_REGISTRATION_DATA_PROFESIONAL':

            return { 
                registrationData: action.payload,
                registrationDataID: state.registrationDataID,
                registrationDataLocation: state.registrationDataLocation,
            };
            break;
        case 'SAVE_REGISTRATION_DATA_ID_PROFESIONAL':
            return { 
                registrationDataID: action.payload,
                registrationData: state.registrationData,
                registrationDataLocation: state.registrationDataLocation,
            };
            break;
        case 'SAVE_REGISTRATION_DATA_LOCATION_PROFESIONAL':
            return { 
                registrationData: state.registrationData,
                registrationDataID: state.registrationDataID,
                registrationDataLocation: action.payload
            };
            break;
        case 'SAVE_REGISTRATION_DATA_PROFESIONAL_CLEAR':
            return { 
                registrationData: {},
                registrationDataID: {},
                registrationDataLocation: {}
            };
            break;
        default:
            return state;
            break;
    }
    return state;
};

export default register