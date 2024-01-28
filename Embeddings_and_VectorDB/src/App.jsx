
import './App.css'
import ChunkingAndStoring from './components/chunkingAndStoring'
import ChunkingData from './components/chunkingTextFromDoc'
import CreateAnEmbedding from './components/create_an_embeding'

function App() {

  return (
    <>
    <div>Embeddings and Vector databases</div>
      <CreateAnEmbedding />
      <ChunkingData />
      <ChunkingAndStoring />
    </>
  )
}

export default App
