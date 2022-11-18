let eventName = document.getElementById('nome'),
  attractions = document.getElementById('atracoes'),
  description = document.getElementById('descricao'),
  scheduled = document.getElementById('data'),
  numberTickets = document.getElementById('lotacao'),
  form = document.querySelector("form");

const API_URL = "https://xp41-soundgarden-api.herokuapp.com/events";

form.onsubmit = async (event) => {
  event.preventDefault();

  try {
    eventInfo = {
      "name": eventName.value,
      "poster": "banner",
      "attractions": attractions.value.split(','),
      "description": description.value,
      "scheduled": new Date(scheduled.value).toISOString(),
      "number_tickets": numberTickets.value
    }

    const response = await fetch(API_URL, {
      method: 'POST',
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(eventInfo),
    })
    await response.json();
    alert("Seu evento foi cadastrado!");
    window.location.replace("./admin.html");
  }
  catch (error) {
    alert('Evento não cadastrado : ' + error)
    console.log(error);
  };
}
