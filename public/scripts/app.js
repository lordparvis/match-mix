$(".site-nav").hide();

$(".menu").on("click", function(event){
  if($(".site-nav").first().is(":hidden")) {
    $(".site-nav").slideDown("slow");
  } else {
    $(".site-nav").slideUp("slow");
  }
});