/*node*/
/**For the sermons, store the current ones locally and generate them from there. And when there are new sermons, put them
in Dropbox and generate the files from there.
 Also, I don't think that I will separate the morning sermons from the evening ones at the moment.
 So I may just put them in one list of sermons, paginate them (as previously desired). And in the jQuery script
 I may also add a filtering feature via drop downs and search menu etc.
 **/

//node modules
const jsonfs = require('jsonfile'),
      fs = require('fs'),
      dateFormat = require('dateformat'),
      _ = require('underscore'),
      Promise = require('promise'),
      Dropbox = require('dropbox').Dropbox,
      dbx = new Dropbox({accessToken: 'hTBrKPn7IyAAAAAAAAAAP1yewW6YtI8VE6KRmrq6ZqAsZJ3cxQkD_2dDbtNj3MkM'});


//Main variables
var sermons = [];
var local_sermons = [];
var sermons_json = __dirname + "/../data/sermons.json";
var local_sermons_json = __dirname + "/../data/local-sermons.json";
let sermons_path = __dirname + "/../assets/audio/";
let counter = 0;


//Getting latest sermons on dropbox.
dbx.filesListFolder({path: '/audio/'}).then(response => {
    let entries = response.entries;
    entries.forEach(entry => counter++);
    console.log(counter); //for consistency - ensuring that all the files are dealt with.

    entries.forEach(entry => {
        let parts = entry.name.split("_");
        let category = parts[0];
        let date = parts[1].split(".").reverse().join("/");
        if(parts.length < 5){
            console.log(parts); // to see if there are any filenames not following the custom format
        }
        let title = parts[4].replace(".mp3", "");
        let scripture = parts[3].replace(".",":");
        let obj = {
            'title': title.replace("#","?"),
            'speaker': parts[2],
            'date_rev': date,
            'date': dateFormat(new Date(date), 'dd/mm/yyyy'),
            'date_pretty': dateFormat(new Date(date), 'ddd dS mmm yyyy'),
            'scripture': scripture,
            'category': category,
            'path': null,
            'raw_path': entry.path_display
        };
        sermons.push(obj);
    });
    console.log(sermons.length);

    //create a shared link for each of the files
    let links = entries.map(entry => dbx.sharingCreateSharedLink({path: entry.path_display}));
    return Promise.all(links);
}).then(shareLinks => {
    shareLinks.forEach(link => {
        //console.log(link);
        sermons = _.map(sermons, sermon => {
            if(link.path === sermon.raw_path){
                sermon.path = link.url.replace("dl=0","raw=1");
            }
            return sermon;
        })
    });
    sermons = _.sortBy(sermons, sermon => - (new Date(sermon.date_rev).getTime()));
    jsonfs.writeFileSync(sermons_json,sermons,{spaces:4});
}).catch(error => console.log(error));


//Getting sermons from local directories
fs.readdir(sermons_path, 'utf8', function(err, files){
    let filtFiles = files.filter(file => file.endsWith('.mp3'));
    filtFiles.forEach(file => {
        let parts = file.split("_");
        if(parts.length < 5){
            console.log(parts); // to see if there are any filenames not following the custom format
        }
        let category = parts[0];
        let date = parts[1].split(".").reverse().join("/");
        let speaker = parts[2];
        let scripture = parts[3].replace('.',':');
        let title = parts[4].replace('.mp3', '');
        //console.log(title);
        let obj = {
            'title': title.replace('#', '?'),
            'speaker': speaker,
            'scripture': scripture,
            'date_rev': date,
            'date': dateFormat(new Date(date), 'dd/mm/yyyy'),
            'date_pretty': dateFormat(new Date(date), "ddd dS mmm yyyy"),
            'category': category,
            'path': "assets/audio/" + file
        };

        local_sermons.push(obj);
    });
    local_sermons = _.sortBy(local_sermons, sermon => - (new Date(sermon.date_rev).getTime()));
    //console.log(sermons.length);
    jsonfs.writeFileSync(local_sermons_json, local_sermons, {spaces: 4});
});