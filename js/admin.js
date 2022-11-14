const API_URL = "https://xp41-soundgarden-api.herokuapp.com/events";
const API_TICKETS_ID = "https://xp41-soundgarden-api.herokuapp.com/bookings/event";

var id2 = ''

function bookModal(id) {
    id2 =  id;
}


fetch(API_URL)
    .then(response => {
        if (!response.ok) {
            return new Error("Requisção falhou");
        }
        return response.json();
    })
    .then(data => {
        data.forEach((events, index) => {
            const tr = document.createElement("tr");
            trContent = `
                            <td scope="row">${index + 1}</td>
                            <td>${(events.scheduled).split("T")[0] + ' ' + (events.scheduled).split("T")[1].split(".")[0]}</td>
                            <td>${events.name}</td>
                            <td>${events.attractions}</td>
                            <td>
                                <button type="button"' class="btn btn-dark" data-bs-toggle="modal" data-bs-target="#exampleModal" onclick="bookModal('${events._id}', getLists())">ver reservas</button>
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


function getLists() {
    var id = id2;
    fetch(`${API_TICKETS_ID}/${id}`, {
        method: "GET", headers: {
            "Content-Type": "application/json",
        }
    })
        .then(response => {
            if (!response.ok) {
                return new Error("Requisção falhou");
            }
            return response.json();
        })
        .then(data => {
            data.forEach((events, index) => {
                const tr = document.createElement("tr");
                trContent = `
                            <td scope="row">${index + 1}</td>
                            <td>${events.owner_name}</td>
                            <td>${events.owner_email}</td>
                            <td>${events.number_tickets}</td>
                `;
                tr.innerHTML = trContent;
                document.querySelector('.table__reserves tbody').appendChild(tr);
            })
        })
        .catch(error => {
            alert('Requisição fahou: ' + error)
            console.log(error);
        })
}



    // Outra forma de formatar a data
    // <td>${new Date(events.scheduled).toLocaleString()}</td>