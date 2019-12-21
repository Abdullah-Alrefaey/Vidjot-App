const express = require('express');
const path = require('path');
const exphbs = require('express-handlebars');
const methodOverride = require('method-override');
const flash = require('connect-flash');
const passport = require('passport');
const bodyParser = require('body-parser');
const session = require('express-session');
const mongoose = require('mongoose');

const port = process.env.PORT || 5000;

const app = express();

// Load routers
const ideas = require('./routes/ideas');
const users = require('./routes/users');

// Passport Config
require('./config/passport')(passport);

// DB Config
const db = require('./config/database');

// Connect to mongoose
mongoose.connect(db.mongoURI, {
    useUnifiedTopology: true,
    useNewUrlParser: true
})
    .then(()=>{
        console.log('MongoDB Connected...');
    })
    .catch(err =>{
        console.log(err);
    });

// HandleBars middleware //
app.engine('handlebars', exphbs({
    defaultLayout: 'main'
}));

app.set('view engine', 'handlebars');

// Body parser middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Join paths
app.use(express.static(path.join(__dirname, 'public')));

// Method override middleware
app.use(methodOverride('_method'));

// express-session middleware
app.use(session({
    secret: 'secret',
    resave: true,
    saveUninitialized: true,
}));

// Passport middleware
app.use(passport.initialize());
app.use(passport.session());

// flash middleware //
app.use(flash());

// Global vavriables //
app.use(function (req, res, next) {
    res.locals.success_msg = req.flash('success_msg');
    res.locals.error_msg = req.flash('error_msg');
    res.locals.error = req.flash('error');
    res.locals.user = req.user || null;
    next();
});

app.listen(port, ()=> {
    console.log(`Server started on port ${port}`);
});

// Index route //
app.get('/', (req,res)=>{
    // console.log(req.name);
    res.render('index');
});

// About Route //
app.get('/about', (req,res) => {
    res.render('about');
});

// Use routes
app.use('/ideas', ideas);
app.use('/users', users);