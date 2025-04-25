jQuery(document).ready(function ($) {
  $(".selectpicker").selectpicker();
  progress();
  uploadFile();
  allSiteSwiperInit();
  includeHTML();
  verificationCodeSeprate();
  showPassword($);
  collapseFooterMenusInSmallScreens($);
  toggleSideMenuInSmallScreens($);
  stickyHeader($);
  // verificationCountdown();
  mixitupInit();
  lazyLoad();
});

// functions init

function lazyLoad() {
  const images = document.querySelectorAll(".lazy-omd");

  const optionsLazyLoad = {
    // rootMargin: "-50px",
    // threshold: 1,
  };

  const preloadImage = function (img) {
    img.src = img.getAttribute("data-src");
    img.onload = function () {
      img.parentElement.classList.remove("loading-omd");
      img.parentElement.classList.add("loaded-omd");
      img.parentElement.parentElement.classList.add("lazy-head-om");
    };
  };

  const imageObserver = new IntersectionObserver(function (imageEnteries) {
    imageEnteries.forEach(function (entery) {
      if (!entery.isIntersecting) {
        return;
      } else {
        preloadImage(entery.target);
        imageObserver.unobserve(entery.target);
      }
    });
  }, optionsLazyLoad);

  images.forEach(function (image) {
    imageObserver.observe(image);
  });
}

function swiperInit(options) {
  // console.log(options);
  const swiper = new Swiper(options.className + " .swiper-container", {
    spaceBetween: 30,
    autoplay: {
      delay: 3000,
      disableOnInteraction: false,
    },
    rtl: $("html").attr("dir") === "rtl" ? true : false,
    pagination: {
      el: options.className + " .swiper-pagination",
      clickable: true,
    },
    navigation: {
      nextEl: options.className + " .swiper-button-next",
      prevEl: options.className + " .swiper-button-prev",
    },
    breakpoints: options.breakpoints,
    observer: options.observer,
    observeParents: options.observeParents,
    grid: options.grid,
    ...options,
  });

  lazyLoad();

  return swiper;
}

function allSiteSwiperInit() {
  // const healthCareServicesSwiperBreakNormalPoints = {
  //   0: {
  //     slidesPerView: 1,
  //   },
  //   480: {
  //     slidesPerView: 2,
  //   },
  //   767: {
  //     slidesPerView: 3,
  //   },
  //   992: {
  //     slidesPerView: 3,
  //   },
  //   1200: {
  //     slidesPerView: 4,
  //   },
  // };

  const productsSingleSliderProps = {
    autoplay: false,
    className: ".product_single_page",
    breakpoints: false,
    observer: true,
    observeParents: true,
  };

  const sliderProps = {
    autoplay: false,
    className: ".intro_section",
    breakpoints: false,
    observer: true,
    observeParents: true,
  };

  swiperInit(productsSingleSliderProps);
  swiperInit(sliderProps);
}

function verificationCodeSeprate() {
  const inputElements = [...document.querySelectorAll("input.code-input")];

  inputElements.forEach((ele, index) => {
    ele.addEventListener("keydown", (e) => {
      // if the keycode is backspace & the current field is empty
      // focus the input before the current. The event then happens
      // which will clear the input before the current
      if (e.keyCode === 8 && e.target.value === "") {
        inputElements[Math.max(0, index - 1)].focus();
      }
    });
    ele.addEventListener("input", (e) => {
      if (e.target.value === "") {
        inputElements[index].classList = "code-input";
      } else {
        inputElements[index].classList = "code-input active";
      }

      // take the first character of the input
      // this actually breaks if you input an emoji like 👨‍👩‍👧‍👦....
      // but I'm willing to overlook insane security code practices.
      const [first, ...rest] = e.target.value;
      e.target.value = first ?? ""; // the `??` '' is for the backspace usecase
      const lastInputBox = index === inputElements.length - 1;
      const insertedContent = first !== undefined;
      if (insertedContent && !lastInputBox) {
        // continue to input the rest of the string
        inputElements[index + 1].focus();
        inputElements[index + 1].value = rest.join("");
        inputElements[index + 1].dispatchEvent(new Event("input"));
      }
    });
  });
}

function showPassword($) {
  $(".show-password-button-om").on("click", function (e) {
    e.preventDefault();
    if ($(this).parent().find("input").attr("type") == "text") {
      $(this).parent().find("input").attr("type", "password");
      $(this).removeClass("show-om");
    } else {
      $(this).parent().find("input").attr("type", "text");
      $(this).addClass("show-om");
    }
  });
}

function collapseFooterMenusInSmallScreens($) {
  if ($(window).width() <= 991) {
    $(".collapse-head-om").on("click", function (e) {
      e.preventDefault();

      $(".collapse-head-om")
        .not(this)
        .parent()
        .find(".list-collapse-om")
        .slideUp();
      $(this)
        .parent()
        .find(".list-collapse-om")
        .slideToggle({
          queue: false,
          complete: function () {
            $(".list-collapse-om").each(function () {
              if ($(this).css("display") == "none") {
                $(this).parent().removeClass("active");
              } else {
                $(this).parent().addClass("active");
              }
            });
          },
        });
    });
  }
}

function toggleSideMenuInSmallScreens($) {
  // nav men activation
  $("#menu-butt-activ-om").on("click", function (e) {
    e.preventDefault();

    $("#navbar-menu-om").addClass("active-menu");
    $(".overlay").addClass("active");
    $("body").addClass("overflow-body");
  });

  // nav men close
  $(".close-button__ , .overlay ").on("click", function (e) {
    e.preventDefault();
    $("#navbar-menu-om").removeClass("active-menu");
    $(".overlay").removeClass("active");
    $("body").removeClass("overflow-body");
  });
}

function stickyHeader($) {
  let headerHeight = $("header").outerHeight();

  $("header").innerHeight(headerHeight);

  let lastScroll = 0;
  $(document).on("scroll", function () {
    let currentScroll = $(this).scrollTop();
    // side links
    if (currentScroll > headerHeight + 500 || screen.width < 500) {
      $(".side_links_section").addClass("active");
    } else {
      $(".side_links_section").removeClass("active");
    }

    // scroll down
    if (currentScroll < lastScroll && currentScroll > headerHeight + 500) {
      // add class avtive menu
      $(".fixed_header__").addClass("active_menu__");
      $(".fixed_header__").removeClass("not_active_menu__");
    } else if (
      currentScroll > lastScroll &&
      currentScroll > headerHeight + 500
    ) {
      // scroll up
      if ($(".fixed_header__").hasClass("active_menu__")) {
        $(".fixed_header__").removeClass("active_menu__");
        $(".fixed_header__").addClass("not_active_menu__");
      }
    } else {
      $(".fixed_header__").removeClass("active_menu__");
      $(".fixed_header__").removeClass("not_active_menu__");
    }
    lastScroll = currentScroll;
  });

  $(".arrow_button__").click(() => {
    $(".side_links_section").removeClass("active");
  });
}

function mixitupInit() {
  let ele = document.querySelector("#filter_items_wrapper");
  if (ele) {
    mixitup(ele, {
      selectors: {
        control: ".filter_control",
        target: ".filter_item",
      },
    });
  }

  $(".filter").each((index, element) => {
    if (index === 0) element.click();
  });
}

// function verificationCountdown() {
//   const countAttrData = $(".count_down_wrapper__ .text__").attr(
//     "count-data-with-second"
//   );
//   const percentage = 140 / countAttrData; // 140 is the value of the svg circle css to be complete circle
//   let counter;
//   setCounterReady();
//   let interval = setInterval(counterInterval, 1000);

//   function setCounterReady() {
//     counter = countAttrData;
//     toggleShowHideSendCodeAgainButtonAndCounterWrapper();
//     setCounterNumberAndShape();
//   }

//   function counterInterval() {
//     counter--;
//     setCounterNumberAndShape();

//     if (counter < 0) {
//       clearInterval(interval);
//       toggleShowHideSendCodeAgainButtonAndCounterWrapper(false);
//     }
//   }

//   // Counter Wrapper And Send Code Again Button Can't Show Together
//   function toggleShowHideSendCodeAgainButtonAndCounterWrapper(
//     isShowCounterWrapper = true
//   ) {
//     if (isShowCounterWrapper) {
//       $("#sendCodeAgain").hide();
//       $("#countDownWrapper").show();
//     } else {
//       $("#sendCodeAgain").show();
//       $("#countDownWrapper").hide();
//     }
//   }

//   function setCounterNumberAndShape() {
//     $(".count_down_wrapper__ .text__").html(
//       (counter <= 9 ? "0" + counter : counter) + "S"
//     );
//     $("#counterCircleShape").css(
//       "stroke-dasharray",
//       `${counter * percentage} 350`
//     );
//   }

//   $("#sendCodeAgain").click(() => {
//     setCounterReady();
//     verificationCountdown();
//   });
// }

function addActiveToHeaderLink(ele) {
  $(".header_list_item__ a[href='" + window.location.href + "']")
    .parent()
    .addClass("active");
}

function uploadFile() {
  $(".upload_photo__ input").change(function (e) {
    let img = $(this).parent().find("img");
    let file = e.target.files[0];

    if (file) {
      let reader = new FileReader();
      reader.onload = () => {
        img.attr("src", reader.result).show();
        img.parent().parent().addClass("uploaded__");
      };
      reader.readAsDataURL(file);
    }
  });
}

function progress() {
  const startDate = new Date($("#startDate").html());
  const endDate = new Date($("#endDate").html());
  const totalTime = (endDate - startDate) / (1000 * 60 * 60 * 24);

  function updateProgressBar() {
    const currentDate = new Date();
    const elapsedTime = (currentDate - startDate) / (1000 * 60 * 60 * 24);
    let progressPercentage = (elapsedTime / totalTime) * 100;
    progressPercentage = Math.min(progressPercentage, 100);

    $("#progress").css("width", `${progressPercentage}%`);
    if (progressPercentage === 100)
      $("#progress").css("backgroundColor", `#EA0449`);

    setTimeout(updateProgressBar, 24 * 60 * 60 * 1000);
  }

  updateProgressBar();
}
