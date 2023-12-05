import { useEffect, useState } from 'react';
import './App.css';

const CAT_ENDPOINT_RANDOM_FACT = 'https://catfact.ninja/fact';
const CAT_ENDPOINT_IMAGE_URL =
  'https://cataas.com/cat/says/${threeFirstWords}?fontSize=50&fontColor=red';

function App() {
  const [fact, setFact] = useState();
  const [imageUrl, setImageUrl] = useState();

  // UseEffect to retrieve the quote when the page loads.
  useEffect(() => {
    fetch(CAT_ENDPOINT_RANDOM_FACT)
      .then((res) => res.json())
      .then((data) => {
        const { fact } = data;
        setFact(fact);
      });
  }, []);

  // UseEffect to retrieve the image each time we have a new quote.
  useEffect(() => {
    if (!fact) return;

    const threeFirstWords = fact.split(' ', 3).join(' ');
    const imageUrlWithWords = CAT_ENDPOINT_IMAGE_URL.replace(
      '${threeFirstWords}',
      encodeURIComponent(threeFirstWords)
    );

    fetch(imageUrlWithWords)
      .then((res) => res)
      .then((response) => {
        const { url } = response;
        setImageUrl(url);
      });
  }, [fact]);

  return (
    <main>
      <h1>Cat application with images and quotes</h1>
      {fact && <p>{fact}</p>}
      {imageUrl && (
        <img
          src={imageUrl}
          alt={`Image extracted using the first three words for ${fact}`}
        />
      )}
    </main>
  );
}

export default App;
