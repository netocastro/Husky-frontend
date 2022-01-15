"use strict";

$(document).ready(function () {
  //Recuperando o parâmentro na rota get referente ao id da Entrega.
  var id = window.location.search.replace("?", ""); //Criando URL para fazer a atualização da entrega.

  $('#update-delivery').attr('action', 'https://localhost/development/entrevistas/Husky/delivery/' + id); //Requisição que buscar todos os usuários.

  $.ajax({
    url: 'https://localhost/development/entrevistas/Husky/user/',
    type: 'GET',
    dataType: "JSON",
    success: function success(data) {
      users(data);
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
      motoboys(data);
    },
    error: function error(_error2) {
      console.log(_error2.responseText);
    }
  }); //Requisição que busca todos os status

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
  }); //Reuisição que busca a Entrega que será editada.

  $.ajax({
    url: 'https://localhost/development/entrevistas/Husky/delivery/' + id,
    type: 'GET',
    dataType: "JSON",
    success: function success(data) {
      editDelivery(data);
    },
    error: function error(_error4) {
      console.log(_error4.responseText);
    }
  }); //Requisição que de fato atualiza a Entrega.

  $('#update-delivery').on('submit', function (e) {
    e.preventDefault();
    _this = $(this);
    $.ajax({
      url: _this.attr('action'),
      type: _this.attr('data-method'),
      dataType: _this.attr('data-type'),
      data: _this.serialize(),
      success: function success(data) {
        validateFields(data, _this);
        window.location.href = "https://localhost/development/entrevistas/Husky_frontend/vizualizar-entrega.html?" + data.id;
      },
      error: function error(_error5) {
        console.log(_error5.responseText);
      }
    });
  }); // Ao mudar o usuário através do select, seu endereço é adicionado automaticamente ao campo de destino.

  $('#users').on('change', function (e) {
    $.ajax({
      url: 'https://localhost/development/entrevistas/Husky/user/' + $('#users').val(),
      type: 'GET',
      dataType: "JSON",
      success: function success(data) {
        $('#destination_address').val(data[0].address);
      },
      error: function error(_error6) {
        console.log(_error6.responseText);
      }
    });
  }); // preenche todos os campos com as informações da entrega atual.

  function editDelivery(data) {
    console.log(data);
    $('#collection_address').val(data[0].collection_address);
    $('#destination_address').val(data[0].destination_address);
    $('#users').val(data[0].user_id);
    $('#motoboys').val(data[0].motoboy_id);

    if (data[0].motoboy_id == null) {
      $('#motoboys').val('0');
    } else {
      $('#motoboys').val(data[0].motoboy_id);
    }
  } // preenche o select de usuarios.


  function users(data) {
    $("#users").html('');
    data.forEach(function (element) {
      $("#users").append("\n                <option value=\"".concat(element.id, "\">").concat(element.name, "</option>\n            ")).fadeIn();
    });
  } // preenche o select de motoboys.


  function motoboys(data) {
    $("#motoboys").html('');
    $("#motoboys").append("<option value=\"0\">--</option>").fadeIn();
    data.forEach(function (element) {
      $("#motoboys").append("\n                <option value=\"".concat(element.id, "\">").concat(element.name, "</option>\n            ")).fadeIn();
    });
  } // Preenche o select com com todos os estatos com a reposta do banco de dados


  function changeStatus(data) {
    $('#status_id').append("\n                <option value=\"\">--</option>\n            ");
    data.forEach(function (element) {
      $('#status_id').append("\n                <option value=\"".concat(element.id, "\">").concat(element.name, "</option>\n            "));
    });
  }
});