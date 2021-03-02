
const express = require('express');
const auth = require('../middleware/auth');
const router = express.Router(); 


router.post('/',auth, (req,res)=>{
    if(req.files ===null){
        return res.status(400).json({msg:'No files was uploaded.'})
    }
    const file = req.files.file;
    const rnd = Math.random().toString().substr(7);
    
    const ext = file.name.substr(file.name.length-4);
    file.name = rnd + ext;

    file.mv(`${__dirname}/../client/public/uploads/${file.name}`,err => {
        if(err){
            console.error(err);
            return res.status(500).send(err);
        }
        res.status(200).json({fileName:file.name,filePath:`/uploads/${file.name}`});
    });

});

module.exports = router; 