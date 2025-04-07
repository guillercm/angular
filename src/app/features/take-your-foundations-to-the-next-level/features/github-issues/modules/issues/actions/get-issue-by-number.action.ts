import { environment } from "../../../environments/environments";
import { authorization } from "../../../helpers/authorization";
import { sleep } from "../../../helpers/sleep";
import { GitHubIssue } from "../interfaces/github-issue.interface";

const BASE_URL = environment.baseUrl;

export const getIssueByNumber = async (
  issueNumber: string
): Promise<GitHubIssue> => {
  await sleep(1500);

  try {
    const resp = await fetch(`${BASE_URL}/issues/${issueNumber}`, {
      headers: {
        ...authorization()
      },
    });

    if (!resp.ok) throw `Can't load issue ${issueNumber}`;

    const issue: GitHubIssue = await resp.json();
    console.log({ issue });

    return issue;
  } catch (error) {
    throw `Can't load issue ${issueNumber}`;
  }
};
