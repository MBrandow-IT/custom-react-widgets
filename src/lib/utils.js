// GLOBAL VARS --------------------------------

export const requestPrefix = 'http://localhost:5000';
// export const requestPrefix = 'http://10.13.16.147:5000';
export const defaultProfileImgURL = 'https://www.pureheart.org/wp-content/uploads/2023/08/Image-Coming-Soon.png';

// --------------------------------------------

// UTIL FUNCTIONS -----------------------------

const saveCSRFToken = (csrfTokenData) => {
  window.sessionStorage.setItem('mpp-widgets_CSRFToken', JSON.stringify(csrfTokenData));
}

const getNewCSRFToken = async () => {
  try {
    const response = await fetch(`https://my.pureheart.org/widgets/Home/CSRFToken`);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const tokenData = await response.json();
    saveCSRFToken(tokenData);
    return tokenData.token;
  } catch (error) {
    console.error('Error fetching CSRF token:', error);
    throw new Error('Failed to fetch CSRF token');
  }
}

// --------------------------------------------

// EXPORT FUNCTIONS----------------------------

export const getCSRFToken = async () => {
  const tokenDataJSON = window.sessionStorage.getItem('mpp-widgets_CSRFToken');
  if (!tokenDataJSON) {
    return await getNewCSRFToken();
  }

  const tokenData = JSON.parse(tokenDataJSON);
  const tokenExpiryTime = new Date(tokenData.expiresAfterUtc).getTime();

  if (!tokenData.token || Date.now() > tokenExpiryTime) {
    return await getNewCSRFToken();
  }
  return tokenData.token;
}

export const httpRequest = async (url, method="GET",body=null,headers={}) => {
  try {
    const csrfToken = await getCSRFToken();
    const response = await fetch(url, {
      method: method,
      headers: {
        'x-csrf-token': csrfToken,
        ...headers
      },
      body: body && JSON.stringify(body)
    });
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    throw new Error(`HTTP error! error: ${error}`);
  }
}

// --------------------------------------------