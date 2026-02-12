import { Col, Row, Image, Container } from 'react-bootstrap'
import BSButton from '@/components/Button'
import { BsPersonCircle, BsEnvelopePaper } from "react-icons/bs";
import CardLanguages from '@/components/CardLanguages'
import CardCertificates from '@/components/CardCertificates'
import FeaturedProjectsGrid from '@/components/FeaturedProjectsGrid'
import ContactForm from "@/components/ContactForm";
import { useOutletContext } from "react-router-dom";
import profileImage from '@/assets/images/Wietsegaming.png';
import { langIcons } from '@/constants/icons'
import '@/styles/home.scss'

const languages = [
  { name: "CSS", progress: 90, color: "#2965f1" },
  { name: "HTML", progress: 90, color: "#e34c26" },
  { name: "JavaScript", progress: 65, color: "#f0db4f" },
  { name: "MySQL", progress: 70, color: "#f29111" },
  { name: "PHP", progress: 80, color: "#787cb5" },
  { name: "React", progress: 50, color: "#61dafb" },
  { name: "TypeScript", progress: 40, color: "#3178c6" },
];

function sizeIcons(lang: { name: string; progress: number; color: string }) {
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

function iconClass(lang: string) {
  if (lang === "PHP") return "fs-2"
  if (lang === "Shell") return "fs-3"
  if (lang === "JavaScript") return "rounded-3"
  return ""
}

export default function Home() {
  const { height } = useOutletContext<{ height: number }>();

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
              <Image src={profileImage} alt="Simpelcity" roundedCircle width="120" height="120" />
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
      <section id="projects" className="text-center py-5 bg-dark-subtle min-vh-100">
        <h1 className="mb-3">Recent projects</h1>
        <Container className="repos p-4">
          <Row className="list-repos row-gap-4">
            <FeaturedProjectsGrid langIcons={langIcons} />
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
