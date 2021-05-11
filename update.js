
let counter = document.getElementById("open-seats");
setInterval(
    () => {
        fetch("/shame",{
            "method": "GET",
            "Content-Type": "application/json"
        })
        .then(async (response) => {
            console.log(response)
            return await response.json();
        })
        .then((body) => {
            counter.innerHTML = `${body.openseats}`
        })
        .catch(err => {
            console.log(err);
        })
}, 5000);