export interface Repository {
  id: number;
  name: string;
  description: string | null;
  language: string | null;
  homepage: string | null;
  html_url: string;
  created_at: string;
  updated_at: string;
  branches_url: string;
  stargazers_count: number;
  forks_count: number;
}

export interface LangIcons {
  [key: string]: React.ReactNode;
}

export interface Language {
  name: string;
  progress: number;
  color: string;
}

export interface Certificate {
  name: string;
  language: string[] | string;
}

export interface Branch {
  name: string;
  commit: {
    sha: string;
    url: string;
  };
  protected: boolean;
  _links: {
    html: string;
    self: string;
  };
}

// export interface BranchInfo {
//   name: string;
// }
