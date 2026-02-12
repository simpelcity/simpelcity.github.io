import { useState, useEffect } from "react";
import axios from "axios";
import { Repository, Branch } from "@/types";

interface Screenshot {
  name: string;
  url: string;
}

const token = import.meta.env.GITHUB_TOKEN;
axios.defaults.baseURL = "https://api.github.com";
axios.defaults.headers.common["Authorization"] = token ? `token ${token}` : "No token provided";
axios.defaults.timeout = 5000;

export function useCurrentProject(repoName: string) {
  const [project, setProject] = useState<Repository | null>(null);
  const [branches, setBranches] = useState<Branch[]>([]);
  // const [languages, setLanguages] = useState<any[]>([]);
  const [screenshots, setScreenshots] = useState<Screenshot[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const username = "simpelcity";

  useEffect(() => {
    if (!repoName) return;

    const fetchData = async () => {
      try {
        setLoading(true);
        setError(null);

        const projectRes = await axios.get<Repository>(`/repos/${username}/${repoName}`);
        if (projectRes.status !== 200) return setError(`Failed to fetch project (${projectRes.status})`);
        setProject(projectRes.data);

        // const branchesRes = await axios.get<Branch[]>(`/repos/${username}/${repoName}/branches`);
        // if (branchesRes.status !== 200) return setError(`Failed to fetch branches (${branchesRes.status})`);
        // setBranches(branchesRes.data);

        const branchesListRes = await axios.get<any[]>(`https://api.github.com/repos/${username}/${repoName}/branches`);
        const branchNames = branchesListRes.data.map((branch: any) => branch.name);

        const detailedBranches = await Promise.all(
          branchNames.map(async (branchName: string) => {
            const branchRes = await axios.get<Branch>(
              `https://api.github.com/repos/${username}/${repoName}/branches/${branchName}`,
            );
            return branchRes.data;
          }),
        );
        setBranches(detailedBranches);

        const rootContentsRes = await axios.get<any[]>(`/repos/${username}/${repoName}/contents`);
        if (rootContentsRes.status !== 200)
          return setError(`Failed to fetch repository contents (${rootContentsRes.status})`);

        const screenshotsFolder = rootContentsRes.data.find(
          (item: any) => item.type === "dir" && item.name === "screenshots",
        );

        if (screenshotsFolder) {
          const screenshotsRes = await axios.get<Screenshot[]>(`/repos/${username}/${repoName}/contents/screenshots`);
          if (screenshotsRes.status !== 200) return setError(`Failed to fetch screenshots (${screenshotsRes.status})`);

          const screenshotsData = screenshotsRes.data.map((file: any) => ({
            name: file.name,
            url: file.download_url,
          }));
          setScreenshots(screenshotsData);
        } else {
          setScreenshots([]);
        }
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [repoName, token, username]);

  return { project, branches, screenshots, loading, error };
}
