
let counter = document.getElementById("open-seats");
setInterval(
    () => {
        fetch("/shame",{method: "GET"})
        .then((response) => {
            response.json()
            .then((body) => {
                counter.innerHTML = `${body.openseats}`
            })
            console.log(response)
    });
}, 10000);