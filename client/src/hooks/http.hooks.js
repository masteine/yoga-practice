import { usetState, useCallback } from 'react';

export const useHttp = () => {
  const [loading, setLoading] = useState(false);

  const request = async (url, method = 'GET', body = null, headers = {}) => {
    try {
      await fetch(url, {
        method,
        body,
        headers
      });
    } catch (e) {}
  };
  return { loading, request, error };
};
