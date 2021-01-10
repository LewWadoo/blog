import { useForm } from 'react-hook-form';
import { useEffect } from 'react';
import { Redirect } from 'react-router-dom';
import { useDispatch, useSelector, connect } from 'react-redux';
import { Alert } from 'antd';

import './Sign-in-form.scss';
import FormHeader from '../form-header';
import FormField from '../form-field';
import ButtonSubmit from '../button-submit';
import RedirectNote from '../redirect-note';
import FormFieldError from '../form-field-error';
import * as actions from '../../actions/auth';
import { getAuth } from '../../reducers';
import { CLEAR_REDIRECT, CLEAR_MESSAGE, CLEAR_ERRORS } from '../../actions/action-types.js';

function SignInForm() {
  const { register, handleSubmit, errors } = useForm();

  const { isLoggedIn } = useSelector((state) => state.auth);
  const error = useSelector((state) => state.errors);
  const message = useSelector((state) => state.message);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch({ type: CLEAR_REDIRECT });
    dispatch({ type: CLEAR_MESSAGE });
    dispatch({ type: CLEAR_ERRORS });
  }, [dispatch]);

  if (isLoggedIn) {
    return <Redirect to="/" />;
  }

  const onSubmit = async (userData) => {
    const { email, password } = userData;
    dispatch(actions.signIn(email, password));
  };

  return (
    <form className="form" onSubmit={handleSubmit(onSubmit)}>
      <FormHeader name="Sign In" />
      <FormField
        name="email"
        type="email"
        label="Email address"
        placeholder="Email address"
        register={register({
          required: true,
        })}
        error={errors.email || error['email or password']}
      />
      {errors.email && errors.email.type === 'required' && (
        <FormFieldError error="This field is required!" />
      )}
      {error && error['email or password'] && (
        <FormFieldError error={`email or password ${error['email or password']}`} />
      )}
      <FormField
        type="password"
        name="password"
        label="Password"
        placeholder="Password"
        register={register({ required: true })}
        error={errors.password || error['email or password']}
      />
      {errors.password && errors.password.type === 'required' && (
        <FormFieldError error="This field is required!" />
      )}
      {error && error['email or password'] && (
        <FormFieldError error={`email or password ${error['email or password']}`} />
      )}
      <ButtonSubmit label="Login" className="btn-submit" />
      <RedirectNote note="Don’t have an account? " linkText="Sign Up" linkReference="/sign-up" />
      {error['email or password'] && (
        <FormFieldError error={`email or password ${error['email or password']}`} />
      )}
      {message ? <Alert message={message} type="error" /> : null}
    </form>
  );
}

const mapStateToProps = (state) => {
  return {
    auth: getAuth(state),
  };
};

export default connect(mapStateToProps, actions)(SignInForm);
