import { Col, Row, Image, Card, Container, Dropdown } from 'react-bootstrap'
import BSButton from '@/components/Button'
import { BsPersonCircle, BsEnvelopePaper } from "react-icons/bs";
import CardLanguages from '@/components/CardLanguages'
import CardCertificates from '@/components/CardCertificates'
import ProjectGrid from '@/components/ProjectGrid'
import ContactForm from "@/components/ContactForm";
import { useOutletContext } from "react-router-dom";
import '@/styles/home.scss'

const langIcons = {
  Git: <i class="devicon-git-plain colored"></i>,
  Github: <i class="devicon-github-original"></i>,
  Chrome: <i class="devicon-chrome-plain text-white"></i>,
  Assembly: <i class="devicon-labview-plain colored"></i>,
  "C#": <i class="devicon-csharp-plain colored"></i>,
  "C++": <i class="devicon-cplusplus-plain colored"></i>,
  C: <i class="devicon-c-plain colored"></i>,
  Clojure: <i class="devicon-clojure-plain colored"></i>,
  CoffeeScript: <i class="devicon-coffeescript-plain colored"></i>,
  Crystal: <i class="devicon-crystal-plain colored"></i>,
  CSS: <i class="devicon-css3-plain colored"></i>,
  Dart: <i class="devicon-dart-plain colored"></i>,
  Dockerfile: <i class="devicon-docker-plain"></i>,
  Elixir: <i class="devicon-elixir-plain colored"></i>,
  Elm: <i class="devicon-elm-plain colored"></i>,
  Erlang: <i class="devicon-erlang-plain colored"></i>,
  "F#": <i class="devicon-fsharp-plain colored"></i>,
  Go: <i class="devicon-go-plain colored"></i>,
  Groovy: <i class="devicon-groovy-plain colored"></i>,
  HTML: <i class="devicon-html5-plain colored"></i>,
  Haskell: <i class="devicon-haskell-plain colored"></i>,
  Java: <i class="devicon-java-plain colored" style="color: #ffca2c"></i>,
  JavaScript: <i class="devicon-javascript-plain colored"></i>,
  Julia: <i class="devicon-julia-plain colored"></i>,
  "Jupyter Notebook": <i class="devicon-jupyter-plain colored"></i>,
  Kotlin: <i class="devicon-kotlin-plain colored" style="color: #796bdc"></i>,
  Latex: <i class="devicon-latex-plain colored"></i>,
  Lua: <i class="devicon-lua-plain-wordmark colored" style="color: #0000d0"></i>,
  Matlab: <i class="devicon-matlab-plain colored"></i>,
  Nim: <i class="devicon-nixos-plain colored" style="color: #FFC200"></i>,
  Nix: <i class="devicon-nixos-plain colored"></i>,
  ObjectiveC: <i class="devicon-objectivec-plain colored"></i>,
  OCaml: <i class="devicon-ocaml-plain colored"></i>,
  Perl: <i class="devicon-perl-plain colored"></i>,
  PHP: <i class="devicon-php-plain colored"></i>,
  PLSQL: <i class="devicon-sqlite-plain colored"></i>,
  MySQL: <i class="devicon-mysql-original"></i>,
  Processing: <i class="devicon-processing-plain colored" style="color: #0096D8"></i>,
  Python: <i class="devicon-python-plain colored" style="color: #3472a6"></i>,
  R: <i class="devicon-r-plain colored"></i>,
  React: <i class="devicon-react-original colored"></i>,
  Ruby: <i class="devicon-ruby-plain colored"></i>,
  Rust: <i class="devicon-rust-plain colored" style="color: #DEA584"></i>,
  Sass: <i class="devicon-sass-original colored"></i>,
  Scala: <i class="devicon-scala-plain colored"></i>,
  Shell: <i class="devicon-bash-plain"></i>,
  Solidity: <i class="devicon-solidity-plain colored"></i>,
  Stylus: <i class="devicon-stylus-plain colored"></i>,
  Svelte: <i class="devicon-svelte-plain colored"></i>,
  Swift: <i class="devicon-swift-plain colored"></i>,
  Terraform: <i class="devicon-terraform-plain colored"></i>,
  TypeScript: <i class="devicon-typescript-plain colored"></i>,
  "Vim Script": <i class="devicon-vim-plain colored"></i>,
  Vue: <i class="devicon-vuejs-plain colored"></i>,
  Bootstrap: <i class="devicon-bootstrap-plain colored"></i>,
  UML: <i class="devicon-unifiedmodelinglanguage-plain colored"></i>,
}

const languages = [
  { name: "CSS", progress: 90, color: "#2965f1" },
  { name: "HTML", progress: 90, color: "#e34c26" },
  { name: "JavaScript", progress: 65, color: "#f0db4f" },
  { name: "MySQL", progress: 70, color: "#f29111" },
  { name: "PHP", progress: 80, color: "#787cb5" },
  { name: "React", progress: 50, color: "#61dafb" },
  { name: "TypeScript", progress: 40, color: "#3178c6" },
];

function sizeIcons(lang) {
  if (lang.name === "PHP") return "fs-1"
  if (lang.name === "JavaScript") return "fs-2"
  if (lang.name === "MySQL") return "fs-3"
  return "fs-2"
}

const certificates = [
  { name: "Command line", language: ["Shell"] },
  { name: "PHP Beginner", language: ["PHP"] },
  { name: "HTML/CSS Beginner", language: ["HTML", "CSS"] },
  { name: "PHP Novice", language: ["PHP"] },
  { name: "PHP Web", language: ["PHP", "HTML"] },
  { name: "MySQL Beginner", language: ["MySQL"] },
  { name: "Database PDO", language: ["MySQL", "PHP"] },
  { name: "JavaScript Beginner", language: ["JavaScript"] },
  { name: "Bootstrap", language: ["Bootstrap"] },
  { name: "HTML/CSS Advanced", language: ["HTML", "CSS"] },
  { name: "Git", language: ["Git"] },
  { name: "Database Advanced", language: ["MySQL"] },
  { name: "JavaScript Novice", language: ["JavaScript"] },
  { name: "Regular Expressions", language: ["PHP"] },
  { name: "Fullstack Webdeveloper", language: ["HTML", "CSS", "Sass", "JavaScript", "PHP", "MySQL"] },
  { name: "Object Oriented Programming Advanced", language: ["PHP"] },
  { name: "UML", language: ["UML"] },
  { name: "Object Oriented Programming Intro", language: ["PHP"] },
  { name: "Unit Testing with PHP", language: ["PHP"] },
  { name: "Frontend Development", language: ["React"] },
]

function iconClass(lang) {
  if (lang === "PHP") return "fs-2"
  if (lang === "Shell") return "fs-3"
  if (lang === "JavaScript") return "rounded-3"
  return ""
}

export default function Home() {
  const { height, navHeight } = useOutletContext();

  return (
    <>
      <title>Simpelcity</title>

      <section id="welcome" className="d-flex flex-column align-items-center justify-content-center vh-100">
        <Col xs={12} md={8} lg={6} className="d-flex flex-column align-items-center">
          <h2 className="text-primary fs-1">Hey there,</h2>
          <h1 className="text-info text-center">I'm Simpelcity</h1>
          <h3 className="profession d-flex flex-column flex-md-row mb-4">
            <span className="text-primary text-center">Full-stack Student</span>
            <span className="text-primary text-center">Front-end Student</span>
          </h3>
        </Col>
        <BSButton aria-label="test" aria-labelledby="To top" size="lg" variant="outline" classes="btn-about d-flex column-gap-2 transition" href="#about">about me</BSButton>
      </section>
      <section id="about" className="d-flex flex-column align-items-center bg-dark py-5">
        <Col xs={12} md={9} lg={7} className="about d-flex flex-column align-items-center">
          <div className="info-header d-flex flex-column align-items-center">
            <BsPersonCircle className="icon-person" />
            <h1 className="">About Me</h1>
          </div>
          <div className="info-content my-4 d-flex flex-column flex-md-row align-items-center justify-content-center text-center text-md-start">
            <div className="info-img d-flex align-items-center">
              <Image src="/src/assets/images/Wietsegaming.png" alt="Simpelcity" roundedCircle width="120" height="120" />
            </div>
            <div className="info-about w-75 ps-0 pt-4 ps-md-4">
              <p className="fs-4 m-0">
                What's up, my name is Wietse. I am 18 years old and I live in the Netherlands. I am currently studying
                to become a Full-stack Developer.
              </p>
            </div>
          </div>
          <BSButton size="lg" variant="outline" classes="btn-projects d-flex column-gap-2 transition" href="#projects">check out my projects here</BSButton>
        </Col>
        <Container className="skills text-center my-5" fluid>
          <h1 className="mb-3">Skills</h1>
          <Row className="row-gap-4">
            <Col xs={12} lg={4} xl={5} className="languages">
              <CardLanguages languages={languages} langIcons={langIcons} sizeIcons={sizeIcons} />
            </Col>
            <Col xs={12} lg={8} xl={7} className="certificates">
              <CardCertificates certificates={certificates} langIcons={langIcons} iconClass={iconClass} />
            </Col>
          </Row>
        </Container>
        <BSButton size="lg" variant="outline" classes="btn-projects d-flex column-gap-2 transition" href="#contact">contact me</BSButton>
      </section>
      <section id="projects" className="text-center py-5 bg-dark-subtle">
        <h1 className="mb-3">Projects</h1>
        <Container className="repos p-4">
          <input type="text" className="filter-repos form-control border-0 rounded-0 shadow bg-dark text-primary mb-3 p-3" placeholder="Search Projects" data-bs-theme="dark" />
          <Row className="list-repos row-gap-4">
            <ProjectGrid langIcons={langIcons} />
          </Row>
        </Container>
      </section>
      <section id="contact" className="text-center text-primary bg-dark p-5" style={{ minHeight: `calc(100vh - ${height}px)` }}>
        <Row className="d-flex justify-content-center w-100">
          <BsEnvelopePaper className="icon-contact w-auto" />
          <h1 className="mb-3 text-secondary">Contact</h1>
          <p className="text-required">Fields marked with * are required</p>
        </Row>
        <Row className="d-flex justify-content-center">
          <Col xs={12} md={6} className="mt-2">
            <ContactForm />
          </Col>
        </Row>
      </section>
    </>
  )
}
