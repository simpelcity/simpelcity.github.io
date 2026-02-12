import { useParams } from "react-router-dom";
import { useState } from 'react'
import { Container, Badge, Row, Col, Image, Dropdown, Modal } from 'react-bootstrap'
import { FaGithub, FaStar, FaCodeBranch, FaCodeFork, FaArrowLeftLong } from "react-icons/fa6";
import { browserIcons } from '@/constants/icons'
import { useCurrentProject } from '@/hooks/useCurrentProject';
import { useBrowserCheck } from '@/hooks/useBrowserCheck';
import BSButton from '@/components/Button'

export default function ProjectDetail() {
  const { name } = useParams<{ name: string }>();
  const [enlargedIndex, setEnlargedIndex] = useState<number | null>(null);
  const { project, branches, screenshots, loading, error } = useCurrentProject(name || "");
  const { browser } = useBrowserCheck();
  const username = "simpelcity";

  const toggleEnlarged = (index: number) => {
    setEnlargedIndex(enlargedIndex === index ? null : index);
  };

  const userHome = `https://github.com/${username}`;

  if (loading) {
    return (
      <section className="d-flex align-items-center justify-content-center mt-5 flex-column" style={{ minHeight: '60vh' }}>
        <h2>Loading project...</h2>
      </section>
    );
  }

  if (error || !project) {
    return (
      <section className="d-flex align-items-center justify-content-center mt-5 flex-column" style={{ minHeight: '60vh' }}>
        <h2 className="text-danger">Project not found</h2>
        <BSButton variant="outline" href="/projects" classes="mt-3 d-inline-flex gap-1 transition">
          <span className="d-flex align-items-center"><FaArrowLeftLong className="fs-5" /></span>
          <p className="my-auto">Back to Projects</p>
        </BSButton>
      </section>
    );
  }
  console.log(project)
  return (
    <>
      <section id="project-detail" className="mt-5">
        <Container>
          <BSButton variant="outline" href="/projects" classes="mb-4 d-inline-flex gap-1 transition">
            <span className="d-flex align-items-center"><FaArrowLeftLong className="fs-5" /></span>
            <p className="my-auto">Back to Projects</p>
          </BSButton>

          <h1 className="mb-3">{project.name}</h1>

          <div className="d-flex gap-3 mb-4 flex-wrap">
            {project.language && (
              <Badge bg="secondary" className="fs-6">
                <a href={`${userHome}?tab=repositories&q=&language=${project.language}`} target="_blank" className="text-decoration-none fw-bold text-light">{project.language}</a>
              </Badge>
            )}
            <div className="d-flex align-items-center gap-1">
              <a href={`${userHome}/${project.name}/stargazers`} target="_blank" className="text-decoration-none text-light d-flex align-items-center gap-1">
                <FaStar className="text-warning" />
                <span>{project.stargazers_count}</span>
              </a>
            </div>
            <div className="d-flex align-items-center gap-1">
              <a href={`${userHome}/${project.name}/forks`} target="_blank" className="text-decoration-none text-light d-flex align-items-center gap-1">
                <FaCodeFork className="text-info" />
                <span>{project.forks_count}</span>
              </a>
            </div>
            <div className="d-flex align-items-center gap-1">
              <Dropdown data-bs-theme="dark">
                <Dropdown.Toggle variant="transparent" id="branches-dropdown" className="d-flex align-items-center gap-1 p-0">
                  <FaCodeBranch className="text-success" />
                  <span>{branches.length}</span>
                </Dropdown.Toggle>

                <Dropdown.Menu>
                  {branches.map((branch, index) => (
                    <Dropdown.Item key={index} href={branch._links.html} target="_blank">{branch.name}</Dropdown.Item>
                  ))}
                </Dropdown.Menu>
              </Dropdown>
            </div>
          </div>

          <p className="fs-5 text-secondary mb-4">
            {project.description || "No description provided."}
          </p>

          {screenshots.length > 0 ? (
            <div className="mb-4">
              <h5>Screenshots</h5>
              <Row className="row-gap-4 d-flex justify-content-center">
                {screenshots.map((screenshot, index) => (
                  <Col key={index} xs={12} md={6} lg={4} role="button" onClick={() => toggleEnlarged(index)}>
                    <div className="shadow bg-dark-subtle p-3 h-100 d-flex align-items-center">
                      <Image src={screenshot.url} alt={screenshot.name} fluid rounded />
                    </div>
                  </Col>
                ))}
              </Row>
            </div>
          ) : (
            <p className="text-warning">No screenshots available for this repository.</p>
          )}

          <Modal show={enlargedIndex !== null} onHide={() => setEnlargedIndex(null)} size="lg" className="bg-blur p-0 d-flex align-items-center">
            <Modal.Body className="p-0 bg-dark-subtle h-100 w-100">
              {enlargedIndex !== null && (
                <Image src={screenshots[enlargedIndex].url} alt={`Enlarged Screenshot ${enlargedIndex + 1}`} fluid className="bg-dark-subtle" />
              )}
            </Modal.Body>
          </Modal>

          <div className="d-flex gap-3 mb-4 flex-wrap">
            <BSButton variant="primary" size="md" href={project.html_url} target="_blank" classes="d-flex gap-1 text-dark transition">
              <span className="d-flex align-items-center fs-5"><FaGithub /></span>
              <p className="my-auto small">View on GitHub</p>
            </BSButton>
            {project.homepage && (
              <BSButton variant="outline" size="md" href={project.homepage} target="_blank" classes="d-flex gap-1 transition">
                <span className="d-flex align-items-center fs-5">{browserIcons[browser]}</span>
                <p className="my-auto small">View Live Site</p>
              </BSButton>
            )}
          </div>

          <div className="mt-4">
            <p><strong>Created:</strong> {new Date(project.created_at).toLocaleDateString()}</p>
            <p><strong>Last Updated:</strong> {new Date(project.updated_at).toLocaleDateString()}</p>
          </div>
        </Container>
      </section>
    </>
  );
}
