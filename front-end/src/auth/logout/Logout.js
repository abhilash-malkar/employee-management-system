import Cookies from 'js-cookie';
import { useNavigate } from 'react-router-dom';

export const logout = (navigate) => {

  Cookies.remove('username');

  navigate('/');
};
