import { environment } from "../../../environments/environments";
import { authorization } from "../../../helpers/authorization";
import { getIssueByNumber } from "./get-issue-by-number.action";

const BASE_URL = environment.baseUrl;
const issueNumber = '123';

const mockIssue = {
  id: 123,
  number: issueNumber,
  body: '# Hola Mundo',
};

describe('GetIssueByNumber action', () => {

  it('should fetch issue successfully', async () => {
    const requestURL = `${BASE_URL}/issues/${issueNumber}`;
    const issueResponse = new Response(JSON.stringify(mockIssue), {
      status: 200,
      statusText: 'OK'
    });

    spyOn(window, 'fetch').and.resolveTo(issueResponse);

    const issue = await getIssueByNumber(issueNumber);

    console.log(issue)
    expect(window.fetch).toHaveBeenCalledWith(requestURL, {
      headers: {
        ...authorization()
      }
    })
  });

  it('should not fetch issue successfully', async () => {
    const requestURL = `${BASE_URL}/issues/${issueNumber}`;
    const issueResponse = new Response(null, {
      status: 404,
      statusText: 'Not Found',
    });

    spyOn(window, 'fetch').and.resolveTo(issueResponse);

    try {
      const issue = await getIssueByNumber(issueNumber);
      expect(true).toBeFalse(); // esta prueba siempre fallaría, pero la anterior, como lanza una excepción, nunca llega a este punto.
    } catch (error) {
      expect(error).toBe(`Can't load issue ${issueNumber}`);
    }

    // expect(window.fetch).toHaveBeenCalledWith(requestURL, {
    //   headers: {
      //   ...authorization()
      // }
    // });
  });
})
