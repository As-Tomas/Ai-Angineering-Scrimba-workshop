
import './App.css'
import ChunkingAndStoring from './components/chunkingAndStoring'
import ChunkingData from './components/chunkingTextFromDoc'
import CreateAnEmbedding from './components/create_an_embeding'
import MovieAssistant from './components/movieAssistant'

function App() {

  return (
    <>
    <div>Embeddings and Vector databases</div>
    <MovieAssistant/>
      {/* <CreateAnEmbedding /> */}
      {/* <ChunkingData />
      <ChunkingAndStoring /> */}
    </>
  )
}

export default App
