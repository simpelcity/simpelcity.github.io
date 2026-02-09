import { Col, Card } from 'react-bootstrap'
import { useEffect, useState } from 'react'
import { FaChrome, FaEdge, FaFirefoxBrowser, FaSafari, FaOpera, } from "react-icons/fa";
import { FaBrave } from "react-icons/fa6";
import { SiOperagx, SiTorbrowser } from "react-icons/si";

const browserIcons = {
  Chrome: <FaChrome style={{ color: '#4285F4' }} />,
  Edge: <FaEdge style={{ color: '#0078D7' }} />,
  Firefox: <FaFirefoxBrowser style={{ color: '#FF7139' }} />,
  Safari: <FaSafari style={{ color: '#0FB5EE' }} />,
  Opera: <FaOpera style={{ color: '#FF1B2D' }} />,
  Brave: <FaBrave style={{ color: '#FF6600' }} />,
  "Opera GX": <SiOperagx style={{ color: '#FF1B2D' }} />,
  "Tor Browser": <SiTorbrowser style={{ color: '#4A5BB6' }} />,
}

export default function ProjectGrid({ langIcons }) {
  const username = "simpelcity";
  const maxPages = 3;
  const [repos, setRepos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const filterInput = document.querySelector(".filter-repos");

  useEffect(() => {
    let isMounted = true;

    const getRepos = async () => {
      let allRepos = [];

      for (let i = 1; i <= maxPages; i++) {
        const res = await fetch(
          `https://api.github.com/users/${username}/repos?sort=pushed&per_page=100&page=${i}`
        );

        if (!res.ok) {
          throw new Error(`Failed to fetch repositories (${res.status})`);
        }

        const data = await res.json();
        allRepos = allRepos.concat(data);
      }

      allRepos.sort(
        (a, b) =>
          b.stargazers_count - a.stargazers_count || b.forks_count - a.forks_count
      );

      return allRepos;
    }

    getRepos()
      .then((data) => {
        if (!isMounted) return;
        // filterInput.classList.remove("hide")
        setRepos(data);
        setLoading(false);
      })
      .catch((err) => {
        if (!isMounted) return;
        setError(err.message);
        setLoading(false);
      })

    return () => {
      isMounted = false;
    };
  }, []);

  if (loading) {
    return <p className="fs-2 fw-bold">Loading repositories...</p>;
  }

  if (error === 'Failed to fetch repositories (403)') {
    return <p className="text-danger fs-2 fw-bold">Failed to fetch repositories</p>;
  }

  if (!repos || repos.length === 0) {
    return <p className="fs-2 text-warning fw-bold">No repositories found :(</p>;
  }

  const userHome = `https://github.com/${username}`;
  let browser = "";

  if (window.navigator.userAgentData.brands[2].brand === 'Google Chrome') browser = "Chrome";
  if (window.navigator.userAgentData.brands[2].brand === 'Microsoft Edge') browser = "Edge";
  if (window.navigator.userAgentData.brands[2].brand === 'Mozilla Firefox') browser = "Firefox";
  if (window.navigator.userAgentData.brands[2].brand === 'Safari') browser = "Safari";
  if (window.navigator.userAgentData.brands[2].brand === 'Opera') browser = "Opera";
  if (window.navigator.userAgentData.brands[2].brand === 'Brave') browser = "Brave";
  if (window.navigator.userAgentData.brands[2].brand === 'Opera GX') browser = "Opera GX";
  if (window.navigator.userAgentData.brands[2].brand === 'Tor Browser') browser = "Tor Browser";
  if (window.navigator.userAgentData.brands[2].brand === undefined) browser = "Chrome";

  filterInput.addEventListener("input", (e) => {
    const search = e.target.value;
    const repos = document.querySelectorAll(".repo-card");
    const searchLowerText = search.toLowerCase();

    for (const repo of repos) {
      const repoTitle = repo.innerText.split("\n")[0].toLowerCase();
      if (repoTitle.includes(searchLowerText)) {
        repo.parentElement.classList.remove("hide");
      } else {
        repo.parentElement.classList.add("hide");
      }
    }
  })

  return (
    <>
      {
        repos.map((repo) => (
          <Col key={repo.id} xs={12} md={6} xl={4}>
            <Card className="h-100 rounded-0 border-0 shadow bg-dark text-primary repo-card">
              <Card.Body className="d-flex flex-column">
                <Card.Title className="mb-2">
                  <a
                    href={repo.html_url}
                    target="_blank"
                    rel="noreferrer"
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
                    <span className={`${repo.language === 'PHP' ? 'fs-3' : ''} d-flex align-items-center`}>{langIcons[repo.language]}</span>
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
    </>
  )
}
