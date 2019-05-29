const validation = {
    email: {
      presence: {
        message: '^Por favor ingrese una dirección de email'
      },
      email: {
        message: '^Ingrese una dirección de email válida'
      }
    },
    
    password: {
      presence: {
        message: '^Por favor ingrese una contraseña'
      },
      length: {
        minimum: 8,
        message: '^La contraseña debe tener al menos 8 caracteres'
      }
    },
    
    repassword: {
      presence: {
        message: '^Por favor ingrese una contraseña'
      },
      length: {
        minimum: 8,
        message: '^La contraseña debe tener al menos 8 caracteres'
      }
    },

    telefono: {
      presence: {
        message: '^Por favor ingrese un teléfono'
      },
      length: {
        minimum: 10,
        message: '^La teléfono debe tener al menos 10 caracteres'
      }
    },
    
    nombre: {
      presence: {
        message: '^Por favor ingrese un nombre'
      },
      length: {
        minimum: 3,
        message: '^La nombre debe tener al menos 3 caracteres'
      }
    },
    
    apellido: {
      presence: {
        message: '^Por favor ingrese un apellido'
      },
      length: {
        minimum: 3,
        message: '^La apellido debe tener al menos 3 caracteres'
      }
    },
    
    calle: {
      presence: {
        message: '^Por favor ingrese una calle'
      },
      length: {
        minimum: 3,
        message: '^La calle debe tener al menos 3 caracteres'
      }
    },

    numerocasa: {
      presence: {
        message: '^Por favor ingrese un numero de casa'
      },
      length: {
        minimum: 1,
        message: '^El numero de casa debe tener al menos 1 caracter'
      }
    },

    depto: {
      presence: {
        message: '^Por favor ingrese un numero de departamento'
      },
      length: {
        minimum: 1,
        message: '^El numero de departamento debe tener al menos 1 caracter'
      }
    },

    terminos: {
      presence: {
        message: '^Por favor acepte los terminos y condiciones para continuar'
      },
      inclusion: {
        within: [true],
        message: "^Por favor acepte los terminos y condiciones para continuar"
      }
    },
    
    fotofrente: {
      presence: {
        message: '^Por favor ingrese una foto'
      },
      length: {
        minimum: 1,
        message: '^Por favor ingrese una foto'
      }
    },
    
    fotodnifrente: {
      presence: {
        message: '^Por favor ingrese la foto del frente del DNI'
      },
      length: {
        minimum: 1,
        message: '^Por favor ingrese la foto del frente del DNI'
      }
    },

    fotodnidorso: {
      presence: {
        message: '^Por favor ingrese la foto del dorso del DNI'
      },
      length: {
        minimum: 1,
        message: '^Por favor ingrese la foto del dorso del DNI'
      }
    },

    dni: {
      presence: {
        message: '^Por favor ingrese el numero de DNI'
      },
      length: {
        minimum: 6,
        message: '^Por favor ingrese el numero de DNI'
      }
    },

    fechanacimiento: {
      presence: {
        message: '^Por favor ingrese la fecha de nacimiento'
      },
      length: {
        minimum: 1,
        message: '^Por favor ingrese la fecha de nacimiento'
      }
    },

    paisnacimiento: {
      presence: {
        message: '^Por favor ingrese el pais de nacimiento'
      },
      length: {
        minimum: 1,
        message: '^Por favor ingrese el pais de nacimiento'
      }
    },

    descripcion: {
      presence: {
        message: '^Por favor ingrese la descripcion'
      },
      length: {
        minimum: 1,
        message: '^Por favor ingrese la descripcion'
      }
    },

    direccion: {
      presence: {
        message: '^Por favor ingrese la direccion'
      },
      length: {
        minimum: 1,
        message: '^Por favor ingrese la direccion'
      }
    },

    comentarios: {
      presence: {
        message: '^Por favor ingrese algun comentario'
      },
      length: {
        minimum: 1,
        message: '^Por favor ingrese algun comentario'
      }
    },

    costo_presupuesto_aceptado: {
      presence: {
        message: '^Debe marcar con un tilde que acepta las condiciones de presupuesto.'
      },
      inclusion: {
        within: [true],
        message: "^Debe marcar con un tilde que acepta las condiciones de presupuesto."
      }
    },

    montoPostulacion: {
      presence: {
        message: '^Por favor ingrese el monto'
      },
      length: {
        minimum: 3,
        message: '^Por favor ingrese el monto'
      }
    },

    nivel: {
      presence: {
        message: '^Por favor ingrese el nivel'
      },
      length: {
        minimum: 1,
        message: '^Por favor ingrese el nivel'
      }
    },

    materia: {
      presence: {
        message: '^Por favor ingrese la materia'
      },
      length: {
        minimum: 1,
        message: '^Por favor ingrese la materia'
      }
    },

    profesor_horas: {
      presence: {
        message: '^Por favor ingrese la cantidad de horas'
      },
      length: {
        minimum: 1,
        message: '^Por favor ingrese la cantidad de horas'
      }
    },

    profesor_descripcion: {
      presence: {
        message: '^Por favor ingrese la descripcion de los temas'
      },
      length: {
        minimum: 1,
        message: '^Por favor ingrese la descripcion de los temas'
      }
    }


  }
  
  export default validation