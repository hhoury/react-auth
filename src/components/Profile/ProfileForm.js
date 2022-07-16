import { useRef, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import AuthContext from '../../store/auth-context';
import classes from './ProfileForm.module.css';

const ProfileForm = () => {
  //https://identitytoolkit.googleapis.com/v1/accounts:update?key=[API_KEY]

  const newPasswordRef = useRef();
  const authCtx = useContext(AuthContext);
  const history = useHistory();
  const formSubmitHandler = (event) => {
    event.preventDefault();
    const enteredNewPassword = newPasswordRef.current.value;

    fetch(
      'https://identitytoolkit.googleapis.com/v1/accounts:update?key=AIzaSyBBZ5ry84CCxcYxYH9wy2tWvrYA5Ryx39s',
      {
        method: 'POST',
        body: JSON.stringify({
          idToken: authCtx.token,
          password: enteredNewPassword,
          returnSecureToken: false,
        }),
        headers: {
          'Content-Type': 'application/json',
        },
      }
    ).then((res) => {
      history.replace('/')
    });
  };
  return (
    <form className={classes.form} onSubmit={formSubmitHandler}>
      <div className={classes.control}>
        <label htmlFor='new-password'>New Password</label>
        <input ref={newPasswordRef} type='password' id='new-password' minLength={7} />
      </div>
      <div className={classes.action}>
        <button>Change Password</button>
      </div>
    </form>
  );
};

export default ProfileForm;
