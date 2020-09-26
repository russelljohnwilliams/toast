window.onload = function(){
  getJSON();
  callJquery()
  getContent()
}

function getJSON() {
  var url = "https://api.npoint.io/f596e1d88dbe9923af42";
  var request = new XMLHttpRequest();
  request.open("GET", url);
  request.onload = function(){
    if (request.status === 200){
      var json = JSON.parse( request.responseText );
    };
    loopJSON(json);
  };
  request.send( null );
};

function loopJSON(json){
  var entries = Object.entries(json);
  for (i = 0; i < entries.length; i++) {
    var entry = entries[i][1];
    var id = entries[i][0]
    var author = entry.author;
    var date = new Date(entry.timeStamp * 1000);
    var dateValues = getDateValues(date);
    var comment = addComments(entry, dateValues, author, id)
  }
}

function addComments(entry, dateValues, author, id){
  var comment = entry.comment;
  var parentId = entry.parentId
  if(parentId == "none"){
    loadComments(author, dateValues, comment, id);
  }else{
    loadReply(author, dateValues, comment, parentId)
  }
}

function getDateValues(date){
  var dayNumber = function(date) {
    if (date > 3 && date < 21) return 'th';
    switch (date % 10) {
      case 1:  return "st";
      case 2:  return "nd";
      case 3:  return "rd";
      default: return "th";
    }
  }
  var months = ['Janurary', 'Feburary', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
  var days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']
  var year = date.getUTCFullYear();
  var month = months[date.getUTCMonth()];
  var day = days[date.getUTCDay()];
  var dayNum = date.getUTCDate();
  var nth = dayNumber(date.getUTCDate());
  var hour = date.getUTCHours();
  var seconds
  if(date.getUTCMinutes() < 10){seconds = "0"+date.getUTCMinutes()}else{seconds = date.getUTCMinutes().toString()};
  var dateValues = " " +day + " " + dayNum+nth+ " " + month + " " + year +" at " + hour +":"+ seconds
  return dateValues
}

function loadComments(author, date, comment, id){
  document.getElementById("comments-section").innerHTML += "<article id='"+id+"'>"+"<cite>"+author+"</cite><time>"+date+"</time><section>"+comment+"</section></article>";

}

function loadReply(author, dateValues, comment, parentId, id){
  var element = document.getElementById(parentId);
  element.insertAdjacentHTML("afterend", "<article class='indent' id='"+id+"'>"+"<cite>"+author+"</cite><time>"+dateValues+"</time><section>"+comment+"</section></article>")
}

function callJquery(){
  $('#carouselWrapper').on('slide.bs.carousel', function (e) {
    var $e = $(e.relatedTarget);
    var idx = $e.index();
    var itemsPerSlide = 3;
    var totalItems = $('.carousel-item').length;
    if (idx >= totalItems-(itemsPerSlide)) {
      var it = itemsPerSlide - (totalItems - idx);
      for (var i=0; i<it; i++) {
              // append slides to end
              if (e.direction=="left") {
                $('.carousel-item').eq(i).appendTo('.carousel-inner');
              }
              else {
                $('.carousel-item').eq(0).appendTo('.carousel-inner');
              }
            }
          }
        });
}


