const header = document.getElementById('header');
const scrollElements = document.querySelectorAll('.js-scroll');
const scrollCircleElements = document.querySelectorAll('.circle');

var scrollPos = 0;
let detect = undefined;

const inViewport = (el, divided = 1) => {
    const elementTop = el.getBoundingClientRect().top;
    return (elementTop <= (window.innerHeight || document.documentElement.clientHeight) / divided);
};

const outOfViewport = (el) => {
    const elementTop = el.getBoundingClientRect().top;
    return (
        elementTop > (window.innerHeight || document.documentElement.clientHeight)
    );
};

const displayElement = (element) => {
    element.classList.add('scrolled');
}

const hideElement = (element) => {
    element.classList.remove('scrolled');
};

const handleScrollAnimation = () => {
    scrollElements.forEach((el) => {
        if (inViewport(el, 1.25)) {
            displayElement(el);
        } else if (outOfViewport(el)) {
            hideElement(el);
        }
    });
    scrollCircleElements.forEach((el) => {
        if (inViewport(el, 1.25)) {
            if (detect === 'true') {
                el.classList.add('animate-circle', 'slide-top');
            }
            else {
                el.classList.add('animate-circle', 'slide-back');
            }
        }
        else if (outOfViewport(el)) {
            if (detect === 'true') {
                el.classList.remove('animate-circle', 'slide-top');
            }
            else {
                el.classList.remove('animate-circle', 'slide-back');
            }
        }
    });
}


function detectScroll() {
    scrollCircleElements.forEach((el) => {
        if ((document.body.getBoundingClientRect()).top > scrollPos) {
            detect = true;
            el.classList.add('animate-circle', 'slide-top');
            el.classList.remove('slide-back');
        }
        else {
            detect = false;
            el.classList.add('animate-circle', 'slide-back');
            el.classList.remove('slide-top');
            el.style.top = el.getBoundingClientRect.top;
            el.style.left = el.getBoundingClientRect.left;
            el.style.bottom = el.getBoundingClientRect.bottom;
            el.style.right = el.getBoundingClientRect.right;

        }
    });


    scrollPos = (document.body.getBoundingClientRect()).top;
}


function changeHeader() {
    if (document.body.scrollTop > 50 || document.documentElement.scrollTop > 50) {
        header.classList.add('sticky-head');
    }
    else {
        header.classList.remove('sticky-head');
    }
}

window.addEventListener('scroll', () => {
    changeHeader();
    handleScrollAnimation();
    detectScroll();
});


// ------------------------menu-toggle--------------------

const menuIcon = document.getElementById('menu-icon');
const menu = document.querySelector(".menu");

menuIcon.addEventListener('click', () => {
    menu.classList.toggle('show');
    menuIcon.classList.toggle('hide');
});

document.querySelectorAll(".carousel__container").forEach((carousel) => {
    const items = carousel.querySelectorAll(".carousel__item");
    const buttonHtml = Array.from(items, () => {
        return `<span class="carousel__btn"></span>`;
    });
    carousel.insertAdjacentHTML(
        "beforeend",
        `<div class="carousel__nav">${buttonHtml.join("")}</div>`
    );

    const carouselBtns = carousel.querySelectorAll(".carousel__btn");

    carouselBtns.forEach((carouselBtn, i) => {
        carouselBtn.addEventListener("click", () => {
            // un-select all the items
            items.forEach((item) =>
                item.classList.remove("carousel__item--selected")
            );
            carouselBtns.forEach((carouselBtn) =>
                carouselBtn.classList.remove("carousel__btn--selected")
            );

            items[i].classList.add("carousel__item--selected");
            carouselBtn.classList.add("carousel__btn--selected");
        });
    });
});
