/*autor Fernando Jaramillo &&  Bladimir Jaramillo*/
function valorBuscar() {
    var query = getRespuesta();
    buscar(query);
}

function getRespuesta() {
    var loc = document.location.href;
    var getString = loc.split('?')[1];
    var GET = getString.split('&');
    var get = {};
    for (var i = 0, l = GET.length; i < l; i++) {
        var tmp = GET[i].split('=');
        get[tmp[0]] = unescape(decodeURI(tmp[1]));
    }
    return get;
}

function buscar(query) {
    var result = "<table cellpadding='0' cellspacing='0' border='0' class='display' id='example'><thead><tr><th>Titulo</th><th>Url</th><th>Lenguaje</th><th>Universidad</th><th>Descripcion</th></tr></thead><tbody> ";
    console.log(query);
    $.ajax({
        dataType: 'jsonp',
        url: 'http://carbono.utpl.edu.ec:8080/WSSearcher/webresources/serendipityrest?q=' + query['txtQuery'],
        contentType: 'application/json',
        success: function(datos) {
            $.each(datos.results.ocw, function(i,item) {
                console.log(item.url);
                

                  result = result + "<tr class='recurso'><td>"+item.title+"</td><td>"+item.url+"</td><td>"+item.language+"</td><td>"+item.university_name+"</td><td>"+item.description+"</td></tr>";
            });
            result = result +"</tbody></table>";
            $("#content").html(result);
        
            $("#example").dataTable();
            console.log(result);
        },
        error: function() {
            alert("Error leyendo fichero json");
        }
    });
}