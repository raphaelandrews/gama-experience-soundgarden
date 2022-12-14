const API_URL = "https://xp41-soundgarden-api.herokuapp.com/events";
const API_TICKETS = "https://xp41-soundgarden-api.herokuapp.com/bookings";
const API_TICKETS_ID = "https://xp41-soundgarden-api.herokuapp.com/bookings/event";
const API_TICKET_DELETE = "https://xp41-soundgarden-api.herokuapp.com/bookings"

let modal = document.getElementById("exampleModal");

var optionsDate = {
    /*weekday: "short",*/
    year: "numeric",
    month: "2-digit",
    day: "numeric"
};

var optionsTime = {
    /*timeZoneName: 'short',*/
    hour: '2-digit',
    minute: '2-digit'
};

async function getList() {
    try {
        const response = await fetch(API_URL, {
            method: "GET", headers: {
                "Content-Type": "application/json",
            }
        });
        const data = await response.json();

        data.forEach((events, index) => {
            const tr = document.createElement("tr");
            trContent = `
                        <td scope="row">${index + 1}</td>
                        <td>${new Date(events.scheduled).toLocaleString('pt-BR', optionsDate) + "<br/>" + new Date(events.scheduled).toLocaleString('pt-BR', optionsTime)}</td>
                        <td>${events.name}</td>
                        <td>${events.attractions}</td>
                        <td>
                            <button type="button" class="btn aaa btn-dark" data-bs-toggle="modal" data-bs-target="#exampleModal" onclick="getLists('${events._id}')">ver reservas</button>
                            <a href="editar-evento.html?id=${events._id}" class="btn btn-secondary">editar</a>
                            <a href="excluir-evento.html?id=${events._id}" class="btn btn-danger">excluir</a>
                        </td>
            `;
            tr.innerHTML = trContent;
            document.querySelector('table tbody').appendChild(tr);
        });
    }
    catch (error) {
        alert('Requisição falhou: ' + error)
        console.log(error);
    };
};

getList();

async function getLists(id) {
    try {
        const response = await fetch(`${API_TICKETS_ID}/${id}`, {
            method: "GET", headers: {
                "Content-Type": "application/json",
            }
        });
        const data = await response.json();

        const trbody = document.querySelector(".tbody__reserves");
        trbody.innerHTML = '';
        document.querySelector('.table__reserves').appendChild(trbody);

        data.forEach((events, index) => {
            const tr = document.createElement("tr");
            trContent = `
                            <td scope="row">${index + 1}</td>
                            <td>${events.owner_name}</td>
                            <td>${events.owner_email}</td>
                            <td id="numberTicketsUpdate">${events.number_tickets}</td>
                            <td>
                                <a onclick="deleteReserve('${events._id}')" class="btn btn-danger">excluir</a>
                            </td>
                `;
            tr.innerHTML = trContent;
            document.querySelector('.table__reserves tbody').appendChild(tr);
        })
    }
    catch (error) {
        alert('Requisição falhou: ' + error)
        console.log(error);
    };
}

async function deleteReserve(id) {
    try {
        let confirmDelete = confirm('Deseja excuir a reserva?')
        if (confirmDelete === false) {
            return false
        } else {
            await fetch(`${API_TICKET_DELETE}/${id}`, {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                },
            })
            alert("A reserva foi deletada!");
            window.location.reload()
        }
    }
    catch (error) {
        alert('Não foi possível excluir a reserva: ' + error)
        window.location.reload()
    };
}

// Arualizar o número de reservas após deletar
function updateReserve() {
    let numberTicketsUpdate = document.getElementById("numberTicketsUpdate")
    let updateReserve = Number(numberTicketsUpdate.innerHTML)

    let bookInfo = {
        "owner_name": ticketName.value,
        "owner_email": ticketEmail.value,
        "number_tickets": updateReserve,
        "event_id": eventID
    }

    fetch(API_TICKETS, {
        method: 'POST',
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(bookInfo),
    })
        .then(response => {
            return response.json();
        })
};