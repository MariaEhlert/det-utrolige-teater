import { BrowserRouter } from 'react-router-dom';
import './App.scss';
import { Header } from './Components/Partials/Header';
import { AppRouter } from './Components/AppRouter/AppRouter';
import { Main } from './Components/Partials/Main';
import { Footer } from './Components/Partials/Footer';


function App() {
  return (
    <BrowserRouter>
      <Header />
      <Main>
        <AppRouter />
      </Main>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
