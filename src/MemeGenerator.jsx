import React, { useState } from 'react';

export default function MemeGenerator() {
  const [template, setTemplate] = useState('');
  const [topText, setTopText] = useState('');
  const [bottomText, setBottomText] = useState('');
  const [memeUrl, setMemeUrl] = useState('');

  const generateMeme = () => {
    // Use encodeURIComponent to handle special characters safely in URLs
    const formattedTopText = topText ? encodeURIComponent(topText) : '_';
    const formattedBottomText = bottomText
      ? encodeURIComponent(bottomText)
      : '_';

    // Construct the URL with the template, topText, and bottomText embedded in the path
    const url = `https://memegen.link/${template}/${formattedTopText}/${formattedBottomText}.jpg`;

    // Set the meme URL to the state so that it's displayed on the page
    setMemeUrl(url);
  };

  const download = () => {
    // Create an anchor tag
    const link = document.createElement('a');
    link.href = memeUrl; // Set the href to the meme URL
    link.download = 'meme.jpg'; // Specify the file name to download
    link.click(); // Click the link to trigger the download
  };

  return (
    <div>
      <h1>Meme Generator</h1>
      <div>
        <label>
          Meme template:
          <input
            value={template}
            onChange={(event) => setTemplate(event.currentTarget.value)}
            placeholder="e.g.'sadfrog'"
          />
        </label>
      </div>
      <div>
        <label>
          Top Text:
          <input
            value={topText}
            onChange={(event) => setTopText(event.currentTarget.value)}
            placeholder="Top text"
          />
        </label>
      </div>
      <div>
        <label>
          Bottom Text:
          <input
            value={bottomText}
            onChange={(event) => setBottomText(event.currentTarget.value)}
            placeholder="Bottom text"
          />
        </label>
      </div>
      <button onClick={generateMeme}>Generate Meme</button>

      {memeUrl && (
        <div>
          <h2>Your Meme:</h2>
          <img
            htmlFor='data-test-id="meme-image"'
            src={memeUrl}
            alt="Generated Meme"
          />
          <div>
            <button onClick={download}>Download</button>
          </div>
        </div>
      )}
    </div>
  );
}
