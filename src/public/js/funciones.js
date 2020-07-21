try{
  document.getElementById('actualizar').onclick = function() {
    document.getElementById('nombres_huesped').removeAttribute('readonly');
    document.getElementById('apellido_paterno').removeAttribute('readonly');
    document.getElementById('apellido_materno').removeAttribute('readonly');
    document.getElementById('telefono').removeAttribute('readonly');
    document.getElementById('actualizar').remove()
    setTimeout(function () {
      document.getElementById('button_update').innerHTML = "<button id=\"actualizar\" type=\"submit\" class=\"btn btn-info \"> Enviar </button>"
    }, 1500,)
  };
} catch (e) {
  console.log(e)
}


const api_token = 'W4Kk1KOv1f4u9RL27M9ZehD-75hupeiV8aJWaqC7j-wnq0G3_JMrHjbjUs07-9OmaC0'
  window.addEventListener("load", getCountries);
  function getCountries(){
    const nacionalidad = document.getElementById("nacionalidad");
    fetch( 'https://www.universal-tutorial.com/api/getaccesstoken',({
      method: 'GET',
      headers: {
        "api-token": api_token,
        "Accept": "application/json",
        "user-email": "splash.jalj@gmail.com"
      }
    }))
      .then(function(response) {
        return response.json();
      })
      .then(function(myJson) {
        const auth_token = myJson.auth_token
        if (nacionalidad){
          fetch( 'https://www.universal-tutorial.com/api/countries/',({
            method: 'GET',
            headers: {
              "Authorization": `Bearer ${auth_token}`,
              "Accept": "application/json",
            }
          }))
            .then(function(response) {
              return response.json();
            })
            .then(function(myJson) {
              const tamano = Object.keys(myJson).length
              for (i = 0; i < tamano; i++){
                option = document.createElement("option");
                option.value = Object.values(myJson)[i].country_name;
                option.text = Object.values(myJson)[i].country_name;
                nacionalidad.appendChild(option);
              }
            });
        }
      });
  }
function getCondominio() {
  const edificio = document.getElementById("edificio_condominio").value
  const numero_condominio = document.getElementById("numero_condominio");
  const route = `/getCondos/${edificio}`
  fetch( route,({
    method: 'GET',
  }))
    .then(function(response) {
      return response.json();
    })
    .then(function(myJson) {
      const tamano = Object.keys(myJson).length
      numero_condominio.innerHTML =  '<option disabled value="">Selecciona condominio</option>'
      for (i = 0; i < tamano; i++){
        option = document.createElement("option");
        option.value = Object.values(myJson)[i]._id;
        option.text = `# ${Object.values(myJson)[i].numero}`;
        numero_condominio.appendChild(option);
      }
      console.log(myJson)
    });
  
}
try {
  function getTipoIncidencia() {
    const tipo = document.getElementById("tipo_mantenimineto").value
    const mantenimiento = document.getElementById("mantenimiento");
    const route = `/getTipoIncidencia/`
    fetch(route,({
      method: 'GET',
      headers: {
        "tipo" : tipo
      }
    }))
      .then(function(response) {
        return response.json();
      })
      .then(function(myJson) {
        const tamano = Object.keys(myJson).length
        console.log(myJson)
        mantenimiento.innerHTML =  '<option disabled value="">Selecciona mantenimiento</option>'
        for (i = 0; i < tamano; i++){
          option = document.createElement("option");
          option.value = Object.values(myJson)[i].nombre;
          option.text = `${Object.values(myJson)[i].nombre}`;
          mantenimiento.appendChild(option);
        }
        
      });
  }
} catch (e) {
  console.log(e)
}
function getTipoIncidenciaEn() {
  const tipo = document.getElementById("tipo_mantenimiento_en").value
  const mantenimiento = document.getElementById("mantenimiento_en");
  const route = `/getTipoIncidencia/en`
  fetch(route,({
    method: 'GET',
    headers: {
      "tipo" : tipo
    }
  }))
    .then(function(response) {
      return response.json();
    })
    .then(function(myJson) {
      const tamano = Object.keys(myJson).length
      console.log(myJson)
      mantenimiento.innerHTML =  '<option disabled value="">Select a maintenance</option>'
      for (i = 0; i < tamano; i++){
        option = document.createElement("option");
        option.value = Object.values(myJson)[i].nombre;
        option.text = `${Object.values(myJson)[i].nombre_en}`;
        mantenimiento.appendChild(option);
      }
      
    });
}
