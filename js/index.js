let anchorlinks = document.querySelectorAll('a[href^="#"]')
let lastScrollTop = 0;
let scrollInProgress = false;

// Sets up the smooth scrolling to sections when the nav indicators are clicked on
for (let item of anchorlinks) {
    item.addEventListener('click', (e)=> {
        let hashval = item.getAttribute('href');
        let target = document.querySelector(hashval);
        target.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });
        history.pushState(null, null, hashval);
        e.preventDefault();
        lastScrollTop = target.offsetTop;
        console.log(lastScrollTop);
    })
}

// Function to scroll to specified section
smoothScrollTo = (hashval) => {
    scrollInProgress = true;
    console.log('called with', hashval)
    let target = document.querySelector(hashval);
    target.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
    });
    history.pushState(null, null, hashval);
    lastScrollTop = target.offsetTop;
    let scrollChecker = setInterval(() => {
      if (window.pageYOffset == lastScrollTop) {
        clearInterval(scrollChecker);
        scrollInProgress = false;
      }
    }, 1200);
}

// Scroll to section if theres a route in the url
if (location.hash) {
    console.log(location)
    let hashval = location.hash;
    let target = document.querySelector(hashval);
    if (target) {
      lastScrollTop = target.offsetTop;
    }
}

let sections = document.getElementsByClassName('section');

handleScroll = (e) => {
  e.preventDefault();
  let currSectionIndex = (lastScrollTop/document.body.clientHeight)*sections.length;
  console.log(e.deltaY, -e.wheelDelta, e.detail,(e.deltaY || -e.wheelDelta || e.detail), 'deltas')
  if ((e.deltaY || -e.wheelDelta || e.detail) > 0) {
    if (currSectionIndex < sections.length - 1 && !scrollInProgress) {
      smoothScrollTo('#' + (sections[currSectionIndex + 1].id));
    }
  }
  else {
    if (currSectionIndex > 0 && !scrollInProgress) {
      smoothScrollTo('#' + (sections[currSectionIndex - 1].id));
    }
  }
}

document.addEventListener('wheel', handleScroll);
document.addEventListener('mousewheel', handleScroll);
document.addEventListener('DOMMouseScroll', handleScroll);
document.addEventListener('MozMousePixelScroll', handleScroll);
