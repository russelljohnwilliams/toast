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
      // loadcomments(json)
      loopJSON(json)
  };
  request.send( null );
};

function loopJSON(json){
  var entries = Object.entries(json)
  console.log(entries.length)
  for (i = 0; i < entries.length; i++) {
    var entry = entries[i][1]
    var comment = entry.comment
    var author = entry.author
    var date = new Date(entry.timeStamp * 1000)
    console.log("index", comment);
    document.getElementById("comments-section").innerHTML += "<article>"+"<h4>"+author+"</h4><h5>"+date+"</h5>"+comment+"</article>";
  }
}