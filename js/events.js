
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

function getSDList() {
    fetch(API_URL)
        .then(response => {
            if (!response.ok) { return new Error("Requisção falhou") }
            return response.json();
        })
        .then(data => {
            data.forEach((events) => {

                const article = document.createElement("article");
                article.classList.add("evento", "card", "p-5", "m-3");
                articleContent = `
                            <h2>${events.name} - ${events.scheduled}</h2>
                            <h4>${events.attractions}</h4>
                            <p>${events.description}</p>
                            <button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal" onclick ="bookModal(
                                '${events._id}',
                                '${events.name}',
                                '${events.scheduled}',
                                '${events.number_tickets}')"
                            >
                                reservar ingresso
                            </button>
                `;
                article.innerHTML = articleContent;
                document.querySelector('.shows').appendChild(article);

            })
        })
        .catch(error => { console.error(error) });
}

getSDList();

// Reservar ingresso
form.onsubmit = (event) => {
    event.preventDefault();

    let bookInfo = {
        "owner_name": ticketName.value,
        "owner_email": ticketEmail.value,
        "number_tickets": tickets.value,
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
        .then(() => {
            alert("O ticket foi comprado!");
            window.location.replace("admin.html");
        })
        .catch(error => {
            alert('Sua reserva falhou: ' + error)
            console.log(error);
        })
};