/*node*/
/**For the sermons, all of them will be stored locally. The new/latest sermons should be put into Dropbox and then the script
 * should generate them and add them to the local sermons' json file. This will make it easier for me to refer to only one
 * json file rather than two (one for the latest and one for the local).
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
    //console.log(entries[0]);
    entries.forEach(entry => counter++);
    //console.log(counter); //for consistency - ensuring that all the files are dealt with.

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
            'date_pretty': dateFormat(new Date(date), 'dS mmm yyyy'),
            'scripture': scripture,
            'category': category,
            'path': null,
            'raw_path': entry.path_display
        };
        sermons.push(obj);
    });
    //console.log(sermons.length);

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
    console.log(jsonfs.readFileSync(sermons_json));
    let test = jsonfs.readFileSync(local_sermons_json);
    let all_sermons = sermons.concat(test);
    all_sermons = _.sortBy(all_sermons, sermon => - (new Date(sermon.date_rev).getTime()));
    jsonfs.writeFileSync(sermons_json, all_sermons,{spaces:4});
}).catch(error => console.log(error));


//Getting sermons from local directories
fs.readdir(sermons_path, 'utf8', function(err, files){
    let filtFiles = files.filter(file => file.endsWith('.mp3'));
    //console.log(filtFiles);
    //console.log(filtFiles.length);
    filtFiles.forEach(file => {
        let parts = file.split("_");
        //console.log(parts);
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
            'date_rev': date,
            'date': dateFormat(new Date(date), 'dd/mm/yyyy'),
            'date_pretty': dateFormat(new Date(date), "dS mmm yyyy"),
            'scripture': scripture,
            'path': "assets/audio/" + file
        };

        local_sermons.push(obj);
    });
    local_sermons = _.sortBy(local_sermons, sermon => - new Date(sermon.date_rev).getTime());
    //console.log(sermons.length);
    jsonfs.writeFileSync(local_sermons_json, local_sermons, {spaces: 4});
});