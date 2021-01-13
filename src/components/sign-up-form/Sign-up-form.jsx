import { useEffect } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom';

import './Sign-up-form.scss';
import FormHeader from '../form-header';
import FormField from '../form-field';
import Checkbox from '../checkbox';
import ButtonSubmit from '../button-submit';
import RedirectNote from '../redirect-note';
import FormFieldError from '../form-field-error';
import * as actions from '../../actions/auth';
import { CLEAR_REDIRECT, CLEAR_MESSAGE, CLEAR_ERRORS } from '../../actions/action-types.js';

function SignUpForm() {
  const { register, handleSubmit, errors, getValues, control } = useForm();
  const message = useSelector((state) => state.message);
  const error = useSelector((state) => state.errors);
  const redirect = useSelector((state) => state.redirect);
  const { isLoggedIn } = useSelector((state) => state.auth);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch({ type: CLEAR_REDIRECT });
    dispatch({ type: CLEAR_MESSAGE });
    dispatch({ type: CLEAR_ERRORS });
  }, [dispatch]);

  if (redirect || isLoggedIn) {
    return <Redirect to="/" />;
  }

  const USERNAME_MIN_LENGTH = 3;
  const USERNAME_MAX_LENGTH = 20;
  const PASSWORD_MIN_LENGTH = 8;
  const PASSWORD_MAX_LENGTH = 40;

  const onSubmit = async (userData) => {
    const { username, email, password } = userData;
    dispatch(actions.signUp(username, email, password));
  };

  return (
    <form className="form" onSubmit={handleSubmit(onSubmit)}>
      <FormHeader name="Create new account" />
      <FormField
        label="Username"
        placeholder="Username"
        register={register({
          required: true,
          minLength: USERNAME_MIN_LENGTH,
          maxLength: USERNAME_MAX_LENGTH,
        })}
        name="username"
        error={errors.username || error.username}
      />
      {errors.username && errors.username.type === 'required' && (
        <FormFieldError error="This field is required!" />
      )}
      {errors.username && errors.username.type === 'minLength' && (
        <FormFieldError
          error={`Your username needs to be at least ${USERNAME_MIN_LENGTH} characters!`}
        />
      )}
      {errors.username && errors.username.type === 'maxLength' && (
        <FormFieldError
          error={`Your username needs to be not more than ${USERNAME_MAX_LENGTH} characters!`}
        />
      )}
      {error && error.username && <FormFieldError error={error.username.join()} />}
      <FormField
        label="Email address"
        placeholder="Email address"
        register={register({
          required: true,
          pattern: /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
        })}
        name="email"
        type="email"
        error={errors.email || error.email}
      />
      {errors.email && errors.email.type === 'required' && (
        <FormFieldError error="This field is required!" />
      )}
      {errors.email && errors.email.type === 'pattern' && (
        <FormFieldError error="I am sorry, I cannot accept the field as an email address!" />
      )}
      {error && error.email && <FormFieldError error={error.email.join()} />}
      <FormField
        type="password"
        label="Password"
        placeholder="Password"
        register={register({
          required: true,
          minLength: PASSWORD_MIN_LENGTH,
          maxLength: PASSWORD_MAX_LENGTH,
        })}
        name="password"
        error={errors.password || error.password}
      />
      {errors.password && errors.password.type === 'required' && (
        <FormFieldError error="This field is required!" />
      )}
      {errors.password && errors.password.type === 'minLength' && (
        <FormFieldError
          error={`Your password needs to be at least ${PASSWORD_MIN_LENGTH} characters!`}
        />
      )}
      {errors.password && errors.password.type === 'maxLength' && (
        <FormFieldError
          error={`Your password needs to be not more than ${PASSWORD_MAX_LENGTH} characters!`}
        />
      )}
      {error && error.password && <FormFieldError error={error.password.join()} />}
      <FormField
        type="password"
        label="Repeat Password"
        placeholder="Password"
        register={register({
          required: true,
          validate: (value) => value === getValues('password'),
        })}
        name="repeat-password"
        error={errors['repeat-password']}
      />
      {errors['repeat-password'] && errors['repeat-password'].type === 'required' && (
        <FormFieldError error="This field is required!" />
      )}
      {errors['repeat-password'] && errors['repeat-password'].type === 'validate' && (
        <FormFieldError error="Passwords must match!" />
      )}
      <Controller
        render={({ onChange, value }) => (
          <Checkbox
            onChange={(e) => onChange(e.target.checked)}
            isChecked={value}
            caption="I agree to the processing of my personal information"
          />
        )}
        name="agree"
        defaultValue={false}
        control={control}
        rules={{ validate: (checked) => checked === true }}
      />
      {errors['agree'] && errors['agree'].type === 'required' && (
        <FormFieldError error="This field is required!" />
      )}
      {errors['agree'] && errors['agree'].type === 'validate' && (
        <FormFieldError error="Be sure to agree with our terms or get the fuck out!" />
      )}
      <ButtonSubmit label="Create" />
      <RedirectNote note="Already have an account? " linkText="Sign In" linkReference="/sign-in" />
      {message && <FormFieldError error={message} />}
    </form>
  );
}

export default SignUpForm;
