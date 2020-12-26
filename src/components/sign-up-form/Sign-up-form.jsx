import { useState } from 'react';
import { useForm, Controller } from 'react-hook-form';

import { BlogServiceConsumer } from '../blog-service-context';
import { SignedInUserConsumer } from '../signed-in-user-context';

import './Sign-up-form.scss';
import FormHeader from '../form-header';
import FormField from '../form-field';
import Checkbox from '../checkbox';
import ButtonSubmit from '../button-submit';
import RedirectNote from '../redirect-note';
import FormFieldError from '../form-field-error';

function SignUpForm() {
  const { register, handleSubmit, watch, errors, getValues, control } = useForm();
  const [error, setError] = useState(null);

  const USERNAME_MIN_LENGTH = 3;
  const USERNAME_MAX_LENGTH = 20;
  const PASSWORD_MIN_LENGTH = 8;
  const PASSWORD_MAX_LENGTH = 40;

  return (
    <BlogServiceConsumer>
      {({ signUp }) => (
        <SignedInUserConsumer>
          {({ setUser }) => {
            const onSubmit = async (userData) => {
              let user = {};
              try {
                const result = await signUp({ user: userData });
                if (result.errors) {
                  if (result.errors['email']) {
                    setError(`email ${result.errors['email']}`);
                    if (result.errors['username']) {
                      setError(`${error}; username ${result.errors['username']}`);
                    }
                  }
                  if (result.errors['username']) {
                    setError(`username ${result.errors['username']}`);
                  }
                } else {
                  setError(null);
                  user = await result.user;
                  window.localStorage.setItem('user', JSON.stringify(user));
                  setUser(user);
                }
                /* eslint-disable-next-line no-console */
                /* console.log('in signUp in onSubmit: user', user); */
              } catch (err) {
                setError(err.message);
                /* eslint-disable-next-line no-console */
                /* console.log('in signUp in onSubmit: err', err); */
              }
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
                  error={errors.username}
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
                <FormField
                  label="Email address"
                  placeholder="Email address"
                  register={register({
                    required: true,
                    pattern: /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                  })}
                  name="email"
                  error={errors.email}
                />
                {errors.email && errors.email.type === 'required' && (
                  <FormFieldError error="This field is required!" />
                )}
                {errors.email && errors.email.type === 'pattern' && (
                  <FormFieldError error="This field doesn't look like an email address!" />
                )}
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
                  error={errors.password}
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
                <RedirectNote
                  note="Already have an account? "
                  linkText="Sign In"
                  linkReference="/sign-in"
                />
                {error && <FormFieldError error={error} />}
              </form>
            );
          }}
        </SignedInUserConsumer>
      )}
    </BlogServiceConsumer>
  );
}

export default SignUpForm;
