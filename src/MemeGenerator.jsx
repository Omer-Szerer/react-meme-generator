import { saveAs } from 'file-saver'; // Importing file-saver to enable image downloading
import React, { useEffect, useState } from 'react'; // Importing React hooks

export default function MemeGenerator() {
  const [template, setTemplate] = useState('preview'); // Meme template, defaulting to 'preview'
  const [topText, setTopText] = useState(''); // State for top text
  const [bottomText, setBottomText] = useState(''); // State for bottom text
  const [memeUrl, setMemeUrl] = useState(''); // State to store the generated meme URL

  useEffect(() => {
    // Function to format text for URL (replace spaces with underscores)
    const formatText = (string) => {
      return encodeURIComponent(string).replace(/%20/g, '_');
    };

    // Formatting top and bottom texts or using a placeholder ('_') if empty
    const formattedTopText = topText ? formatText(topText) : '_';
    const formattedBottomText = bottomText ? formatText(bottomText) : '_';

    // Constructing the meme URL based on the current template and texts
    const url = `https://api.memegen.link/images/${template}/${formattedTopText}/${formattedBottomText}.jpg`;
    setMemeUrl(url); // Updating the meme URL state
  }, [template, topText, bottomText]); // useEffect re-runs when template, topText, or bottomText change

  const downloadImage = () => {
    saveAs(memeUrl, `${template}-meme.jpg`);
  };

  return (
    <div className="main-container">
      <h1>Meme Generator</h1>
      <div className="inputs">
        {/* Input field to update the meme template */}
        <label>
          Meme template:
          <input
            className="template-name"
            value={template}
            onChange={(event) => {
              setTemplate(event.currentTarget.value); // Update template as user types
            }}
            placeholder="e.g., 'doge'"
          />
        </label>
        {/* Input field for top text */}
        <label className="top-text">
          Top text:
          <input
            value={topText}
            onChange={(event) => setTopText(event.currentTarget.value)} // Update top text as user types
            placeholder="Top text"
          />
        </label>
        {/* Input field for bottom text */}
        <label className="bottom-text">
          Bottom text:
          <input
            value={bottomText}
            onChange={(event) => setBottomText(event.currentTarget.value)} // Update bottom text as user types
            placeholder="Bottom text"
          />
        </label>
      </div>

      {/* Display the generated meme image if memeUrl is set */}
      {memeUrl && (
        <div>
          <img data-test-id="meme-image" src={memeUrl} alt="Generated Meme" />
        </div>
      )}

      {/* Button to download the meme */}
      <div>
        <button onClick={downloadImage}>Download</button>
      </div>
    </div>
  );
}
