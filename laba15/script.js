function anime(){
  var block = document.getElementById("kubik");
  var kub = 0;
  var id = setInterval(frame, 10);
  function frame(){
    if (kub == 425){
      setTimeout(function() {anime()}, 0);
    } else{
      kub++;
      block.style.left= kub + 'px';
    }
  }
}