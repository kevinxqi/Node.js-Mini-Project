var Profile = require("./profile.js");
var renderer = require("./renderer.js")
const querystring = require('querystring');

function home(request, response){
    //if url == "/" && GET
    if(request.url === "/" && request.method.toLowerCase() === "get"){
        //show search
        response.setHeader('Content-Type', 'text/html');
        renderer.view("header", {}, response)
        renderer.view("search", {}, response)
        renderer.view("footer", {}, response)
        response.end();
    }
    //if url == "/" && POST
    else{
        // Get username from body
        request.on("data", data => {
            var username = querystring.parse(data.toString()).username
            response.writeHead(303, {'Location': '/' + username });
            response.end()
            }
         )
         

    }
}

function user(request, response){
    //if url == "/..."
    var username = request.url.replace("/", "");
    if(username.length > 0){
        response.setHeader('Content-Type', 'text/html');
        renderer.view("header", {}, response)

    
        //get json from treehouse
        var studentProfile = new Profile(username);
            //on "end" 
        studentProfile.on("end", function(profileJSON){
             //show profile

             //Store values which we need
             var values = {
                 avatarUrl: profileJSON.gravatar_url,
                 username: profileJSON.profile_name,
                 badges: profileJSON.badges.length,
                 javascriptPoints: profileJSON.points.JavaScript
             }

             //Simple Response
             renderer.view("profile", values, response)
             renderer.view("footer", {}, response)
             response.end()
        });
                
            //on "error"

            studentProfile.on("error", function(error){
                renderer.view("error", {errorMessage: error.message}, response)
                renderer.view("search", {}, response)
                renderer.view("footer", {}, response)
                response.end()
            });
            
    }
}

module.exports.home = home
module.exports.user = user