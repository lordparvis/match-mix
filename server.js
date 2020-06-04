/* External Modules */
const express = require("express");
const bodyParser = require("body-parser");
const methodOverride = require("method-override");

/* Internal Modules */
const controllers = require("./controllers");

/* Instanced Modules */
const app = express();

/* Configuration Variables */
const PORT = 4000;


/* App configuration */
app.set('view engine', 'ejs');



/* Middleware */
app.use(bodyParser.urlencoded({ extended: false }));
app.use(methodOverride("_method"));
//styles
app.use(express.static(__dirname + '/public'));

/* Routes */

// root route
app.get("/", function(req, res) {
    res.render("index");
});
app.get('*', function(req, res) {
    res.send('404');
});

// bar route
app.use("/bars", controllers.bar);

// ingredient route
app.use("/ingredients", controllers.ingredient);

// recipe route
app.use("/recipes", controllers.recipe);


/* Bind Server to PORT */
app.listen(PORT, function() {
    console.log(`Server is running on http://localhost:${PORT}`);
});