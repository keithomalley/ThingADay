
let medium = '';
let thing = '';

/*  API Calls  */
function postNewTheme(m, t){
  var xhr = new XMLHttpRequest();
  xhr.open("POST", '/add', true);
  xhr.setRequestHeader('Content-Type', 'application/json');
  xhr.send(JSON.stringify({
      date : getDateString(),
      medium : m,
      thing : t
  }));
}


function readTextFile(file, callback) {
    var rawFile = new XMLHttpRequest();
    rawFile.overrideMimeType("application/json");
    rawFile.open("GET", file, true);
    rawFile.onreadystatechange = function() {
        if (rawFile.readyState === 4 && rawFile.status == "200") {
            callback(rawFile.responseText);
        }
    }
    rawFile.send(null);
}


readTextFile("/data/themes.json", function(text){
    var data = JSON.parse(text);
    console.log(data);
    var last = data.themes[data.themes.length - 1];

    if(last.date == getDateString()){
      // we have one for today
      medium = last.medium;
      thing = last.thing;
    } else {
      // create a new one
      medium = media[getRandomInt(media.length)];
      thing = things[getRandomInt(things.length)];
      postNewTheme(medium, thing);
    }

    document.getElementById("medium").innerHTML = "" + medium;
    document.getElementById("thing").innerHTML = "" + thing;

});


document.getElementById("date").innerHTML = getReadableDateString();
