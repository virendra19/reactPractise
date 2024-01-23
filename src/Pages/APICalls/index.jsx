import { useEffect } from "react";

export default function ApiCalls() {
  const getApi = async () => {
    try {
      const res = await fetch("https://jsonplaceholder.typicode.com/todos/1");
      const data = await res.json();
      console.log('data: ', data);
    } catch (error) {
        console.log(error)
    }
  };

  useEffect(() => {
    getApi();
  }, []);

  // useEffect(() => {
  //     fetch('https://jsonplaceholder.typicode.com/todos/1')
  //     .then(response => response.json())
  //     .then(json => console.log(json))
  //     .catch((err) => {
  //         console.log(err)
  //     })
  // },[])

  return <div>index</div>;
}
