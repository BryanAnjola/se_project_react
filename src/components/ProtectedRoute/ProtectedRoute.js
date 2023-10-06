import { useContext } from 'react';
import { Route, Redirect } from 'react-router-dom';
import { CurrentUserContext } from '../../contexts/CurrentUserContext';

const ProtectedRoute = ({ children, ...props }) => {
  const { isLoggedIn } = useContext(CurrentUserContext);

  return (
    <Route {...props}>
      {isLoggedIn === true ? children : <Redirect to="/" />}
    </Route>
  );
};

export default ProtectedRoute;
