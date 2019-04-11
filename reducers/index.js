import { combineReducers } from 'redux';
import login from './login';
import home from './home';
import register from './register';
import serviceRequest from './serviceRequest';
import adherirCategoria from './adherirCategoria'

export default combineReducers({
    login,
    home,
    register,
    serviceRequest,
    adherirCategoria
});

