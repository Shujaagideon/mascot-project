import R3fCanvas from './components/canvas'
import Cursor from './components/cursor'
import Nav from './components/nav'
import { create } from 'zustand'

export const useStore = create((set) => ({
  clicked: false,
  setClicked: () => set((state) => ({ clicked: !state.clicked })),
}))

function App() {

  return (
    <>
      <Nav/>
      <R3fCanvas/>
      <Cursor/>
    </>
  )
}

export default App