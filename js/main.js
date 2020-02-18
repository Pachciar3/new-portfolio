const navTogglerBtn = document.getElementById("nav-toggler_btn");
const navTogglerNav = document.getElementById("nav-toggler_nav");
const links = navTogglerNav.querySelectorAll(".navbar__nav-link");

let isExpanded = false;
const handleMenuClass = type => {
  navTogglerNav.classList[type]("is-active");
  if (type === "remove") {
    isExpanded = false;
    navTogglerBtn.setAttribute('aria-expanded', isExpanded);
  } else if (type === "toggle") {
    isExpanded = !isExpanded;
    navTogglerBtn.setAttribute('aria-expanded', isExpanded);
  } else if (type === "add") {
    isExpanded = true;
    navTogglerBtn.setAttribute('aria-expanded', isExpanded);
  }
};

links.forEach(link => {
  link.addEventListener("click", () => handleMenuClass("remove"));
});
navTogglerBtn.addEventListener("click", () => handleMenuClass("toggle"));

//FORMULARZ
const contactForm = document.getElementById('contact-form');
const mailInput = document.getElementById('mail');
const mailError = document.getElementById('mail-error');
const topicInput = document.getElementById('topic');
const topicError = document.getElementById('topic-error');
const messageInput = document.getElementById('message');
const messageError = document.getElementById('message-error');
const submitBtn = document.getElementById('submit-btn');
const validateEmail = (email) => {
  const re = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
  return re.test(email);
}
const displayResult = (type, text) => {
  let timeout;
  const removeResult = () => {
    clearTimeout(timeout);
    result.classList.remove('is-active');
    setTimeout(() => contactForm.removeChild(result), 200);
  };
  const result = document.createElement('div');
  if (type) {
    result.className = "result result--success";
  } else {
    result.className = "result result--danger";
  }
  result.addEventListener('click', removeResult);
  result.innerHTML = `<span class="result__icon"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z" /><path d="M0 0h24v24H0z" fill="none" /></svg ></span>
  <span class="result__text">${text}</span>`;
  contactForm.appendChild(result);
  setTimeout(() => result.classList.add('is-active'), 10);
  timeout = setTimeout(removeResult, 5000);
}
contactForm.addEventListener('submit', e => {
  let isGood = true;
  e.preventDefault();
  if (!validateEmail(mailInput.value)) {
    isGood = false;
    mailError.innerHTML = "Email niepoprawny";
  } else {
    mailError.innerHTML = "";
  }

  if (!(topicInput.value.length > 2) || !(topicInput.value.length < 100)) {
    isGood = false;
    topicError.innerHTML = "Temat może mieć od 3 do 100 znaków";
  } else {
    topicError.innerHTML = "";
  }

  // if (!(topicInput.value.length < 100)) {
  //   isGood = false;
  //   topicError.innerHTML = "Temat może mieć maksymalnie 100 znaków";
  // } else {
  //   topicError.innerHTML = "";
  // }

  if (!(messageInput.value.length > 5) || !(messageInput.value.length < 2000)) {
    isGood = false;
    messageError.innerHTML = "Wiadomość może mieć 6 do 2000 znaków";
  } else {
    messageError.innerHTML = "";
  }

  // if (!(messageInput.value.length < 1000)) {
  //   isGood = false;
  //   messageError.innerHTML = "Wiadomość może mieć maksymalnie 1000 znaków";
  // } else {
  //   messageError.innerHTML = "";
  // }

  if (isGood) {
    console.log('GOOD');
    const urlencoded = new URLSearchParams();
    urlencoded.append("mail", mailInput.value);
    urlencoded.append("topic", topicInput.value);
    urlencoded.append("message", messageInput.value);

    const requestOptions = {
      method: 'POST',
      headers: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      body: urlencoded,
      redirect: 'follow'
    };

    fetch("https://dawid-pachciarek.pl/contact-form.php", requestOptions)
      .then(response => {
        if (response.ok) {
          return response.text();
        } else {
          if (response.status === 400 || response.status === 403) {
            displayResult(false, 'Treść formularza zawiera błędy');
          } else {
            displayResult(false, 'Podczas wysyłania formularza wystąpił błąd. Spróbuj ponownie');
          }
          throw Error(response.statusText);
        }
      })
      .then(result => {
        mailInput.value = "";
        topicInput.value = "";
        messageInput.value = "";
        console.log(result);
        displayResult(true, 'Formularz wysłany poprawnie. Dziękujemy')
      })
      .catch(error => console.log('error', error));

  } else {
    console.log('Źle');
  }
});

const navbar = document.getElementById('navbar');

window.addEventListener('scroll', () => {
  // console.log('ok');
  if (window.scrollY > 200) {
    navbar.classList.add('navbar__con--short');
  } else {
    navbar.classList.remove('navbar__con--short');
  }
});

//asd
const getPosition = element => {
  let xPosition = 0;
  let yPosition = 0;

  while (element) {
    xPosition += (element.offsetLeft - element.scrollLeft + element.clientLeft);
    yPosition += (element.offsetTop - element.scrollTop + element.clientTop);
    element = element.offsetParent;
  }

  return { x: xPosition, y: yPosition };
}
const items = document.querySelectorAll('*[data-animation]');
for (let i = 0; i < items.length; i++) {
  if (items[i].hasAttribute("data-animation")) items[i].classList.add('hide');
}
const checkingAnimations = () => {
  for (let i = 0; i < items.length; i++) {
    if (i === 4) {
      console.log(window.scrollY, getPosition(items[i]).y + (items[i].offsetHeight / 2) - window.innerHeight, items[i]);
    }
    const initialization = items[i].getAttribute("data-animation-init") ? items[i].getAttribute("data-animation-init") : "middle";
    let elementSize;
    switch (initialization) {
      case "middle":
        elementSize = items[i].offsetHeight / 2;
        break;
      case "top":
        elementSize = 0;
        break;
      case "bottom":
        elementSize = items[i].offsetHeight;
        break;
    }
    if (window.scrollY > getPosition(items[i]).y + elementSize - window.innerHeight) {
      const className = items[i].getAttribute("data-animation");
      const duration = items[i].getAttribute("data-animation-duration") ? items[i].getAttribute("data-animation-duration") : "0.5s";
      items[i].classList.remove('hide');
      items[i].classList.add(className);
      items[i].style.animationDuration = duration;
    }
  }
}
checkingAnimations();
document.addEventListener('scroll', checkingAnimations);