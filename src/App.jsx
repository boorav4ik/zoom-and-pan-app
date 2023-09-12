import { useState } from 'react'
import { TransitionProvider } from './contexts/transition'
import ZoomAndPan from './components/ZoomAndPan'
import ZoomTools from './components/ZoomToolbar'
import Content from './components/Content'
import Toolbar from './components/Toolbar'
import './App.css'

const H = 'https://cojo.ru/wp-content/uploads/2022/12/iarkie-kartiny-3.webp'
const V =
  'https://i.pinimg.com/originals/ac/73/56/ac735652b8b0570fb2ce10c871d10f46.jpg'

function App() {
  const [src, setSrc] = useState(V)
  return (
    <TransitionProvider>
      <header>
        <div className="appbar">
          <ZoomTools />
          <Toolbar>
            <button onClick={() => setSrc(H)}>H</button>
            <button onClick={() => setSrc(V)}>V</button>
          </Toolbar>
        </div>
      </header>
      <section>
        <ZoomAndPan>{(props) => <Content src={src} {...props} />}</ZoomAndPan>
      </section>
    </TransitionProvider>
  )
}

export default App
