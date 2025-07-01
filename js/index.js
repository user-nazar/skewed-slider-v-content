console.clear();
var controller = new ScrollMagic.Controller();
var skewAnimation = new TimelineMax();

var currPage = 1;
var numOfPages = $(".px-pages .px-page").length;
var scrollDuration = parseInt(numOfPages * 1.2 * 100);

$(".px-pages .px-page").each(function (i, v) {
  currPage = i + 1;
  currElem = ".px-page.px-page-" + currPage + " .half";
  skewAnimation.to(currElem, 0.5, {
    onStart: setActive,
    onStartParams: [".px-page.px-page-" + currPage + ""],
    onReverseComplete: setInactive,
    onReverseCompleteParams: [".px-page.px-page-" + currPage + ""],
  });

  headingElem = currElem + " .heading";
  descElem = currElem + " .description";
  hrElem = currElem + " hr";

  skewAnimation
    .fromTo(
      headingElem,
      1,
      { css: { top: "-10%", opacity: 0 } },
      { css: { top: "0", opacity: 1 } }
    )
    .fromTo(
      descElem,
      0.5,
      { css: { bottom: "-20%", opacity: 0 } },
      { css: { bottom: "0", opacity: 1 } },
      "-=1"
    )
    .fromTo(
      hrElem,
      1,
      { css: { width: "0", opacity: 0 } },
      { css: { width: "300px", opacity: 1 } },
      "-=1"
    );

  setBackgroundImageAndColor(currElem);
});

new ScrollMagic.Scene({
  triggerElement: ".px-pages",
  triggerHook: "onLeave",
  duration: scrollDuration + "%",
})
  .setPin(".px-pages")
  .setTween(skewAnimation)
  .addTo(controller);

function setActive(elem) {
  $(elem).addClass("active");
}

function setInactive(elem) {
  if (!$(elem).is(":first-child")) {
    $(elem).removeClass("active");
  }
}

function setBackgroundImageAndColor(elem) {
  var leftContent = $(elem + ".half--left .content");
  var rightContent = $(elem + ".half--right .content");

  var leftImage = leftContent.data("bgImage");
  var rightImage = rightContent.data("bgImage");
  var leftColor = leftContent.data("bgColor");
  var rightColor = rightContent.data("bgColor");

  if (typeof leftImage !== typeof undefined && leftImage !== false) {
    leftContent.css("background-image", 'url("' + leftImage + '")');
  } else if (typeof rightImage !== typeof undefined && rightImage !== false) {
    rightContent.css("background-image", 'url("' + rightImage + '")');
  }

  if (typeof leftColor !== typeof undefined && leftColor !== false) {
    leftContent.css("background-color", leftColor);
  } else if (typeof rightColor !== typeof undefined && rightColor !== false) {
    rightContent.css("background-color", rightColor);
  }
}
