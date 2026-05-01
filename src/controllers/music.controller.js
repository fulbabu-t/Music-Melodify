const musicModel = require('../models/music.model');
const albumModel = require('../models/album.model');
const {uploadFile} = require('../services/storage.service');
const jwt = require('jsonwebtoken');



async function createMusic(req, res) {

     const { uri, title } = req.body;
     const file = req.file;


     const  result = await uploadFile(file.buffer.toString('base64'));

     const music = await musicModel.create({
        uri: result.url,
        title,
        artist: req.user.id
      })

      res.status(201).json({
        message: 'Music created successfully',
        music: {
            id: music._id,
            uri: music.uri,
            title: music.title,
            artist: music.artist
        }
       })


}


async function createAlbum(req, res) {


        const { title, musicIds } = req.body;

        const album = await albumModel.create({
            title,
            artist: req.user.id,
            music: musicIds

        });

        res.status(201).json({
            message: 'Album created successfully',
            album: {
                id: album._id,
                title: album.title,
                artist: album.artist,
                music: album.music
            }
        });






}

async function getAllMusic(req, res) {

   const music = await musicModel
   .find()
   .skip(2)
   .limit(1).populate('artist', 'username email')

    res.status(200).json({
        message: 'Music retrieved successfully',
        music: music
    })

}



async function getAllAlbums(req, res) {

   const albums = await albumModel.find().select("title artist ").populate('artist', 'username email')

    res.status(200).json({
        message: 'Albums retrieved successfully',
        albums: albums
    })

}

async function getAllAlbumById(req, res) {

    const { albumId } = req.params.albumId ;

    const album = await albumModel.findById(albumId).populate('artist', 'username email').populate('music' );

    res.status(200).json({
        message: 'Album retrieved successfully',
        album: album
    });

}

module.exports = {
    createMusic,
    createAlbum,
    getAllMusic,
    getAllAlbums,
    getAllAlbumById
};