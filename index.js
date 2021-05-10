
const express = require("express");
const app = express()

app.use(express.json())

app.use(express.static("./"))

app.get("/", (_, res) => {
    res.sendFile(`${__dirname}/index.html`);
});

app.get("/shame", shame)

function shame(request, res){
    const exec = require("child_process").exec;
    exec("./noah.sh",
        {shell: "/bin/zsh"},
        (err, stdout, stderr) => {
        console.log(`stdout: ${stdout}`)
        console.log(`stderr: ${stderr}`)
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

