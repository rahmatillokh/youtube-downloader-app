import { useRef, useState } from "react"
import { youtube_parser } from "./utils"
import axios from "axios"

function App() {
  const inputRef = useRef()
  const [urlResult, setUrlResult] = useState(null)
  const [audioResult, setAudioResult] = useState(null)


  const handleSubmit = (e) => {
    e.preventDefault()
    const youtubeID = youtube_parser(inputRef.current.value)

    const options = {
      method: 'GET',
      url: 'https://youtube-media-downloader.p.rapidapi.com/v2/video/details',
      params: {
        videoId: youtubeID
      },
      headers: {
        'X-RapidAPI-Key': 'e705394852msh32ca47283706601p1c70f9jsn233f5a4542f7',
        'X-RapidAPI-Host': 'youtube-media-downloader.p.rapidapi.com'
      }
    }

    axios(options)
      .then(res => {
        setUrlResult(res.data.videos.items[0].url)
        setAudioResult(res.data.audios.items[0].url)
      })
      .catch(err => console.log(err))

    inputRef.current.value = ""
  }

  return (
    <div className="app">
      <span>youtube downloader</span>

      <div className="content">
        <h1>Download from Youtube</h1>
        <p>This app is used for downloading videos <br /> or audios from Youtube</p>
        <div className="coder">
          <a href="https://github.com/rahmatillokh">Coder</a>
        </div>
      </div>

      <form className="form-floating mb-3 app__form" onSubmit={handleSubmit}>
        <input ref={inputRef} type="text" className="form-control" id="floatingInput" placeholder="Link here" />
        <label htmlFor="floatingInput">Link here</label>
        <button type="submit" className="btn btn-primary form__button">Search</button>
      </form>
      {urlResult ? <div className="video">
        <a target="_blank" href={urlResult}>Download video</a>
      </div> : ""} <br />
      {audioResult ? <a target="_blank" href={audioResult}>Download audio</a> : ""}
    </div>
  )
}

export default App
