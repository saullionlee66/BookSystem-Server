const express = require('express');
const app = express();
const PORT = 5000;
const cors = require('cors');
const fs = require('fs');
var bookData = JSON.parse(fs.readFileSync('./Data/bookData.json',err=>{console.log(err)}))

app.use(express.urlencoded({extended:false}));
app.use(express.json());
app.use(cors());

app.get('/', (req,res) => {
    console.log(bookData);
    res.send(bookData);
});

app.post('/data', (req,res)=>{
    const name = req.body.name;
    const id = req.body.id;
    const price = req.body.price;
    const newData = {
        name,id,price
    }
    bookData.push(newData);
    console.log(bookData)
    fs.writeFile('./Data/bookData.json',JSON.stringify(bookData,null,2),err=>{
        console.log(err);
    })
    res.send("ok")
})

app.put('/update', (req,res)=>{
    const id = req.body.id;
    const name = req.body.name;
    const price = req.body.price;
    bookData.map( book => {
        if(book.id === id){
            book.price = price;
            book.name = name;
        }
    })
    fs.writeFile('./Data/bookData.json',JSON.stringify(bookData,null,2),err=>{
        console.log(err);
    })
    res.send("ok")
})

app.delete('/delete', (req,res)=>{
    const id = req.body.id;
    console.log(req.body)
    console.log(req)

    for(let i=0; i<bookData.length;i++){
        if(bookData[i].id === id)
            bookData.splice(i,1);
    }
    console.log(bookData);
    fs.writeFile('./Data/bookData.json',JSON.stringify(bookData,null,2),err=>{
        console.log(err);
    })
    res.send("ok")
})

app.listen(PORT, () =>{
    console.log(`Server is listening to PORT: ${PORT}`);
})

