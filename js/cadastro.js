let eventName = document.getElementById('nome'),
  attractions = document.getElementById('atracoes'),
  description = document.getElementById('descricao'),
  scheduled = document.getElementById('data'),
  numberTickets = document.getElementById('lotacao'),
  form = document.querySelector("form");

const API_URL = "https://xp41-soundgarden-api.herokuapp.com/events";

form.onsubmit = (event) => {
  event.preventDefault();

  //Tentei com o toISOString, mas só retornava 400
  // YYYY-MM-DDTHH:mm:ss.sssZ
  //const dateForm = new Date(scheduled.value).toISOString();
  const dateForm = '20' + scheduled.value.split(' ')[0]
    .split('/').reverse().join('-') + 'T' + scheduled.value
      .split(' ')[1] + ':00.000Z';

  eventInfo = {
    "name": eventName.value,
    "poster": " ",
    "attractions": attractions.value.split(','),
    "description": description.value,
    "scheduled": dateForm,
    "number_tickets": numberTickets.value
  }

  fetch(API_URL, {
    method: 'POST',
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(eventInfo),
  })
    .then(response => {
      console.log(response);
      alert("Seu evento foi cadastrado!");
      window.location.replace("./admin.html");
    })
    .catch(error => {
      console.log(error);
      alert('Evento não cadastrado : ' + error)
    })
}

// Funcionalidade para talvez adicionar
// Opção de cadastrar novo evento ou sair da página
