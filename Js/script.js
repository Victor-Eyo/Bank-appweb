'use strict';

///////////////////////////////////////
// Modal window

const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.btn--close-modal');
const btnsOpenModal = document.querySelectorAll('.btn--show-modal');


const openModal = function () {
  modal.classList.remove('hidden');
  overlay.classList.remove('hidden');
};

const closeModal = function () {
  modal.classList.add('hidden');
  overlay.classList.add('hidden');
};

for (let i = 0; i < btnsOpenModal.length; i++)
  btnsOpenModal[i].addEventListener('click', openModal);

btnCloseModal.addEventListener('click', closeModal);
overlay.addEventListener('click', closeModal);

document.addEventListener('keydown', function (e) {
  if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
  closeModal();
  }
});

document.querySelectorAll('.nav__link').forEach 
 (function(el) {
   el.addEventListener('click', function (e) {
    e.preventDefault();
    const id = this.getAttribute('href');
    document.querySelector(id).scrollIntoView({behavior: 'smooth'});
   });
});


const header = document.querySelector('.header');
//const allSections = doument.querySelectorAll('.section');

const message = document.createElement('div');

message.classList.add('cookies-message');
message.innerHTML = 
  'We use cookies for improved functionality and analytics. <button class="btn btn--close-cookies">Got it!</button>';

//header.prepend(message);
header.append(message);

document.querySelector('.btn--close-cookie').addEventListener('click', function(e) {
  message.parentElement.removeChild(message);
});

message.style.backgroundColor = '#5ec5763a';
message.style.width = '100%';
message.style.height = Number.parseFloat((message)
 .height,30) + 40 + 'rem';

const btnScrollTo = document.querySelector('btn--scroll-to');

const section1 = document.querySelector('#section--1');

btnScrollTo.addEventListener('.click', function(e){
  const s1coords = section1.getBoundingClientRect();

  //window.scrollTo(s1coords.left + window.pageXOffset, s1coords.top + window.pageYOffset);
   section1.scrollIntoView({behavior: 'smooth'});
});


const tabs = document.querySelectorAll('.operation__tab');
const tabsContainer = document.querySelector('.operations__tab-container');
const tabsContent = document.querySelector('.operations__tab-content');

tabsContainer.addEventListener('click', function(e) {
   const clicked = e.target.closest('.operation__tab');

   clicked.classList.add('operations__tab--active');

   if (!clicked) return;
   
   
   tabs.forEach(t => t.classList.remove
    ('operations__tab--active'));
    tabsContent.forEach(c => c .classList.remove
       ('operations__tab--active'))

    clicked.classList.add ('operations__tab--active');
   
    document.querySelector(`.operation__content--${clicked.dataset.tab}`)
    .classList.add('operation__content--active');

});

const handleHover = function(e, opacity) {
  if(e.target.classList.contains('nav__link')) {
    const link = e.target;
    const siblings = link.closest('.nav'). 
    querySelectorAll('.nav__link');
    const logo = link.closest('.nav').querySelector('img');

    siblings.forEach(el => {
      if (el != link) el.style.opacity = opacity;
     });
      
    logo.style.opacity = opacity;
    
  }
};

navigator.addEventListener('mouseover', function(e) {
  handleHover (e, 0.5);
});

navigator.addEventListener('mouseout', function(e) {
  handleHover (e, 1);
});


const initialCoords = section1.getBoundingClientRect ();

window.addEventListener('scroll', function (e) {
  if (window.scrollY > initialCoords.top) nav.classList.add('sticky');
  else nav.classList.remove('sticky');

});


//using intersection API
// const header = document.querySeclector('.header');
//const navHeight = nav.getBoundingClientRect().height;

//const stickyNav = function (entries) {
 //const [entry] = entries;

 //if (!entry.isIntersecting) nav.classList.add('sticky');
 //else nav.classList.remove('sticky');

//};

// const headerObserver = new intersectionObserver
// (stickyNav, {
  //root: null,
  //threshold:0;
  //rootmargin: `-${navHeight}px`,
//});
//headerObserver.obseerve(header);


const allSections = doucment.querySelectorAll('.section');

const revealSection = function (entires, observer) {
  const [entry] = entries;

  if(!entry.isIntersecting) return;

  entry.target.classList.remove('section--hidden');
  observer.unobserve(entry.target);
};

const sectionObserver = new IntersectionObserver
(revealSection, {});
allSections.forEach(function (section) {
  sectionObserver.observe(section);
  section.classList.add('section--hidden');
});


const imgTargets = document.querySelectorAll('img[data-src]');

const loadImg = function (entires, observer) {
   const [entry] = entires;

   if (!entry.isIntersecting) return;

   entry.target.src = entry.target.dataset.src;
   
   entry.target.addEventListener('load', function (){
    entry.target.classList.remove('lazy-img');
   });

   observer.unobserve(entry.target);
};

const ImgObserver = new IntersectionObserver(loadImg)({
  root: null,
  threhold: 0
  //rootMargin: '200px',

});

imgTargets.forEach(img => ImgObserver.observe(img));
