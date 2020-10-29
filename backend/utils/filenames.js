const fs = require('fs')

module.exports = (dir) =>{
    let filenames = []
    fs.readdirSync(dir).map(filename =>{
        if (filename.includes('index')) return
        const excluded  = filename.replace('.js','')
        filenames.push(excluded)
    })
    
return filenames
}
