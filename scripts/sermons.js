/*node*/
/**For the sermons, store the current ones locally and generate them from there. And when there are new sermons, put them
in Dropbox and generate the files from there.
 Also, I don't think that I will separate the morning sermons from the evening ones, because not all the sermons were done
 on a Sunday. So I may just put them in one list of sermons, paginate them (as previously desired). And in the jQuery script
 I would add a filtering feature via drop downs and search menu etc.
 **/

//node modules
const jsonfs = require('jsonfile'),
      fs = require('fs'),
    //fsPromises = require('fs').promises,
      dateFormat = require('dateformat'),
      _ = require('underscore'),
      Promise = require('promise'),
      Dropbox = require('dropbox').Dropbox,
      dbx = new Dropbox({accessToken: 'hTBrKPn7IyAAAAAAAAAAP1yewW6YtI8VE6KRmrq6ZqAsZJ3cxQkD_2dDbtNj3MkM'});


//Main variables
var sermons = [];
var native_sermons = [];
var sermons_json = __dirname + "/../data/sermons.json";
var native_sermons_json = __dirname + "/../data/native-sermons.json";
let sermons_path = __dirname + "/../assets/audio/";
let counter = 0;

dbx.filesListFolder({path: '/audio/'}).then(response => {
    let entries = response.entries;
    //console.log(entries[0]);
    entries.forEach(entry => counter++);
    console.log(counter);

    entries.forEach(entry => {
        let parts = entry.name.split("_");
        let category = parts[0];
        let date = parts[1].split(".").join("/");
        //console.log(date);
        let title = parts[4].toString().replace(".mp3", "");
        let scripture = parts[3].replace(".",":");
        let obj = {
            'title': title.replace("#","?"),
            'speaker': parts[2],
            'date': date,
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

    //TODO: Deal with the date ordering and the dateformat error.
    jsonfs.writeFileSync(sermons_json,sermons,{spaces:4});
}).catch(error => console.log(error));






/*fsPromises.readdir(sermons_path).then(files => {
    let filtFiles = files.filter(file => file.endsWith('.mp3'));
    //console.log(filtFiles);
    //console.log(filtFiles.length);
    filtFiles.forEach(file => {
        let parts = file.split("_");
        //console.log(parts);
        let category = parts[0];
        let date = parts[1];
        let speaker = parts[2];
        let scripture = parts[3].replace('.',':');
        let title = parts[4].replace('.mp3', '');
        //console.log(title);
        let sermonObj = {
            'title': title.trim().replace('#', '?'),
            'speaker': speaker,
            'scripture': scripture,
            //'date_sort': dateformat(date, 'yyyy/mm/dd'),
            'date': dateformat(date, 'dd/mm/yyyy'),
            'date_pretty': dateformat(date, 'ddd dS mmm yyyy'),
            'category': category,
            'path': "/assets/audio/" + parts[4] //possibly have a look at path.relative(from, to)
        };
        sermons.push(sermonObj);
        sermons = _.sortBy(sermons, sermon => - new Date(sermon.date).getTime());
        jsonfs.writeFileSync(sermons_json, sermons, {spaces: 4});
    });
}).catch(err => console.log(err));*/

fs.readdir(sermons_path, 'utf8', function(err, files){
    let filtFiles = files.filter(file => file.endsWith('.mp3'));
    //console.log(filtFiles);
    //console.log(filtFiles.length);
    filtFiles.forEach(file => {
        let parts = file.split("_");
        //console.log(parts);
        if(parts.length < 5){
            console.log(parts);
        }
        let category = parts[0];
        let date = parts[1];
        let speaker = parts[2];
        let scripture = parts[3].replace('.',':');
        //let title = parts[4].replace('.mp3', '');
        //console.log(title);
        let sermonObj = {
            'title': parts[4].trim().replace('#', '?'),
            'speaker': speaker,
            'scripture': scripture,
            //'date_sort': dateformat(date, 'yyyy/mm/dd'),
            /*'date': dateFormat(date, 'dd/mm/yyyy'),
            'date_pretty': dateFormat(date, 'ddd dS mmm yyyy'),*/
            'category': category,
            'path': "assets/audio/" + file //possibly have a look at path.relative(from, to)
        };

        native_sermons.push(sermonObj);
    });
    native_sermons = _.sortBy(native_sermons, sermon => - new Date(sermon.date).getTime());
    //console.log(sermons.length);
    jsonfs.writeFileSync(native_sermons_json, native_sermons, {spaces: 4});
});