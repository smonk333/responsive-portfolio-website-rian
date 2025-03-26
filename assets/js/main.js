/*=============== SHOW MENU ===============*/

const navMenu = document.querySelector('#nav-menu'),
    navToggle = document.querySelector('#nav-toggle'),
    navClose = document.querySelector('#nav-close')

/* Menu show */
navToggle?.addEventListener('click', () => {
    navMenu.classList.add('show-menu')
})

/* Menu hidden */
navClose?.addEventListener('click', () => {
    navMenu.classList.remove('show-menu')
})

/*=============== REMOVE MENU MOBILE ===============*/

const navLink = document.querySelectorAll('.nav__link')

const linkAction = () =>{
    const navMenu = document.querySelector('#nav-menu')
    // When we click on each nav__link, we remove the show-menu class
    navMenu.classList.remove('show-menu')
}
navLink.forEach(n => n.addEventListener('click', linkAction))

/*=============== SHADOW HEADER ===============*/

const shadowHeader = () =>{
    const header = document.querySelector('#header')
    // Add a class if the bottom offset is greater than 50 of the viewport
    this.scrollY >= 50 ? header.classList.add('shadow-header')
        : header.classList.remove('shadow-header')
}
window.addEventListener('scroll', shadowHeader)

/*=============== EMAIL JS ===============*/
const contactForm = document.querySelector('#contact-form'),
    contactMessage = document.querySelector('#contact-message')

const setFlashMessage = (text) => contactMessage.textContent = text;
const clearFlashMessage = () => contactMessage.textContent = '';

const sendEmail = async (e) => {
    e.preventDefault();

    // Collect form data
    const formData = new FormData(contactForm);
    const turnstileToken = formData.get('cf-turnstile-response');

    if (!turnstileToken?.trim()) {
        setFlashMessage('Complete the captcha first');
        setTimeout(clearFlashMessage, 5000);
        return;
    }

    try {
        // Send data to Cloudflare Worker
        const response = await fetch('https://turnstile.gboling829.workers.dev/', {
            method: 'POST',
            body: formData
        });

        if (response.ok) {
            setFlashMessage('Message sent successfully');
            contactForm.reset();
        } else {
            throw new Error('Failed to send message');
        }
    } catch (error) {
        contactMessage.textContent = 'Failed to send message';
    } finally {
        setTimeout(clearFlashMessage, 5000);
    }
};

contactForm.addEventListener('submit', sendEmail);

/*=============== SHOW SCROLL UP ===============*/ 


/*=============== SCROLL SECTIONS ACTIVE LINK ===============*/


/*=============== DARK LIGHT THEME ===============*/ 


/*=============== SCROLL REVEAL ANIMATION ===============*/
