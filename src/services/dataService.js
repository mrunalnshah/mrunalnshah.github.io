export default class DataService {
  _data = {
    projectRepo: "https://github.com/mrunalnshah/mrunalnshah.github.io",
    react95Repo: "https://github.com/React95/React95",
    items: [
      {
        id: "about",
        name: "About.txt",
        icon: "info_bubble",
        content: {
          paragraphs: [
            "Hello! I'm Mrunal Shah, a passionate student in the field of Computers, Mathematics and Physics.",
            "I am into the fascinating worlds of Artificial General Intelligence, Deep Learning, Computer Vision, and Quantum Computing. I'm driven by a strong desire to acquire deep knowledge of neural networks and explore the intricate realm of machine code. My enthusiasm for these fields knows no bounds, and I'm excited to embark on this educational journey to further my expertise.",
            "The main technology I have been using is C/C++, Assembly Language. Frameworks like QT are what i use for GUIs. ",
            "When I am not in front of the computer, I usually do meditation, read articles from Scientific American.",
          ],
        },
      },
      {
        id: "resume",
        name: "Resume.txt",
        icon: "notepad_2",
        content: {
          resumeLink:
            "https://docs.google.com/document/d/1P7dQpL9h4vN5RMIEMWAV0DWOlIMSMvejUxHDot8HnlQ/export?format=pdf",
          education: [
            {
              credit:
                "Bachelors of Technology in Computer Science & Engineering",
              place: "GLS University",
              cgpa: "7.9 (ongoing)",
              period: "September 2022 – July 2026",
            },
          ],
        },
      },
      {
        id: "projects",
        name: "Projects.txt",
        icon: "flying_through_space_100",
        content: {
          projects: [
            {
              title: "CAURA : Chess-Advancement-Using-Real-time-Algorithms ",
              description: "Caura : The Chess Engine. ",
              myRole: "Building the chess engine from scratch.",
              techStack: "C/C++",
              repo: "https://github.com/mrunalnshah/CAURA---Chess-Advancement-Using-Real-time-Algorithms",
            },
            {
              title: "Bus Reservation System",
              description:
                "A bus reservation system with user and admin login would allow users to book tickets, cancel tickets, view the schedule of buses, and check the status of a particular bus. The system would also allow an admin to register new users and register new buses.Overall, this system would provide user to book tickets and admin to manage schedule of the bus. ",
              myRole: "Creator",
              techStack: "C",
              repo: "https://github.com/mrunalnshah/Bus-Reservation-System",
            },
          ],
        },
      },
      {
        id: "skills",
        name: "Skills.txt",
        icon: "progman_11",
        content: {
          hard: [
            {
              name: "C",
              progress: 100,
            },
            {
              name: "C++",
              progress: 60,
            },
            {
              name: "x86_64 Assembly Language",
              progress: 30,
            },
            {
              name: "QT 6",
              progress: 20,
            },
          ],
          soft: "Analytical thinking, Teamwork, Creative Problem solving, Mangement, Leadership",
        },
      },
      {
        id: "contact",
        name: "Contact.txt",
        icon: "inetcfg_2301",
        content: {
          emailText:
            "If you want to hire me or invite to a project, just email me on ",
          email_1: "mrunalnshah@protonmail.com",
          email_2: "mrunalnshah2883@gmail.com",
          socialText: "Or you can reach me out through social media:",
          social: [
            {
              name: "FaLinkedin",
              link: "https://www.linkedin.com/in/mrunalnshah/",
            },
            {
              name: "FaGithub",
              link: "https://github.com/mrunalnshah",
            },
            {
              name: "FaInstagram",
              link: "https://www.instagram.com/mrunalnshah/",
            },
          ],
        },
      },
    ],
  };

  getItems() {
    return this._data.items.map(({ id, name, icon }) => ({ id, name, icon }));
  }

  getItem(id) {
    return this._data.items.find((x) => x.id === id);
  }

  getProjectInfo() {
    return {
      projectRepo: this._data.projectRepo,
      react95Repo: this._data.react95Repo,
    };
  }
}
