const modal = document.getElementById("modal");
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

var options = {
    /*weekday: "short",*/
    year: "numeric",
    month: "2-digit",
    day: "numeric"
};

var options2 = {
    /*timeZoneName: 'short',*/
    hour: '2-digit',
    minute: '2-digit'
};

// Eventos na página inicial
function getSDEvents() {
    fetch(API_URL)
        .then(response => {

            if (!response.ok) {
                return new Error("Requisção falhou");
            }

            return response.json();
        })
        .then(data => {
            data.forEach((events, index) => {
                if (index < 3) {
                    const article = document.createElement("article");
                    article.classList.add("evento", "card", "p-5", "m-3");
                    articleContent = `
                                <h2 id=${"show" + index}>${events.name} <br> ${new Date(events.scheduled).toLocaleString('pt-BR', options) + "<br/>" + new Date(events.scheduled).toLocaleString('pt-BR', options2)}</h2>
                                <h4 id=${"attractions" + index}>${events.attractions}</h4>
                                <p>${events.description}</p>
                                <button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal" onclick ="bookModal(
                                    '${events._id}',
                                    '${events.name}',
                                    '${new Date(events.scheduled).toLocaleString()}',
                                    '${events.number_tickets}')"
                                >
                                    reservar ingresso
                                </button>
                `;
                    article.innerHTML = articleContent;
                    document.querySelector('.shows').appendChild(article);
                }
            })
            banner1();
        })
        .catch(error => {
            alert('Requisição falhou: ' + error)
            console.log(error);
        })

}
getSDEvents();


function banner1() {
    let banner1Title = document.getElementById("show0").innerHTML,
        banner1Text = document.getElementById("attractions0").innerHTML,
        bannerTitle1 = document.getElementById("bannerTitle1"),
        bannerText1 = document.getElementById("bannerText1"),
        banner2Title = document.getElementById("show1").innerHTML,
        banner2Text = document.getElementById("attractions1").innerHTML,
        bannerTitle2 = document.getElementById("bannerTitle2"),
        bannerText2 = document.getElementById("bannerText2"),
        banner3Title = document.getElementById("show2").innerHTML,
        banner3Text = document.getElementById("attractions2").innerHTML,
        bannerTitle3 = document.getElementById("bannerTitle3"),
        bannerText3 = document.getElementById("bannerText3");
    bannerTitle1.innerHTML = banner1Title;
    bannerText1.innerHTML = banner1Text;
    bannerTitle2.innerHTML = banner2Title;
    bannerText2.innerHTML = banner2Text;
    bannerTitle3.innerHTML = banner3Title;
    bannerText3.innerHTML = banner3Text;
}

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



