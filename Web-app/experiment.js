// using JS observer and intersection, check MDN for more :)

// const hikeExp = document.querySelector('.hike-exp');

// //test to run a scoll event

// window.addEventListener("scroll",scrollReveal);

// function scrollReveal(){
//     console.log("hey");
// }


// function scrollReaveal(){
//     const hikePos =  hikeExp.getBoundingClientRect().top;
// //     console.log(hikePos);
//         const windowHeight = window.innerHeight/3;

//         //console.log(windowHeight);
//         if(hikePos < windowHeight){
//             hikeExp.style.color = "red";
//         }
//  }

/*creating an intersection observer object*/
// const slide = document.querySelector('.slide'); 

// let options = {
//     threshold :0.5
// };

// //checking if the slide is intersecting
//  let observer =  new IntersectionObserver(slideAnim,options);

//  function slideAnim(entries){
//      entries.forEach(entry => {
//         console.log(entry);
//      });
     
//  }

//  observer.observe(slide);

// const slide = document.querySelector('.hike'); 

// let options = {
//     threshold :0.5
// };

// //checking if the HIKE slide is intersecting
//  let observer =  new IntersectionObserver(slideAnim,options);

//  function slideAnim(entries){
//      entries.forEach(entry => {
//        // console.log(entry);
//         if(entry.isIntersecting){
//             //changing background color while scrolling, color changes when it intersects with the slide
//             //slide.style.background = "white";
//         }

//      });
     
//  }

//  observer.observe(slide);