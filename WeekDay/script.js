const myHeaders = new Headers();
myHeaders.append("Content-Type", "application/json");

const body = JSON.stringify({
  limit: 10,
  offset: 0,
});

const requestOptions = {
  method: "POST",
  headers: myHeaders,
  body,
};

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
            ${job.minJdSalary && job.maxJdSalary && job.salaryCurrencyCode ?
              `<h5>Expected Salary: ${job.minJdSalary} - ${job.maxJdSalary} ${job.salaryCurrencyCode}</h5>` : ''}
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
          ${job.jdLink ? `<a class="apply-button" href="${job.jdLink}">Easy Apply</a>` : ''}
          <button class="referral-button">Unlock Referral Asks</button>
        </div>
      `;
      cardContainer.innerHTML += card;
    });

    // Add event listeners for "Read more" links
    const readMoreLinks = document.querySelectorAll(".read-more");
    readMoreLinks.forEach((readMoreLink) => {
      readMoreLink.addEventListener("click", function (event) {
        event.preventDefault(); // Prevent the default link behavior

        const jobDescription = this.previousElementSibling.textContent; // Get the job description

        // Populate the modal with the full job description
        const modalContainer = document.getElementById("modalContainer");
        const fullJobDescription = document.getElementById("fullJobDescription");
        fullJobDescription.textContent = jobDescription;

        // Display the modal
        modalContainer.style.display = "block";
      });
    });

    // Close the modal when the close button (X) is clicked
    const closeButton = document.querySelector(".close");
    closeButton.addEventListener("click", function () {
      const modalContainer = document.getElementById("modalContainer");
      modalContainer.style.display = "none";
    });
  })
  .catch((error) => console.error(error));

// Function to truncate text to a specified number of words
function truncateText(text, numWords) {
  const words = text.split(" ");
  if (words.length > numWords) {
    return words.slice(0, numWords).join(" ") + " ...";
  } else {
    return text;
  }
}
