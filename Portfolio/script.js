document.querySelectorAll('.nav-links a').forEach(link => {
  link.addEventListener('click', function(e) {
    e.preventDefault();
    const targetId = this.getAttribute('href').substring(1);
    const section = document.getElementById(targetId);
    section.scrollIntoView({ behavior: 'smooth' });
  });
});

const form = document.querySelector("form");
form.addEventListener("submit", function(e) {
  e.preventDefault(); 

  const name = form.querySelector('input[type="text"]').value.trim();
  const email = form.querySelector('input[type="email"]').value.trim();
  const message = form.querySelector('textarea').value.trim();

  if (name === "" || email === "" || message === "") {
    alert("Please fill in all fields.");
    return;
  }

  alert("Thank you for your message, " + name + "!");
  form.reset();
});


const resumeButton = document.querySelector('.head button');
resumeButton.addEventListener('click', () => {
  console.log("Resume download clicked.");
});