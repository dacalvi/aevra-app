let initialState = {
    serviceRequestData : {},
    serviceRequestData2 : {},
    serviceRequestData3: {}

}
const serviceRequest = (state = initialState, action) => {
    switch (action.type) {
        case 'SAVE_SERVICE_REQUEST_DATA':
            return { serviceRequestData: action.payload};
            break;
        case 'SAVE_SERVICE_REQUEST_DATA2':
            return { 
                serviceRequestData: state.serviceRequestData,
                serviceRequestData2: action.payload,
            };
            break;
        case 'SAVE_SERVICE_REQUEST_DATA3':
            return {
                serviceRequestData: state.serviceRequestData,
                serviceRequestData2: state.serviceRequestData2,
                serviceRequestData3: action.payload
            };
            break;
        default:
            return state;
            break;
    }
    return state;
};

export default serviceRequest