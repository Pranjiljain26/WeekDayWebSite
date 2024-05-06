// ? variable to check the amount of scroll done for infinite scrolling
let offset = 0;
const limit = 10;

function fetchData() {
  const myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");

  const body = JSON.stringify({
    limit,
    offset,
  });

  const requestOptions = {
    method: "POST",
    headers: myHeaders,
    body,
  };
  // !for fetching the data and creating the job cards with the relevant information
  fetch("https://api.weekday.technology/adhoc/getSampleJdJSON", requestOptions)
    .then((response) => response.json())
    .then((data) => {
      const jdList = data.jdList;
      const cardContainer = document.getElementById("cardContainer");

      jdList.forEach((job) => {
        const card = `
        <div class="card">
        <div class="box1">
          <img src="${job.logoUrl}" alt="${job.companyName}" />
          <div class="box1-inner">
            <h4>${job.companyName}</h4>
            <h5>${job.jobRole}</h5>
            <h5>${job.location}</h5>
          </div>
        </div>
        <div class="box-data-const">
          ${
            job.minJdSalary && job.maxJdSalary && job.salaryCurrencyCode
              ? `<h5>Expected Salary: ${job.minJdSalary} - ${job.maxJdSalary} ${job.salaryCurrencyCode}</h5>`
              : ""
          }
          <h4>About Company:</h4>
          <h5>About Us</h5>
        </div>
        <div class="box2">
          <p class="longText">${truncateText(job.jobDetailsFromCompany, 50)}</p>
          <a href="#" class="read-more">Read more</a> <!-- Read more link -->
        </div>
        <br />
        <p class="card-text">Experience: ${
          job.minExp ? job.minExp + " - " + job.maxExp : "Not specified"
        }</p>
        <br />
        ${
          job.jdLink
            ? `<a class="apply-button" href="${job.jdLink}">Easy Apply</a>`
            : ""
        }
        <button class="referral-button">Unlock Referral Asks</button>
      </div>
        `;
        cardContainer.innerHTML += card;
      });

      offset += limit; // Update offset for the next fetch

      const readMoreLinks = document.querySelectorAll(".read-more");
      readMoreLinks.forEach((readMoreLink) => {
        readMoreLink.addEventListener("click", function (event) {
          event.preventDefault();

          const jobDescription = this.previousElementSibling.textContent; // Get the job description

          // todo: adding data to the small box
          const modalContainer = document.getElementById("modalContainer");
          const fullJobDescription =
            document.getElementById("fullJobDescription");
          fullJobDescription.textContent = jobDescription;

          // todo: small box opening
          modalContainer.style.display = "block";
        });
      });

      //! going back to our page
      const closeButton = document.querySelector(".close");
      closeButton.addEventListener("click", function () {
        const modalContainer = document.getElementById("modalContainer");
        modalContainer.style.display = "none";
      });
    })
    .catch((error) => console.error(error));
}

// !reducing the no of words
function truncateText(text, numWords) {
  const words = text.split(" ");
  if (words.length > numWords) {
    return words.slice(0, numWords).join(" ") + " ...";
  } else {
    return text;
  }
}

// todo: are we at the bottom
function isAtBottom() {
  return window.innerHeight + window.scrollY >= document.body.offsetHeight;
}

// Event listener for scroll events
window.addEventListener("scroll", () => {
  if (isAtBottom()) {
    fetchData();
  }
});

fetchData();
