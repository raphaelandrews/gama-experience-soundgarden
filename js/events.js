function getSDList() {
    const API_URL = "https://xp41-soundgarden-api.herokuapp.com/events";
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
                            <a href="#" class="btn btn-primary">reservar ingresso</a>
                `;
                article.innerHTML = articleContent;
                document.querySelector('.shows').appendChild(article);

            })
        })
        .catch(error => { console.error(error) });
}

getSDList();