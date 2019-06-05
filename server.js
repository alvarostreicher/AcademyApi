import app from './app';
require('dotenv/config');

app.listen(process.env.APP_PORT, (err) => {
    if(err){
        console.log(err)
    }
    console.log('server running')
});