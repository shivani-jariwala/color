const express = require('express')
const app = express()
const request = require('request')
const fs = require('fs')
const image = require('get-image-data')

app.get('/color',(req,res)=>{
  url = req.query.src
    //function to download image from url  
    const download = (url, path, callback) => {
      request.head(url, (err, res, body) => {
        request(url)
          .pipe(fs.createWriteStream(path))
          .on('close', callback)
      })
    }
    const path = './image.jpg'
    download(url, path, () => {
      console.log('Image downloaded')
    })

    //to extract pixels
    image('./image.jpg', function (err, info) {
      var data = info.data
      const l = data.length
      for (var i = 0; i < l; i += 4) {
        var red = data[i]
        var green = data[i + 1]
        var blue = data[i + 2]
        var alpha = data[i + 3]
      }
      
      //function to convert rgb to hex 
      const rgbToHex = (r, g, b) => '#' + [r, g, b].map(x => {
        const hex = x.toString(16)
        return hex.length === 1 ? '0' + hex : hex
        }).join('')
        
        const result = rgbToHex(red,green,blue)
        const border = rgbToHex(data[0],data[1],data[2])
        res.json({logo_border:border,dominant_color:result})
    }) 
})  

app.listen(3000,()=>{
    console.log("server started at 3000")
})