import { useState, useEffect } from 'react';

const useFetchBirdData = (uid) => {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!uid) return;

    setIsLoading(true);
    setError(null);

    fetch(`https://aves.ninjas.cl/api/birds/${uid}`)
      .then(response => response.json())
      .then(data => setData(data))
      .catch(error => setError(error))
      .finally(() => setIsLoading(false));
  }, [uid]);

  return { data, isLoading, error };
};

export default useFetchBirdData;
