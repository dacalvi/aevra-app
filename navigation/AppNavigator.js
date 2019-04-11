
import { createAppContainer, createStackNavigator, createSwitchNavigator, createDrawerNavigator } from 'react-navigation';
import HomeScreen from '../screens/HomeScreen';
import LoginProfesional from '../screens/LoginProfesional';
import LoginCliente from '../screens/LoginCliente';
import RegistroCliente from '../screens/RegistroCliente';
import OlvideContrasenaCliente from '../screens/OlvideContrasenaCliente';
import RegistroProfesional from '../screens/RegistroProfesional';
import RegistroProfesional1 from '../screens/RegistroProfesional1';
import RegistroProfesional2 from '../screens/RegistroProfesional2';
import OlvideContrasenaProfesional from '../screens/OlvideContrasenaProfesional';
import GraciasRegistroCliente from '../screens/GraciasRegistroCliente';
import GraciasRegistroProfesional from '../screens/GraciasRegistroProfesional';
import AuthLoadingScreen from '../screens/AuthLoadingScreen';
import OfertasTrabajo from '../screens/OfertasTrabajo';
import PerfilProfesional from '../screens/PerfilProfesional';
import EnProcesoProfesional from '../screens/EnProcesoProfesional';
import EnProcesoCliente from '../screens/EnProcesoCliente';
import TrabajosFinalizados from '../screens/TrabajosFinalizados';
import Postulaciones from '../screens/Postulaciones';
import PerfilCliente from '../screens/PerfilCliente';
import TrabajosSolicitados from '../screens/TrabajosSolicitados';
import Logout from '../screens/Logout';
import ElegirServicio from '../screens/ElegirServicio';
import SolicitarServicio from '../screens/SolicitarServicio';
import SolicitarServicio2 from '../screens/SolicitarServicio2';
import SolicitarServicio3 from '../screens/SolicitarServicio3';
import SolicitudServicioGracias from '../screens/SolicitudServicioGracias';
import AdherirCategoriaProfesional from '../screens/AdherirCategoriaProfesional';
import RegistroProfesionalValidado from '../screens/RegistroProfesionalValidado';
import DescripcionTrabajoProfesional from '../screens/DescripcionTrabajoProfesional';
import DescripcionTrabajoUbicacion from '../screens/DescripcionTrabajoUbicacion';
import DescripcionTrabajoUbicacionReadOnly from '../screens/DescripcionTrabajoUbicacionReadOnly';
import Postular from '../screens/Postular';
import PostularGracias from '../screens/PostularGracias';

//profesional autenticados stack
const ProfesionalAppStack = createStackNavigator({
  OfertasTrabajo: OfertasTrabajo,
  PerfilProfesionalPrivado: PerfilProfesional,
  EnProcesoProfesional: EnProcesoProfesional,
  TrabajosFinalizados: TrabajosFinalizados,
  Postulaciones: Postulaciones,
  AdherirCategoriaProfesional: AdherirCategoriaProfesional,
  RegistroProfesionalValidado: RegistroProfesionalValidado,
  DescripcionTrabajoProfesional: DescripcionTrabajoProfesional,
  DescripcionTrabajoUbicacion: DescripcionTrabajoUbicacion,
  Postular: Postular,
  PostularGracias: PostularGracias
},{initialRouteName: 'OfertasTrabajo'});


export default createAppContainer(createSwitchNavigator( {
  AuthLoading: AuthLoadingScreen,
  ProfesionalApp: createDrawerNavigator({
      PerfilProfesionalPrivadoStack: {navigationOptions: {drawerLabel: 'Mi perfil'}, screen: createStackNavigator({
        PerfilProfesional123: PerfilProfesional
      },{initialRouteName: 'PerfilProfesional123'})},
      ProfesionalAppStack: {navigationOptions: {drawerLabel: 'Ofertas de trabajo'}, screen: createStackNavigator({
        OfertasTrabajo: OfertasTrabajo,
        PerfilProfesionalPrivado: PerfilProfesional,
        EnProcesoProfesional: EnProcesoProfesional,
        TrabajosFinalizados: TrabajosFinalizados,
        Postulaciones: Postulaciones,
        AdherirCategoriaProfesional: AdherirCategoriaProfesional,
        RegistroProfesionalValidado: RegistroProfesionalValidado,
        DescripcionTrabajoProfesional: DescripcionTrabajoProfesional,
        DescripcionTrabajoUbicacion: DescripcionTrabajoUbicacion,
        DescripcionTrabajoUbicacionReadOnly: DescripcionTrabajoUbicacionReadOnly,
        Postular: Postular,
        PostularGracias: PostularGracias
      },{initialRouteName: 'OfertasTrabajo'})},
      EnProceso: {navigationOptions: {drawerLabel: 'En proceso'}, screen: createStackNavigator({
          EnProcesoProfesional: EnProcesoProfesional
        },{initialRouteName: 'EnProcesoProfesional'})},
      TrabajosFinalizadosStack: {navigationOptions: {drawerLabel: 'Trabajos finalizados'}, screen: createStackNavigator({
          TrabajosFinalizados, TrabajosFinalizados
        },{initialRouteName: 'TrabajosFinalizados'})},
      PostulacionesStack: {navigationOptions: {drawerLabel: 'Postulaciones'}, screen: createStackNavigator({
          Postulaciones: Postulaciones,
          DescripcionTrabajoProfesional: DescripcionTrabajoProfesional,
          DescripcionTrabajoUbicacion: DescripcionTrabajoUbicacionReadOnly,
        },{initialRouteName: 'Postulaciones'})},
      Logout: {screen: Logout, navigationOptions: {drawerLabel: 'Cerrar sesión'}},
    },{drawerPosition : 'right', drawerType : 'slide', drawerLabel: 'Profesional', initialRouteName: 'ProfesionalAppStack'}),
  ClienteApp: createDrawerNavigator({
      PerfilClienteStack: {navigationOptions: { drawerLabel: 'Mi perfil'}, screen: createStackNavigator({
        PerfilCliente : PerfilCliente
        },{initialRouteName: 'PerfilCliente'})},
      ElegirServicio: {navigationOptions: {drawerLabel: 'Solicitar Servicio'}, screen: createStackNavigator({
        ElegirServicio: ElegirServicio,
        PerfilProfesionalPublico: PerfilProfesional,
        PerfilCliente: PerfilCliente,
        TrabajosSolicitadosCliente: TrabajosSolicitados,
        EnProcesoCliente: EnProcesoCliente,
        TrabajosFinalizadosCliente: TrabajosFinalizados,
        SolicitarServicio: SolicitarServicio,
        SolicitarServicio2: SolicitarServicio2,
        SolicitarServicio3: SolicitarServicio3,
        SolicitudServicioGracias: SolicitudServicioGracias
        },{initialRouteName: 'ElegirServicio'})},
      TrabajosSolicitados: {navigationOptions: {drawerLabel: 'Trabajos Solicitados'}, screen: createStackNavigator({
          TrabajosSolicitadosCliente: TrabajosSolicitados,
          PerfilProfesionalPublico: PerfilProfesional
        },{
          initialRouteName: 'TrabajosSolicitadosCliente'
        })},
      EnProceso: {navigationOptions: {drawerLabel: 'Trabajos en proceso'}, screen: createStackNavigator({
          EnProcesoCliente: EnProcesoCliente
        },{
          initialRouteName: 'EnProcesoCliente'
        })},
      TrabajosFinalizadosStack: {navigationOptions: {drawerLabel: 'Trabajos finalizados'}, screen: createStackNavigator({
          TrabajosFinalizados : TrabajosFinalizados
        },{initialRouteName: 'TrabajosFinalizados'})},
      Logout: {screen: Logout, navigationOptions: {drawerLabel: 'Cerrar sesión'}},
      },{drawerPosition : 'right', drawerType : 'slide', drawerLabel: 'Profesional', initialRouteName: 'ElegirServicio'}),
  Auth: createStackNavigator({ 
      HomeScreen: {screen: HomeScreen,headerMode: 'none',navigationOptions: { header: null}},
      LoginProfesional: {screen:  LoginProfesional},
      LoginCliente: LoginCliente,
      RegistroCliente: RegistroCliente,
      OlvideContrasenaCliente: OlvideContrasenaCliente,
      RegistroProfesional: RegistroProfesional,
      RegistroProfesional1: RegistroProfesional1,
      RegistroProfesional2: RegistroProfesional2,
      OlvideContrasenaProfesional: OlvideContrasenaProfesional,
      GraciasRegistroCliente: GraciasRegistroCliente,
      GraciasRegistroProfesional: GraciasRegistroProfesional
    },{
      initialRouteName: 'HomeScreen',
    })
},{
  initialRouteName: 'AuthLoading'
  //initialRouteName: 'temp'
}));

