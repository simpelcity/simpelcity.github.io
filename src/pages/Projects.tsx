import { Row, Container } from 'react-bootstrap'
import ProjectGrid from '@/components/ProjectGrid'
import { langIcons } from '@/constants/icons'
import '@/styles/projects.scss'

export default function Projects() {
  return (
    <>
      <title>Projects - Simpelcity</title>

      <section id="projects" className="d-flex align-items-center mt-5 flex-column">
        <h1 className="mb-4">Projects</h1>
        <Container fluid>
          <input type="text" className="filter-repos form-control border-0 rounded-0 shadow bg-dark-subtle text-primary mb-3 p-3" placeholder="Search Projects" data-bs-theme="dark" />
          <Row className="g-4">
            <ProjectGrid langIcons={langIcons} />
          </Row>
        </Container>
      </section>
    </>
  )
}
