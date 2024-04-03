const express = require('express');
const mysql = require('mysql');
const cors=require('cors')
const app = express();
const path =require('path');
const PORT = process.env.PORT || 8001;
const static_path=path.join(__dirname,"../public");
// app.use(express.static(static_path));
// app.use(express.static(path.join(__dirname, 'public')));
// Set the view engine to EJS
app.set('view engine', 'ejs');
app.use(express.json());
app.use(express.urlencoded({extended:false}))
// Set the directory for your views (HTML files)
app.set('views', path.join(__dirname, '..', 'public'));

// Serve static files from the 'public' directory
app.use(express.static(path.join(__dirname, '..', 'public')));

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'root123',
    database: 'register'
});

connection.connect((err) => {
    if (err) {
        console.error('Error connecting to MySQL: ' + err);
        return;
    }
    console.log('data base connected');
   

});


app.use(express.json());
app.use(cors())

app.get('/', (req, res) => {
    res.render('homepage');
});

app.get('/dashboard', (req, res) => {
    // Redirect the user to the /dashboard route
    res.render('dashboard');
  });

app.get('/users', (req, res) => {
    connection.query('SELECT * FROM students', (error, results, fields) => {
        if (error) {console.log(error);}
        else{

            console.log(results);
            // res.json(results);cls
            res.send(results)
        }
    });
});

app.post('/sign', (req, res) => {
    const { name,clas,contact,email,password,gender } = req.body
    console.log(req.body);
    connection.query('INSERT INTO students (name,clas,contact,email,password,gender) VALUES (?,?,?,?,?,?)', [name,clas,contact,email,password,gender], (error, results, fields) => {
        if (error){
            console.log(error);
        }else{
                res.render('sigin')
            console.log('user added : ', name,clas,contact,email,password,gender);
        }
    });
});
app.get('/sign', (req, res) => {

    res.render('sigin');
    
});

app.get('/regi', (req, res) => {

    res.render('registration');
    
});

// app.get('/', (req, res) => {

//     res.send("done")
//     res.render('homepage.ejs');
    
// });


// app.post('/sigin', (req, res) => {
//     const { email,password } = req.body
//     console.log(req.body);;
//     connection.query('INSERT INTO students (name,clas,contact,email,password) VALUES (?,?,?,?,?)', [name,clas,contact,email,password], (error, results, fields) => {
//         if (error){
//             console.log(error);
//         }else{

//             console.log('user added : ', name,clas,contact,email,password);
//         }
//     });
   
// });


// app.post

app.post('/home', (req, res) => {
    const { email, password } = req.body;
    const sql = 'SELECT * FROM students WHERE email = ?';
    connection.query(sql, [email], (err, results) => {
        if (err) {
            console.error('Error retrieving user: ', err);
            res.send('Error logging in');
        } else {
            if (results.length > 0) {
                const user = results[0];
                if (password === user.password) {
                 
                    res.render('dashboard')
                } else {
                    res.render('sigin');
                    // res.status(401).send('Incorrect email or password');

                }
            } else {
                res.render('sigin');
            }
            
        }
        
    });
});



// app.post('/userss',(req,res)=>{
//     const { email, password } = req.body;
//     console.log(email);

// })


// Other routes and middleware...

app.listen(PORT, () => {
    
    console.log(`Server is running on port ${PORT}`);
});
