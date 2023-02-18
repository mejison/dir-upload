import { useState } from 'react'
import './App.css'
import uploadIcon from "./assets/upload-icon.svg"

function App() {
  const handleInputFileChange = ({ target: { files }}) => {
    console.log(files)
  }

  return (
    <div className="App">
      <div className="upload-area">
        <img className="upload-icon" src={uploadIcon} alt="upload-icon" />
        <label>
          <input 
            type="file" 
            className="upload-input" 
            webkitdirectory="webkitdirectory" 
            mozdirectory="mozdirectory"
            onChange={handleInputFileChange}
            onDragEnd={handleInputFileChange}
          />
          <div className="upload-info">
            <h2>Drag and drop or click here</h2>
            <span>to upload your directory</span>
          </div>
        </label>
      </div>
    </div>
  )
}

export default App
