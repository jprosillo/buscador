/**
 *
 * @author fernando
 */
(function (d, s, id) {
    var js, fjs = d.getElementsByTagName(s)[0];
    if (d.getElementById(id))
        return;
    js = d.createElement(s);
    js.id = id;
    js.src = "//connect.facebook.net/en_US/sdk.js";
    fjs.parentNode.insertBefore(js, fjs);
}(document, 'script', 'facebook-jssdk'));

// Función para iniciar parámetros de configuración
window.fbAsyncInit = function () {
    FB.init({
        appId: '1536534623267652',
        cookie: true, // enable cookies to allow the server to access 
        // the session
        xfbml: true, // parse social plugins on this page
        version: 'v2.1' // use version 2.1
    });
    checkLoginState();
};

// Función llamada cuando alguien termina el proceso de login
function checkLoginState() {
    FB.getLoginStatus(function (response) {
        statusChangeCallback(response);
    });
}

// Manejador de la sesión del usuario
function statusChangeCallback(response) {
    // The response object is returned with a status field that lets the
    // app know the current login status of the person.
    // Full docs on the response object can be found in the documentation
    // for FB.getLoginStatus().
    if (response.status === 'connected') {
        console.log('Usuario' + response.status);
        manageUsers();
    } else if (response.status === 'not_authorized') {
        // The person is logged into Facebook, but not your app.
        console.log('Por favor ' + 'loguéate en esta aplicación');
    } else {
        // The person is not logged into Facebook, so we're not sure if
        // they are logged into this app or not.
        console.log('Por favor ' + 'loguéate a Facebook.');
    }
}

// Función test del estado de sesión del usuario
function manageUsers() {
    console.log('Bienvenido, consumiendo tu información!');
    FB.api('/me', function (response) {
        isAUserSingIn(response);
    });
}

function isAUserSingIn(response) {
    $.ajax({
        type: 'GET',
        url: "http://localhost:8080/OpenCourseWare/webresources/usuarios/" + response.email,
        dataType: "json",
        crossDomain: true
    }).done(function (data, textStatus, jqXHR) {
        if (jqXHR.status !== 200) {
            saveUser(response);
        } else {
            console.log('Usuario ya se encuentra registrado en la aplicación.');
        }
    });
}

function saveUser(response) {
    var nombre = response.name;
    var email = response.email;
    data = {email: email, nombre: nombre};
    console.log(nombre);
    console.log(email);
    console.log(data);
    $.ajax({
        type: 'POST',
        contentType: 'application/json',
        url: "http://localhost:8080/OpenCourseWare/webresources/usuarios/",
        dataType: 'json',
        data: JSON.stringify(data),
        success: function (data, textStatus, jqXHR) {
            console.log(nombre);
            console.log(email);
            console.log("Datos del Usuario Guardados");
        },
        error: function (jqXHR, textStatus, errorThrown) {
            console.log("Ha ocurrido un error");
        }
    });
}


