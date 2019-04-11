import { StyleSheet } from 'react-native'; 

const styles = StyleSheet.create({
  indicator: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    height: 80
  },
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

  export default styles;