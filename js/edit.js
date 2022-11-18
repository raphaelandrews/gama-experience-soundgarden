let eventName = document.getElementById('nome'),
    poster = document.getElementById('banner'),
    attractions = document.getElementById('atracoes'),
    description = document.getElementById('descricao'),
    scheduled = document.getElementById('data'),
    numberTickets = document.getElementById('lotacao'),
    form = document.querySelector("form"),
    id = window.location.search.split("=")[1];

const API_URL = "https://xp41-soundgarden-api.herokuapp.com/events";

async function getEvent() {
    try {
        const response = await fetch(`${API_URL}/${id}`, {
            method: "GET", headers: {
                "Content-Type": "application/json",
            }
        });
        const event = await response.json();
        eventName.value = event.name;
        poster.value = event.poster;
        attractions.value = event.attractions.join(", ");
        description.value = event.description;
        scheduled.value = event.scheduled;
        numberTickets.value = event.number_tickets;
    }
    catch (error) {
        alert('Requisição falhou: ' + error)
        console.log(error);
    };
}

getEvent();

form.onsubmit = async (event) => {
    event.preventDefault();

    try {
        eventInfo = {
            "name": eventName.value,
            "poster": "poster",
            "attractions": attractions.value.split(","),
            "description": description.value,
            "scheduled": scheduled.value,
            "number_tickets": numberTickets.value
        }

        await fetch(`${API_URL}/${id}`, {
            method: 'PUT',
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(eventInfo),
        })
        alert("O evento foi alterado!");
        window.location.replace("admin.html");
    }
    catch (error) {
        alert('Não foi possível editar o evento: ' + error)
        console.log(error);
    };
};