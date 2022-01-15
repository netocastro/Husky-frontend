"use strict";

$(document).ready(function () {
  //Recuperando o parâmentro na rota get referente ao id da Entrega.
  var id = window.location.search.replace("?", ""); // Requisição que busca uma Entrega expecifica no banco de dados

  $.ajax({
    url: 'https://localhost/development/entrevistas/Husky/delivery/' + id,
    type: 'GET',
    dataType: "JSON",
    success: function success(data) {
      delivery(data);
    },
    error: function error(_error) {
      console.log(_error.responseText);
    }
  }); //Requisição que busca todos os status  

  $.ajax({
    url: 'https://localhost/development/entrevistas/Husky/status/',
    type: 'GET',
    dataType: "JSON",
    success: function success(data) {
      changeStatus(data);
    },
    error: function error(_error2) {
      console.log(_error2.responseText);
    }
  }); //Requisição que busca todos os motoboys

  $.ajax({
    url: 'https://localhost/development/entrevistas/Husky/motoboy/',
    type: 'GET',
    dataType: "JSON",
    success: function success(data) {
      changeMotoboy(data);
    },
    error: function error(_error3) {
      console.log(_error3.responseText);
    }
  }); //Evento que muda o valor do select do status

  $('#change-status').on('change', function () {
    var request = {
      "delivery_id": $('#id').html(),
      "status_id": $('#change-status').val()
    };
    $.ajax({
      url: 'https://localhost/development/entrevistas/Husky/web/changeStatusDelivery',
      type: 'POST',
      dataType: "JSON",
      data: request,
      success: function success(data) {
        if (data == "status_atualizado") {
          window.location.reload(true);
        }
      },
      error: function error(_error4) {
        console.log(_error4.responseText);
      }
    });
  }); //Evento que muda o valor do select do motoboy

  $('#change-motoboy').on('change', function () {
    var request = {
      "delivery_id": $('#id').html(),
      "motoboy_id": $('#change-motoboy').val()
    };
    console.log(request);
    $.ajax({
      url: 'https://localhost/development/entrevistas/Husky/web/changeMotoboyDelivery',
      type: 'POST',
      dataType: "JSON",
      data: request,
      success: function success(data) {
        if (data == "motoboy_atualizado") {
          window.location.reload(true);
        }
      },
      error: function error(_error5) {
        console.log(_error5.responseText);
      }
    });
  }); // Preenche o select com com todos os estatos com a reposta do banco de dados

  function changeStatus(data) {
    $('#change-status').append("\n                <option value=\"\"> -- </option>\n            ");
    data.forEach(function (element) {
      $('#change-status').append("\n                <option value=\"".concat(element.id, "\">").concat(element.name, "</option>\n            "));
    });
  } // preenche o select de motoboys.


  function changeMotoboy(data) {
    console.log(data);
    $('#change-motoboy').append("\n                <option value=\"\"> -- </option>\n                <option value=\"0\"> Remover Motoboy </option>\n            ");
    data.forEach(function (element) {
      $('#change-motoboy').append("\n                <option value=\"".concat(element.id, "\">").concat(element.name, "</option>\n            "));
    });
  } // Função que preenche os campos com informações de uma entrega.


  function delivery(data) {
    if (data == "Entrega não cadastrada") {
      $(".card-body").html('<h1>"Entrega não cadastrada"<h1>').addClass('d-flex justify-content-center align-items-center py-5');
      $(".card-footer").html('').addClass('py-4');
    } else {
      $('#collection_address').html("".concat(data[0].collection_address));
      $('#destination_address').html("".concat(data[0].destination_address));
      $('#status_name').html("".concat(data[0].status_name));
      $('#user_name').html("".concat(data[0].user_name));
      $('#motoboy_name').html("".concat(data[0].motoboy_name));
      $('#id').html("".concat(data[0].id));
      $('#edit_delivery').attr('href', 'editar-entrega.html?' + data[0].id);
    }
  }
});