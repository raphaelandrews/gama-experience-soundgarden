
let eventName1 = document.getElementById("eventName"),
    scheduled1 = document.getElementById("scheduled"),
    numberTickets1 = document.getElementById("numberTickets"),
    eventID = "",
    form = document.querySelector('.reserves__form'),
    ticketName = document.getElementById('nome'),
    ticketEmail = document.getElementById('email'),
    tickets = document.getElementById("tickets")

const API_URL = "https://xp41-soundgarden-api.herokuapp.com/events";
const API_TICKETS = "https://xp41-soundgarden-api.herokuapp.com/bookings";

function bookModal(id, eventName, scheduled, numberTickets) {
    eventName1.innerHTML = eventName;
    scheduled1.innerHTML = scheduled;
    numberTickets1.innerHTML = "Ingressos disponíveis: " + numberTickets;
    eventID = id;
}

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

// Obter eventos
async function getList() {
    try {
        const response = await fetch(API_URL, {
            method: "GET", headers: {
                "Content-Type": "application/json",
            }
        })
        const data = await response.json();
        data.forEach((events) => {
            const article = document.createElement("article");
            article.classList.add("evento", "card", "p-5", "m-3");
            articleContent = `
                            <h2>${events.name} <br> ${new Date(events.scheduled).toLocaleString('pt-BR', optionsDate) + "<br/>" + new Date(events.scheduled).toLocaleString('pt-BR', optionsTime)}</h2>
                            <h4>${events.attractions}</h4>
                            <p>${events.description}</p>
                            ${events.number_tickets != 0 ?
                    `<button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal" onclick ="bookModal(
                                '${events._id}',
                                '${events.name}',
                                '${new Date(events.scheduled).toLocaleString('pt-BR', optionsDate) + "<br/>" + new Date(events.scheduled).toLocaleString('pt-BR', optionsTime)}',
                                '${events.number_tickets}')"
                            >
                                reservar ingresso
                            </button>`
                    :
                    `<button class="btn btn-dark">
                                ingressos esgotados
                            </button>`
                }
                        `;
            article.innerHTML = articleContent;
            document.querySelector('.shows').appendChild(article);
        })
    }
    catch (error) {
        alert('Requisição falhou: ' + error)
        console.log(error);
    };
}

getList();

// Reservar ingresso
form.onsubmit = async (event) => {
    event.preventDefault();

    let reservesNumber = Number(numberTickets1.innerHTML.split(":")[1]);
    if (Number(tickets.value) > reservesNumber) {
        return alert('Não foi possível realizar a compra, temos apenas ' + reservesNumber + ' disponíveis')
    }

    let bookInfo = {
        "owner_name": ticketName.value,
        "owner_email": ticketEmail.value,
        "number_tickets": tickets.value,
        "event_id": eventID
    }

    try {
        await fetch(API_TICKETS, {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(bookInfo),
        })
        alert("O ticket foi comprado!");
        window.location.replace("admin.html");
    }
    catch (error) {
        alert('Sua reserva falhou: ' + error)
        console.log(error);
    };
};