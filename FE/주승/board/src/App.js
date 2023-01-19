import Container from './container/Container';
import { BrowserRouter } from 'react-router-dom';

function App() {
  return (
    <div>
      <BrowserRouter>
        <Container/>
      </BrowserRouter>
    </div>
  )
}

export default App;