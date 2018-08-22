/*node*/
/**For the sermons, store the current ones locally and generate them from there. And when there are new sermons, put them
in Dropbox and generate the files from there.
 Also, I don't think that I will separate the morning sermons from the evening ones, because not all the sermons were done
 on a Sunday. So I may just put them in one list of sermons, paginate them (as previously desired). And in the jQuery script
 I would add a filtering feature via drop downs and search menu.
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
var sermons_json = __dirname + "/../data/sermons.json";
let sermons_path = __dirname + "/../assets/audio/";
let counter = 0;
dbx.filesListFolder({path: '/audio/'}).then(response => {
    let entries = response.entries;
    entries.forEach(entry => counter++);
    console.log(counter);

    entries.forEach(entry => {
        let parts = entry.name.split("_");
        let category = parts[0];
        let date = parts[1];
        let obj = {
            'title': parts[4],
            'speaker': parts[2],
            'date': parts[1],
            'scripture': parts[3]
        };
        sermons.push(obj);
    });
    console.log(sermons.length);
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

/*fs.readdir(sermons_path, 'utf8', function(err, files){
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
            'date': dateFormat(date, 'dd/mm/yyyy'),
            'date_pretty': dateFormat(date, 'ddd dS mmm yyyy'),
            'category': category,
            'path': "assets/audio/" + file //possibly have a look at path.relative(from, to)
        };

        sermons.push(sermonObj);
        sermons = _.sortBy(sermons, sermon => - new Date(sermon.date).getTime());
        //console.log(sermons.length);
        jsonfs.writeFileSync(sermons_json, sermons, {spaces: 4});
    });
});*/