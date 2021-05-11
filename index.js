console.log(process.version)
const { execFile, spawn } = require("child_process");
const express = require("express");
const app = express()

app.use(express.json())

app.use(express.static("./"))

app.get("/", (_, res) => {
    res.sendFile(`${__dirname}/index.html`);
});

app.get("/shame", shame)

function shame(request, res){
    spawn("/bin/zsh", ["./noah.sh"],
        {cwd: ".", shell: "/bin/zsh"},
        (err, stdout, stderr) => {
        console.log(`stdout: ${stdout}`)
        console.log(`stderr: ${stderr}`)
        console.log(`cwd : ${cwd}`)
        if (err !== null){
            console.log(`exec error : ${err}`);
            res.send("Im a little teapot 418")
            return
        }
        // let seats = stdout.replace(/\s+/g,' ').trim();
        // seats = seats.split(" ").pop()
        let seats = stdout
        res.send(JSON.stringify({openseats : seats}));
        return;
    })
}

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