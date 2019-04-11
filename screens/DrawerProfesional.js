import { createDrawerNavigator } from 'react-navigation';
import Components from '../screens/Components';
import OfertasTrabajo from '../screens/OfertasTrabajo';
import ElegirServicio from '../screens/ElegirServicio';

const DrawerProfesional = createDrawerNavigator({
    Components: {
        screen: Components,
        navigationOptions: {
            drawerLabel: 'Elegir Servicio',
        }
    },
    ElegirServicio: {
        screen: ElegirServicio,
        navigationOptions: {
            drawerLabel: 'Elegir Servicio',
        }
    },
    OfertasTrabajo: {
        screen: OfertasTrabajo,
        navigationOptions: {
        drawerLabel: 'Ofertas de Trabajo',
        },
    },
},{
    drawerPosition : 'right',
    drawerType : 'slide',
    drawerLabel: 'Notifications'
});

export default DrawerProfesional;
