import { useForm } from 'react-hook-form';

import { BlogServiceConsumer } from '../blog-service-context';
import { SignedInUserConsumer } from '../signed-in-user-context';

import './Profile.scss';
import FormHeader from '../form-header';
import FormField from '../form-field';
import ButtonSubmit from '../button-submit';
import FormFieldError from '../form-field-error';

function Profile() {
  const { register, handleSubmit, watch, errors, getValues, control } = useForm();

  const USERNAME_MIN_LENGTH = 3;
  const USERNAME_MAX_LENGTH = 20;
  const PASSWORD_MIN_LENGTH = 8;
  const PASSWORD_MAX_LENGTH = 40;

  return (
    <BlogServiceConsumer>
      {({ updateUser }) => (
        <SignedInUserConsumer>
          {({ user, setUser }) => {
            const onSubmit = async (userData) => {
              const { token } = user;
              const { password, image, username } = userData;
              const userNew = {
                image,
                username,
                email,
              };

              if (password !== '') {
                userNew.password = password;
              }

              const result = await updateUser(token, { user: userNew });
              const newUser = await result.user;
              /* eslint-disable-next-line no-console */
              console.log('in handleSubmit: newUser', newUser);
              window.localStorage.setItem('user', JSON.stringify(newUser));
              setUser(newUser);
            };

            const { username, image, email } = user;

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
                  name="email"
                  label="Email address"
                  placeholder="Email address"
                  register={register({
                    required: true,
                    pattern: /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                  })}
                  defaultValue={email}
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
                  label="New password"
                  placeholder="New password"
                  register={register({
                    minLength: PASSWORD_MIN_LENGTH,
                    maxLength: PASSWORD_MAX_LENGTH,
                  })}
                  error={errors.password}
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
                <FormField
                  name="image"
                  label="Avatar image (url)"
                  placeholder="Avatar image"
                  register={register({
                    pattern: /((([A-Za-z]{3,9}:(?:\/\/)?)(?:[\-;:&=\+\$,\w]+@)?[A-Za-z0-9\.\-]+|(?:www\.|[\-;:&=\+\$,\w]+@)[A-Za-z0-9\.\-]+)((?:\/[\+~%\/\.\w\-_]*)?\??(?:[\-\+=&;%@\.\w_]*)#?(?:[\.\!\/\\\w]*))?)/,
                  })}
                  defaultValue={image}
                  error={errors.image}
                />
                {errors.image && errors.image.type === 'pattern' && (
                  <FormFieldError error="This field doesn't look like a correct url!" />
                )}
                <ButtonSubmit label="Save" className="btn-submit" />
              </form>
            );
          }}
        </SignedInUserConsumer>
      )}
    </BlogServiceConsumer>
  );
}

export default Profile;
