let eventName = document.getElementById('nome'),
  poster = document.getElementById('banner'),
  attractions = document.getElementById('atracoes'),
  description = document.getElementById('descricao'),
  scheduled = document.getElementById('data'),
  numberTickets = document.getElementById('lotacao'),
  form = document.querySelector("form"),
  id = window.location.search.split("=")[1];
/*params = new URLSearchParams(location.search);*/
const API_URL = "https://xp41-soundgarden-api.herokuapp.com/events";

async function getList() {
  try {
    const response = await fetch(`${API_URL}/${id}`, {
      method: "GET", headers: {
        "Content-Type": "application/json",
      }
    })
    const event = await response.json();
    eventName.value = event.name;
    poster.value = event.poster;
    attractions.value = event.attractions;
    description.value = event.description;
    scheduled.value = event.scheduled;
    numberTickets.value = event.number_tickets;
  }
  catch (error) {
    alert('Requisição fahou: ' + error)
    console.log(error);
  };
};

getList();

form.onsubmit = async (event) => {
  event.preventDefault();

  try {
    await fetch(`${API_URL}/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    })
    alert("O evento foi deletado!");
    window.location.replace("admin.html");
  }
  catch (error) {
    alert('Não foi possível excluir o evento: ' + error)
    console.log(error);
  };
};
