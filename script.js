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
   NUTRITION
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
   REVEAL ANIMATIONS
========================= */

const revealItems =
  document.querySelectorAll(
    ".reveal, .process-card"
  );


const revealObserver =
  new IntersectionObserver(

    (entries) => {

      entries.forEach((entry) => {

        if(!entry.isIntersecting){
          return;
        }


        const element =
          entry.target;


        const siblings =
          [...element.parentElement.children];


        const index =
          siblings.indexOf(element);


        element.style.transitionDelay =
          Math.min(index * 80, 320)
          + "ms";


        element.classList.add(
          "visible"
        );


        revealObserver.unobserve(
          element
        );

      });

    },

    {
      threshold:.12
    }

  );


revealItems.forEach(
  (item) => {

    revealObserver.observe(item);

  }
);


/* =========================
   STORY
========================= */

const storySection =
  document.querySelector(".story-click");

const storyBackgroundWord =
  document.getElementById("storyBackgroundWord");

const storyChapter =
  document.getElementById("storyChapter");

const storyHeadline =
  document.getElementById("storyHeadline");

const storyDescription =
  document.getElementById("storyDescription");

const storyImage =
  document.getElementById("storyImage");

const storyImageFrame =
  document.getElementById("storyImageFrame");

const storyPrev =
  document.getElementById("storyPrev");

const storyNext =
  document.getElementById("storyNext");

const storyDots =
  document.getElementById("storyDots");


const storyData = [

  {
    chapter:"Chapter 01",
    bgWord:"1989",
    headline:"It started in Isabela.",
    description:
      "3 Sher's Food Products began in 1989 as a family-owned food business in San Fermin, Cauayan City, Isabela.",
    image:"assets/isabela-map.png",
    imageClass:"map-frame",
    color:"#1459A7"
  },

  {
    chapter:"Chapter 02",
    bgWord:"FAMILY",
    headline:"Built by family.",
    description:
      "Founded by Sergio and Lorna Gonzales, the business grew from a family food operation into the home of Big Brothers Corniks.",
    image:"assets/family-silhouette.png",
    imageClass:"family-frame",
    color:"#EF4428"
  },

  {
    chapter:"Chapter 03",
    bgWord:"CORNIKS",
    headline:"A familiar Filipino crunch.",
    description:
      "Big Brothers Corniks continues as a crunchy companion for merienda, gatherings, sharing and pasalubong.",
    image:"assets/550g-flavors-group.JPG",
    imageClass:"product-frame",
    color:"#287747"
  },

  {
    chapter:"Today",
    bgWord:"TODAY",
    headline:"Three flavors. One family legacy.",
    description:
      "Classic Cheese, Spicy and Garlic with Chips continue the Big Brothers Corniks story — proudly made in Isabela.",
    image:"assets/hero.png",
    imageClass:"product-frame",
    color:"#19140F"
  }

];


let currentStoryIndex = 0;

let storyTimer = null;


function createStoryDots(){

  storyData.forEach(
    (item,index) => {

      const dot =
        document.createElement(
          "button"
        );


      dot.className =
        "story-dot";


      dot.type =
        "button";


      dot.setAttribute(
        "aria-label",
        `Go to story chapter ${index + 1}`
      );


      dot.addEventListener(
        "click",
        () => {

          showStory(index);

        }
      );


      storyDots.appendChild(dot);

    }
  );

}


function updateStoryDots(){

  document
    .querySelectorAll(".story-dot")
    .forEach(
      (dot,index) => {

        dot.classList.toggle(
          "active",
          index === currentStoryIndex
        );

      }
    );

}


function restartStoryImageAnimation(){

  storyImage.animate(

    [
      {
        opacity:0,
        transform:
          "translateX(25px) scale(.96)"
      },

      {
        opacity:1,
        transform:
          "translateX(0) scale(1)"
      }
    ],

    {
      duration:650,
      easing:
        "cubic-bezier(.16,1,.3,1)"
    }

  );

}


function showStory(index){

  if(
    index < 0 ||
    index >= storyData.length ||
    index === currentStoryIndex
  ){
    return;
  }


  clearTimeout(
    storyTimer
  );


  currentStoryIndex =
    index;


  const item =
    storyData[index];


  storySection.classList.add(
    "is-changing"
  );


  storyTimer =
    setTimeout(
      () => {

        storyBackgroundWord.textContent =
          item.bgWord;


        storyChapter.textContent =
          item.chapter;


        storyHeadline.textContent =
          item.headline;


        storyDescription.textContent =
          item.description;


        storyImage.src =
          item.image;


        storyImage.alt =
          item.headline;


        storyImageFrame.className =
          "story-image-frame " +
          item.imageClass;


        storySection.style.backgroundColor =
          item.color;


        storyPrev.disabled =
          index === 0;


        if(
          index ===
          storyData.length - 1
        ){

          storyNext.textContent =
            "Explore Flavors →";

        }else{

          storyNext.textContent =
            "Next →";

        }


        updateStoryDots();


        requestAnimationFrame(
          () => {

            storySection
              .classList
              .remove(
                "is-changing"
              );


            restartStoryImageAnimation();

          }
        );

      },

      260
    );

}


storyPrev.addEventListener(
  "click",
  () => {

    showStory(
      currentStoryIndex - 1
    );

  }
);


storyNext.addEventListener(
  "click",
  () => {

    if(
      currentStoryIndex ===
      storyData.length - 1
    ){

      document
        .getElementById("flavors")
        .scrollIntoView({
          behavior:"smooth"
        });

      return;

    }


    showStory(
      currentStoryIndex + 1
    );

  }
);


createStoryDots();

updateStoryDots();

storyPrev.disabled =
  true;


/* =========================
   SUBTLE HERO PARALLAX
========================= */

const hero =
  document.querySelector(".hero");


window.addEventListener(
  "scroll",
  () => {

    if(!hero){
      return;
    }


    if(
      window.matchMedia(
        "(prefers-reduced-motion: reduce)"
      ).matches
    ){
      return;
    }


    const scrollY =
      window.scrollY;


    if(
      scrollY <=
      window.innerHeight
    ){

      const offset =
        scrollY * .04;


      hero.style.backgroundPosition =
        `center calc(50% + ${offset}px)`;

    }

  },

  {
    passive:true
  }
);
