const express = require('express');
const musicController = require('../controllers/music.controller');
const { authArtist } = require('../middlewares/auth.middleware');
const { authUser } = require('../middlewares/auth.middleware');

const  multer = require('multer');
const upload = multer({
    storage: multer.memoryStorage(),
});


const router = express.Router();


router.post('/upload',authArtist, upload.single('music'), musicController.createMusic);

router.post('/album', authArtist, musicController.createAlbum);



router.get('/', authUser, musicController.getAllMusic);
router.get('/album', authUser, musicController.getAllAlbums);

router.get('/album/:albumId', authUser, musicController.getAllAlbumById)




module.exports = router;