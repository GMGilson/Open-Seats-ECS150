
let counter = document.getElementById("open-seats");
setInterval(
    () => {
        fetch("/shame",{
            "method": "GET",
            "Content-Type": "application/json"
        })
        .then((response) => {
            console.log(response)
            return response.json();
        })
        .then((body) => {
            counter.innerHTML = `${body.openseats}`
        })
}, 5000);