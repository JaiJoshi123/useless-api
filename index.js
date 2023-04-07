const express = require('express');
const request = require('request');
const app = express();
require('dotenv').config();

app.use(express.json());

const emotion_api_key = process.env.KOMPREHEND_API_KEY;

//CREATE Request Handler
app.get('/api', async (req, res) => {
    try{
        request.post({url:'http://apis.paralleldots.com/v4/emotion', 
        form: {text:req.body.text,lang_code:"en",api_key:emotion_api_key}}, 
        function(err,httpResponse,body){ 
			if(err){
				res.send({"Error":err})
			}
            console.log(body);
            res.send(body);
		 });
    }catch(e){
        res.status(400).send(e);
    }
});

//PORT ENVIRONMENT VARIABLE
const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}..`));
