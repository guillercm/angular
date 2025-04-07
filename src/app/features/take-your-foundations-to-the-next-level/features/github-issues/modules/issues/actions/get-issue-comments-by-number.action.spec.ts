import { environment } from "../../../environments/environments";
import { authorization } from "../../../helpers/authorization";
import { getIssueCommentsByNumber } from "./get-issue-comments-by-number.action";

const BASE_URL = environment.baseUrl;

const issueNumber = '123';

const mockComments: any[] = [
  { id: 1, body: 'First comment', user: { login: 'user1' } },
  { id: 2, body: 'Second comment', user: { login: 'user2' } },
]

describe('getIssue Comments', () => {

  it('should fetch issue comments successfully', async () => {
    const requestURL = `${BASE_URL}/issues/${issueNumber}/comments`;
    const issueCommentsResponse = new Response(JSON.stringify(mockComments), {
      status: 200,
      statusText: 'OK'
    });

    spyOn(window, 'fetch').and.resolveTo(issueCommentsResponse);

    const issue = await getIssueCommentsByNumber(issueNumber);

    expect(window.fetch).toHaveBeenCalledWith(requestURL, {
      headers: {
        ...authorization()
      }
    })
  });

  it('should throw an error if the response is not ok', async () => {
    const issueCommentsResponse = new Response(null, {
      status: 404,
      statusText: 'Not Found',
    });

    spyOn(window, 'fetch').and.resolveTo(issueCommentsResponse);

    try {
      const issue = await getIssueCommentsByNumber(issueNumber);
      expect(true).toBeFalse(); // esta prueba siempre fallaría, pero la anterior, como lanza una excepción, nunca llega a este punto.
    } catch (error) {
      expect(error).toBe(`Can't load comments issue ${issueNumber}`);
    }
  });

});
