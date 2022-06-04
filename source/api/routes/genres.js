const router = require('express').Router();
const axios = require('axios');

// GET ALL GENRES
router.get("/", (req, res) => {
    axios.get("https://api.themoviedb.org/3/genre/movie/list?api_key=8236021ba55b887610bd298e392efdb6&language=en")
        .then((response) => res.status(200).json(response.data.genres))
        .catch(err => res.status(500).json(err))
})

module.exports = router;
