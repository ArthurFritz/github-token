var express = require('express');
var router = express.Router();
const request = require('request');

router.get('/:code', function(req, response) {
    request.get('https://github.com/login/oauth/access_token?' +
        'client_id=' + process.env.CLIENT_ID + 
        '&client_secret=' + process.env.GITHUB_SECRET +
        '&code ='+ req.params.code
    , (error, res, body) => {
        console.log(res.body);
        if (error) {
            response.status(400).json(error); 
            return;
        }
        const params = new URLSearchParams(body);
        if(params.has("access_token")){
            response.status(200).json({token:params.get("access_token")}); 
        } else {
            response.status(400).json({token:"Token não disponível"}); 
        }
      })

});

module.exports = router;
