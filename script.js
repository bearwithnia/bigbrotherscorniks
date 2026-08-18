/* =========================
   YEAR
========================= */

document.getElementById("year").textContent =
  new Date().getFullYear();


/* =========================
   HEADER
========================= */

const header =
  document.getElementById("header");


function updateHeader(){

  if(window.scrollY > 40){

    header.classList.add("scrolled");

  }else{

    header.classList.remove("scrolled");

  }

}


updateHeader();


window.addEventListener(
  "scroll",
  updateHeader,
  {
    passive:true
  }
);


/* =========================
   MOBILE MENU
========================= */

const menuToggle =
  document.getElementById("menuToggle");


const navigation =
  document.getElementById("navigation");


menuToggle.addEventListener(
  "click",
  () => {

    navigation.classList.toggle("open");

    document.body.classList.toggle("menu-open");

    menuToggle.textContent =
      navigation.classList.contains("open")
      ? "✕"
      : "☰";

  }
);


document
  .querySelectorAll("#navigation a")
  .forEach((link) => {

    link.addEventListener(
      "click",
      () => {

        navigation.classList.remove("open");

        document.body.classList.remove("menu-open");

        menuToggle.textContent = "☰";

      }
    );

  });


/* =========================
   NUTRITION SELECTOR
========================= */

function updateNutrition(){

  const flavor =
    document.getElementById("flavorSelect").value;

  const size =
    document.getElementById("sizeSelect").value;

  document.getElementById("nutritionProduct").textContent =
    flavor + " — " + size;

}


/* =========================
   SCROLL REVEALS
========================= */

const revealObserver =
  new IntersectionObserver(

    (entries) => {

      entries.forEach((entry) => {

        if(entry.isIntersecting){

          entry.target.classList.add("visible");

          revealObserver.unobserve(entry.target);

        }

      });

    },

    {
      threshold:.12
    }

  );


document
  .querySelectorAll(".reveal")
  .forEach((element) => {

    revealObserver.observe(element);

  });
