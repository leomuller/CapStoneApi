import express from "express";
import axios from "axios";


const app = express();
const port = 3011;

app.use(express.static("public"));





app.get("/", async (req, res) => {

    let apiBase = "https://v2.jokeapi.dev/joke/Any";

    try {
        const result = await axios.get(apiBase);

        //console.log(result.data);
        let curJoke = getTheJoke(result.data);
        //console.log(curJoke);
        res.render("index.ejs", curJoke);
    } catch (error) {
        console.log("Error: ", error);

        res.render("index.ejs");
    }
  });


function getTheJoke(data){

    let joke = {
        joke: "click the button for a joke",
        punch: "",
    };

    if(data.error === false){
        if(data.type === "single"){
            joke.joke = data.joke;
        }
        else if(data.type === "twopart"){
            joke.joke = data.setup;
            joke.punch = data.delivery;
        }
    }


    return joke;
}


app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
  });
  