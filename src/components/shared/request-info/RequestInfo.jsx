import { useEffect, useState } from 'react'

export const RequestInfo = () => {

  const [info, setInfo] = useState<unknown>(null);

  useEffect(() => {

    vqcBackendApi.get('/users')
      .then((response) => setInfo(response.data))
      .catch((error) => setInfo(error));
  } , []);


  return (
    <>
      <h2>informacion</h2>
      <pre>
        {JSON.stringify(info, null, 2)}
      </pre>
    </>
  )
}
