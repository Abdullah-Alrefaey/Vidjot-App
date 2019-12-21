if (process.env.NODE_ENV === 'production')
{
    module.exports = {mongoURI: 
    'mongodb+srv://vidjot_app_r:idyou45vid123@cluster0-xivw5.mongodb.net/vidjot-prod?retryWrites=true&w=majority'}
}

else
{
    module.exports = {mongoURI: 'mongodb://localhost/vidjot-dev'}
}