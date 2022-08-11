"use strict";


const jobContainer = document.querySelector('.job__container');

const jobData = fetch('./data.json');

const loadData = async () => {
    const response = await jobData;
    const data = await response.json();
    data.forEach(job => {
        jobContainer.insertAdjacentHTML("beforeend", `
        <div class="tablet__test ${job.featured === true ? "featured__background" : ""}">
        <!-- Item Start -->
        <img src="${job.logo}" class="logo">
        <div class ="job__header__container">
        <span class="company">${job.company}</span>
        <div class="featured__wrapper">
          <span class="${job.new === true ? "new" : ""}">${job.new === true ? "NEW!" : ""}</span>
          <span class="${job.featured === true ? "featured" : ""}">${job.featured === true ? "FEATURED" : ""}</span>
        </div>
      </div>
      <span class="position">${job.position}</span>
      <div class="job__main__info__wrapper">
        <ul>
          <li class="postedAt">${job.postedAt}</li>
          <li class="contract">${job.contract}</li>
          <li class="location">${job.location}</li>
        </ul>
      </div>
      <span class="divider"></span>
        <!-- Role -->
      <div class="job__secondary__info__container">
        <span class="role info__style">${job.role}</span>
        <!-- Level -->
        <span class="level info__style">${job.level}</span>
        <!-- Languages -->
        ${job.languages[0] ? `<span class="languages info__style">${job.languages[0]}</span>` : "" }
        ${job.languages[1] ? `<span class="languages info__style">${job.languages[1]}</span>` : "" }
        ${job.languages[2] ? `<span class="languages info__style">${job.languages[2]}</span>` : "" }    
        <!-- Tools -->
        ${job.tools[0] ? `<span class="languages info__style">${job.tools[0]}</span>` : "" }
        ${job.tools[1] ? `<span class="languages info__style">${job.tools[1]}</span>` : "" }
      </div>
      <!-- Item End -->
    </div>`) 

        console.log([job.role, job.level, job.languages.join(' '), job.tools.join(' ')])

    })

    const [...filterButtons] = document.querySelectorAll('.info__style');

    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            console.log(button.innerHTML);
        })
    })
}

loadData();


