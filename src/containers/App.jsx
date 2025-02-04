import { BrowserRouter, Routes } from "react-router-dom";
import { appRoutes } from '@routes/routes.jsx';

const App = () => (
  <BrowserRouter>
    <Routes>
      {appRoutes().routes.map(({ component }) => component())}
    </Routes>
  </BrowserRouter>
);

export default App;
