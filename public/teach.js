function showPage(id){
  document.querySelectorAll('.page').forEach(page=>{
    page.classList.remove('active');
  });

  document.getElementById(id).classList.add('active');
}
document.addEventListener("DOMContentLoaded", function(){

  const toggle = document.getElementById("themeToggle");

  toggle.addEventListener("click", function(){

    document.body.classList.toggle("dark");

    if(document.body.classList.contains("dark")){
      toggle.classList.remove("ri-moon-line");
      toggle.classList.add("ri-sun-line");
    }else{
      toggle.classList.remove("ri-sun-line");
      toggle.classList.add("ri-moon-line");
    }

  });

});
