
const express = require("express");
const app = express()

app.use(express.static("./"))

app.get("/", (_, res) => {
    res.sendFile(`${__dirname}/index.html`);
});

app.get("/shame", shame)

function shame(request, res){
    const exec = require("child_process").exec;
    exec(noah,
        {shell: "/bin/zsh"},
        (err, stdout, stderr) => {
        console.log(`stdout: ${stdout}`)
        console.log(`stderr: ${stderr}`)
        if (err !== null){
            console.log(`exec error : ${err}`);
            res.send("Im a little teapot 418")
            return
        }
        let seats = stdout.replace(/\s+/g,' ').trim();
        seats = seats.split(" ").pop()
        res.send(JSON.stringify({openseats : seats}));
        return;
    })
}


                    

const listener = app.listen(5000, () => {
    console.log(`Listening on port ${listener.address().port}`);
})

const noah = `wget --quiet --method POST --header 'cache-control: no-cache' --header 'content-type: application/x-www-form-urlencoded' --body-data course_number="ECS150" --output-document - https://registrar-apps.ucdavis.edu/courses/search/course_search_results.cfm | tee >(sed -n '143~74p' | sed -r "s/<BR \/>//g" | cat -n) >(sed -n '147~74p' | cat -n) >/dev/null | sort -n | cut -f2- | sed 's/^[[:space:]]*//g' | tail -n 1`