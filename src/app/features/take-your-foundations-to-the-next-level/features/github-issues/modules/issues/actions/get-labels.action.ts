import { environment } from "../../../environments/environments";
import { sleep } from "../../../helpers/sleep";
import { GitHubLabel } from "../interfaces/github-label.interface";
import { authorization } from '../../../helpers/authorization';


const BASE_URL = environment.baseUrl;

export const getLabels = async (): Promise<GitHubLabel[]> => {
  await sleep(1500);

  try {
    const resp = await fetch(`${BASE_URL}/labels`, {
      headers: {
       ...authorization()
      },
    });

    if (!resp.ok) throw "Can't load labels";

    const labels: GitHubLabel[] = await resp.json();
    console.log({ labels });

    return labels;
  } catch (error) {
    throw "Can't load labels";
  }
};
