import { Route } from "react-router-dom";
import Home from './Home';
// @generator routes:import

export const appRoutes = () => ({
  routes: [
    {
      component: () => (
        <Route
          path='/'
          key='Home'
          element={
            <Home />
          }
        />
      ),
    }
    // @generator routes:define:auth
  ]
});
