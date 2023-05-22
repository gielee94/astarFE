import { PublicClientApplication } from '@azure/msal-browser';

export const FETCH_TOKEN = 'FETCH_TOKEN';

export interface FetchTokenAction {
  type: typeof FETCH_TOKEN;
  payload: string;
}

export const fetchToken = (token: string): FetchTokenAction => ({
  type: FETCH_TOKEN,
  payload: token,
});

export const fetchAndStoreToken = async (
  client: PublicClientApplication,
  account: any,
  dispatch: any
) => {
  const graphRequest = {
    scopes: ['https://management.azure.com/user_impersonation'],
  };

  try {
    const response = await client.acquireTokenSilent({ ...graphRequest, account });
    if (response) {
      dispatch(fetchToken(response.accessToken));
    }
  } catch (error) {
    console.log('Error fetching token:', error);
  }
  
};
