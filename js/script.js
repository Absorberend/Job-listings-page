"use strict";

const jobData = fetch('./data.json');
const jobContainer = document.querySelector('.job__container');
let filterMenuArray = new Set(); 


const filterMenuSpawner = data => {
  [...filterMenuArray].forEach(filteredCategory => {
    const menu1 = `
      <div class="filter__menu">
      <div class="filter__buttons">
        <span class="filter__style" data-job-type="${filteredCategory}">${filteredCategory}<span class="remove__filter">X</span></span>
      </div>
        <div class="clear__button">Clear</div>
      </div>`;

    const menu2 = `
      <span class="filter__style" data-job-type="${filteredCategory}">${filteredCategory}<span class="remove__filter">X</span></span>`

    //conditions to insert filter buttons in the filter menu
    if (!jobContainer.firstElementChild.classList.contains('filter__menu')) {
      jobContainer.insertAdjacentHTML("afterbegin", menu1);
    } else {
      const categorieButtons = document.querySelector('.filter__buttons');
      categorieButtons.insertAdjacentHTML("beforeend", menu2);       
    }

    //Clear button in filter menu
    const clearButton = document.querySelector('.clear__button');

    const hardReset = () => {
      filterMenuArray.clear();
      jobContainer.innerHTML='';
      data.forEach(job => insertJobTables(job));
      buttonListener(data);
    }

    clearButton.addEventListener('click', function () {
      hardReset();
    });
  
    //remove filter button when clicked and re-sort the job table
    const jobButtonsFilter = document.querySelectorAll('.filter__style');

    jobButtonsFilter.forEach(jobButton => jobButton.addEventListener('click', function() {

      filterMenuArray.delete(jobButton.dataset.jobType);
      jobButton.remove();
     
      if ([...filterMenuArray].length === 0) {
         //if no filter buttons are present do a hardreset 
        hardReset();
      } else {
        const jobTable = document.querySelectorAll('.job__table');
        jobTable.forEach(table => table.remove());
        filter(data); 
        buttonListener(data);
      }
    }))
  })
}


const insertJobTables = job => {
  const html = `
  <div class="job__table ${job.featured === true ? "featured__background" : ""}">
      <!-- Item Start -->
      <img src="${job.logo}" class="logo" alt="${job.company}'s logo">
      <div class ="job__header__container">
      <span class="company">${job.company}</span>
      <div class="featured__wrapper">
        <span class="${job.new === true ? "new" : ""}">${job.new === true ? "NEW!" : ""}</span>
        <span class="${job.featured === true ? "featured" : ""}">${job.featured === true ? "FEATURED" : ""}</span>
      </div>
    </div>
    <h2 class="position">${job.position}</h2>
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
    </div>`;

    //insert the jobs in the job container
  jobContainer.insertAdjacentHTML("beforeend", html);
}


const filter = data => {
  let filterBase;
  let filterCheck;

  //Check for each company if the clicked filter button (category) is present.
  [...filterMenuArray].forEach(filteredCategory => {
    filterBase = data.filter(company => [company.role, company.level, ...company.languages, ...company.tools].includes(filteredCategory));
  })

  //Check if all the filter buttons (categories) are present before inserting the filtered jobs in the job container
  filterBase.forEach(company => {
    const categories = [company.role, company.level, ...company.languages, ...company.tools];
    filterCheck = [...filterMenuArray].filter(filterMenu => categories.includes(filterMenu));

    if (filterCheck.toString() === [...filterMenuArray].toString()) {
      insertJobTables(company);
    } else {
      
    }
  })
}

const buttonListener = data => {
  const [...categorieButtons] = document.querySelectorAll('.info__style');

  //make sure that the filter buttons are always clickable whenever they are inserted into the DOM
  categorieButtons.forEach(button => {
      button.addEventListener('click', function() {
        //filterMenuArray is Set instead of Array because we only want unique entries for the filter to work properly.
          filterMenuArray.add(button.innerHTML);

          jobContainer.innerHTML = ``;
          filter(data);
          buttonListener(data);
          filterMenuSpawner(data);
      });
  })
}

const loadData = async () => {
  const response = await jobData;
  const data = await response.json();
  data.forEach(job => {
    insertJobTables(job);
  })
  buttonListener(data);
}

loadData();
