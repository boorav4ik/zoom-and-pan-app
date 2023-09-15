import { useState } from 'react'
import { TransitionProvider } from './contexts/transition'
import ZoomAndPan from './components/ZoomAndPan'
import ZoomTools from './components/ZoomToolbar'
import Content from './components/Content'
import Toolbar from './components/Toolbar'
import './App.css'

const SRC = {
  H: 'https://cojo.ru/wp-content/uploads/2022/12/iarkie-kartiny-3.webp',
  V: 'https://i.pinimg.com/originals/ac/73/56/ac735652b8b0570fb2ce10c871d10f46.jpg',
  cat: 'https://i.pinimg.com/236x/7c/50/16/7c5016cfa82fc72b206cb95f2035e6f2.jpg',
}
function App() {
  const [src, setSrc] = useState(SRC.cat)
  return (
    <TransitionProvider>
      <header>
        <div className="appbar">
          <ZoomTools />
          <Toolbar>
            {Object.keys(SRC).map((key) => (
              <button key={key} onClick={() => setSrc(SRC[key])}>
                {key}
              </button>
            ))}
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
