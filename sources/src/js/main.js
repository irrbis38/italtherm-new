"use strict";

// ========== INIT VIDEO

var initYoutubeVideo = (videos) => {
    // create iframe element
    var createIframe = (id) => {
        var iframe = document.createElement("iframe");
        iframe.classList.add("video-iframe");
        iframe.setAttribute("src", id);
        iframe.setAttribute("title", "YouTube video player");
        iframe.setAttribute("frameborder", "0");
        iframe.setAttribute("allowfullscreen", "");
        iframe.setAttribute(
            "allow",
            "autoplay; fullscreen; accelerometer; gyroscope; picture-in-picture; encrypted-media"
        );

        return iframe;
    };

    // handling each video element
    videos.forEach((el) => {
        var videoHref = el.dataset.video;

        var parent = el.parentElement;

        var videoPlayBtn = parent.querySelector(".video-play-btn");

        videoPlayBtn.addEventListener("click", () => {
            var iframe = createIframe(videoHref);
            parent.querySelector(".video-preview").remove();
            el.append(iframe);
        });
    });
};

// ========== TOGGLE POLICY

var togglePolicy = () => {
    var policy = document.querySelector(".policy");
    var show_btns = document.querySelectorAll(".show-policy");
    var close_btn = document.querySelectorAll(".close-policy");

    show_btns.forEach((el) => {
        el.addEventListener("click", () => {
            policy.classList.add("active");
            document.body.classList.add("lock");
        });
    });

    close_btn.forEach((el) => {
        el.addEventListener("click", () => {
            policy.classList.remove("active");
            document.body.classList.remove("lock");
        });
    });
};

// ========== FORM VALIDATION

var initInputCheck = (formElements) => {
    formElements.forEach((el) => {
        el.addEventListener("input", () => {
            el.classList.remove("error");
        });
    });
};

var doFormValidation = (formElements) => {
    var requiredElements = formElements.filter((el) => {
        return el.required;
    });

    requiredElements.length > 0 &&
        requiredElements.forEach((el) => {
            if (
                el.dataset.maska &&
                el.value.length !== el.dataset.maska.length
            ) {
                el.classList.add("error");
            } else if (!el.value) {
                el.classList.add("error");
            } else {
                el.classList.remove("error");
            }
        });
};

var checkErorrs = (formElements) => {
    var isErrorConsist = formElements.some((el) =>
        el.classList.contains("error")
    );
    return !isErrorConsist;
};

var initFormValidation = (feedback) => {
    var forms = document.querySelectorAll(".js-form");

    if (forms.length < 0) return;

    forms.forEach((form) => {
        var inputs = Array.from(form.querySelectorAll(".js-input"));

        inputs.length > 0 && initInputCheck(inputs);

        form.addEventListener("submit", (e) => {
            e.preventDefault();

            doFormValidation(inputs);

            var checkResult = checkErorrs(inputs);

            if (checkResult) {
                form.reset();

                feedback.classList.add("success");
            }
        });
    });
};

var addMask = () => {
    // init mask inputs
    var initMaskaInput = () => {
        const { MaskInput } = Maska;
        const maskIinput = new MaskInput("[data-maska]");
    };

    var maskedInput = document.querySelectorAll("[data-maska]");

    maskedInput && initMaskaInput();
};

var initTopSlider = () => {
    new Swiper(".top__slider", {
        slidesPerView: 1,
        spaceBetween: 10,
        navigation: {
            prevEl: ".top__prev",
            nextEl: ".top__next",
        },
        breakpoints: {
            576: {
                slidesPerView: 2,
                spaceBetween: 20,
            },
            992: {
                slidesPerView: 3,
                spaceBetween: 40,
            },
        },
    });
};

var initToggleSteps = () => {
    var tabs = document.querySelectorAll(".quiz__tab");
    var quizTabs = document.querySelectorAll(".js-quiz-tab");

    if (quizTabs.length < 1) return;

    quizTabs.forEach((tab) => {
        var inputs = Array.from(tab.querySelectorAll(".quiz__input"));
        var goToNextBtn = tab.querySelector(".quiz__next");

        inputs.forEach((input) => {
            input.addEventListener("input", () => {
                if (inputs.some((i) => i.checked)) {
                    goToNextBtn.disabled = false;
                } else {
                    goToNextBtn.disabled = true;
                }
            });
        });

        goToNextBtn.addEventListener("click", () => {
            tab.classList.remove("active");
            tab.nextElementSibling.classList.add("active");
        });
    });

    var form = document.querySelector(".js-quiz-form");

    var inputs = Array.from(form.querySelectorAll(".js-input"));

    inputs.length > 0 && initInputCheck(inputs);

    form.addEventListener("submit", (e) => {
        e.preventDefault();

        doFormValidation(inputs);

        var checkResult = checkErorrs(inputs);

        if (checkResult) {
            form.reset();

            feedback.classList.add("success");

            tabs.forEach((t) =>
                t.classList.contains("quiz__tab--first")
                    ? t.classList.add("active")
                    : t.classList.remove("active")
            );
        }
    });
};

document.addEventListener("DOMContentLoaded", () => {
    // get all video elements on the page
    var videos = Array.from(document.querySelectorAll(".video-block"));
    videos.length > 0 && initYoutubeVideo(videos);

    togglePolicy();

    // init form validation
    var feedback = document.querySelector(".feedback");
    feedback && initFormValidation(feedback);

    // init mask
    addMask();

    // init slider
    initTopSlider();

    // init toggle steps
    initToggleSteps();
});
