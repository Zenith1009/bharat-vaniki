export function parallaxScroll(){
    const translate = document.querySelectorAll(".translating");
    const text = document.querySelector(".text");
    const main = document.querySelector("main");
    const shadow = document.querySelector(".shadow");
    const content = document.querySelector(".content");
    const imgContainer = document.querySelector(".imgContainer");
    const section = document.querySelector("section");
    const opacity = document.querySelectorAll(".opacity");
    const border = document.querySelector(".border");
    // const borderLine = document.querySelectorAll(".borderLine");

    let main_height = main.offsetHeight;
    let section_height = section.offsetHeight;

    window.addEventListener('scroll', () => {
        let scroll = window.scrollY;
        let sectionY = section.getBoundingClientRect();

        translate.forEach((element) => {
            let speed = element.dataset.speed;
            element.style.transform = `translate(-50%, -50%) translateY(${scroll*speed}px)`
        });

        opacity.forEach((el) => {
            el.style.opacity = scroll / (sectionY.top + section_height);
        })

        text.style.opacity = -scroll/(main_height / 2) + 1;
        shadow.style.height = `${scroll * 0.5 + 300}px`;
        content.style.transform = `translateY(${scroll / (section_height + sectionY.top) * 50 - 50}px)`
        imgContainer.style.transform = `translateY(${scroll / (section_height + sectionY.top) * -50 + 50}px)`

        border.style.width = `${scroll / (sectionY.top + section_height) * 30}%`;
        // borderLine.style.width = `${scroll / (sectionY.top + section_height) * 100}%`;
    })
}
