$(document).ready(function () {

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

    // Requisição que de fato faz o registro das Entregas
    $('#register-delivery').on('submit', function (e) {
        e.preventDefault();
        _this = $(this);

        $.ajax({
            url: _this.attr('action'),
            type: _this.attr('method'),
            dataType: _this.attr('data-type'),
            data: _this.serialize(),
            success: (data) => {
                validateFields(data, _this)
            },
            error: (error) => {
                console.log(error.responseText);
            }
        });
    });

    //Requisição usada para buscar o endereço dos clientes.
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

    // Função que preenche o select com todos os motoboys do banco de dados
    function motoboys(data) {
        $("#motoboys").html('');
        $("#motoboys").append(`<option value="0">--</option>`);

        data.forEach(element => {
            $("#motoboys").append(`
                <option value="${element.id}">${element.name}</option>
            `).fadeIn();
        });
    }

    // Função que preenche o select com todos os usuarios do banco de dados
    function users(data) {
        $("#users").html('');
        $("#users").append(`<option value="0">--</option>`);

        data.forEach(element => {
            $("#users").append(`
                <option value="${element.id}">${element.name}</option>
            `).fadeIn();
        });
    }
});
