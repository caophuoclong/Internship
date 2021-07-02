import $ from "jquery";
$(document).ready(() => {
  const btn = $(".change-ui");
  btn.map((id, value) => {
    btn[id].addEventListener("click", () => {
      if ($(btn[id]).hasClass("active")) {
        $(btn[id]).removeClass("active");
      } else {
        $(btn[id]).addClass("active");
      }
    });
  });
});
