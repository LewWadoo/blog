import { useForm } from 'react-hook-form';
import { useContext } from 'react';

import { BlogServiceContext } from '../blog-service-context';
import { SignedInUserContext } from '../signed-in-user-context';

import FormHeader from '../form-header';
import FormField from '../form-field';
import ButtonSubmit from '../button-submit';
import FormFieldError from '../form-field-error';

function Profile() {
  const blogServiceContext = useContext(BlogServiceContext);
  const { updateUser } = blogServiceContext;
  const { register, handleSubmit, errors } = useForm();

  const USERNAME_MIN_LENGTH = 3;
  const USERNAME_MAX_LENGTH = 20;
  const PASSWORD_MIN_LENGTH = 8;
  const PASSWORD_MAX_LENGTH = 40;

  return (
    <SignedInUserContext.Consumer>
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
              type="email"
              label="Email address"
              placeholder="Email address"
              register={register({
                required: true,
              })}
              defaultValue={email}
              error={errors.email}
            />
            {errors.email && errors.email.type === 'required' && (
              <FormFieldError error="This field is required!" />
            )}
            <FormField
              name="password"
              type="password"
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
              type="url"
              label="Avatar image (url)"
              placeholder="Avatar image"
              register={register({})}
              defaultValue={image}
              error={errors.image}
            />
            <ButtonSubmit label="Save" className="btn-submit" />
          </form>
        );
      }}
    </SignedInUserContext.Consumer>
  );
}

export default Profile;
