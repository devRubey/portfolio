import { useState, useEffect, useRef } from "react";

const GITHUB = "https://github.com/devRubey";

const NAV_LINKS = ["Home", "About", "Projects", "Skills", "Contact"];

const PROJECTS = [
  {
    title: "E-Commerce Microservices",
    description:
      "A full microservices e-commerce backend built with Spring Boot and PostgreSQL. Features 4 independent services — product, user, order and API gateway — each with its own database, JWT authentication, inter-service REST communication and Spring Cloud Gateway routing.",
    tags: [
      "Java",
      "Spring Boot",
      "Microservices",
      "JWT",
      "PostgreSQL",
      "Spring Cloud",
    ],
    github: "https://github.com/devRubey/ecommerce-microservices",
    accent: "#00ffe0",
  },
  {
    title: "BookLibraryAPI",
    description:
      "A RESTful API for managing a book library built with Spring Boot and PostgreSQL. Features full CRUD operations, book borrowing/returning system, pagination, API validation, and JUnit unit tests.",
    tags: ["Java", "Spring Boot", "PostgreSQL", "REST API", "JUnit"],
    github: "https://github.com/devRubey/BookLibraryAPI",
    accent: "#00ffe0",
  },
  {
    title: "CodingChallenges",
    description:
      "A structured collection of algorithms and data structures solved in JavaScript and Java. Covers sorting algorithms (Bubble, Merge, Quick), recursion patterns, and LeetCode-style problems with full complexity analysis.",
    tags: ["JavaScript", "Java", "Algorithms", "Data Structures"],
    github: "https://github.com/devRubey/CodingChallenges",
    accent: "#7b61ff",
  },
  {
    title: "Rock Paper Scissors",
    description:
      "An interactive Rock Paper Scissors game built with JavaScript. Features a clean UI, score tracking, and real-time game logic against the computer.",
    tags: ["JavaScript", "HTML", "CSS"],
    github: "https://github.com/devRubey/Rock-Paper-Scissors",
    accent: "#ff6b6b",
  },
  {
    title: "Simple Static Quiz App",
    description:
      "A fun and interactive quiz application built with HTML, CSS and JavaScript. Tests users with multiple choice questions and tracks their score in real time.",
    tags: ["JavaScript", "HTML", "CSS"],
    github: "https://github.com/devRubey/Simple-Static-Quiz-App",
    accent: "#f9a825",
  },
  {
    title: "Photo Gallery",
    description:
      "A slick and responsive photo gallery built with HTML and CSS. Showcases images in a clean grid layout with smooth hover effects.",
    tags: ["HTML", "CSS"],
    github: "https://github.com/devRubey/Photo-Gallery",
    accent: "#00e5ff",
  },
  {
    title: "Pricing Table",
    description:
      "A responsive pricing comparison page built with HTML and CSS. Demonstrates layout skills with cards, typography, and clean styling — a common real-world web component.",
    tags: ["HTML", "CSS"],
    github: "https://github.com/devRubey/Pricing-Table---Comparison-Page",
    accent: "#69ff47",
  },
];

const SKILLS = {
  Languages: ["JavaScript", "Java", "HTML", "CSS"],
  Frameworks: ["React", "Spring Boot", "Spring Cloud", "Node.js"],
  Tools: ["Git", "GitHub", "IntelliJ", "VS Code", "Postman"],
  Concepts: [
    "Algorithms",
    "Data Structures",
    "Microservices",
    "REST APIs",
    "JWT",
    "OOP",
  ],
};

// ── Animated terminal-style typewriter ──────────────────────────────
function Typewriter({ lines }) {
  const [displayed, setDisplayed] = useState([""]);
  const [lineIdx, setLineIdx] = useState(0);
  const [charIdx, setCharIdx] = useState(0);

  useEffect(() => {
    if (lineIdx >= lines.length) return;
    if (charIdx < lines[lineIdx].length) {
      const t = setTimeout(() => {
        setDisplayed((d) => {
          const copy = [...d];
          copy[lineIdx] = lines[lineIdx].slice(0, charIdx + 1);
          return copy;
        });
        setCharIdx((c) => c + 1);
      }, 45);
      return () => clearTimeout(t);
    } else if (lineIdx < lines.length - 1) {
      const t = setTimeout(() => {
        setDisplayed((d) => [...d, ""]);
        setLineIdx((l) => l + 1);
        setCharIdx(0);
      }, 300);
      return () => clearTimeout(t);
    }
  }, [charIdx, lineIdx, lines]);

  return (
    <div style={{ fontFamily: "'JetBrains Mono', monospace", lineHeight: 1.8 }}>
      {displayed.map((line, i) => (
        <div key={i}>
          <span style={{ color: "#00ffe0" }}>$ </span>
          <span style={{ color: "#e2e8f0" }}>{line}</span>
          {i === displayed.length - 1 && lineIdx < lines.length && (
            <span
              style={{
                display: "inline-block",
                width: 10,
                height: "1em",
                background: "#00ffe0",
                marginLeft: 3,
                verticalAlign: "middle",
                animation: "blink 1s step-end infinite",
              }}
            />
          )}
        </div>
      ))}
    </div>
  );
}

// ── Floating grid background ─────────────────────────────────────────
function GridBg() {
  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 0,
        backgroundImage: `
          linear-gradient(rgba(0,255,224,0.03) 1px, transparent 1px),
          linear-gradient(90deg, rgba(0,255,224,0.03) 1px, transparent 1px)
        `,
        backgroundSize: "48px 48px",
        pointerEvents: "none",
      }}
    />
  );
}

// ── Glowing orb ──────────────────────────────────────────────────────
function Orb({ x, y, color, size }) {
  return (
    <div
      style={{
        position: "fixed",
        left: x,
        top: y,
        width: size,
        height: size,
        borderRadius: "50%",
        background: color,
        filter: "blur(120px)",
        opacity: 0.12,
        pointerEvents: "none",
        zIndex: 0,
      }}
    />
  );
}

// ── Section wrapper with fade-in ─────────────────────────────────────
function Section({ id, children, style }) {
  const ref = useRef();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setVisible(true);
      },
      { threshold: 0.15 },
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  return (
    <section
      id={id}
      ref={ref}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(32px)",
        transition: "opacity 0.7s ease, transform 0.7s ease",
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        padding: "100px 24px",
        maxWidth: 1000,
        margin: "0 auto",
        position: "relative",
        zIndex: 1,
        ...style,
      }}
    >
      {children}
    </section>
  );
}

function SectionLabel({ children }) {
  return (
    <div style={{ marginBottom: 48 }}>
      <span
        style={{
          fontFamily: "'JetBrains Mono', monospace",
          color: "#00ffe0",
          fontSize: 13,
          letterSpacing: 4,
          textTransform: "uppercase",
        }}
      >
        // {children}
      </span>
      <div
        style={{
          marginTop: 8,
          height: 1,
          width: 80,
          background: "linear-gradient(90deg, #00ffe0, transparent)",
        }}
      />
    </div>
  );
}

// ── Project Card ─────────────────────────────────────────────────────
function ProjectCard({ project, index }) {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        background: hovered
          ? "rgba(255,255,255,0.04)"
          : "rgba(255,255,255,0.02)",
        border: `1px solid ${hovered ? project.accent : "rgba(255,255,255,0.07)"}`,
        borderRadius: 12,
        padding: "32px",
        transition: "all 0.3s ease",
        cursor: "default",
        boxShadow: hovered ? `0 0 32px ${project.accent}22` : "none",
        opacity: 0,
        animation: `fadeUp 0.5s ease ${index * 0.15}s forwards`,
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "flex-start",
          marginBottom: 16,
        }}
      >
        <h3
          style={{
            fontFamily: "'JetBrains Mono', monospace",
            color: project.accent,
            fontSize: 18,
            margin: 0,
          }}
        >
          {project.title}
        </h3>
        <a
          href={project.github}
          target="_blank"
          rel="noreferrer"
          style={{
            color: "rgba(255,255,255,0.4)",
            textDecoration: "none",
            fontFamily: "'JetBrains Mono', monospace",
            fontSize: 12,
            border: "1px solid rgba(255,255,255,0.1)",
            padding: "4px 12px",
            borderRadius: 4,
            transition: "all 0.2s",
          }}
          onMouseEnter={(e) => {
            e.target.style.color = project.accent;
            e.target.style.borderColor = project.accent;
          }}
          onMouseLeave={(e) => {
            e.target.style.color = "rgba(255,255,255,0.4)";
            e.target.style.borderColor = "rgba(255,255,255,0.1)";
          }}
        >
          GitHub ↗
        </a>
      </div>
      <p
        style={{
          color: "rgba(226,232,240,0.65)",
          lineHeight: 1.8,
          fontSize: 15,
          margin: "0 0 20px",
          fontFamily: "'DM Sans', sans-serif",
        }}
      >
        {project.description}
      </p>
      <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
        {project.tags.map((tag) => (
          <span
            key={tag}
            style={{
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: 11,
              color: project.accent,
              background: `${project.accent}14`,
              border: `1px solid ${project.accent}33`,
              padding: "3px 10px",
              borderRadius: 4,
            }}
          >
            {tag}
          </span>
        ))}
      </div>
    </div>
  );
}

// ── Main App ─────────────────────────────────────────────────────────
export default function Portfolio() {
  const [activeSection, setActiveSection] = useState("Home");
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const sections = NAV_LINKS.map((id) => document.getElementById(id));
      const scrollY = window.scrollY + 200;
      sections.forEach((sec) => {
        if (sec && sec.offsetTop <= scrollY) {
          setActiveSection(sec.id);
        }
      });
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollTo = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    setMenuOpen(false);
  };

  return (
    <div
      style={{
        background: "#080c14",
        minHeight: "100vh",
        color: "#e2e8f0",
        overflowX: "hidden",
      }}
    >
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;600;700&family=DM+Sans:wght@300;400;500&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }
        html { scroll-behavior: smooth; }
        ::-webkit-scrollbar { width: 4px; }
        ::-webkit-scrollbar-track { background: #080c14; }
        ::-webkit-scrollbar-thumb { background: #00ffe033; border-radius: 2px; }
        @keyframes blink { 0%,100%{opacity:1} 50%{opacity:0} }
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(20px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes pulse {
          0%,100% { box-shadow: 0 0 0 0 rgba(0,255,224,0.3); }
          50% { box-shadow: 0 0 0 8px rgba(0,255,224,0); }
        }
        a { transition: color 0.2s; }
      `}</style>

      <GridBg />
      <Orb x="10%" y="5%" color="#00ffe0" size="600px" />
      <Orb x="70%" y="60%" color="#7b61ff" size="500px" />

      {/* ── NAV ── */}
      <nav
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          zIndex: 100,
          padding: "0 32px",
          height: 64,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          background: "rgba(8,12,20,0.85)",
          backdropFilter: "blur(16px)",
          borderBottom: "1px solid rgba(255,255,255,0.05)",
        }}
      >
        <span
          style={{
            fontFamily: "'JetBrains Mono', monospace",
            color: "#00ffe0",
            fontWeight: 700,
            fontSize: 16,
            letterSpacing: 1,
          }}
        >
          devRubey
        </span>

        {/* Desktop nav */}
        <div style={{ display: "flex", gap: 32 }}>
          {NAV_LINKS.map((link) => (
            <button
              key={link}
              onClick={() => scrollTo(link)}
              style={{
                background: "none",
                border: "none",
                cursor: "pointer",
                fontFamily: "'JetBrains Mono', monospace",
                fontSize: 13,
                color:
                  activeSection === link ? "#00ffe0" : "rgba(226,232,240,0.5)",
                transition: "color 0.2s",
                padding: "4px 0",
                borderBottom:
                  activeSection === link
                    ? "1px solid #00ffe0"
                    : "1px solid transparent",
              }}
            >
              {link}
            </button>
          ))}
        </div>

        <a
          href={GITHUB}
          target="_blank"
          rel="noreferrer"
          style={{
            fontFamily: "'JetBrains Mono', monospace",
            fontSize: 12,
            color: "#00ffe0",
            textDecoration: "none",
            border: "1px solid #00ffe044",
            padding: "6px 16px",
            borderRadius: 4,
            transition: "all 0.2s",
          }}
          onMouseEnter={(e) => {
            e.target.style.background = "#00ffe011";
            e.target.style.borderColor = "#00ffe0";
          }}
          onMouseLeave={(e) => {
            e.target.style.background = "none";
            e.target.style.borderColor = "#00ffe044";
          }}
        >
          GitHub ↗
        </a>
      </nav>

      {/* ── HOME ── */}
      <Section
        id="Home"
        style={{ minHeight: "100vh", justifyContent: "center" }}
      >
        <div style={{ animation: "fadeUp 0.8s ease forwards" }}>
          <p
            style={{
              fontFamily: "'JetBrains Mono', monospace",
              color: "#00ffe0",
              fontSize: 13,
              letterSpacing: 4,
              marginBottom: 20,
              textTransform: "uppercase",
            }}
          >
            Hello, World.
          </p>
          <h1
            style={{
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: "clamp(36px, 6vw, 72px)",
              fontWeight: 700,
              lineHeight: 1.1,
              marginBottom: 16,
              color: "#e2e8f0",
            }}
          >
            Udoh Ruben
            <br />
            <span
              style={{
                background: "linear-gradient(135deg, #00ffe0, #7b61ff)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              Ekereete
            </span>
          </h1>
          <p
            style={{
              fontFamily: "'DM Sans', sans-serif",
              fontSize: 18,
              color: "rgba(226,232,240,0.55)",
              marginBottom: 48,
              maxWidth: 480,
              lineHeight: 1.7,
            }}
          >
            Software Engineer — building clean, efficient solutions with
            JavaScript, Java, and React.
          </p>

          <div style={{ marginBottom: 48 }}>
            <Typewriter
              lines={[
                "git clone https://github.com/devRubey",
                "cd CodingChallenges && node sorting/mergeSort.js",
                "// Ready to build something great.",
              ]}
            />
          </div>

          <div style={{ display: "flex", gap: 16, flexWrap: "wrap" }}>
            <button
              onClick={() => scrollTo("Projects")}
              style={{
                fontFamily: "'JetBrains Mono', monospace",
                fontSize: 13,
                background: "#00ffe0",
                color: "#080c14",
                border: "none",
                padding: "12px 28px",
                borderRadius: 6,
                cursor: "pointer",
                fontWeight: 700,
                letterSpacing: 1,
                animation: "pulse 2s infinite",
                transition: "transform 0.2s",
              }}
              onMouseEnter={(e) => (e.target.style.transform = "scale(1.04)")}
              onMouseLeave={(e) => (e.target.style.transform = "scale(1)")}
            >
              View Projects
            </button>
            <button
              onClick={() => scrollTo("Contact")}
              style={{
                fontFamily: "'JetBrains Mono', monospace",
                fontSize: 13,
                background: "transparent",
                color: "#00ffe0",
                border: "1px solid #00ffe044",
                padding: "12px 28px",
                borderRadius: 6,
                cursor: "pointer",
                letterSpacing: 1,
                transition: "all 0.2s",
              }}
              onMouseEnter={(e) => {
                e.target.style.background = "#00ffe011";
                e.target.style.borderColor = "#00ffe0";
              }}
              onMouseLeave={(e) => {
                e.target.style.background = "transparent";
                e.target.style.borderColor = "#00ffe044";
              }}
            >
              Contact Me
            </button>
          </div>
        </div>
      </Section>

      {/* ── ABOUT ── */}
      <Section id="About">
        <SectionLabel>About</SectionLabel>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: 64,
            alignItems: "center",
          }}
        >
          <div>
            <h2
              style={{
                fontFamily: "'JetBrains Mono', monospace",
                fontSize: 32,
                marginBottom: 24,
                color: "#e2e8f0",
              }}
            >
              Who I Am
            </h2>
            <p
              style={{
                fontFamily: "'DM Sans', sans-serif",
                color: "rgba(226,232,240,0.65)",
                lineHeight: 1.9,
                fontSize: 16,
                marginBottom: 20,
              }}
            >
              I'm{" "}
              <strong style={{ color: "#00ffe0" }}>Udoh Ruben Ekereete</strong>,
              an Aspiring Software Engineer with a passion for writing clean,
              efficient code and solving challenging problems.
            </p>
            <p
              style={{
                fontFamily: "'DM Sans', sans-serif",
                color: "rgba(226,232,240,0.65)",
                lineHeight: 1.9,
                fontSize: 16,
                marginBottom: 32,
              }}
            >
              I enjoy building things from scratch — whether that's algorithms,
              web apps, or developer tools. I believe in understanding the
              fundamentals deeply, not just copying solutions.
            </p>
            <a
              href={GITHUB}
              target="_blank"
              rel="noreferrer"
              style={{
                fontFamily: "'JetBrains Mono', monospace",
                fontSize: 13,
                color: "#7b61ff",
                textDecoration: "none",
                borderBottom: "1px solid #7b61ff66",
                paddingBottom: 2,
              }}
            >
              github.com/devRubey ↗
            </a>
          </div>

          {/* Terminal card */}
          <div
            style={{
              background: "rgba(255,255,255,0.02)",
              border: "1px solid rgba(255,255,255,0.07)",
              borderRadius: 12,
              overflow: "hidden",
            }}
          >
            <div
              style={{
                background: "rgba(255,255,255,0.04)",
                padding: "12px 16px",
                display: "flex",
                gap: 6,
                borderBottom: "1px solid rgba(255,255,255,0.05)",
              }}
            >
              {["#ff5f57", "#febc2e", "#28c840"].map((c) => (
                <div
                  key={c}
                  style={{
                    width: 12,
                    height: 12,
                    borderRadius: "50%",
                    background: c,
                  }}
                />
              ))}
              <span
                style={{
                  fontFamily: "'JetBrains Mono', monospace",
                  fontSize: 11,
                  color: "rgba(255,255,255,0.3)",
                  marginLeft: 8,
                }}
              >
                about.json
              </span>
            </div>
            <pre
              style={{
                padding: 24,
                fontFamily: "'JetBrains Mono', monospace",
                fontSize: 13,
                lineHeight: 1.9,
                color: "rgba(226,232,240,0.7)",
                overflowX: "auto",
              }}
            >
              {`{
  "name": "Udoh Ruben Ekereete",
  "role": "Software Engineer",
  "github": "devRubey",
  "languages": [
    "JavaScript",
    "Java"
  ],
  "focus": [
    "Algorithms",
    "Web Development",
    "Clean Code"
  ],
  "status": "open_to_work"
}`}
            </pre>
          </div>
        </div>
      </Section>

      {/* ── PROJECTS ── */}
      <Section id="Projects">
        <SectionLabel>Projects</SectionLabel>
        <h2
          style={{
            fontFamily: "'JetBrains Mono', monospace",
            fontSize: 32,
            marginBottom: 48,
            color: "#e2e8f0",
          }}
        >
          What I've Built
        </h2>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
            gap: 24,
          }}
        >
          {PROJECTS.map((p, i) => (
            <ProjectCard key={p.title} project={p} index={i} />
          ))}
        </div>
      </Section>

      {/* ── SKILLS ── */}
      <Section id="Skills">
        <SectionLabel>Skills</SectionLabel>
        <h2
          style={{
            fontFamily: "'JetBrains Mono', monospace",
            fontSize: 32,
            marginBottom: 48,
            color: "#e2e8f0",
          }}
        >
          Tech Stack
        </h2>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))",
            gap: 24,
          }}
        >
          {Object.entries(SKILLS).map(([category, items], ci) => (
            <div
              key={category}
              style={{
                background: "rgba(255,255,255,0.02)",
                border: "1px solid rgba(255,255,255,0.07)",
                borderRadius: 12,
                padding: 24,
                opacity: 0,
                animation: `fadeUp 0.5s ease ${ci * 0.1}s forwards`,
              }}
            >
              <p
                style={{
                  fontFamily: "'JetBrains Mono', monospace",
                  color: "#00ffe0",
                  fontSize: 11,
                  letterSpacing: 3,
                  textTransform: "uppercase",
                  marginBottom: 16,
                }}
              >
                {category}
              </p>
              <div
                style={{ display: "flex", flexDirection: "column", gap: 10 }}
              >
                {items.map((skill) => (
                  <div
                    key={skill}
                    style={{ display: "flex", alignItems: "center", gap: 10 }}
                  >
                    <div
                      style={{
                        width: 6,
                        height: 6,
                        borderRadius: "50%",
                        background: "#00ffe0",
                        flexShrink: 0,
                      }}
                    />
                    <span
                      style={{
                        fontFamily: "'DM Sans', sans-serif",
                        color: "rgba(226,232,240,0.75)",
                        fontSize: 15,
                      }}
                    >
                      {skill}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </Section>

      {/* ── CONTACT ── */}
      <Section id="Contact">
        <SectionLabel>Contact</SectionLabel>
        <div style={{ maxWidth: 580 }}>
          <h2
            style={{
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: 32,
              marginBottom: 16,
              color: "#e2e8f0",
            }}
          >
            Let's Connect
          </h2>
          <p
            style={{
              fontFamily: "'DM Sans', sans-serif",
              color: "rgba(226,232,240,0.55)",
              lineHeight: 1.8,
              fontSize: 16,
              marginBottom: 40,
            }}
          >
            I'm open to opportunities, collaborations, or just a good
            conversation about code. Find me on GitHub or drop a message.
          </p>

          <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
            <a
              href="mailto:udohruben@gmail.com"
              style={{
                display: "flex",
                alignItems: "center",
                gap: 16,
                background: "rgba(255,255,255,0.02)",
                border: "1px solid rgba(255,255,255,0.07)",
                borderRadius: 10,
                padding: "20px 24px",
                textDecoration: "none",
                transition: "all 0.25s",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = "#7b61ff44";
                e.currentTarget.style.background = "rgba(123,97,255,0.03)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = "rgba(255,255,255,0.07)";
                e.currentTarget.style.background = "rgba(255,255,255,0.02)";
              }}
            >
              <div
                style={{
                  width: 40,
                  height: 40,
                  borderRadius: 8,
                  background: "#7b61ff11",
                  border: "1px solid #7b61ff33",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontFamily: "'JetBrains Mono', monospace",
                  color: "#7b61ff",
                  fontSize: 18,
                  flexShrink: 0,
                }}
              >
                @
              </div>
              <div>
                <p
                  style={{
                    fontFamily: "'JetBrains Mono', monospace",
                    color: "#7b61ff",
                    fontSize: 14,
                    marginBottom: 2,
                  }}
                >
                  Email
                </p>
                <p
                  style={{
                    fontFamily: "'DM Sans', sans-serif",
                    color: "rgba(226,232,240,0.4)",
                    fontSize: 13,
                  }}
                >
                  udohruben@gmail.com
                </p>
              </div>
              <span
                style={{
                  marginLeft: "auto",
                  color: "rgba(226,232,240,0.25)",
                  fontSize: 18,
                }}
              >
                ↗
              </span>
            </a>
            <a
              href={GITHUB}
              target="_blank"
              rel="noreferrer"
              style={{
                display: "flex",
                alignItems: "center",
                gap: 16,
                background: "rgba(255,255,255,0.02)",
                border: "1px solid rgba(255,255,255,0.07)",
                borderRadius: 10,
                padding: "20px 24px",
                textDecoration: "none",
                transition: "all 0.25s",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = "#00ffe044";
                e.currentTarget.style.background = "rgba(0,255,224,0.03)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = "rgba(255,255,255,0.07)";
                e.currentTarget.style.background = "rgba(255,255,255,0.02)";
              }}
            >
              <div
                style={{
                  width: 40,
                  height: 40,
                  borderRadius: 8,
                  background: "#00ffe011",
                  border: "1px solid #00ffe033",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontFamily: "'JetBrains Mono', monospace",
                  color: "#00ffe0",
                  fontSize: 18,
                  flexShrink: 0,
                }}
              >
                &lt;/&gt;
              </div>
              <div>
                <p
                  style={{
                    fontFamily: "'JetBrains Mono', monospace",
                    color: "#00ffe0",
                    fontSize: 14,
                    marginBottom: 2,
                  }}
                >
                  GitHub
                </p>
                <p
                  style={{
                    fontFamily: "'DM Sans', sans-serif",
                    color: "rgba(226,232,240,0.4)",
                    fontSize: 13,
                  }}
                >
                  github.com/devRubey
                </p>
              </div>
              <span
                style={{
                  marginLeft: "auto",
                  color: "rgba(226,232,240,0.25)",
                  fontSize: 18,
                }}
              >
                ↗
              </span>
            </a>
          </div>
        </div>
      </Section>

      {/* ── FOOTER ── */}
      <footer
        style={{
          position: "relative",
          zIndex: 1,
          borderTop: "1px solid rgba(255,255,255,0.05)",
          padding: "24px 32px",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <span
          style={{
            fontFamily: "'JetBrains Mono', monospace",
            color: "rgba(226,232,240,0.2)",
            fontSize: 12,
          }}
        >
          © 2025 Udoh Ruben Ekereete
        </span>
        <span
          style={{
            fontFamily: "'JetBrains Mono', monospace",
            color: "rgba(226,232,240,0.2)",
            fontSize: 12,
          }}
        >
          Built with React
        </span>
      </footer>
    </div>
  );
}
