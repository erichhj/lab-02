const header = document.querySelector("header")

const first_skill = document.querySelector(".skill:first-child")
const sk_counters = document.querySelectorAll(".counter span")
const progress_bars = document.querySelectorAll(".skills svg circle")

const ml_section = document.querySelector(".milestone")
const ml_counter = document.querySelectorAll(".number span")

// contact me section

const name_input = document.getElementById('name-field')
const email_input = document.getElementById('email-field')
const message_input = document.getElementById('msg-field')

const contactme_form = document.getElementById('form-contact')
const error_element = document.getElementById('error-field')

// scroll section

const first_section_sc = document.getElementsByClassName('container')


window.addEventListener("scroll", () => {
    if (!skillsPlayed) skillsCounter();
    if (!mlPlayed) mlCounter();
})

function updateCount(num, maxNum) {
    let currentNum = +num.innerText

    if (currentNum < maxNum) {
        num.innerText = currentNum + 1
        setTimeout(() => {
            updateCount(num, maxNum)
        }, 12)
    }
}

/* ------ Sticky Navigation Bar Styling ------ */

function stickyNavbar() {
    header.classList.toggle("scrolled", window.pageYOffset > 0)
}

stickyNavbar();

window.addEventListener("scroll", stickyNavbar)


/* ------ Scroll Reveal Animation Styling ------ */

let sr = ScrollReveal({
    duration: 2500,
    distance: "60px"
})

sr.reveal('.showcase-info', { delay: 200 });
sr.reveal('.showcase-image', { origin: "top", delay: 250 });

/* ------ Skills Styling ------ */

function hasReached(el) {
    let topPosition = el.getBoundingClientRect().top;

    return window.innerHeight >= topPosition + el.offsetHeight;
}

let skillsPlayed = false;

function skillsCounter() {
    if (!hasReached(first_skill)) return;

    skillsPlayed = true;

    sk_counters.forEach((counter, i) => {
        let target = +counter.dataset.target;
        let strokeValue = 427 - 427 * (target / 100);

        progress_bars[i].style.setProperty("--target", strokeValue)
        setTimeout(() => {
            updateCount(counter, target)
        }, 400)

    })

    progress_bars.forEach((p) => (p.style.animation = "progress 2s ease-in-out forwards"))
}

/* ------ Services Styling ------ */

let mlPlayed = false;

function mlCounter() {
    if (!hasReached(first_skill)) return;

    mlPlayed = true;

    ml_counter.forEach((counter, i) => {
        let target = +counter.dataset.target;

        setTimeout(() => {
            updateCount(counter, target)
        }, 400)

    })

}

// Contact Me 

contactme_form.addEventListener('submit', (e) => {
    let error_messages = []
    if (name_input.value === '' || name_input.value == null) {
        error_messages.push('Name is required')
    }

    if (email_input.value === '' || email_input.value == null) {
        error_messages.push('Email is required')
    }

    if (message_input.value === '' || message_input.value == null) {
        error_messages.push('Message is required.')
    }

    if (error_messages.length > 0) {
        e.preventDefault()
        error_element.innerHTML = error_messages.join('. ')
    } else {
        alert('Message sent successfully.')
    }


})





