const express = require("express");
const bodyParser = require("body-parser");

const mongoose = require("mongoose");

const app = express();

app.set("view engine", "ejs");

app.use(
  bodyParser.urlencoded({
    extended: true
  })
);
app.use(express.static("public"));

mongoose.connect(
    "mongodb+srv://admin-zeyd:test1234@mycluster-qlk57.mongodb.net/dbMyMovies",
    {
    useNewUrlParser: true,
    useUnifiedTopology: true
  }
); //2
//TODO

const Movie = mongoose.model("Movie", { name: String,genre :String, director: String, imdb:String, time:String });

app
  .route("/api/movies")
  .get((req, res) => {
    Movie.find((err, response) => {
      if (err) {
        res.status(400).send();
      }
      res.send(response);
    });
  })

  .post((req, res) => {
    let { name, genre , director, imdb, time } = req.body;
    const movie = new Movie({ name: name,genre :genre, director: director, imdb:imdb, time:time  });
    movie.save().then(response => {
      console.log(response);
      res.send(response);
    });
  })

  .delete((req, res) => {
    Movie.deleteMany().then(() => {
      res.send();
    });
  });



  app
    .route("/api/movie/:id")
    .get((req, res) => {    
        let id = req.params.id;
        
        Movie.findById(id)
            .then(response=>{
                 res.send(response);
            })
        
            .catch(err=>{
                res.status(400).send();
            })
       
    })

    .delete((req, res) => {
      let id = req.params.id;
    
        Movie.deleteOne({_id:id})
            .then(() => {
                message = 'Successfully deleted movie!'
                res.send(message);
            })
            .catch(err=>{
            res.status(400).send();
        })      
    })

    .put((req,res)=>{
      let id = req.params.id;
      let { name, genre , director, imdb, time} = req.body;
      Post.update({_id:id},{ name: name,genre :genre, director: director, imdb:imdb, time:time })
        .then(updatedMovie =>{

            res.send(updatedMovie);
        })
    })

app.listen(3000, function() {
  console.log("Server started on port 3000");
});
