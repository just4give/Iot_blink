var mqtt = require('mqtt')
var client = mqtt.connect('mqtt://broker.hivemq.com')

client.on('connect',function(){
    console.log('connected to broker');
    client.subscribe('techfocus/blink');
    client.publish('techfocus/blink','TRUE');
})

client.on('message',function(topic,message){
    if(topic == 'techfocus/blink'){
        console.log("Received message:",message.toString());
    }
})

var express = require('express');
var app = new express();
var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var port = process.env.PORT || 8600;
var router = express.Router();


router.get('/on', function(req, res) {
    client.publish('techfocus/blink','ON');
    res.json({ message: 'LED turned on' });
});

router.get('/off', function(req, res) {
    client.publish('techfocus/blink','OFF');
    res.json({ message: 'LED turned off' });
});


app.use('/led', router);

app.listen(port,function(server){
    console.log('Magic happens on port ' + port);
});
