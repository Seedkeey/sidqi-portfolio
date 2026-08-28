export type GitHubStats = {
  available: boolean;
  publicRepos: number | null;
  primaryLanguage: string | null;
  latestActivity: string | null;
  profileUrl: string;
};

type GitHubProfile = {
  public_repos: number;
  html_url: string;
};

type GitHubRepository = {
  fork: boolean;
  language: string | null;
  pushed_at: string | null;
};

const username = "Seedkeey";
const fallback: GitHubStats = {
  available: false,
  publicRepos: null,
  primaryLanguage: null,
  latestActivity: null,
  profileUrl: `https://github.com/${username}`,
};

export async function getGitHubStats(): Promise<GitHubStats> {
  try {
    const headers = { Accept: "application/vnd.github+json" };
    const [profileResponse, repositoriesResponse] = await Promise.all([
      fetch(`https://api.github.com/users/${username}`, {
        headers,
        next: { revalidate: 21600 },
      }),
      fetch(`https://api.github.com/users/${username}/repos?per_page=100&sort=pushed`, {
        headers,
        next: { revalidate: 21600 },
      }),
    ]);

    if (!profileResponse.ok || !repositoriesResponse.ok) return fallback;

    const profile = (await profileResponse.json()) as GitHubProfile;
    const repositories = (await repositoriesResponse.json()) as GitHubRepository[];
    const originalRepositories = repositories.filter((repository) => !repository.fork);
    const languageCounts = originalRepositories.reduce<Record<string, number>>((counts, repository) => {
      if (repository.language) counts[repository.language] = (counts[repository.language] ?? 0) + 1;
      return counts;
    }, {});
    const primaryLanguage = Object.entries(languageCounts).sort(([, left], [, right]) => right - left)[0]?.[0] ?? null;
    const latestActivity = originalRepositories.find((repository) => repository.pushed_at)?.pushed_at ?? null;

    return {
      available: true,
      publicRepos: profile.public_repos,
      primaryLanguage,
      latestActivity,
      profileUrl: profile.html_url,
    };
  } catch {
    return fallback;
  }
}
