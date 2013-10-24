$(".menu-item").hover(function () {
  if($(this).attr("id")!='top' && $(this).attr("id")!='bottom'){
    $(this).css({"opacity":"1","cursor": "pointer"})
    
  }
},function () {
  if($(this).attr("id")!='top' && $(this).attr("id")!='bottom'){
    $(this).css({"opacity":"0.2","cursor": "normal"})
    
  }
})
$("#top-left").click(function(){
 centerHex.moveDivIn($('#home'));
 $('.content:not(#home) ').fadeOut(1000);
})
$("#top-right").click(function(){
  centerHex.moveDivIn($('#sponsors'));
  $('.content:not(#sponsors)').fadeOut(1000);
})
$("#bottom-left").click(function(){
  centerHex.moveDivIn($('#gallery'));
  $('.content:not(#gallery)').fadeOut(1000);
})
$("#bottom-right").click(function(){
  centerHex.moveDivIn($('#contacts'));
  $('.content:not(#contacts)').fadeOut(1000);
})
$('document').ready(function(){
  wid=$(window).width()
  hei=$(window).height()
  if(wid>hei){
    $('body').height(wid/16*9)
    $('body').width(wid)
  }
  else{
    $('body').width(hei/9*16) 
    $('body').height(hei)
  }
})
$(window).resize(function(){
  wid=$(window).width()
  hei=$(window).height()
  if(wid>hei){
    $('body').height(wid/16*9)
    $('body').width(wid)
  }
  else{
    $('body').width(hei/9*16) 
    $('body').height(hei)
  }
})

var Hexagon  = function(){
  
  return{
    width: 400,
    height: 300,
    hr_pieces : 8,
    vr_pieces : 6,
    count : 0,
    elements : [],
    el: undefined,
    tot_pieces: 0,
    box_width: 0,
    box_height: 0,
    intervalTimer: undefined,
    queue: [],

    init: function(jelem){
      this.el = jelem;
      this.width = this.el.width();
      this.height = this.el.height();
      this.hr_pieces = 8;
      this.vr_pieces = 6;
      this.tot_pieces = this.hr_pieces * this.vr_pieces;
      this.box_width = this.width / this.hr_pieces;
      this.box_height = this.height / this.vr_pieces;
      this._initHex();
    },

    _initHex: function(){
      var vr_pos = 0;
      for (i=0; i<this.tot_pieces; i++){
        var tempEl = $('<span class="hover" id="hover-' + i + '"></span>');
        var hr_pos = (i % this.hr_pieces) * this.box_width;
        if(i > 0 && i % this.hr_pieces == 0)
          vr_pos += this.box_height;
        tempEl.css('background-position', '-' + hr_pos + 'px -' + vr_pos + 'px');
        this.el.append(tempEl);
        this.elements.push(tempEl);
      }
      
      $(this.el).children('.hover')
      .width(this.box_width)
      .height(this.box_height);
    },

    startHex: function(loop){
      this._shuffleArray();
      this.intervalTimer = setInterval(function(){ this._toggleHexes(loop); }.bind(this) , 10);
    },

    _shuffleArray: function(){
      for (var i = this.elements.length - 1; i > 0; i--) {
            var j = Math.floor(Math.random() * (i + 1));
            var temp = this.elements[i];
            this.elements[i] = this.elements[j];
            this.elements[j] = temp;
        }
    },

    _toggleHexes: function(loop){
      console.log(loop)
      var tempEl = this.elements[this.count];
      var opacity = tempEl.css('opacity');
      (opacity == 0)? tempEl.animate({ opacity: 1 }) : tempEl.animate({ opacity: 0 });
      this.count = (this.count + 1) % this.tot_pieces;
      if(this.count == 0 && loop != true)
        clearInterval(this.intervalTimer);
        return;

    },
    moveDivIn: function(jdiv){
      $(this.el).parents("#hexbody").append(jdiv);
      jdiv = jdiv.wrap("<center></center>");
      jdiv.css("top","400px");
      jdiv.show();
      jdiv.animate({
        top:"0px"
      },"4000","swing");
    }
  }
};

var centerHex = new Hexagon();
centerHex.init($("#mosaic"))
centerHex.startHex(true);
$('document').ready(function(){
  centerHex.moveDivIn($('#home'));
})