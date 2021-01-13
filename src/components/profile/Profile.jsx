import { useForm } from 'react-hook-form';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom';

import FormHeader from '../form-header';
import FormField from '../form-field';
import ButtonSubmit from '../button-submit';
import FormFieldError from '../form-field-error';
import { updateUser } from '../../actions/auth';
import { CLEAR_REDIRECT, CLEAR_MESSAGE, CLEAR_ERRORS } from '../../actions/action-types.js';

function Profile() {
  const { register, handleSubmit, errors } = useForm();

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch({ type: CLEAR_REDIRECT });
    dispatch({ type: CLEAR_MESSAGE });
    dispatch({ type: CLEAR_ERRORS });
  }, [dispatch]);

  const USERNAME_MIN_LENGTH = 3;
  const USERNAME_MAX_LENGTH = 20;
  const PASSWORD_MIN_LENGTH = 8;
  const PASSWORD_MAX_LENGTH = 40;

  const message = useSelector((state) => state.message);
  const auth = useSelector((state) => state.auth);
  const redirect = useSelector((state) => state.redirect);
  const error = useSelector((state) => state.errors);

  if (redirect) {
    return <Redirect to="/" />;
  }
  const onSubmit = async (userData) => {
    const { user } = auth;
    const { token } = user;
    const { password, image, username, email } = userData;

    dispatch(updateUser(token, image, username, email, password));
  };

  const { username, image, email } = auth.user;

  return (
    <form className="form" onSubmit={handleSubmit(onSubmit)}>
      <FormHeader name="Edit Profile" />
      <FormField
        label="Username"
        placeholder="Username"
        register={register({
          required: true,
          minLength: USERNAME_MIN_LENGTH,
          maxLength: USERNAME_MAX_LENGTH,
        })}
        name="username"
        defaultValue={username}
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
        name="email"
        type="email"
        label="Email address"
        placeholder="Email address"
        register={register({
          required: true,
          pattern: /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
        })}
        defaultValue={email}
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
        name="password"
        type="password"
        label="New password"
        placeholder="New password"
        register={register({
          minLength: PASSWORD_MIN_LENGTH,
          maxLength: PASSWORD_MAX_LENGTH,
        })}
        error={errors.password || error.password}
      />
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
        name="image"
        type="url"
        label="Avatar image (url)"
        placeholder="Avatar image"
        defaultValue={image}
        error={errors.image}
        register={register({
          pattern: /((([A-Za-z]{3,9}:(?:\/\/)?)(?:[-;:&=+$,\w]+@)?[A-Za-z0-9.-]+|(?:www\.|[-;:&=+$,\w]+@)[A-Za-z0-9.-]+)((?:\/[+~%/.\w\-_]*)?\??(?:[-+=&;%@.\w_]*)#?(?:[.!/\\\w]*))?)/,
        })}
      />
      {errors.image && errors.image.type === 'pattern' && (
        <FormFieldError error="I am sorry, I cannot accept the field as a url!" />
      )}
      <ButtonSubmit label="Save" className="btn-submit" />
      {message && <FormFieldError error={message} />}
    </form>
  );
}

export default Profile;
