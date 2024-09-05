import { useEffect, useState } from "react";

type post = {
  body: string;
  id: number;
  title: string;
  userId: number;
};

function App() {
  const [data, setData] = useState<post[]>([]);
  const [page, setPage] = useState<number>(1);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<boolean>(false);

  const getData = async () => {
    try {
      setLoading(true);
      fetch(`https://jsonplaceholder.typicode.com/posts?_limit=9&page=${page}`)
        .then((response) => response.json())
        .then((json: post[]) => {
          console.log(json);
          setData((prev) => [...prev, ...json]);
        });
      setLoading(false);
    } catch (err) {
      setLoading(false);
      setError(true);
      console.log(err);
    }
  };

  const handleInfiniteScroll = () => {
    if (
      window.innerHeight + document.documentElement.scrollTop + 1 >=
      document.documentElement.scrollHeight
    ) {
      setPage((prev) => prev + 1);
    }
  };

  useEffect(() => {
    getData();
  }, [page]);

  useEffect(() => {
    window.addEventListener("scroll", handleInfiniteScroll);
    return () => {
      window.removeEventListener("scroll", handleInfiniteScroll);
    };
  }, []);

  return (
    <div>
      {error && <h4>error..</h4>}
      <div>
        {data.map((post, index) => (
          <h4 key={index}>{post.title}</h4>
        ))}
      </div>
      {loading && <h4>Loading ...</h4>}
    </div>
  );
}

export default App;
