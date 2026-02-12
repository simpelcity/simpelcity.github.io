import { Col, Card } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { browserIcons } from '@/constants/icons'
import { LangIcons } from '@/types'
import { useUserRepos } from '@/hooks/useUserRepos';
import { useBrowserCheck } from '@/hooks/useBrowserCheck';

interface FeaturedProjectsGridProps {
  langIcons: LangIcons;
}

export default function FeaturedProjectsGrid({ langIcons }: FeaturedProjectsGridProps) {
  const username = "simpelcity";
  const { repos, loading, error } = useUserRepos(6);
  const { browser } = useBrowserCheck();

  if (loading) {
    return <p className="fs-2 fw-bold">Loading repositories...</p>;
  }

  if (error === 'Failed to fetch repositories (403)') {
    return <p className="text-danger fs-2 fw-bold">Failed to fetch repositories</p>;
  }

  if (!repos || repos.length === 0) {
    console.warn('No repositories found:', repos);
    return <p className="fs-2 text-warning fw-bold">No repositories found :(</p>;
  }

  const userHome = `https://github.com/${username}`;

  const visibleRepos = repos.slice(0, 6);
  const showSeeMore = repos.length > 6;

  return (
    <>
      {
        visibleRepos.map((repo, index) => (
          <Col key={repo.id} xs={12} md={6} xl={4}>
            <Card className="h-100 rounded-0 border-0 shadow bg-dark text-primary repo-card">
              <Card.Body className="d-flex flex-column">
                <Card.Title className="mb-2">
                  <a
                    href={`/projects/${index + 1}`}
                    className="text-decoration-none fs-3 fw-bold repo-name transition"
                  >
                    {repo.name}
                  </a>
                </Card.Title>
                <Card.Text className="text-secondary flex-grow-1">
                  {repo.description || "No description provided."}
                </Card.Text>
                <div className="d-flex justify-content-center gap-3 mt-auto">
                  <a
                    href={`${userHome}?tab=repositories&q=&language=${repo.language}`}
                    target="_blank"
                    className="text-decoration-none d-flex gap-1 repo-lang">
                    <span className={`${repo.language === 'PHP' ? 'fs-3' : ''} d-flex align-items-center`}>
                      {langIcons[repo.language || "Language unknown"]}
                    </span>
                    <p className="my-auto language-name transition">{repo.language || "Language unknown."}</p>
                  </a>
                  {repo.homepage ? (
                    <a
                      href={repo.homepage}
                      target="_blank"
                      className="text-decoration-none d-flex align-items-center gap-1 repo-site">
                      <span className="d-flex align-items-center">{browserIcons[browser]}</span>
                      <p className="my-auto site-name transition">Site</p>
                    </a>
                  ) : ""}
                </div>
              </Card.Body>
            </Card>
          </Col>
        ))
      }
      {showSeeMore && (
        <Col xs={12} className="d-flex justify-content-end px-4">
          <Link to="/projects" className="text-decoration-none fs-5 fw-bold seemore">
            See more
          </Link>
        </Col>
      )}
    </>
  )
}
