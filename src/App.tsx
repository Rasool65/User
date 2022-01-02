import { BrowserRouter, Route } from 'react-router-dom';

import { MainRoutes } from './routes/Routes';
import Header from './layouts/header';
import Footer from './layouts/footer';

const App = () => {
  return (
    <BrowserRouter>
      <Header />
      <Route component={MainRoutes} />
      <Footer />
    </BrowserRouter>
  );
};

export default App;
