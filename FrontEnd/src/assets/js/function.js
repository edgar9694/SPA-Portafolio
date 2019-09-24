document.addEventListener('mouseover', function (event) {
  console.log(event);
   if (event.target.matches('.overbutton')) {
    // console.log(event.target);
    // console.log(event.target.parentElement.parentElement);
    children = event.target.parentElement.parentElement.children;
    for (var i = 0; i < children.length; i++) {
      switch (true) {
        case children[i].matches('.coverButtonTop'):
          children[i].classList.add("topActive")
          break;
        case children[i].matches('.coverButtonBottom'):
          children[i].classList.add("bottomActive")
          break;
        case children[i].matches('.coverButtonTriangle'):
          children[i].classList.add("triangleActive")
          break;
      }
    }

   }
}, false);

document.addEventListener('mouseout', function (event) {
  console.log(event.target);
   if (event.target.matches('.overbutton')) {
    // console.log(event.target);
    // console.log(event.target.parentElement.parentElement);
    children = event.target.parentElement.parentElement.children;
    for (var i = 0; i < children.length; i++) {
      switch (true) {
        case children[i].matches('.coverButtonTop'):
          children[i].classList.remove("topActive")
          break;
        case children[i].matches('.coverButtonBottom'):
          children[i].classList.remove("bottomActive")
          break;
        case children[i].matches('.coverButtonTriangle'):
          children[i].classList.remove("triangleActive")
          break;
      }
    }

   }
}, false);
