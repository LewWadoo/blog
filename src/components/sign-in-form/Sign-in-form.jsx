import { useForm, Controller } from 'react-hook-form';
import { useState } from 'react';

import { BlogServiceConsumer } from '../blog-service-context';
import { SignedInUserConsumer } from '../signed-in-user-context';

import './Sign-in-form.scss';
import FormHeader from '../form-header';
import FormField from '../form-field';
import ButtonSubmit from '../button-submit';
import RedirectNote from '../redirect-note';
import FormFieldError from '../form-field-error';

function SignInForm() {
  const { register, handleSubmit, watch, errors, getValues, control } = useForm();
  const [error, setError] = useState(null);

  return (
    <BlogServiceConsumer>
      {({ signIn }) => (
        <SignedInUserConsumer>
          {({ setUser }) => {
            const onSubmit = async (userData) => {
              let user = {};
              try {
                const result = await signIn({ user: userData });
                if (result.errors) {
                  if (result.errors['email or password']) {
                    setError(`email or password ${result.errors['email or password']}`);
                  }
                } else {
                  setError(null);
                  user = await result.user;
                  window.localStorage.setItem('user', JSON.stringify(user));
                  setUser(user);
                }
                /* eslint-disable-next-line no-console */
                console.log('in signIn in onSubmit: user', user);
              } catch (err) {
                setError(err.message);
                /* eslint-disable-next-line no-console */
                console.log('in signIn in onSubmit: err', err);
              }
            };

            return (
              <form className="form" onSubmit={handleSubmit(onSubmit)}>
                <FormHeader name="Sign In" />
                <FormField
                  name="email"
                  label="Email address"
                  placeholder="Email address"
                  register={register({
                    required: true,
                    pattern: /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                  })}
                  error={errors.email}
                />
                {errors.email && errors.email.type === 'required' && (
                  <FormFieldError error="This field is required!" />
                )}
                {errors.email && errors.email.type === 'pattern' && (
                  <FormFieldError error="This field doesn't look like an email address!" />
                )}
                <FormField
                  name="password"
                  label="Password"
                  placeholder="Password"
                  register={register({ required: true })}
                  error={errors.password}
                />
                {errors.password && errors.password.type === 'required' && (
                  <FormFieldError error="This field is required!" />
                )}
                <ButtonSubmit label="Login" className="btn-submit" />
                <RedirectNote
                  note="Don’t have an account? "
                  linkText="Sign Up"
                  linkReference="/sign-up"
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

export default SignInForm;
