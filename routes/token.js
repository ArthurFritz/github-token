var express = require('express');
var router = express.Router();
const axios = require('axios');

router.get('/:code', function(req, res) {
    axios.post('https://github.com/login/oauth/access_token', {
        client_id: process.env.CLIENT_ID,
        client_secret: process.env.GITHUB_SECRET,
        code: req.params.code
    }).then(suc=>{
        const params = new URLSearchParams(suc);
        if(params.has("access_token")){
            res.status(200).json({token:params.get("access_token")}); 
        } else {
            res.status(400).json({token:"Token não disponível"}); 
        }
    }).error(error=>{
        res.status(400).json(error); 
    })
});

module.exports = router;
