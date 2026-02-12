import { useState, useEffect } from "react";
import axios from "axios";
import { Repository } from "@/types";

const token = import.meta.env.GITHUB_TOKEN;
axios.defaults.baseURL = "https://api.github.com";
axios.defaults.headers.common["Authorization"] = token ? `token ${token}` : "No token provided";
axios.defaults.timeout = 5000;

export function useUserRepos(perPage: number = 100) {
  const [repos, setRepos] = useState<Repository[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const getRepos = async (): Promise<Repository[]> => {
    const username = "simpelcity";
    const maxPages = 3;

    let allRepos: Repository[] = [];

    for (let i = 1; i <= maxPages; i++) {
      const res = await axios.get<Repository[]>(`/users/${username}/repos?sort=pushed&per_page=100&page=${i}`, {
        params: { sort: "pushed", per_page: perPage, page: i },
      });
      if (res.status !== 200) throw new Error(`Failed to fetch repositories (${res.status})`);
      allRepos = allRepos.concat(res.data);
    }

    allRepos.sort((a, b) => b.updated_at.localeCompare(a.updated_at));
    return allRepos;
    // try {
    // } catch (err: any) {
    //   throw new Error(`Error fetching repos: ${err.message}`);
    // }
  };

  useEffect(() => {
    // const init = async () => {
    //   await loadRepos();
    // };
    // init();
    const fetchRepos = async () => {
      try {
        setLoading(true);
        const data = await getRepos();
        setRepos(data);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchRepos();
  }, []);

  return { repos, loading, error };
}
