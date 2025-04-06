import { environment } from "../environments/environments";

const GITHUB_TOKEN = environment.gitHubToken;

export const authorization = () => {
  const headers: Record<string, string> = {};

  if (GITHUB_TOKEN) {
    headers["Authorization"] = `Bearer ${GITHUB_TOKEN}`;
  }

  return headers;
}
