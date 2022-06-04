const router = require('express').Router();
const axios = require('axios');

// GET TOP-RATING MOVIES
router.get("/top-rating", (req, res) => {
    const page = req.query.page ? req.query.page : 1;

    axios.get("https://api.themoviedb.org/3/movie/top_rated?api_key=8236021ba55b887610bd298e392efdb6&language=en&page=" + page)
        .then(response => res.status(200).json(response.data.results))
        .catch(err => {
            res.status(500).json(err)
        })
})

// GET POPULAR MOVIES
router.get("/popular", (req, res) => {
    const page = req.query.page ? req.query.page : 1;

    axios.get("https://api.themoviedb.org/3/movie/popular?api_key=8236021ba55b887610bd298e392efdb6&language=en&page=" + page)
        .then(response => res.status(200).json(response.data.results))
        .catch(err => {
            res.status(500).json(err)
        })
})

// GET MOVIES BY GENRE
router.get("/genre", (req, res) => {
    const page = req.query.page ? req.query.page : 1;
    const genreId = req.query.genreId;

    axios.get("https://api.themoviedb.org/3/discover/movie?api_key=8236021ba55b887610bd298e392efdb6&language=en&sort_by=popularity.desc&with_genres=" + genreId + "&page=" + page)
        .then(response => res.status(200).json(response.data.results))
        .catch(err => {
            res.status(500).json(err)
        })
})

// GET SIMILAR MOVIES
router.get("/similar/:id", (req, res) => {
    const page = req.query.page ? req.query.page : 1;
    axios.get("https://api.themoviedb.org/3/movie/" + req.params.id + "/similar?api_key=8236021ba55b887610bd298e392efdb6&language=en&page=" + page)
        .then(response => res.status(200).json(response.data.results))
        .catch(err => {
            res.status(500).json(err)
        })
})

// GET SEARCH MOVIES
router.get("/search", (req, res) => {
    const keyword = req.query.keyword;
    const page = req.query.page ? req.query.page : 1;

    axios.get("https://api.themoviedb.org/3/search/movie?api_key=8236021ba55b887610bd298e392efdb6&language=en-US&query=" + keyword + "&page=" + page)
    .then(response => res.status(200).json(response.data.results))
    .catch(err => {
        res.status(500).json(err)
    })
})

// GET MOVIE DETAIL
router.get("/:id", (req, res) => {
    axios.get("https://api.themoviedb.org/3/movie/" + req.params.id + "?api_key=8236021ba55b887610bd298e392efdb6&language=en")
        .then(response => res.status(200).json(response.data))
        .catch(err => {
            res.status(500).json(err)
        })
})

module.exports = router
