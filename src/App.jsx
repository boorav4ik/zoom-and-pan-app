import { TransitionProvider } from './contexts/transition'
import ZoomAndPan from './components/ZoomAndPan'
import ZoomTools from './components/ZoomToolbar'
import Content from './components/Content'
import './App.css'

function App() {
  return (
    <TransitionProvider>
      <header>
        <ZoomTools />
      </header>
      <section>
        <div className="container">
          <ZoomAndPan>
            {(props) => <Content src="sky.jpg" {...props} />}
          </ZoomAndPan>
        </div>
      </section>
    </TransitionProvider>
  )
}

export default App
