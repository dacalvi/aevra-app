import React from "react";
import  LogoTitle  from './LogoTitle';
import { 
  Dimensions, 
  StyleSheet, 
  View, 
  ScrollView, 
  KeyboardAvoidingView, 
  ImageEditor, 
  ImageStore,
  Text,
  TouchableOpacity,
  Alert
} from 'react-native';
import { Button, Snackbar  } from 'react-native-material-ui';
import RestApi from '../common/RestApi';
import ATextinputWithIcon from '../components/ATextinputWithIcon';
import Tilde from '../components/Tilde';
import IconHeader from '../components/IconHeader';
import validate from '../constants/validate_wrapper';
import { connect } from 'react-redux';


class RegistroProfesional2 extends React.Component {

    constructor(props){
        super(props);
        console.log("Lo que vino del store es:", props.register);
        this.state = {
            calle: props.register.registrationDataLocation.calle,
            numerocasa: props.register.registrationDataLocation.numerocasa,
            aceptatarjeta: props.register.registrationDataLocation.aceptatarjeta,
            depto: props.register.registrationDataLocation.depto,            
            terminos: props.register.registrationDataLocation.terminos,
            calleError: '',
            numerocasaError: '',
            terminosError: '',
            deptoError: '',
            localidad: props.register.registrationDataLocation.localidad,
            localidadError: '',
            btnEnviarDisabled: false,
            btnEnviarText: 'REGISTRARME'
        }
    }

    static navigationOptions = {
        headerTitle: <LogoTitle />,
        headerRight: <Text></Text>,
        headerStyle: {
            backgroundColor: '#00AAB4',
        },
        headerTintColor: '#fff',
        headerTitleStyle: {flex: 1, textAlign: 'center'}
    };


    save(){

      let registrationData = {
        "calle": this.state.calle,
        "numerocasa": this.state.numerocasa,
        "aceptatarjeta": this.state.aceptatarjeta,
        "depto": this.state.depto,
        "terminos": this.state.terminos,
        "localidad": this.state.localidad
      }
      console.log(registrationData);
      this.props.saveRegistrationData(registrationData);
    }

    componentDidMount(){
      console.log("Montando componente, cargando estado previo...", this.props.register.registrationDataLocation);
      this.setState(this.props.register.registrationDataLocation);
      
    }

    componentWillUnmount(){
      console.log("Desmontando componente, guardando estado...");
      this.save();
    }

    resizeImage(image, width, height){
      return new Promise((resolve, reject)=>{
        let cropConfig = {
          offset: {x:0,y:0},
          size: {width: image.width, height: image.height},
          displaySize: {width: width, height: height},
          resizeMode: 'stretch'
        };
        ImageEditor.cropImage(image.uri, cropConfig, (imageURI) => {
          ImageStore.getBase64ForTag(imageURI, (base64Data) => {
              resolve(base64Data);
          }, (reason) => {
            console.error(reason);
            reject(reason);
          });
        }, (reason) => {
          console.error(reason);
          reject(reason);
        });
      });
    }

    async resizeImagesAndSend(dataset){
      let ff = await this.resizeImage(dataset.fotofrente, 500, 500);
      let fdf = await this.resizeImage(dataset.fotodnifrente, 500, 500);
      let fdd = await this.resizeImage(dataset.fotodnidorso, 500, 500);
      dataset.fotofrente = ff;
      dataset.fotodnifrente = fdf;
      dataset.fotodnidorso = fdd;
      //console.log(dataset);
      let api = new RestApi();
      api.registerProfesional(dataset)
      .then((response)=>{
        this.props.navigation.navigate('GraciasRegistroProfesional');
      })
      .catch((error)=>{
        alert(error.error);
       //console.logog(error);
      });
    }

    btnRegistrarmeClick(){
      const calleError = validate('calle', this.state.calle);
      const numerocasaError = validate('numerocasa', this.state.numerocasa);
      const terminosError = validate('terminos', this.state.terminos);
      const localidadError = validate('localidad', this.state.localidad);
    
      this.setState({
        calleError: calleError,
        numerocasaError: numerocasaError,
        terminosError: terminosError,
        localidadError: localidadError
      })


      if (!calleError && !numerocasaError && !terminosError && !localidadError) {
        this.setState({
          btnEnviarDisabled: true,
          btnEnviarText: 'REGISTRANDO...'
        });
        let data = {calle, numerocasa, depto, aceptatarjeta, terminos, localidad } = this.state;
        this.props.saveRegistrationData(data);
        let registrationData = { apellido, email, nombre, password, telefono, localidad } = this.props.register.registrationData;
        let registrationDataID = { dni: dni_numero, fecha_nacimiento: fechanacimiento, nacionalidad: paisnacimiento, dni_frente_persona:fotofrente, dni_frente:fotodnifrente, dni_dorso:fotodnidorso} = this.props.register.registrationDataID;
        
        let { aceptatarjeta: acepta_tarjeta } = this.state;
        acepta_tarjeta ? acepta_tarjeta = 1 : acepta_tarjeta = 0;
        let registrationDataLocation = { calle, depto, numerocasa: numero } = this.state;
        let registrationCompleteSet = {
          acepta_tarjeta,
          ...registrationData, 
          ...registrationDataID, 
          ...registrationDataLocation};

        
        
        this.resizeImagesAndSend(registrationCompleteSet);
        this.props.saveRegistrationDataClear();
        this.setState({
          btnEnviarDisabled: false,
          btnEnviarText: 'REGISTRARME'
        });
      }
    }

    render() {
        let { terminos } = this.state;
        return (
          <KeyboardAvoidingView 
            style={{ flex: 1, backgroundColor: '#fff' }} 
            behavior="position" 
            keyboardVerticalOffset={-200}
            enabled>  
            <ScrollView>
              <View style={{margin: 20, width: '80%'}} >
                <IconHeader 
                    source={require('../assets/images/icon-user-black.png')}
                    topTitle="Registro"
                    title="Prestador"
                    style={{marginBottom: 20}} />

                <View>
                  <ATextinputWithIcon
                    value={this.state.calle}
                    onChangeText={(calle)=> this.setState({calle})} 
                    iconSource={require('../assets/images/icon-user.png')}
                    placeholder="CALLE"
                    error={this.state.calleError}/>
                </View>
                <View style={{flexDirection: 'row' }} >
                  <View style={{ width: `50%` }}>
                    <ATextinputWithIcon
                      value={this.state.numerocasa}
                      onChangeText={(numerocasa)=> this.setState({numerocasa})} 
                      iconSource={require('../assets/images/icon-user.png')}
                      placeholder="NUMERO"
                      error={this.state.numerocasaError}/>
                  </View>
                  <View style={{ width: `50%` }}>
                  <ATextinputWithIcon
                    value={this.state.depto}
                    onChangeText={(depto)=> this.setState({depto})} 
                    iconSource={require('../assets/images/icon-user.png')}
                    placeholder="DEPTO"
                    error={this.state.deptoError}/>
                  </View>
                </View>
                <View>
                  <ATextinputWithIcon
                    value={this.state.localidad}
                    onChangeText={(localidad)=> this.setState({localidad})} 
                    iconSource={require('../assets/images/icon-user.png')}
                    placeholder="LOCALIDAD"
                    error={this.state.localidadError}/>
                </View>
                <View>
                  <Tilde
                    value={this.state.aceptatarjeta}
                    label="Acepta pagos con tarjeta?" 
                    checked={this.state.aceptatarjeta} 
                    onPress={(aceptatarjeta) => { 
                      this.setState({ aceptatarjeta }) 
                    }} />
                  <Tilde 
                    label="Acepta terminos y condiciones de Aevra?" 
                    checked={terminos}
                    error={this.state.terminosError}
                    onPress={(terminos) => { 
                      this.setState({ terminos }) 
                      }}/>
                      <TouchableOpacity style={{marginTop: 50}} onPress={()=>{
                        Alert.alert("Terminos y condiciones", `
                        Nulla facilisi. Sed tincidunt lacus rutrum diam pulvinar, tempor hendrerit quam maximus. Etiam et nisl vel erat eleifend lobortis. Sed porta vitae mi id porta. Fusce eu dictum metus, in pulvinar leo. Proin tincidunt sit amet libero non varius. Donec sed odio dignissim, porttitor neque placerat, malesuada eros.

Suspendisse vitae laoreet diam, nec gravida turpis. Aenean porta nulla vel dui eleifend, sed iaculis velit convallis. Praesent turpis mauris, fermentum et hendrerit nec, ultrices at diam. Vestibulum lacinia, velit sit amet ullamcorper cursus, eros mi blandit ligula, at eleifend dui leo sed ex. Pellentesque rutrum ac neque ac tristique. Interdum et malesuada fames ac ante ipsum primis in faucibus. Nunc rhoncus, erat non placerat bibendum, arcu erat hendrerit ante, vel aliquet leo sem quis nisl. Vestibulum porttitor massa sit amet tellus tempus luctus. Vivamus lectus nibh, egestas id nisl et, consectetur molestie neque. Maecenas commodo orci nec urna lacinia dictum.

Cras nec varius libero. Nulla interdum porttitor sem, at imperdiet mi porta a. Proin maximus tortor et sapien tempus congue. Pellentesque mattis mollis arcu, vitae elementum ex tempor eu. Phasellus aliquet nisl volutpat, facilisis enim et, pulvinar quam. Donec ac nulla ac neque interdum tempor in et turpis. Praesent maximus mattis nisi sit amet ornare.

Sed at posuere nibh. In nec interdum lacus. Sed interdum sit amet ex nec volutpat. Sed eu eros sed velit tincidunt tincidunt eget ac ante. Phasellus in orci quis enim iaculis bibendum. Suspendisse sapien dolor, ullamcorper sed viverra a, fringilla ut quam. In auctor, nunc ut cursus aliquet, leo magna placerat lacus, at egestas orci tellus nec mi.

Aliquam fringilla ultricies mauris, nec condimentum diam semper nec. Phasellus mollis ultricies eros. Mauris id tellus magna. In hac habitasse platea dictumst. Proin consequat tristique arcu nec vestibulum. Phasellus rhoncus id odio a placerat. Aliquam eleifend fermentum pulvinar. Vestibulum vulputate quam eget leo venenatis, id accumsan tortor fringilla. Aliquam id congue enim. Cras et placerat est. Nullam rutrum, tellus eu aliquam venenatis, odio odio facilisis tellus, non dictum mi nibh sed mi. Fusce aliquam congue orci id efficitur.

Nulla molestie a metus ut ullamcorper. Mauris quis elit vel nisl tristique ultrices eget ut nisi. Praesent id lacus commodo, consequat nisi sed, dapibus tellus. In eu enim sollicitudin nulla blandit ullamcorper. Aliquam commodo libero finibus elit vulputate pretium. Nunc nisl nisl, placerat tristique consequat quis, posuere in lacus. Sed non pellentesque quam, eu vehicula mauris. Morbi velit leo, sodales vitae ex et, hendrerit malesuada lacus. Duis tincidunt, sem ac porttitor bibendum, tortor magna efficitur metus, eget tristique arcu dui ut nisi. Nam ut metus lacus. Pellentesque in lectus eu libero imperdiet auctor ac semper lacus.

Pellentesque in lorem et enim pretium porta sit amet quis quam. Nullam feugiat tellus ornare, semper tortor at, accumsan odio. Mauris consequat tortor vel enim imperdiet, eu suscipit urna blandit. Ut nec felis lectus. Maecenas laoreet sapien et orci suscipit dapibus sed eget lacus. Aliquam ornare, lacus eu facilisis faucibus, neque nisi ultricies dui, facilisis cursus augue libero sodales purus. Etiam in turpis accumsan, ullamcorper sapien nec, egestas nisi. Nunc hendrerit lorem a augue fermentum, nec volutpat tortor lacinia. Mauris molestie vitae lectus ut tristique. Praesent quis sodales tellus. Nunc a ex eget justo convallis facilisis. Aenean non dui volutpat, consequat erat id, porttitor elit. Pellentesque nec maximus elit. Aenean placerat augue et magna dictum sollicitudin.

Aliquam felis orci, malesuada vel ex id, blandit rhoncus nisi. Nullam pulvinar, neque eget porta posuere, lorem nibh pharetra nisi, quis efficitur nisl diam ac sapien. In hendrerit sed lorem a fringilla. Praesent non neque laoreet, lobortis tortor et, finibus tortor. Phasellus eu posuere est, et imperdiet leo. Proin eget tellus congue, elementum lorem at, ornare nibh. Quisque eu nulla sit amet metus ullamcorper tempor at vulputate sapien. In tincidunt ipsum a urna feugiat fermentum. Vivamus vitae dignissim ante. Nunc turpis ex, mattis nec ipsum ac, sagittis suscipit velit.

Suspendisse gravida id dui non rhoncus. Quisque urna elit, volutpat eu facilisis a, pellentesque eget felis. Aenean quis odio lobortis, ornare justo et, luctus tellus. Proin eget lorem placerat, ornare risus mollis, egestas sapien. Sed ut faucibus est. Nunc pellentesque libero in est lacinia dapibus. Etiam iaculis diam lectus, eget commodo neque tempus vitae. Suspendisse id consectetur nibh. Sed imperdiet justo justo, nec porta libero placerat a. Nam gravida neque tellus, semper pharetra nulla vestibulum sit amet. Etiam dictum varius euismod. Curabitur fringilla commodo est et varius. Cras vel dui vulputate, gravida diam in, viverra sem. Praesent libero massa, hendrerit a viverra nec, viverra a felis.

Curabitur eu bibendum enim, a aliquam dui. Ut volutpat, odio vel vestibulum scelerisque, velit dui ullamcorper eros, semper cursus ante sem et lorem. Cras elementum pellentesque enim, sit amet sodales ligula. Aenean ac aliquam quam, nec aliquam nulla. In hac habitasse platea dictumst. Ut urna risus, lacinia et placerat non, convallis sit amet orci. Sed viverra orci dictum, porta tellus nec, ultrices sem. Aliquam bibendum turpis a suscipit finibus. Mauris ultrices metus turpis, a iaculis nulla lobortis eget. Nulla a blandit mauris. Nam quis risus quis tortor facilisis congue non et eros. Nullam augue odio, sodales sed pharetra eu, cursus eget arcu. Nullam rhoncus est eros, vel varius tortor scelerisque eu. Ut hendrerit velit non magna luctus, a efficitur neque cursus. Suspendisse molestie eleifend risus, sit amet pulvinar lacus sodales vitae.
                        `, [
    {text: 'Aceptar terminos', onPress: () => {this.setState({terminos: true})}}]);
                      }}>
                        <Text style={{
                          textDecorationLine: 'underline', 
                          color: 'blue',
                          marginLeft: 45,
                          
                          }}>Ver terminos y condiciones de AEVRA</Text>
                      </TouchableOpacity>
                </View>


              </View>
                <View style={{flexDirection: `row`,justifyContent: `center`}}>
                  <Button raised primary
                    disabled={this.state.btnEnviarDisabled}
                    text={this.state.btnEnviarText}
                    text="REGISTRARME" 
                    style={{color: 'white',backgroundColor: '#00AAB4', borderRadius: 30}} 
                    onPress={() => { this.btnRegistrarmeClick();}}/>
                </View>

            </ScrollView>
      
          </KeyboardAvoidingView>
          
        );
      }

}

function mapStateToProps(state){
  return {
    register : state.register
  }
}

function mapDispatchToProps(dispatch){
  return {
    saveRegistrationData : (registrationData) => dispatch({type: 'SAVE_REGISTRATION_DATA_LOCATION_PROFESIONAL', payload: registrationData}),
    saveRegistrationDataClear : () => dispatch({type: 'SAVE_REGISTRATION_DATA_PROFESIONAL_CLEAR', payload: {}})
  }
}


export default connect(mapStateToProps, mapDispatchToProps)(RegistroProfesional2);

const dimensions = Dimensions.get('window');
const imageHeight = dimensions.height / 1;
const imageWidth = dimensions.width;
  
const styles = StyleSheet.create({
  botonAevra: {
    color: 'white',
    backgroundColor: '#00AAB4', 
    borderRadius: 30
  },
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 0
  },
  developmentModeText: {
    marginBottom: 20,
    color: 'rgba(0,0,0,0.4)',
    fontSize: 14,
    lineHeight: 19,
    textAlign: 'center',
  },
  contentContainer: {
    paddingTop: 10,
  },
  welcomeContainer: {
    alignItems: 'center',
    marginTop: -10,
    marginBottom: 20,
  }
  
});