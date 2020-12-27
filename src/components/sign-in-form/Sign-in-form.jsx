import { useForm } from 'react-hook-form';
import { useState, useContext } from 'react';
import { Redirect } from 'react-router-dom';

import { BlogServiceContext } from '../blog-service-context';
import { SignedInUserContext } from '../signed-in-user-context';

import './Sign-in-form.scss';
import FormHeader from '../form-header';
import FormField from '../form-field';
import ButtonSubmit from '../button-submit';
import RedirectNote from '../redirect-note';
import FormFieldError from '../form-field-error';

function SignInForm() {
  const blogServiceContext = useContext(BlogServiceContext);
  const { signIn } = blogServiceContext;
  const { register, handleSubmit, errors } = useForm();
  const [error, setError] = useState(null);

  return (
    <SignedInUserContext.Consumer>
      {({ user, setUser }) => {
        if (user) {
          return <Redirect to="/" />;
        }

        const onSubmit = async (userData) => {
          let userToPath = {};
          try {
            const result = await signIn({ user: userData });
            if (result.errors) {
              if (result.errors['email or password']) {
                setError(`email or password ${result.errors['email or password']}`);
              }
            } else {
              setError(null);
              userToPath = await result.user;
              window.localStorage.setItem('user', JSON.stringify(userToPath));
              setUser(userToPath);
            }
          } catch (err) {
            setError(err.message);
          }
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
              error={errors.email}
            />
            {errors.email && errors.email.type === 'required' && (
              <FormFieldError error="This field is required!" />
            )}
            <FormField
              type="password"
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
    </SignedInUserContext.Consumer>
  );
}

export default SignInForm;
