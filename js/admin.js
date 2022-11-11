const API_URL = "https://xp41-soundgarden-api.herokuapp.com/events";

fetch(API_URL)
    .then(response => {
        if (!response.ok) {
            return new Error("Requisção falhou");
        }
        return response.json();
    })
    .then(data => {
        data.forEach(events => {
            const tr = document.createElement("tr");
            trContent = `
                            <td scope="row"></td>
                            <td>${(events.scheduled).split("T")[0] + ' ' + (events.scheduled).split("T")[1].split(".")[0]}</td>
                            <td>${events.name}</td>
                            <td>${events.attractions}</td>
                            <td>
                                <a href="reservas.html?id=${events._id}" class="btn btn-dark">ver reservas</a>
                                <a href="editar-evento.html?id=${events._id}" class="btn btn-secondary">editar</a>
                                <a href="excluir-evento.html?id=${events._id}" class="btn btn-danger">excluir</a>
                            </td>
                `;
            tr.innerHTML = trContent;
            document.querySelector('table tbody').appendChild(tr);
        })
    })
    .catch(error => {
        alert('Requisição fahou: ' + error)
        console.log(error);
    })

    // Outra forma de formatar a data
    // <td>${new Date(events.scheduled).toLocaleString()}</td>