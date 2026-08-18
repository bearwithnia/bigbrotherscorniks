/* YEAR */

document.getElementById("year").textContent =
  new Date().getFullYear();


/* HEADER */

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


/* MOBILE MENU */

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


/* NUTRITION */

function updateNutrition(){

  const flavor =
    document.getElementById("flavorSelect").value;

  const size =
    document.getElementById("sizeSelect").value;

  document.getElementById("nutritionProduct").textContent =
    flavor + " — " + size;

}


/* REVEAL */

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


/* ANIMATED STORY */

const storySection =
  document.querySelector(".story-scroll");

const storyStage =
  document.querySelector(".story-stage");

const storySteps =
  document.querySelectorAll(".story-scroll-step");

const storyYear =
  document.getElementById("storyYear");

const storyChapter =
  document.getElementById("storyChapter");

const storyHeadline =
  document.getElementById("storyHeadline");

const storyDescription =
  document.getElementById("storyDescription");

const storyImage =
  document.getElementById("storyImage");

const storyProgress =
  document.getElementById("storyProgress");


const storyData = [

  {
    chapter:"Chapter 01",
    year:"1989",
    headline:"It started in Isabela.",
    description:
      "3 Sher's Food Products began in 1989 as a family-owned food business in San Fermin, Cauayan City, Isabela.",
    image:"assets/cheese-all-sizes.JPG",
    color:"#1859A8"
  },

  {
    chapter:"Chapter 02",
    year:"FAMILY",
    headline:"Built by family.",
    description:
      "Founded by Sergio and Lorna Gonzales, the business grew from a family food operation into the home of Big Brothers Corniks.",
    image:"assets/90g-flavors-group.JPG",
    color:"#E43C27"
  },

  {
    chapter:"Chapter 03",
    year:"CORNIKS",
    headline:"Made for the Filipino snack table.",
    description:
      "Big Brothers Corniks continues as a crunchy companion for merienda, gatherings, sharing and pasalubong.",
    image:"assets/550g-flavors-group.JPG",
    color:"#287747"
  },

  {
    chapter:"Today",
    year:"BIG BROTHERS",
    headline:"Three flavors. One family legacy.",
    description:
      "Classic Cheese, Spicy and Garlic with Chips continue the Big Brothers Corniks story — proudly made in Isabela.",
    image:"assets/hero.png",
    color:"#19140F"
  }

];


let currentStoryStep = -1;


function updateStory(index){

  if(
    index === currentStoryStep ||
    !storyData[index]
  ){
    return;
  }


  currentStoryStep = index;

  const data =
    storyData[index];


  storyStage.classList.add(
    "is-changing"
  );


  setTimeout(() => {

    storyYear.textContent =
      data.year;

    storyChapter.textContent =
      data.chapter;

    storyHeadline.textContent =
      data.headline;

    storyDescription.textContent =
      data.description;

    storyImage.src =
      data.image;

    storySection.style.backgroundColor =
      data.color;


    storyProgress.style.height =
      ((index + 1) / storyData.length * 100)
      + "%";


    storyStage.classList.remove(
      "is-changing"
    );

  },300);

}


const storyObserver =
  new IntersectionObserver(

    (entries) => {

      entries.forEach(
        (entry) => {

          if(!entry.isIntersecting){
            return;
          }


          const index =
            Number(
              entry.target.dataset.storyStep
            );


          updateStory(index);

        }
      );

    },

    {
      threshold:.55
    }

  );


storySteps.forEach(
  (step) => {

    storyObserver.observe(step);

  }
);
