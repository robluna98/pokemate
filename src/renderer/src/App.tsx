import AppBar from './components/AppBar/AppBar'
import PokemonCard from './components/PokemonCard/PokemonCard'
function App(): JSX.Element {
  // const ipcHandle = (): void => window.electron.ipcRenderer.send('ping')

  return (
    <>
      <AppBar />
      <PokemonCard />
    </>
  )
}

export default App
