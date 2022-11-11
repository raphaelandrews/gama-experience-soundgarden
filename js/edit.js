let eventName = document.getElementById('nome'),
    poster = document.getElementById('banner'),
    attractions = document.getElementById('atracoes'),
    description = document.getElementById('descricao'),
    scheduled = document.getElementById('data'),
    numberTickets = document.getElementById('lotacao'),
    form = document.querySelector("form"),
    id = window.location.search.split("=")[1];

const API_URL = "https://xp41-soundgarden-api.herokuapp.com/events";

fetch(`${API_URL}/${id}`, { method: "GET", })
    .then(response => {
        return response.json();
    }).then(event => {
        eventName.value = event.name;
        poster.value = event.poster;
        attractions.value = event.attractions.join(", ");
        description.value = event.description;
        scheduled.value = event.scheduled;
        numberTickets.value = event.number_tickets;
    })
    .catch(error => {console.error(error)});

form.onsubmit = (event) => {
    event.preventDefault();

    eventInfo = {
        "name": eventName.value,
        "poster": "poster",
        "attractions": attractions.value.split(","),
        "description": description.value,
        "scheduled": scheduled.value,
        "number_tickets": numberTickets.value
    }

    fetch(`${API_URL}/${id}`, {
        method: 'PUT',
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(eventInfo),
    })
        .then(() => {
            alert("O evento foi alterado!");
            window.location.replace("admin.html");
        })
        .catch(error => {
            alert('Não foi possível editar o evento: ' + error)
            console.log(error);
        })
};