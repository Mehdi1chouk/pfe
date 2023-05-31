const express = require('express')
const app = express()
const path = require('path');
cors = require('cors');
bodyParser = require('body-parser');
const mongoose = require('mongoose');
dbConfig = require('./db/database');
app.use(express.json());
app.use(express.urlencoded({ extended: false }))
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
const multer = require('multer');

const Villa = require('./model/villa');
const Maison = require('./model/maison');
const Appartement = require('./model/appartement');
const MaisonHote = require('./model/maisonhote');
const ChambrePartage = require('./model/chambrepartage');


const User = require('./model/user');
const bcrypt = require('bcrypt');
require("dotenv").config();
const session = require('express-session');
app.use(errHandler);


const secretKey = 'fjkdgfjkdgdkjgdfkjhjfgjhjfzsqsqxg';

app.use(session({
    secret: 'fdgjfkgjfdgfdgkjfdhgkjfdgfdjk',
    resave: false,
    saveUninitialized: true
}));


mongoose.Promise = global.Promise;
mongoose.connect(dbConfig.db, {
    useNewUrlParser: true
}).then(() => {
        console.log('Connected to database');
    },
    error => {
        console.log('Error connecting' + error)
    }
)


const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, './uploads/images');
    },
    filename: function(req, file, cb) {
        cb(null, Date.now() + '-' + file.originalname);
    }
});

const upload = multer({
    storage: storage,
    limits: {
        fileSize: Infinity
    }

})
app.use('/photos', express.static('uploads/images'));

function errHandler(err, req, res, next) {
    if (err instanceof multer.MulterError) {
        res.json({
            success: 0,
            message: err.message
        })
    }
}




app.get('/', (req, res) => {
    res.send('Hello NODE API')
})

app.get('/oo', (req, res) => {
    res.send('Hello')
})

app.listen(3030, () => {
    console.log(`Node API app is running on port 3030`)
});

app.get('/getUser/:id', async(req, res) => {
    const userId = req.params.id;
    try {
        const user = await User.findById(userId).select('nom email');
        res.json(user);
    } catch (err) {
        res.status(500).json({ message: 'Failed to retrieve user', error: err });
    }
});

app.get('/HousesList', (req, res) => {
    Promise.all([
            Villa.find(),
            Maison.find(),
            Appartement.find(),
            MaisonHote.find(),
            ChambrePartage.find()
        ])
        .then(([villas, maisons, appartements, maisonsHotes, chambresPartages]) => {
            const houses = [...villas, ...maisons, ...appartements, ...maisonsHotes, ...chambresPartages];
            res.json(houses);

        })
        .catch(err => {
            console.log('hedha houwa', err);
            res.json(err);

        });
});



app.get('/GetHouse/:id', (req, res) => {
    const id = req.params.id;
    Promise.all([
            Villa.findById(id),
            Maison.findById(id),
            Appartement.findById(id),
            MaisonHote.findById(id),
            ChambrePartage.findById(id)
        ])
        .then(([villa, maison, appartement, maisonHote, chambrePartage]) => {
            const house = villa || maison || appartement || maisonHote || chambrePartage;
            if (house) {
                res.json(house);
            } else {
                res.status(404).send('House not found');
            }
        })
        .catch(err => {
            console.log(err);
            res.status(500).send('Internal Server Error');
        });
});

app.put('/UpdateHouse/:id', upload.array('photos', 4), async(req, res) => {
    try {
        const houseId = req.params.id;
        const fileUrls = [];
        const ownerId = req.body.owner;

        if (req.files) {
            for (const file of req.files) {
                fileUrls.push(`http://localhost:3030/photos/${file.filename}`);
            }
        }


        const {
            selectedtype,
            selectedOption,
            etat,
            date1,
            date2,
            region,
            delegation,
            localite,
            cp,
            surface,
            chambre,
            lits,
            sdb,
            prix,
            titre,
            description,
            icons,
            localisation
        } = req.body;

        let updatedHouse;
        console.log('type', selectedtype)

        switch (selectedtype) {
            case 'Appartement':
                updatedHouse = await Appartement.findByIdAndUpdate(
                    houseId, {
                        owner: ownerId,
                        selectedtype,
                        selectedOption,
                        etat,
                        date1,
                        date2,
                        region,
                        delegation,
                        localite,
                        cp,
                        surface,
                        chambre,
                        lits,
                        sdb,
                        prix,
                        photos: fileUrls,
                        titre,
                        description,
                        icons,
                        localisation
                    }, { new: true }
                );
                break;
            case 'Villa':
                updatedHouse = await Villa.findByIdAndUpdate(
                    houseId, {
                        owner: ownerId,
                        selectedtype,
                        selectedOption: "0",
                        etat,
                        date1,
                        date2,
                        region,
                        delegation,
                        localite,
                        cp,
                        surface,
                        chambre,
                        lits,
                        sdb,
                        prix,
                        photos: fileUrls,
                        titre,
                        description,
                        icons,
                        localisation
                    }, { new: true }
                );
                break;
            case 'Maison':
                updatedHouse = await Maison.findByIdAndUpdate(
                    houseId, {
                        owner: ownerId,
                        selectedtype,
                        selectedOption: "0",
                        etat,
                        date1,
                        date2,
                        region,
                        delegation,
                        localite,
                        cp,
                        surface,
                        chambre,
                        lits,
                        sdb,
                        prix,
                        photos: fileUrls,
                        titre,
                        description,
                        icons,
                        localisation
                    }, { new: true }
                );
                break;
            case 'maison d\'hôte':
                updatedHouse = await MaisonHote.findByIdAndUpdate(
                    houseId, {
                        owner: ownerId,
                        selectedtype,
                        selectedOption: "0",
                        etat,
                        date1,
                        date2,
                        region,
                        delegation,
                        localite,
                        cp,
                        surface,
                        chambre,
                        lits,
                        sdb,
                        prix,
                        photos: fileUrls,
                        titre,
                        description,
                        icons,
                        localisation
                    }, { new: true }
                );
                break;
            case 'chambre partagé':
                updatedHouse = await ChambrePartage.findByIdAndUpdate(
                    houseId, {
                        owner: ownerId,
                        selectedtype,
                        selectedOption,
                        etat,
                        date1,
                        date2,
                        region,
                        delegation,
                        localite,
                        cp,
                        surface,
                        chambre,
                        lits,
                        sdb,
                        prix,
                        photos: fileUrls,
                        titre,
                        description,
                        icons,
                        localisation
                    }, { new: true }
                );
                break;
            default:
                return res.status(400).json({ message: 'Invalid house type selected' });
        }

        if (!updatedHouse) {
            return res.status(404).json({ message: 'House not found' });
        }

        res.status(200).json({ message: 'House updated successfully', house: updatedHouse });
    } catch (error) {
        res.status(500).json({ message: 'Failed to update house', error: error });
    }
});


app.delete('/DeleteHouse/:id', (req, res) => {
    const id = req.params.id;

    Promise.all([
            Villa.findByIdAndDelete(id),
            Maison.findByIdAndDelete(id),
            Appartement.findByIdAndDelete(id),
            MaisonHote.findByIdAndDelete(id),
            ChambrePartage.findByIdAndDelete(id)
        ])
        .then(([villa, maison, appartement, maisonHote, chambrePartage]) => {
            const deletedHouse = villa || maison || appartement || maisonHote || chambrePartage;
            if (deletedHouse) {
                res.status(200).send('House deleted successfully');
            } else {
                res.status(404).send('House not found');
            }
        })
        .catch(err => {
            console.log(err);
            res.status(500).send('Internal Server Error');
        });
});








app.post('/register', async(req, res) => {
    const { nom, email, password1, password2 } = req.body;

    // validate user input
    if (!nom || !email || !password1 || !password2) {
        return res.status(400).json({ message: 'All fields are required ooo' });
    }

    if (password1 !== password2) {
        return res.status(400).json({ message: 'Passwords do not match' });
    }

    try {
        // check if user already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: 'Email already in use' });
        }

        const saltRounds = 10;

        const hashedPassword = await bcrypt.hash(password1, saltRounds);

        // create a new user
        const newUser = new User({
            nom,
            email,
            password2: hashedPassword,
        });

        // save the new user to the database
        await newUser.save();

        // send a response to the client
        res.json({ message: 'User registered successfully' });
    } catch (err) {
        return res.status(500).json({ message: 'Internal server error' });
    }
});






app.post('/login', async(req, res) => {
    const { email, password } = req.body;

    // find the user by email
    const user = await User.findOne({ email });

    // if no user is found, return an error message
    if (!user) {
        return res.status(400).json({ message: 'Invalid credentials' });
    }

    // compare the hashed password with the entered password
    const isMatch = await bcrypt.compare(password, user.password2);

    // if the passwords don't match, return an error message
    if (!isMatch) {
        console.log('aaaaaa');
        return res.status(400).json({ message: 'Invalid credentials' });
    }

    // store the user ID in the session
    req.session.userId = user.id;

    // log the user ID
    console.log('User ID:', user.id);

    // log the session
    console.log('Session:', req.session);

    // create a response object with the user ID and name
    const response = {
        userId: user.id,
        userName: user.nom
    };
    console.log('name:', response.userName);


    // return the response
    res.json(response);
});






const requireLogin = async(req, res, next) => {


    const userId = req.body.owner;
    // console.log(userId)

    if (!userId) {
        return res.status(401).json({ message: 'Unauthorized one' });
    }

    try {
        const user = await User.findById(userId);
        // console.log('user', user)

        if (!user) {
            return res.status(401).json({ message: 'Unauthorized two' });
        }

        req.user = user;
        next();
    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: 'Server error' });
    }
};



/*
app.post('/AddHouse', upload.array('photos', 4), async(req, res) => {
    var fileUrls = [];
    const ownerId = req.body.owner;
    console.log('mmmmmmm')

    if (req.files) {
        console.log('req files : ', req.files)
        await req.files.forEach(async(file) => {
            fileUrls.push(`http://localhost:3030/photos/${file.filename}`);
            // res.status(200).json({ fileUrls: fileUrls })


        });
    }
    console.log('filesurl : ', fileUrls)

    // retrieve other properties from request body
    const { selectedtype, selectedOption, etat, date1, date2, region, delegation, localite, cp, surface, chambre, lits, sdb, prix, titre, description } = req.body;

    switch (selectedtype) {
        case 'Appartement':
            console.log('fileurls', fileUrls)
            console.log('reqfiles', req.files)
            const newAppartement = new Appartement({
                owner: ownerId,
                selectedtype,
                etat,
                date1,
                date2,
                region,
                delegation,
                localite,
                cp,
                surface,
                chambre,
                lits,
                sdb,
                prix,
                photos: fileUrls,
                titre,
                description,
                icons: req.body.icons,
            });
            newAppartement.save().then((response) => {
                    console.log(response)
                    const message = {
                        message: 'appartement added successfully'
                    };
                    res.status(200).json(message);
                })
                .catch((err) => {
                    res.status(500).json({ message: 'Failed to add house', error: err });
                });
            break;


        case 'Villa':
            const newVilla = new Villa({
                owner: ownerId,
                selectedtype,
                selectedOption: "0",
                etat,
                date1,
                date2,
                region,
                delegation,
                localite,
                cp,
                surface,
                chambre,
                lits,
                sdb,
                prix,
                photos: fileUrls,
                titre,
                description,
                icons: req.body.icons,
            });
            newVilla.save().then(() => {
                    const response = {
                        message: 'villa added successfully'
                    };
                    res.status(200).json(response);
                })
                .catch((err) => {
                    res.status(500).json({ message: 'Failed to add house', error: err });
                });

            break;

            // handle other cases here

        case 'Maison':
            const newMaison = new Maison({
                owner: ownerId,
                selectedtype,
                selectedOption: "0",
                etat,
                date1,
                date2,
                region,
                delegation,
                localite,
                cp,
                surface,
                chambre,
                lits,
                sdb,
                prix,
                photos: fileUrls,
                titre,
                description,
                icons: req.body.icons,
            });
            newMaison.save().then(() => {
                    const response = {
                        message: 'maison added successfully'
                    };
                    res.status(200).json(response);
                })
                .catch((err) => {
                    res.status(500).json({ message: 'Failed to add house', error: err });
                });

            break;



        case 'maison d\'hôte':
            const newMaisonHote = new MaisonHote({
                owner: ownerId,
                selectedtype,
                selectedOption: "0",
                etat,
                date1,
                date2,
                region,
                delegation,
                localite,
                cp,
                surface,
                chambre,
                lits,
                sdb,
                prix,
                photos: fileUrls,
                titre,
                description,
                icons: req.body.icons,
            });
            newMaisonHote.save().then(() => {
                    const response = {
                        message: 'maison dhote added successfully'
                    };
                    res.status(200).json(response);
                })
                .catch((err) => {
                    res.status(500).json({ message: 'Failed to add house', error: err });
                });
            break;

        case 'chambre partagé':
            const newChambrePartage = new ChambrePartage({
                owner: ownerId,
                selectedtype,
                selectedOption,
                etat,
                date1,
                date2,
                region,
                delegation,
                localite,
                cp,
                surface,
                chambre,
                lits,
                sdb,
                prix,
                photos: fileUrls,
                titre,
                description,
                icons: req.body.icons,
            });
            newChambrePartage.save().then(() => {
                    const response = {
                        message: 'ch partagé added successfully'
                    };
                    res.status(200).json(response);
                })
                .catch((err) => {
                    res.status(500).json({ message: 'Failed to add house', error: err });
                });

            break;
        default:
            res.status(400).json({ message: 'Invalid house type selected' });
            break;


    }
});*/

//app.use(upload.any());

app.post('/AddHouse', upload.array('photos'), async(req, res) => {
    try {
        const photos = [];
        const ownerId = req.body.owner;
        console.log('mmmmmmm')

        if (req.files) {
            for (const file of req.files) {
                photos.push(`http://localhost:3030/photos/${file.filename}`);
            }
        }
        console.log('filesurl : ', req.files)



        /*  if (req.files) {
              console.log('req files : ', req.files)
              for (const file of req.files) {
                  photos.push(`http://localhost:3030/photos/${file.filename}`);
                  //  res.status(200).json({ fileUrls: fileUrls })


              }
          }
          console.log('filesurl : ', fileUrls)*/


        /* if (req.files) {
             for (const file of req.files) {
                 photos.push(`http://localhost:3030/photos/${file.filename}`);
             }
         }
         console.log('filesurl : ', req.files)*/

        if (typeof req.body.photos === 'String') {
            const jsonPhotos = JSON.parse(req.body.photos);
            photos.push(...jsonPhotos);
        } else if (Array.isArray(req.body.photos)) {
            photos.push(...req.body.photos);
        }
        console.log('photosaaray : ', photos)

        const {
            selectedtype,
            selectedOption,
            etat,
            calendrier,
            region,
            delegation,
            localite,
            cp,
            surface,
            chambre,
            lits,
            sdb,
            prix,
            titre,
            description,
            localisation,

        } = req.body;

        let newHouse;
        console.log('type', selectedtype);

        switch (selectedtype) {

            case 'Appartement':
                newHouse = new Appartement({
                    owner: ownerId,
                    selectedtype,
                    selectedOption,
                    etat,
                    calendrier,
                    region,
                    delegation,
                    localite,
                    cp,
                    surface,
                    chambre,
                    lits,
                    sdb,
                    prix,
                    photos: photos,
                    titre,
                    description,
                    icons: req.body.icons,
                    localisation

                });

                break;
            case 'Villa':
                newHouse = new Villa({
                    owner: ownerId,
                    selectedtype,
                    selectedOption: "0",
                    etat,
                    calendrier,
                    region,
                    delegation,
                    localite,
                    cp,
                    surface,
                    chambre,
                    lits,
                    sdb,
                    prix,
                    photos: photos,
                    titre,
                    description,
                    icons: req.body.icons,
                    localisation

                });
                break;
            case 'Maison':
                newHouse = new Maison({
                    owner: ownerId,
                    selectedtype,
                    selectedOption: "0",
                    etat,
                    calendrier,
                    region,
                    delegation,
                    localite,
                    cp,
                    surface,
                    chambre,
                    lits,
                    sdb,
                    prix,
                    photos: photos,
                    titre,
                    description,
                    icons: req.body.icons,
                    localisation

                });
                break;
            case 'maison d\'hôte':
                newHouse = new MaisonHote({
                    owner: ownerId,
                    selectedtype,
                    selectedOption: "0",
                    etat,
                    calendrier,
                    region,
                    delegation,
                    localite,
                    cp,
                    surface,
                    chambre,
                    lits,
                    sdb,
                    prix,
                    photos: photos,
                    titre,
                    description,
                    icons: req.body.icons,
                    localisation

                });
                break;
            case 'chambre partagé':
                newHouse = new ChambrePartage({
                    owner: ownerId,
                    selectedtype,
                    selectedOption,
                    etat,
                    calendrier,
                    region,
                    delegation,
                    localite,
                    cp,
                    surface,
                    chambre,
                    lits,
                    sdb,
                    prix,
                    photos: photos,
                    titre,
                    description,
                    icons: req.body.icons,
                    localisation

                });
                break;
            default:
                return res.status(400).json({ message: 'Invalid house type selected' });
        }
        // console.log(icons)

        await newHouse.save();
        const response = {
            message: 'House added successfully'
        };
        res.status(200).json(response);
    } catch (error) {
        res.status(500).json({ message: 'Failed to add house', error: error });
    }
});