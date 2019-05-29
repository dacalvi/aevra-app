
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
import MiPerfilProfesional from '../screens/MiPerfilProfesional';
import PerfilProfesional from '../screens/PerfilProfesional';
import EnProcesoProfesional from '../screens/EnProcesoProfesional';
import EnProcesoCliente from '../screens/EnProcesoCliente';
import TrabajosFinalizados from '../screens/TrabajosFinalizados';
import Postulaciones from '../screens/Postulaciones';
import PerfilCliente from '../screens/PerfilCliente';
import MiPerfilCliente from '../screens/MiPerfilCliente';
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
import DescripcionTrabajoProfesionalReadOnly from '../screens/DescripcionTrabajoProfesionalReadOnly';
import DescripcionTrabajoUbicacion from '../screens/DescripcionTrabajoUbicacion';
import DescripcionTrabajoUbicacionReadOnly from '../screens/DescripcionTrabajoUbicacionReadOnly';
import Postular from '../screens/Postular';
import PostularGracias from '../screens/PostularGracias';
import FinalizarTrabajo from '../screens/FinalizarTrabajo';
import Chat from '../screens/Chat';
import ModificarPresupuesto from '../screens/ModificarPresupuesto';
import ElegirServicioFlete from '../screens/ElegirServicioFlete';
import ElegirServicioMascota from '../screens/ElegirServicioMascota';
import ElegirServicioProfesor from '../screens/ElegirServicioProfesor';
import DetalleDeuda from '../screens/DetalleDeuda';

//profesional autenticados stack
/*
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
*/

export default createAppContainer(createSwitchNavigator( {
  AuthLoading: AuthLoadingScreen,
  ProfesionalApp: createDrawerNavigator({
      PerfilProfesionalPrivadoStack: {navigationOptions: {drawerLabel: 'Mi perfil'}, screen: createStackNavigator({
        PerfilProfesional123: MiPerfilProfesional,
        
        DetalleDeuda: DetalleDeuda,
      },{initialRouteName: 'PerfilProfesional123'})},
      ProfesionalAppStack: {navigationOptions: {drawerLabel: 'Ofertas de trabajo'}, screen: createStackNavigator({
        OfertasTrabajo: OfertasTrabajo,
        PerfilProfesionalPrivado: MiPerfilProfesional,
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
          EnProcesoProfesional: EnProcesoProfesional,
          DescripcionTrabajoProfesionalReadOnly: DescripcionTrabajoProfesionalReadOnly,
          DescripcionTrabajoUbicacionReadOnly: DescripcionTrabajoUbicacionReadOnly,
          Chat: Chat,
          ModificarPresupuesto: ModificarPresupuesto
        },{initialRouteName: 'EnProcesoProfesional'})},
      TrabajosFinalizadosStack: {navigationOptions: {drawerLabel: 'Trabajos finalizados'}, screen: createStackNavigator({
          TrabajosFinalizados, TrabajosFinalizados
        },{initialRouteName: 'TrabajosFinalizados'})},
      PostulacionesStack: {navigationOptions: {drawerLabel: 'Postulaciones'}, screen: createStackNavigator({
          Postulaciones: Postulaciones,
          DescripcionTrabajoProfesional: DescripcionTrabajoProfesional,
          DescripcionTrabajoUbicacion: DescripcionTrabajoUbicacionReadOnly,
          DescripcionTrabajoUbicacionReadOnly: DescripcionTrabajoUbicacionReadOnly
        },{initialRouteName: 'Postulaciones'})},
      Logout: {screen: Logout, navigationOptions: {drawerLabel: 'Cerrar sesión'}},
    },{drawerPosition : 'right', drawerType : 'slide', drawerLabel: 'Profesional', initialRouteName: 'ProfesionalAppStack'}),
  ClienteApp: createDrawerNavigator({
      PerfilClienteStack: {navigationOptions: { drawerLabel: 'Mi perfil'}, screen: createStackNavigator({
        MiPerfilCliente1 : MiPerfilCliente
        },{initialRouteName: 'MiPerfilCliente1'})},
      ElegirServicio: {navigationOptions: {drawerLabel: 'Solicitar Servicio'}, screen: createStackNavigator({
        ElegirServicio: ElegirServicio,
        ElegirServicioMascota: ElegirServicioMascota,
        PerfilProfesionalPublico: PerfilProfesional,
        MiPerfilCliente: MiPerfilCliente,
        TrabajosSolicitadosCliente: TrabajosSolicitados,
        EnProcesoCliente: EnProcesoCliente,
        TrabajosFinalizadosCliente: TrabajosFinalizados,
        SolicitarServicio: SolicitarServicio,
        SolicitarServicio2: SolicitarServicio2,
        SolicitarServicio3: SolicitarServicio3,
        SolicitudServicioGracias: SolicitudServicioGracias,
        ElegirServicioFlete: ElegirServicioFlete,
        ElegirServicioProfesor: ElegirServicioProfesor,
        },{initialRouteName: 'ElegirServicio'})},
      TrabajosSolicitados: {navigationOptions: {drawerLabel: 'Trabajos Solicitados'}, screen: createStackNavigator({
          TrabajosSolicitadosCliente: TrabajosSolicitados,
          PerfilProfesionalPublico: PerfilProfesional
        },{
          initialRouteName: 'TrabajosSolicitadosCliente'
        })},
      EnProceso: {navigationOptions: {drawerLabel: 'Trabajos en proceso'}, screen: createStackNavigator({
          EnProcesoCliente: EnProcesoCliente,
          DescripcionTrabajoProfesionalReadOnly: DescripcionTrabajoProfesionalReadOnly,
          DescripcionTrabajoUbicacionReadOnly: DescripcionTrabajoUbicacionReadOnly,
          Chat: Chat,
          FinalizarTrabajo: FinalizarTrabajo
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

