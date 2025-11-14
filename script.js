const images = document.querySelectorAll('.carousel img');
  const prevBtn = document.querySelector('.prev');
  const nextBtn = document.querySelector('.next');
  const nameText = document.getElementById('member-name');
  const navLinks = document.querySelectorAll('nav a');
  const leftPanel = document.getElementById('leftPanel');

  const subjects = {
    purposive: {
      title: "Purposive Communication",
      images: ["purposive(1).jpg", "purposive(2).jpg", "purposive(3).jpg"],
      desc: "In this subject, we learned how communication shapes understanding and collaboration in academic and professional contexts."
    },
    pe: {
      title: "Physical Education",
      images: ["pe(1).jpg", "pe(2).jpg", "pe(3).jpg"],
      desc: "This subject taught us teamwork, discipline, and the importance of maintaining physical fitness."
    },
    nstp: {
      title: "National Service Training Program",
      images: ["nstp(1).jpg", "nstp(2).jpg"],
      desc: "NSTP helped us develop leadership and service through community involvement."
    },
    halloween: {
      title: "Halloween",
      images: ["halloween(1).jpg", "halloween(2).jpg", "halloween(3).jpg"],
      desc: "Our Halloween event was filled with creative costumes, laughter, and unforgettable fun!"
    }
  };


  const events = {
    sinagtam: {
      title: "Sinag Tam",
      images: ["sinag_tam(1).jpg", "sinag_tam(2).jpg", "sinag_tam(3).jpg"],
      desc: "Our SINAG TAM event highlighted the creativity and collaboration of every Tamaraw in showcasing FEU pride.",
      imageDescs: [
        "Performing our opening piece with energy.",
        "Sharing stories of Tamaraw spirit.",
        "The final bow after an amazing performance."
      ]
    },
    sinagsports: {
      title: "Sinag Sports",
      images: ["sinag_sport(1).jpg", "sinag_sport(2).jpg", "sinag_sport(3).jpg"],
      desc: "SINAG Sports celebrated teamwork, discipline, and school pride through athletic events and friendly competition.",
      imageDescs: [
        "Warming up before the big game.",
        "A great moment of sportsmanship.",
        "Teamwork that makes the dream work."
      ]
    },
    orientation: {
      title: "Orientation",
      images: ["orientation(1).jpg", "orientation(2).jpg"],
      desc: "Our FEU Roosevelt Orientation marked the beginning of a new chapter — welcoming students to the Tamaraw family.",
      imageDescs: [
        "New students meeting their mentors.",
        "Welcoming everyone with a warm smile."
      ]
    }
  };


  const members = [
    { name: "Hi, I'm JM" },
    { name: "Hi, I'm Noel" },
    { name: "Hi, I'm Ramwil" }
  ];

  let current = 0;

  // === CAROUSEL ===
  function showImage(index) {
    images.forEach((img, i) => img.classList.toggle('active', i === index));
    nameText.textContent = members[index].name;
  }

  prevBtn.onclick = () => {
    current = (current - 1 + images.length) % images.length;
    showImage(current);
  };

  nextBtn.onclick = () => {
    current = (current + 1) % images.length;
    showImage(current);
  };

  // === DROPDOWN ===
  function toggleDropdown(event) {
    event.preventDefault();
    document.getElementById("dropdownMenu").classList.toggle("show");
  }

  window.onclick = (e) => {
    if (!e.target.matches('.dropbtn')) {
      document.querySelectorAll(".dropdown-content").forEach(d => d.classList.remove("show"));
    }
  };

  // === SUBJECT EXPANSION ===
  function expandSubject(subjectKey) {
    const s = subjects[subjectKey];
    if (!s) return;

    // example descriptions per image
    const descriptions = {
      purposive: [
        "Discussing communication models in class.",
        "Collaborative learning during group work.",
        "Reflecting on how communication affects understanding."
      ],
      pe: [
        "Staying active through team sports.",
        "Enjoying our PE warm-up exercises.",
        "Practicing good sportsmanship and teamwork."
      ],
      nstp: [
        "Serving the community through outreach programs.",
        "Building teamwork during NSTP activities."
      ],
      halloween: [
        "Spooky fun with classmates!",
        "Costume prep before the event.",
        "Our Halloween celebration filled with laughter!"
      ]
    };

    document.body.classList.add('full-green');
    leftPanel.classList.add('expanded');
    navLinks.forEach(link => link.classList.add('nav-yellow'));

    const photosHTML = s.images
      .map((src, i) => `
        <div class="subject-photo-container">
          <img src="${src}" 
              alt="${s.title}" 
              class="subject-photo" 
              onclick="enlargeSubjectPhoto('${src}', '${descriptions[subjectKey][i]}')">
        </div>
      `)
      .join("");

    leftPanel.innerHTML = `
      <div class="expanded-content">
        <button class="close-btn" onclick="closeExpanded()">✕</button>
        <h2>${s.title}</h2>
        <div class="subject-photos">${photosHTML}</div>
        <p class="subject-description">${s.desc}</p>
      </div>
    `;
  }
  // === SUBJECT ENLARGEMENT (ZOOM-IN POPUP WITH DESCRIPTION) ===
  function expandEvent(eventKey) {
    const e = events[eventKey];
    if (!e) return;

    document.body.classList.remove("full-yellow", "full-red", "full-blue", "full-green");
    leftPanel.classList.remove("expanded");
    document.body.classList.add("full-green");
    leftPanel.classList.add("expanded");
    navLinks.forEach(link => {
      link.classList.remove("nav-yellow", "nav-red", "nav-blue", "nav-green");
      link.style.color = "#f9e547";
    });

    //  Unique descriptions per photo
    const eventDescriptions = {
      sinagtam: [
        "Having fun with friends while listening to performers.",
        "Listening to LOLA AMOUR band which is main event.",
        "Group photo after the Sinag TAM presentation." 
      ],
      sinagsports: [
        "Cheering our friend to win in badminton.",
        "Supporting our basketball players.",
        "Getting ready for event"
      ],
      orientation: [
        "Registration booth during orientation.",
        "Orientation talk by our department head.",
        "Group photo with classmates after orientation."
      ]
    };

    //  Create photo grid
    const photosHTML = e.images
      .map(
        (src, i) => `
        <div class="subject-photo-container">
          <img src="${src}" 
              alt="${e.title}" 
              class="subject-photo" 
              onclick="enlargeEventPhoto('${src}', '${eventDescriptions[eventKey][i]}')">
        </div>
      `
      )
      .join("");

    //  Keep generic description at bottom center
    const genericDescription = `A glimpse of our unforgettable ${e.title} moments.`;

    leftPanel.innerHTML = `
      <div class="expanded-content">
        <button class="close-btn" onclick="closeExpanded()">✕</button>
        <h2>${e.title}</h2>
        <div class="subject-photos">${photosHTML}</div>
        <p class="subject-description" style="text-align:center;margin-top:20px;">${genericDescription}</p>
      </div>
    `
  }
  
  // === ENLARGE SUBJECT PHOTO (ZOOM-IN POPUP WITH DESCRIPTION ON RIGHT) ===
function enlargeSubjectPhoto(src, desc) {
  const existing = document.querySelector(".subject-enlarge");
  if (existing) existing.remove();

  const overlay = document.createElement("div");
  overlay.className = "subject-enlarge";
  overlay.innerHTML = `
    <div class="subject-enlarge-box"
        style="display:flex;align-items:center;gap:40px;justify-content:center;flex-wrap:wrap;">
      <button class="photo-close-inside" 
              onclick="this.closest('.subject-enlarge').remove()">✕</button>
      <img src="${src}" alt="Subject Photo" 
          class="subject-enlarge-img" 
          style="max-width:45%;border-radius:15px;">
      <div class="subject-description" 
          style="max-width:35%;text-align:left;color:#f9e547;font-size:1.1em;">
        <p>${desc}</p>
      </div>
    </div>
  `;
  document.body.appendChild(overlay);
}


  // === ENLARGE EVENT PHOTO (ZOOM-IN POPUP WITH DESCRIPTION ON RIGHT) ===
  function enlargeEventPhoto(src, desc) {
    const existing = document.querySelector(".subject-enlarge");
    if (existing) existing.remove();

    const overlay = document.createElement("div");
    overlay.className = "subject-enlarge";
    overlay.innerHTML = `
      <div class="subject-enlarge-box" 
          style="display:flex;align-items:center;gap:40px;justify-content:center;flex-wrap:wrap;">
        <button class="photo-close-inside" 
                onclick="this.closest('.subject-enlarge').remove()">✕</button>
        <img src="${src}" alt="Event Photo" 
            class="subject-enlarge-img" 
            style="max-width:45%;border-radius:15px;">
        <div class="subject-description" 
            style="max-width:35%;text-align:left;color:#f9e547;font-size:1.1em;">
          <p>${desc}</p>
        </div>
      </div>
    `;
    document.body.appendChild(overlay);
  }

  // === CLOSE PANELS ===
  function closeExpanded() {
    document.body.classList.remove("full-green", "full-yellow");
    leftPanel.classList.remove("expanded", "expanded-small");

    leftPanel.innerHTML = `
      <div class="content-left">
        <img src="logo.png" alt="logo" class="logo">
        <h1>Tam Collection</h1>
        <p>A collection of our experience during our stay at FEU Roosevelt Marikina.</p>
      </div>`;

    navLinks.forEach(link => (link.style.color = "#1a4731"));
    
  }

  document.getElementById("aboutBtn").onclick = () => {
    // remove all layout state classes
    document.body.classList.remove("full-green");
    leftPanel.classList.remove("expanded", "expanded-small");
    
    // back to yellow theme
    document.body.classList.add("full-yellow");

    // restore default left panel content
    leftPanel.innerHTML = `
      <div class="content-left">
        <img src="logo.png" alt="logo" class="logo">
        <h1>About Tam Collection</h1>
        <p>Welcome to our website! Here we share our memorable experiences, events, and milestones at FEU Roosevelt Marikina.</p>
      </div>
    `;

    // ibalik din ang kulay ng navbar kung kailangan
    navLinks.forEach(link => link.style.color = "#1a4731");
  };
  // === EVENT LINKS ===
  document.querySelectorAll("#dropdownMenu a").forEach(link => {
    link.addEventListener("click", (e) => {
      e.preventDefault();
      const eventName = link.textContent.trim().toLowerCase().replace(" ", "");
      expandEvent(eventName);
    });
  });

  document.addEventListener("click", (e) => {
    if (e.target.id === "homeBtn") {
      e.preventDefault();
      closeExpanded();
    }
  });
  // === STRYVE PAGE ===
document.getElementById("StryveBtn").addEventListener("click", (e) => {
  e.preventDefault();
  showStryvePage();
});


// === BAGO ===
function showStryvePage() {
  // Add a fullscreen overlay with scroll
  const overlay = document.createElement("div");
  overlay.className = "stryve-overlay";
  overlay.innerHTML = `
    <button class="stryve-close" onclick="this.parentElement.remove()">✕</button>
    <img src="stryve.jpg" alt="Stryve Poster" class="stryve-img">
  `;
  document.body.appendChild(overlay);
}
