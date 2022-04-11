const express = require('express')
const multer  = require('multer')
const fs = require('fs')

const app = express()
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'public/userFiles/')
    },
    filename: function (req, file, cb) {
      cb(null, file.originalname)
    }
  })
const upload = multer({storage: storage}).single('file')
const port = 3000
const domain = 'localhost:3000'

app.use(express.static('public'))

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/public/index.html')
})

app.post('/', function (req, res) {
    upload(req, res, function (err) {
        res.send(`${domain}/userFiles/${req.file.originalname}`)
        console.log(req.file)
        if (err instanceof multer.MulterError) {
            // A Multer error occurred when uploading.
        } else if (err) {
            // An unknown error occurred when uploading.
        }
        // Everything went fine.
    })
    

})

if (!fs.existsSync('public/userFiles')) {
    fs.mkdirSync('public/userFiles')
}
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
