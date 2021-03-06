console.log(process.version)
const { execFile, spawn, exec } = require("child_process");
const express = require("express");
const app = express()

app.use(express.json())

app.use(express.static("./"))

app.get("/", (_, res) => {
    res.sendFile(`${__dirname}/index.html`);
});

app.get("/shame", shame)

function shame(request, res){
    res.send(JSON.stringify({openseats: seatsLeft}));
}

var seatsLeft = -1;

setInterval( () => {
    exec("/home/ggilson/Open-Seats-ECS150/noah.sh",
        {shell: "/bin/zsh"},
        (err, stdout, stderr) => {
        console.log(`stdout: ${stdout}`);
        console.log(`stderr: ${stderr}`);
        if (err !== null) {
            console.log(`exec error : ${err}`);
            return;
        }
        // let seats = stdout.replace(/\s+/g,' ').trim();
        // seats = seats.split(" ").pop()
        seatsLeft = stdout;
    });
}, 5000);

const listener = app.listen(8080, () => {
    console.log(`Listening on port ${listener.address().port}`);
})

let query = `wget --quiet \
     --method POST \
     --header 'cache-control: no-cache' \
     --header 'content-type: application/x-www-form-urlencoded' \
     --body-data course_number="ECS150" \
     --output-document \
        - https://registrar-apps.ucdavis.edu/courses/search/course_search_results.cfm | awk 'BEGIN { p = 0 } p==1 && /[^.][0-9]+[[:space:]]*$/ { print $1; exit 0 } /<em>$/ { p = 1 }'`