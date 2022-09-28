const express = require('express');
const app = express();

app.get('/', (req,res) => {
    res.send('hellooooo')
});

app.listen(1984, () => {
    console.log('Serving on port 1984')
})