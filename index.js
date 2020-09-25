window.onload = function(){

  // loadcomments()
  getJSON()
}


function getJSON() {
  var url = "https://api.npoint.io/f596e1d88dbe9923af42";
  var request = new XMLHttpRequest();
  request.open("GET", url);
  request.onload = function(){
    if (request.status === 200){
      var json = JSON.parse( request.responseText );
    };
      loadcomments(json)
  };
  request.send( null );
};

function loadcomments(json){
  var entries = Object.entries(json)
  console.log(entries.length)
  for (i = 0; i < entries.length; i++) {
    var comment = entries[i][1].comment
    console.log("index", comment);
    document.getElementById("comments-section").innerHTML += comment;
  }
  
}