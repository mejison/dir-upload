import { useState } from 'react'
import './App.css'
import uploadIcon from "./assets/upload-icon.svg"

function App() {
  const [progress, setProgress] = useState(0)
  const handleInputFileChange = ({ target: { files }}) => {
    setProgress(0)
    let uploaded = []
    Array.from(files).forEach(file => {
      uploaded = [
        ...uploaded,
        new Promise((resolve, reject) => {
          const fr = new FileReader()
          fr.onloadend = () => {
            resolve(
              {
                "fileName": file.webkitRelativePath ? file.webkitRelativePath : file.name,
                "fileContent": fr.result
              }
            )
          }

          fr.onprogress = (data) => {
            if (data.lengthComputable) {                                            
                const currentFileProgress = parseInt( ((data.loaded / data.total) * 100), 10)
                if (currentFileProgress == 100) {
                  setProgress(progress => progress + (100 / files.length))
                }
            }
          }

          fr.onerror = reject;
    
          if(/image/g.test(file.type)) {
            fr.readAsDataURL(file)
          } else {
            fr.readAsText(file)
          }
        })
      ]
    })

    Promise.all(uploaded).then((results) => {
      setProgress(100)
      pushFilesToAPI(results)
    })
  }

  const pushFilesToAPI = (payload) => {
    console.log(payload)
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
            {
              progress ? (
              <div className="progress">
                <progress max="100" value={Math.ceil(progress)}> { Math.ceil(progress) } % </progress>
                <span>
                  &nbsp; { Math.ceil(progress) } %
                </span>
              </div>
              ) : <></>
            }
          </div>
        </label>
      </div>
    </div>
  )
}

export default App
