import { saveAs } from 'file-saver';
import React, { useEffect, useState } from 'react';

export default function MemeGenerator() {
  const [template, setTemplate] = useState('preview'); // Stores the confirmed template and loads a default preview image when the page first loads
  const [topText, setTopText] = useState(''); // Set top text
  const [bottomText, setBottomText] = useState(''); // Set bottom text
  const [memeUrl, setMemeUrl] = useState(''); // Set the meme url

  useEffect(() => {
    const formatText = (string) => {
      // Encode special characters in the string to be used safely in a URL + replace spaces(%20) to underscores _
      return encodeURIComponent(string).replace(/%20/g, '_');
    };

    const formattedTopText = topText ? formatText(topText) : '_';
    const formattedBottomText = bottomText ? formatText(bottomText) : '_';

    const url = `https://api.memegen.link/images/${template}/${formattedTopText}/${formattedBottomText}.jpg`; // Construct the URL
    setMemeUrl(url);
  }, [template, topText, bottomText]); // Dependency array: useEffect will re-run whenever one of the variables changes

  const downloadImage = () => {
    saveAs(memeUrl, 'image.jpg');
  };

  return (
    <div className="main-container">
      <h1>Meme Generator</h1>
      <div className="inputs">
        <label>
          Meme template:
          <input
            className="template-name"
            value={template}
            onChange={(event) => {
              setTemplate(event.currentTarget.value); // Update liveTemplate as user types
              setTemplate(event.currentTarget.value); // Automatically generate meme without a button
            }}
            placeholder="e.g., 'doge'"
          />
        </label>
        <label className="top-text">
          Top text:
          <input
            value={topText}
            onChange={(event) => setTopText(event.currentTarget.value)}
            placeholder="Top text"
          />
        </label>
        <label className="bottom-text">
          Bottom text:
          <input
            value={bottomText}
            onChange={(event) => setBottomText(event.currentTarget.value)}
            placeholder="Bottom text"
          />
        </label>
      </div>

      {memeUrl && (
        <div>
          <img data-test-id="meme-image" src={memeUrl} alt="Generated Meme" />
        </div>
      )}
      <div>
        <button onClick={downloadImage}>Download</button>
      </div>
    </div>
  );
}
