"use strict";

$(document).ready(function () {
  // Requisição que busca todas as Entregas.
  $.ajax({
    url: 'https://localhost/development/entrevistas/Husky/delivery/',
    type: 'GET',
    dataType: "JSON",
    data: '',
    success: function success(data) {
      buildTable(data);
    },
    error: function error(_error) {
      console.log(_error.responseText);
    }
  }); // Requisição que busca todos os Motoboys.

  $.ajax({
    url: 'https://localhost/development/entrevistas/Husky/motoboy/',
    type: 'GET',
    dataType: "JSON",
    success: function success(data) {
      console.log(data);
      motoboys(data);
    },
    error: function error(_error2) {
      console.log(_error2.responseText);
    }
  }); // Requisição que busca todos os Status.

  $.ajax({
    url: 'https://localhost/development/entrevistas/Husky/status/',
    type: 'GET',
    dataType: "JSON",
    success: function success(data) {
      changeStatus(data);
    },
    error: function error(_error3) {
      console.log(_error3.responseText);
    }
  }); // Eventos change para fazer o filtro entre motoboys e status

  $('#status_id').add('#motoboy_id').on('change', function () {
    var request = {
      "motoboy_id": $('#motoboy_id').val(),
      "status_id": $('#status_id').val()
    };
    $.ajax({
      url: 'https://localhost/development/entrevistas/Husky/web/filterDeliveries',
      type: 'POST',
      dataType: "JSON",
      data: request,
      success: function success(data) {
        filterTable(data);
      },
      error: function error(_error4) {
        console.log(_error4.responseText);
      }
    });
  }); //Função que preenche a tabela com as Entregas selecionadas

  function buildTable(data) {
    data.forEach(function (element) {
      $("#list-delivery").append("\n                <tr>\n                    <th scope=\"row\">".concat(element.id, "</th>\n                    <td id=\"").concat(element.user_id, "\">").concat(element.user_name, "</td>\n                    <td id=\"").concat(element.motoboy_id ? element.motoboy_id : 'no_motoboy', "\" \n                        class=\"").concat(element.motoboy_id ? '' : 'text-center', "\">\n                            ").concat(element.motoboy_name, "\n                    </td>\n                    <td id=\"").concat(element.status, "\">").concat(element.status_name, "</td>\n                    <td >").concat(element.collection_address, "</td>\n                    <td >").concat(element.destination_address, "</td>\n                    <td ><a href=\"https://localhost/development/entrevistas/Husky_frontend/vizualizar-entrega.html?").concat(element.id, "\"><i class=\"fas fa-eye\"></i></a></td>\n                </tr>\n            ")).fadeIn();
    });
  } //Função que preenche a tabela com as Entregas filtradas


  function filterTable(data) {
    $("#list-delivery").hide().fadeOut().html('');
    data.forEach(function (element) {
      $("#list-delivery").append("\n                <tr>\n                    <th scope=\"row\">".concat(element.id, "</th>\n                    <td id=\"").concat(element.user_id, "\">").concat(element.user_name, "</td>\n                    <td id=\"").concat(element.motoboy_id ? element.motoboy_id : 'no_motoboy', "\" \n                        class=\"").concat(element.motoboy_id ? '' : 'text-center', "\">\n                            ").concat(element.motoboy_name, "\n                    </td>\n                    <td id=\"").concat(element.status, "\">").concat(element.status_name, "</td>\n                    <td >").concat(element.collection_address, "</td>\n                    <td >").concat(element.destination_address, "</td>\n                    <td ><a href=\"https://localhost/development/entrevistas/Husky_frontend/vizualizar-entrega.html?").concat(element.id, "\"><i class=\"fas fa-eye\"></i></a></td>\n                </tr>\n            ")).fadeIn();
    });
  } // Função que preenche o select com todos os motoboys do banco de dados


  function motoboys(data) {
    $("#motoboy_id").html('');
    $("#motoboy_id").append("<option value=\"0\">All</option>");
    data.forEach(function (element) {
      console.log(element);
      $("#motoboy_id").append("\n                <option value=\"".concat(element.id, "\">").concat(element.name, "</option>\n            ")).fadeIn();
    });
  } // Função que preenche o select com todos os status do banco de dados


  function changeStatus(data) {
    $('#status_id').append("\n                <option value=\"0\">All</option>\n            ");
    data.forEach(function (element) {
      $('#status_id').append("\n                <option value=\"".concat(element.id, "\">").concat(element.name, "</option>\n            "));
    });
  }
});