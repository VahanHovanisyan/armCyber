const header = document.querySelector(".header");
const nav = document.querySelector(".nav");
const burger = document.querySelector(".burger");
const navItems = document.querySelectorAll('.nav__link');
const trainersList = document.querySelector(".trainers__list");
const stylesheet = document.styleSheets[2];
const trainersDescr = document.querySelectorAll('.trainers__descr');
const wrapper = document.body;
const carouselWrap = document.querySelector('.carousel__wrap');
const carouselItem = document.querySelectorAll('.carousel__item');
const carouselButton = document.querySelectorAll('.carousel__button');




carouselItem.forEach((element, i) => {
    element.style.setProperty('--slide-length', `${carouselItem?.length}`);
    element.addEventListener('click', () => {
        carouselWrap.style.transform = `rotateZ(${-325 / carouselItem?.length * (i + 3)}deg)`

        carouselButton.forEach((img, i) => {
            // img.style.transform = `rotateZ(360deg / ${-carouselItem.length} * var(--img-num));`
            img.style.setProperty('--img-num', 11)
        })
    })
});

trainersDescr.forEach(descrEl => {
    descrEl.setAttribute('aria-hidden', 'true')
});

trainersList?.addEventListener('mouseover', (event) => {
    const item = event.target.closest('.trainers__item');
    const descr = item?.querySelector('.trainers__descr');
    const itemName = item?.querySelector('.trainers__name');
    const itemSkill = item?.querySelector('.trainers__skill');
    const heightTrainersNameAndSkill = itemName?.scrollHeight + itemSkill?.scrollHeight;
    if (item) {
        descr.setAttribute('aria-hidden', 'false')
    }
    item?.style.setProperty('--height-trainers-descr', `${-descr.scrollHeight - 25}px`);
    if (descr?.scrollHeight >= 200) {
        item?.style.setProperty('--height-trainers-descr', `-${heightTrainersNameAndSkill + (item.scrollHeight / 2)}px`);
    }
});

trainersList?.addEventListener('mouseout', (event) => {
    const item = event.target.closest('.trainers__item');
    const descr = item?.querySelector('.trainers__descr');
    descr?.setAttribute('aria-hidden', 'true')
    if (item) {
        descr.setAttribute('aria-hidden', 'true')
    }
});


const burgerOpen = function () {
    burger.classList.toggle("burger_active");
    nav.classList.toggle("nav_active");
    nav.inert = false;
    header.classList.add("header_active");
    nav.style.paddingTop = header.offsetHeight + 30 + "px";
    Array.from(wrapper.children).forEach((child) => {
        if (child !== header) {
            child.inert = true;
        }
    });
    disableScroll();
}
const burgerClose = function () {
    burger.classList.remove("burger_active");
    nav.classList.remove("nav_active");
    nav.style.paddingTop = "";
    nav.inert = true;
    header.classList.remove("header_active");
    Array.from(wrapper?.children).forEach((child) => {
        if (child !== header) {
            child.inert = false;
        }
    });
    enableScroll();

}

burger.addEventListener("click", function () {
    if (!burger.classList.contains("burger_active")) {
        burgerOpen()
    } else {
        burgerClose()
    }
});
navItems.forEach(el => {
    el.addEventListener('click', () => {
        if (burger.classList.contains("burger_active")) {
            burgerClose()
        }

    })
})
const disableScroll = () => {
    const fixBlocks = document?.querySelectorAll('.fixed-block');
    const pagePosition = window.scrollY;
    const paddingOffset = `${(window.innerWidth - document.body.offsetWidth)
        }px`;

    document.documentElement.style.scrollBehavior = 'none';
    fixBlocks.forEach(el => { el.style.paddingRight = paddingOffset; });
    document.body.style.paddingRight = paddingOffset;
    document.body.classList.add('dis-scroll');
    document.body.dataset.position = pagePosition;
    document.body.style.top = `-${pagePosition} px`;
}

const enableScroll = () => {
    const fixBlocks = document?.querySelectorAll('.fixed-block');
    const pagePosition = parseInt(document.body.dataset.position, 10);
    fixBlocks.forEach(el => { el.style.paddingRight = '0px'; });
    document.body.style.paddingRight = '0px';

    document.body.style.top = 'auto';
    document.body.classList.remove('dis-scroll');
    window.scroll({
        top: pagePosition,
        left: 0
    });
    document.body.removeAttribute('data-position');
}


const mediaQueryMinWidth_1200 = window.matchMedia('(min-width: 1200px)');
if (mediaQueryMinWidth_1200.matches) {
    nav.inert = false;
} else {
    nav.inert = true;
}
mediaQueryMinWidth_1200.addEventListener("change", (e) => {
    if (e.matches) {
        nav.style.paddingTop = "";
        header.classList.remove("header_active");
        Array.from(wrapper?.children).forEach((child) => {
            if (child !== header) {
                child.inert = false;
            }
        });
        nav.inert = false;
        enableScroll()
        return true;
    }
    else {
        nav.inert = true;
        nav.style.paddingTop = header.offsetHeight + 30 + "px";
        if (burger.classList.contains('burger_active')) {
            header.classList.add("header_active");
            Array.from(wrapper?.children).forEach((child) => {
                if (child !== header) {
                    child.inert = true;
                }
            });
            nav.inert = false;
            disableScroll();
        }
        if (!burger.classList.contains('burger_active')) {
            nav.inert = true;
        }
    }
    return false;
});


const clientsSliderElement = document.querySelector('.clients__slider')
if (clientsSliderElement) {
    const clientsSlider = new Swiper(".clients__slider", {
        navigation: {
            nextEl: ".swiper-button-next",
            prevEl: ".swiper-button-prev",
        },
        loop: true,
        slidesPerView: 2,
        breakpoints: {
            480: {
                slidesPerView: 3,
            },
            768: {
                slidesPerView: 4,
            }
        }
    });
}
