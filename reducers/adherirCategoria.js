let initialState = {
    adherirCategorias : {},
    AdherirLocation : {}

}
const adherirCategoria = (state = initialState, action) => {
    switch (action.type) {
        case 'SAVE_SELECTED_CATEGORIAS_PROFESIONAL':
            return { adherirCategorias: action.payload};
            break;
        default:
            return state;
            break;
    }
    return state;
};

export default adherirCategoria