$(document).ready(function () {
 
    // Requisição que busca todas as Entregas.
    $.ajax({
        url: 'https://localhost/development/entrevistas/Husky/delivery/',
        type: 'GET',
        dataType: "JSON",
        data: '',
        success: (data) => {
            buildTable(data);
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

    // Requisição que busca todos os Status.
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

    // Eventos change para fazer o filtro entre motoboys e status
    $('#status_id').add('#motoboy_id').on('change', function () {
        let request = {
            "motoboy_id": $('#motoboy_id').val(),
            "status_id": $('#status_id').val()
        };

        $.ajax({
            url: 'https://localhost/development/entrevistas/Husky/web/filterDeliveries',
            type: 'POST',
            dataType: "JSON",
            data: request,
            success: (data) => {
                filterTable(data)
            },
            error: (error) => {
                console.log(error.responseText);
            }
        });
    });

    //Função que preenche a tabela com as Entregas selecionadas
    function buildTable(data) {
        data.forEach(element => {
            $("#list-delivery").append(`
                <tr>
                    <th scope="row">${element.id}</th>
                    <td id="${element.user_id}">${element.user_name}</td>
                    <td id="${element.motoboy_id ? element.motoboy_id: 'no_motoboy'}" 
                        class="${element.motoboy_id ? '': 'text-center'}">
                            ${element.motoboy_name}
                    </td>
                    <td id="${element.status}">${element.status_name}</td>
                    <td >${element.collection_address}</td>
                    <td >${element.destination_address}</td>
                    <td ><a href="https://localhost/development/entrevistas/Husky_frontend/vizualizar-entrega.html?${element.id}"><i class="fas fa-eye"></i></a></td>
                </tr>
            `).fadeIn();
        });
    }

    //Função que preenche a tabela com as Entregas filtradas
    function filterTable(data) {
        $("#list-delivery").hide().fadeOut().html('');
        data.forEach(element => {
            $("#list-delivery").append(`
                <tr>
                    <th scope="row">${element.id}</th>
                    <td id="${element.user_id}">${element.user_name}</td>
                    <td id="${element.motoboy_id ? element.motoboy_id: 'no_motoboy'}" 
                        class="${element.motoboy_id ? '': 'text-center'}">
                            ${element.motoboy_name}
                    </td>
                    <td id="${element.status}">${element.status_name}</td>
                    <td >${element.collection_address}</td>
                    <td >${element.destination_address}</td>
                    <td ><a href="https://localhost/development/entrevistas/Husky_frontend/vizualizar-entrega.html?${element.id}"><i class="fas fa-eye"></i></a></td>
                </tr>
            `).fadeIn();
        });
    }

    // Função que preenche o select com todos os motoboys do banco de dados
    function motoboys(data) {
        $("#motoboy_id").html('');
        $("#motoboy_id").append(`<option value="0">All</option>`);

        data.forEach(element => {
            $("#motoboy_id").append(`
                <option value="${element.id}">${element.name}</option>
            `).fadeIn();
        });
    }

    // Função que preenche o select com todos os status do banco de dados

    function changeStatus(data) {
        $('#status_id').append(`
                <option value="0">All</option>
            `);
        data.forEach(element => {
            $('#status_id').append(`
                <option value="${element.id}">${element.name}</option>
            `);
        });
    }
});
