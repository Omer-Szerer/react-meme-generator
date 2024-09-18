import React, { useEffect, useState } from 'react';

export default function MemeGenerator() {
  const [liveTemplate, setLiveTemplate] = useState(''); // Stores what the user is currently typing for the meme template
  const [template, setTemplate] = useState('preview'); // Stores the confirmed template and loads a default preview image when the page first loads
  const [topText, setTopText] = useState(''); // Set top text
  const [bottomText, setBottomText] = useState(''); // Set bottom text
  const [memeUrl, setMemeUrl] = useState(''); // Set the meme url

  // A function to generate the meme URL based on the current meme template, top text, and bottom text
  const updateMemeUrl = (template, topText, bottomText) => {
    const formatText = (text) => {
      return encodeURIComponent(text).replace(/%20/g, '_'); // Replace spaces with underscores
    };

    const formattedTopText = topText ? formatText(topText) : '_'; // Encodes the text and allow to use special characters
    const formattedBottomText = bottomText ? formatText(bottomText) : '_';

    return `https://api.memegen.link/images/${template}/${formattedTopText}/${formattedBottomText}.jpg`; // Returns the updated url in the right structure
  };

  useEffect(() => {
    const url = updateMemeUrl(template, topText, bottomText); // Updates the meme URL based on the user input
    console.log('Generated Meme URL:', url);
    setMemeUrl(url);
  }, [template, topText, bottomText]); // Dependency array: whenever the variables change they trigger the useEffect

  const generateMeme = () => {
    // When the button is clicked, update the template state with the value of liveTemplate
    setTemplate(liveTemplate);
  };

  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      event.preventDefault(); // Prevent default form submission if within a form
      generateMeme(); // Call generateMeme when Enter is pressed
    }
  };

  const download = () => {
    const link = document.createElement('a');
    link.href = memeUrl;
    link.download = 'meme.jpg';
    link.click();
  };

  return (
    <div>
      <h1>Meme Generator</h1>
      <div>
        <label>
          Meme template:
          <input
            value={liveTemplate}
            onChange={(event) => setLiveTemplate(event.currentTarget.value)}
            onKeyDown={handleKeyDown}
            placeholder="e.g., 'doge'"
          />
        </label>
      </div>
      <div>
        <label>
          Top text:
          <input
            value={topText}
            onChange={(event) => setTopText(event.currentTarget.value)}
            placeholder="Top text"
          />
        </label>
      </div>
      <div>
        <label>
          Bottom text:
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
          <img data-test-id="meme-image" src={memeUrl} alt="Generated Meme" />
          <div>
            <button onClick={download}>Download</button>
          </div>
        </div>
      )}
    </div>
  );
}
