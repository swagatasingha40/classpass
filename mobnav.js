(function () {
  var burger = document.querySelector(".burger-container"),
    header = document.querySelector(".mobnav");
  burger.onclick = function () {
    header.classList.toggle("menu-opened");
    document.querySelector(".menu").classList.toggle("visible");
  };
  $(".menu-item").click(function () {
    header.classList.toggle("menu-opened");
    document.querySelector(".menu").classList.toggle("visible");
  });
})();
