const express = require('express');
const app = express();

const PORT = process.env.PORT || 8080;

app.use(express.static(__dirname + '/dist/sast'));

app.get('/*', (req, res) => {
    res.sendFile(__dirname + '/dist/sast/index.html');
});

app.listen(PORT, ()=>{
    console.log('Servidor iniciado na porta ' + PORT);
})