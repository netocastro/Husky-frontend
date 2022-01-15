$(document).ready(function () {

    //Recuperando o parâmentro na rota get referente ao id da Entrega.
    let id = window.location.search.replace("?", "");

    // Requisição que busca uma Entrega expecifica no banco de dados
    $.ajax({
        url: 'https://localhost/development/entrevistas/Husky/delivery/' + id,
        type: 'GET',
        dataType: "JSON",
        success: (data) => {
            delivery(data)
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

    //Requisição que busca todos os motoboys
    $.ajax({
        url: 'https://localhost/development/entrevistas/Husky/motoboy/',
        type: 'GET',
        dataType: "JSON",
        success: (data) => {
            changeMotoboy(data);
        },
        error: (error) => {
            console.log(error.responseText);
        }
    });

    //Evento que muda o valor do select do status
    $('#change-status').on('change',function(){

        let request = {
            "delivery_id": $('#id').html(),
            "status_id": $('#change-status').val()
        };

        $.ajax({
            url: 'https://localhost/development/entrevistas/Husky/web/changeStatusDelivery',
            type: 'POST',
            dataType: "JSON",
            data: request,
            success: (data) => {
                if(data == "status_atualizado"){
                    window.location.reload(true);
                }
            },
            error: (error) => {
                console.log(error.responseText);
            }
        });
    });

    //Evento que muda o valor do select do motoboy
    $('#change-motoboy').on('change',function(){
        let request = {
            "delivery_id": $('#id').html(),
            "motoboy_id": $('#change-motoboy').val()
        };

        $.ajax({
            url: 'https://localhost/development/entrevistas/Husky/web/changeMotoboyDelivery',
            type: 'POST',
            dataType: "JSON",
            data: request,
            success: (data) => {
                if(data == "motoboy_atualizado"){
                    window.location.reload(true);
                }
            },
            error: (error) => {
                console.log(error.responseText);
            }
        });
    });

    // Preenche o select com com todos os estatos com a reposta do banco de dados
    function changeStatus(data) {

        $('#change-status').append(`
            <option value=""> -- </option>
        `);

        data.forEach(element => {
            $('#change-status').append(`
                <option value="${element.id}">${element.name}</option>
            `);
        });
    }

    // preenche o select de motoboys.
    function changeMotoboy(data) {

        $('#change-motoboy').append(`
            <option value=""> -- </option>
            <option value="0"> Remover Motoboy </option>
        `);

        data.forEach(element => {
            $('#change-motoboy').append(`
                <option value="${element.id}">${element.name}</option>
            `);
        });
    }

    // Função que preenche os campos com informações de uma entrega.
    function delivery(data) {

        if (data == "Entrega não cadastrada") {
            $(".card-body").html('<h1>"Entrega não cadastrada"<h1>').addClass('d-flex justify-content-center align-items-center py-5');
            $(".card-footer").html('').addClass('py-4');

        } else {
            $('#collection_address').html(`${data[0].collection_address}`);
            $('#destination_address').html(`${data[0].destination_address}`);
            $('#status_name').html(`${data[0].status_name}`);
            $('#user_name').html(`${data[0].user_name}`);
            $('#motoboy_name').html(`${data[0].motoboy_name}`);
            $('#id').html(`${data[0].id}`);
            $('#edit_delivery').attr('href','editar-entrega.html?' + data[0].id);
        }
    }
});
