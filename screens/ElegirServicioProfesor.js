import React from 'react';
import { connect } from 'react-redux';
import  LogoTitle  from './LogoTitle';
import styles from '../constants/Styles';
import OpenDrawerProfesional from '../components/OpenDrawerProfesional';
import RestApi from '../common/RestApi';
import { isSignedIn } from '../common/auth';
import validate from '../constants/validate_wrapper';
import { Image, View, ScrollView, Text, KeyboardAvoidingView, Picker, TextInput } from 'react-native';
import { Button, Snackbar  } from 'react-native-material-ui';
import IconHeaderAndTopTitle  from '../components/IconHeaderAndTopTitle';
import MultilineText from '../components/MultilineText';
import {MultiImagePicker} from '../components/MultiImagePicker';
import GroupTitle from '../components/GroupTitle';
import Tilde from '../components/Tilde';
import profesores_categorias_list  from '../constants/profesores_categorias_list';
import profesores_nivel_list  from '../constants/profesores_nivel_list';

class ElegirServicioProfesor extends React.Component {
  
  static navigationOptions = {
    headerTitle: <LogoTitle />,
    headerRight: <OpenDrawerProfesional/>,
    headerStyle: {
      backgroundColor: '#00AAB4',
    },
    headerTintColor: '#fff',
    headerTitleStyle: {flex: 1, textAlign: 'center'}
  };
  
  constructor(){
    super();
  
    this.state = {
        isVisible: false, //Snackbar visible
        errorMsg: '', //Error en snackbar
        materia: '',
        nivel: '',
        descripcion: '',
        horas: '1',
        a_domicilio: '',
        observaciones: '',
        materias_list: profesores_categorias_list
    }
    
    //Autenticado
    isSignedIn().then(()=>{}).catch(()=>{ this.props.navigation.navigate('Auth') });
  }

  filtrarMaterias(){
    if(this.state.nivel !== ''){
      let materiasFiltradas = profesores_categorias_list.filter(materia => materia.startsWith(this.state.nivel));
      console.log(materiasFiltradas);
      this.setState({materias_list: materiasFiltradas});
    }else{
      this.setState({materias_list: profesores_categorias_list})
    }
  }

  btnContinuarClick(){
    
    const descripcionError = validate('profesor_descripcion', this.state.descripcion);
    const materiasError = validate('materia', this.state.categoria);
    const nivelError = validate('nivel', this.state.nivel);
    const horasError = validate('profesor_horas', this.state.horas);
    
    
    this.setState({
      descripcionError: descripcionError,
      materiasError: materiasError,
      horasError: horasError,
      nivelError: nivelError,
      categoria: '',
      nivel: '',
      errorMsg: ''
    })

    if(!descripcionError && !materiasError && !nivelError && !horasError){
      //Save to store
      let serviceRequestData = {
        profesor_categoria: this.state.categoria,
        profesor_nivel: this.state.nivel,
        descripcion: this.state.descripcion,
        observaciones: this.state.observaciones,
        profesor_a_domicilio: this.state.a_domicilio,
        profesor_horas: this.state.horas,
      };
      this.props.saveSolicitudData(serviceRequestData);
      this.props.navigation.navigate('SolicitarServicio2', this.props.navigation.state.params);
    }else{
        this.setState({
          ...this.state,
          isVisible: true,
          errorMsg: 'Falta completar algunos campos'
        })
        //console.log(this.state);
    }
  }

  render() {
    const {isVisible, materias_list} = this.state
    return (

      <KeyboardAvoidingView 
            style={{ flex: 1, backgroundColor: '#fff' }} 
            behavior="position" 
            keyboardVerticalOffset={-200}
            enabled>  
        <ScrollView>
          <View style={{marginleft: 20, marginRight:20, marginTop:20, paddingLeft: 10, paddingRight: 10}} >
            <IconHeaderAndTopTitle 
                topTitle="Servicio solicitado" 
                title={this.props.navigation.getParam('nombre')}
                source={this.props.navigation.getParam('imagen')}
                />

                <View style={{ 
                  borderBottomColor: '#CCCCCC', 
                  borderBottomWidth: 1, 
                  marginBottom: 10, 
                  marginTop: 10,
                  marginLeft: 10
                  }}>
                  <Text style={{width: '80%', fontWeight: 'bold'}}>Nivel</Text>
                  <Picker 
                      mode="dropdown" 
                      selectedValue={this.state.nivel}
                      onValueChange={(nivel) =>{
                          this.setState({nivel}, ()=>{
                            this.filtrarMaterias();
                            console.log(this.state)
                            })
                        }
                      }
                      >
                      <Picker.Item label="Seleccione un nivel" value="" key={0}/>
                      {Object.keys(profesores_nivel_list).map((key) => {
                          return (<Picker.Item label={profesores_nivel_list[key]} value={profesores_nivel_list[key]} key={key}/>) //if you have a bunch of keys value pair
                      })}
                  </Picker>
                </View>
                { this.state.nivelError !== '' ? <Text style={{color: 'red', marginLeft: 10}}>{this.state.nivelError}</Text> : <Text> </Text> }

                <View style={{ 
                  borderBottomColor: '#CCCCCC', 
                  borderBottomWidth: 1, 
                  marginBottom: 10, 
                  marginTop: 10,
                  marginLeft: 10
                  }}>
                  <Text style={{width: '80%', fontWeight: 'bold'}}>Materia</Text>
                  <Picker 
                      mode="dropdown" 
                      selectedValue={this.state.categoria}
                      onValueChange={(categoria) =>{
                              this.setState({categoria}, ()=>{console.log(this.state)})
                          }
                      }
                      >
                      <Picker.Item label="Seleccione una materia" value="" key={0}/>
                      {materias_list.map((value, i) => {
                          return (<Picker.Item label={value} value={value} key={i}/>) //if you have a bunch of keys value pair
                      })}
                  </Picker>
                </View>
                { this.state.materiasError !== '' ? <Text style={{color: 'red', marginLeft: 10}}>{this.state.materiasError}</Text> : <Text> </Text> }

                <View style={{
                flexDirection: `row`,
                justifyContent: `flex-start`, 
                marginBottom: 5,
                marginLeft: 10,
                paddingTop: 10,
                }}> 
                    <Text style={{width: '80%', fontWeight: 'bold'}}>Cantidad de Horas</Text>
                    <TextInput 
                        placeholderTextColor={'rgba(114, 114, 114, 0.32)'}
                        placeholder=''
                        value={this.state.horas}
                        style={{borderBottomWidth: 1, width: '20%', borderBottomColor: 'rgba(124, 124, 124, 1)'}}
                        keyboardType='number-pad'
                        onChangeText={ (horas) => {
                            this.setState({horas})
                        }}/>
                </View>
                { this.state.horasError !== '' ? <Text style={{color: 'red', marginLeft: 10}}>{this.state.horasError}</Text> : <Text> </Text> }

                <Tilde 
              label="¿Puede trasladarse al domicilio del profesor?"
              checked={this.state.a_domicilio}
              onPress={(checked) => {
                this.setState({a_domicilio: checked});
              }}
              />

            <MultilineText 
                label="Descripcion los temas a capacitar"
                placeholder="Cuanto mejor describa el trabajo mejor podremos orientar su servicio"
                onChangeText={(text)=>{ this.setState({descripcion: text}) }}
                error={this.state.descripcionError}
                />

            
            

            
            
            
            <MultilineText 
                label="Observaciones"
                placeholder=""
                onChangeText={(text)=>{ 
                    this.setState({observaciones: text});
                    }}/>

              <View style={{flexDirection: `row`,justifyContent: `center`, marginBottom: 40}}>      
                <Button raised primary text="CONTINUAR" style={styles.botonAevra} 
                  onPress={() => { this.btnContinuarClick();}}/>
              </View>
                <Snackbar visible={isVisible} message={this.state.errorMsg} onRequestClose={() => this.setState({ isVisible: false })} />
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    );
  }
}

function mapStateToProps(state){
    return {} 
}

function mapDispatchToProps(dispatch){
  return {
    saveSolicitudData : (serviceRequestData) => dispatch({type: 'SAVE_SERVICE_REQUEST_DATA', payload: serviceRequestData})
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ElegirServicioProfesor);