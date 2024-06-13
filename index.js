const express = require('express');
const conectarDB = require('./config/db');
const { Resend } = require('resend');

const app = express();
const bodyparser = require('body-parser');

const resend = new Resend('re_ZdN3ba4w_DTihDu2aP2eAWvnHSigqqPTw');
//const resend = new Resend('re_CaZ7HdvK_JXxkeaxA4MmQicFkiiJJxYBC');

var server = require('http').createServer(app);
var io = require('socket.io')(server,{
    cors: {origin: '*'}
});

io.on('connection', function(socket){
    socket.on('delete-carrito',function(data){
        io.emit('new-carrito',data);
        console.log(data);
    });

    socket.on('add-carrito-add',function(data){
        io.emit('new-carrito-add',data);
        console.log(data);
    });
});

conectarDB();

app.use(bodyparser.urlencoded({extended:true}));
app.use(bodyparser.json({limit:'50mb', extended:true}));

app.use((req,res,next)=>{
    res.header('Access-Control-Allow-Origin','*'); 
    res.header('Access-Control-Allow-Headers','Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Access-Control-Allow-Request-Method');
    res.header('Access-Control-Allow-Methods','GET, PUT, POST, DELETE, OPTIONS');
    res.header('Allow','GET, PUT, POST, DELETE, OPTIONS');
    next();
});

app.use('/api', require('./routes/usuario'));
app.use('/api',require('./routes/producto'));
app.use('/api',require('./routes/cupon'));
app.use('/api',require('./routes/config'));
app.use('/api',require('./routes/carrito'));
app.use('/api',require('./routes/descuento'));
app.use('/api', require('./routes/pedido'));
app.post('/api/send-email', async (req, res) => {
    const { from, to, subject, html } = req.body;
  
    try {
      const { data, error } = await resend.emails.send({
        from: from,
        to: to,
        subject: subject,
        html: html
      });
  
      if (error) {
        console.error({ error });
        return res.status(500).json({ error: 'Error sending email' });
      }
  
      console.log({ data });
      return res.json({ message: 'Email sent successfully' });
    } catch (error) {
      console.error('Error sending email:', error);
      return res.status(500).json({ error: 'Error sending email' });
    }
  });

server.listen(4201, () =>{
    console.log('El servidor esta corriendo perfectamente');
})
