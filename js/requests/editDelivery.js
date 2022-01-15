$(document).ready(function () {

    //Recuperando o parâmentro na rota get referente ao id da Entrega.
    let id = window.location.search.replace("?", "");

    //Criando URL para fazer a atualização da entrega.
    $('#update-delivery').attr('action', 'https://localhost/development/entrevistas/Husky/delivery/' + id);

    //Requisição que buscar todos os usuários.
    $.ajax({
        url: 'https://localhost/development/entrevistas/Husky/user/',
        type: 'GET',
        dataType: "JSON",
        success: (data) => {
            users(data);
        },
        error: (error) => {
            console.log(error.responseText);
        }
    });

    // Requisição que busca todos os Motoboys.
    $.ajax({
        url: 'https://localhost/development/entrevistas/Husky/motoboy/',
        type: 'GET',
        dataType: "JSON",
        success: (data) => {
            motoboys(data);
        },
        error: (error) => {
            console.log(error.responseText);
        }
    });

    //Requisição que busca todos os status
    $.ajax({
        url: 'https://localhost/development/entrevistas/Husky/status/',
        type: 'GET',
        dataType: "JSON",
        success: (data) => {
            changeStatus(data);
        },
        error: (error) => {
            console.log(error.responseText);
        }
    });

    //Requisição que de fato atualiza a Entrega.
    $('#update-delivery').on('submit', function (e) {
        e.preventDefault();
        _this = $(this);

        $.ajax({
            url: _this.attr('action'),
            type: _this.attr('data-method'),
            dataType: _this.attr('data-type'),
            data: _this.serialize(),
            success: (data) => {
                validateFields(data, _this);
                window.location.href = "https://localhost/development/entrevistas/Husky_frontend/vizualizar-entrega.html?" + data.id;
            },
            error: (error) => {
                console.log(error.responseText);
            }
        });
    });

    // Ao mudar o usuário através do select, seu endereço é adicionado automaticamente ao campo de destino.
    $('#users').on('change', function (e) {
        $.ajax({
            url: 'https://localhost/development/entrevistas/Husky/user/' + $('#users').val(),
            type: 'GET',
            dataType: "JSON",
            success: (data) => {
                $('#destination_address').val(data[0].address);
            },
            error: (error) => {
                console.log(error.responseText);
            }
        });
    });

    // preenche o select de usuarios.
    function users(data) {
        $("#users").html('');
        data.forEach(element => {
            $("#users").append(`
                <option value="${element.id}">${element.name}</option>
            `).fadeIn();
        });
    }

    // preenche o select de motoboys.
    function motoboys(data) {
        $("#motoboys").html('');
        $("#motoboys").append(`<option value="0">--</option>`).fadeIn();

        data.forEach(element => {
            $("#motoboys").append(`
                <option value="${element.id}">${element.name}</option>
            `).fadeIn();
        });
    }

    // Preenche o select com com todos os estatos com a reposta do banco de dados
    function changeStatus(data) {
        $('#status_id').append(`
                <option value="">--</option>
            `);
        data.forEach(element => {
            $('#status_id').append(`
                <option value="${element.id}">${element.name}</option>
            `);
        });
    }

    //Reuisição que busca a Entrega que será editada.
    $.ajax({
        url: 'https://localhost/development/entrevistas/Husky/delivery/' + id,
        type: 'GET',
        dataType: "JSON",
        success: (data) => {
            editDelivery(data);
        },
        error: (error) => {
            console.log(error.responseText);
        }
    });

    // preenche todos os campos com as informações da entrega atual.
    function editDelivery(data) {
        $('#collection_address').val(data[0].collection_address);
        $('#destination_address').val(data[0].destination_address);
        $('#users').val(data[0].user_id);
        $('#motoboys').val(data[0].motoboy_id);
        $('#status_id').val(data[0].status);
    }
});
