function revealTospan() {
  document.querySelectorAll(".reveal").forEach(function (elem) {
    var parent = document.createElement("span");
    var child = document.createElement("span");
    parent.classList.add("parent");
    child.classList.add("child");

    child.innerHTML = elem.innerHTML;
    parent.appendChild(child);
    elem.innerHTML = "";
    elem.appendChild(parent);
  });
}

function valueSetters() {
  gsap.set("#nav a", { y: "-100%", opacity: 0 });
  gsap.set("#home span .child", { y: "100%" });
  gsap.set("#home .row img", { opacity: 0 });

  document.querySelectorAll("#Visual>g").forEach(function (e) {
    var character = e.childNodes[1].childNodes[1];

    character.style.strokeDasharray = character.getTotalLength() + "px";

    character.style.strokeDashoffset = character.getTotalLength() + "px";
  });
}

function loaderAnimation() {
  var tl = gsap.timeline();

  tl.from("#loader .child span", {
    x: 100,
    duration: 1.4,
    stagger: 0.2,
    ease: Power3.easeInOut,
  })
    .to("#loader .parent .child", {
      y: "-100%",
      duration: 1,
      ease: Circ.easeInOut,
    })
    .to("#loader", {
      height: 0,
      duration: 1,
      ease: Circ.easeInOut,
    })
    .to("#green", {
      height: "100%",
      top: 0,
      duration: 2,
      delay: -0.8,
      ease: Circ.easeInOut,
    })
    .to("#green", {
      height: "0%",
      top: 0,
      duration: 1,
      delay: -0.5,
      ease: Circ.easeInOut,
      onComplete: function () {
        animateHomePage();
      },
    });
}

function animateSvg() {
  gsap.to("#Visual>g>g>path, #Visual>g>g>polyline", {
    strokeDashoffset: 0,
    duration: 2,
    ease: Expo.easeInOut,
  });
}

function animateHomePage() {
  var tl = gsap.timeline();

  tl.to("#nav a", {
    y: 0,
    opacity: 1,
    stagger: 0.05,
    ease: Expo.easeInOut,
  })
    .to("#home span.child", {
      y: 0,
      stagger: 0.1,
      duration: 2,
      ease: Expo.easeInOut,
    })
    .to("#home .row img", {
      opacity: 1,
      ease: Expo.easeInOut,
      onComplete: function () {
        animateSvg();
      },
    });
}

function locoInitialize() {
  const scroll = new LocomotiveScroll({
    el: document.querySelector("#main"),
    smooth: true,
  });
}

function cardHoverEffect() {
  document.querySelectorAll(".cnt").forEach(function (cnt) {
    var showingImage;
    cnt.addEventListener("mousemove", function (dets) {
      var cursor = document.querySelector("#cursor");
      var index = dets.target.dataset.index;

      if (cursor && cursor.children[index]) {
        cursor.children[index].style.opacity = 1;
      }

      showingImage = dets.target;

      if (dets.target.dataset.index) {
        cursor.children[
          dets.target.dataset.index
        ].style.transform = `translate(${dets.clientX}px, ${dets.clientY}px)`;
      }

      showingImage.style.filter = "grayscale(1)";
      document.querySelector("#work").style.backgroundColor =
        "#" + dets.target.dataset.color;
    });

    cnt.addEventListener("mouseleave", function () {
      if (showingImage) {
        var index = showingImage.dataset.index;
        if (index !== undefined) {
          document.querySelector("#cursor").children[index].style.opacity = 0;
        }
        showingImage.style.filter = "grayscale(0)";
      }
      document.querySelector("#work").style.backgroundColor = "#F2F2F2";
    });
  });
}

document.addEventListener("DOMContentLoaded", function () {
  revealTospan();
  valueSetters();
  loaderAnimation();
  locoInitialize();
});
cardHoverEffect();
