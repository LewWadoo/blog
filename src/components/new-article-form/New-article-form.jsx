import { useState, useEffect, useContext } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { Redirect } from 'react-router-dom';

import { BlogServiceConsumer } from '../blog-service-context';
import { SignedInUserConsumer } from '../signed-in-user-context';

import './New-article-form.scss';
import FormHeader from '../form-header';
import FormField from '../form-field';
import ButtonSubmit from '../button-submit';
import FormFieldError from '../form-field-error';
import FormFieldTextarea from '../form-field-textarea';
import NewTagForm from '../new-tag-form';

function NewArticleForm({ match }) {
  const slug = match ? match.params.slug : null;
  const blogServiceConsumer = useContext(BlogServiceConsumer);

  const { register, handleSubmit, watch, errors, getValues, control } = useForm();
  const [error, setError] = useState(null);
  const [tags, setTags] = useState([]);

  const addTagForm = () => {
    window.id += 1;
    setTagIds([...tagIds, window.id + 1]);
  };

  const findIndexById = (id) => {
    return tagIds.findIndex((tagId) => tagId === id);
  };

  const onDelete = (id) => {
    const index = findIndexById(id);
    if (index === -1) return;
    setTagIds([...tagIds.slice(0, index), ...tagIds.slice(index + 1)]);
    setTags([...tags.slice(0, index), ...tags.slice(index + 1)]);
  };

  const getTag = (id) => {
    const index = findIndexById(id);
    return tags[index];
  };

  const setTag = (id, tag) => {
    const index = findIndexById(id);

    setTags([...tags.slice(0, index), tag, ...tags.slice(index + 1)]);
  };

  const newTagForm = (id, needLabel) => {
    return (
      <NewTagForm
        onAdd={addTagForm}
        onDelete={onDelete}
        register={register}
        tagId={id}
        needLabel={needLabel}
        tag={getTag(id)}
        setTag={setTag}
        key={id}
      />
    );
  };

  const [tagIds, setTagIds] = useState([1]);
  const [isSubmitted, setSubmitted] = useState(false);
  const [post, setPost] = useState({});

  useEffect(() => {
    window.id = 0;
    // eslint-disable-next-line no-console
    // console.log('in NewArticleForm: slug', slug);
    const { fetchArticle } = blogServiceConsumer;
    if (slug) {
      fetchArticle(slug)
        .then((result) => {
          setPost(result.article);
          const { tagList } = result.article;
          if (tagList) {
            setTags(tagList);
            setTagIds(tagList.map((tag, index) => index));
          }
          return result;
        })
        .catch((error) => {
          setError(error.message);
        });
    }
  }, []);

  if (isSubmitted) {
    return <Redirect to="/" />;
  } else {
    return (
      <BlogServiceConsumer>
        {({ createArticle, updateArticle }) => (
          <SignedInUserConsumer>
            {({ user }) => {
              const create = async (articleData) => {
                const { token } = user;
                let article = {};
                /* eslint-disable-next-line no-console */
                /* console.log('in onSubmit: articleData', articleData); */
                try {
                  const result = await createArticle(token, {
                    article: { ...articleData, tagList: tags },
                  });
                  if (result.errors) {
                    setError(`${result.errors}`);
                  } else {
                    setError(null);
                    article = await result.article;
                  }
                } catch (err) {
                  setError(err.message);
                  /*   /\* eslint-disable-next-line no-console *\/ */
                  console.log('in createArticle in onSubmit: err', err);
                  return false;
                }

                return true;
              };

              const update = async (articleData) => {
                const { token } = user;
                /* let article = {}; */
                /* eslint-disable-next-line no-console */
                /* console.log('in onSubmit: articleData', articleData); */
                try {
                  const result = await updateArticle(token, { article: { ...articleData } }, slug);
                  if (result.errors) {
                    setError(`${result.errors}`);
                  } else {
                    setError(null);
                    /* article = await result.article; */
                  }
                } catch (err) {
                  setError(err.message);
                  /*   /\* eslint-disable-next-line no-console *\/ */
                  /* console.log('in updateArticle in onSubmit: err', err); */
                  return false;
                }

                return true;
              };

              const onSubmit = async (articleData) => {
                /* eslint-disable-next-line no-debugger */
                /* debugger; */
                let result;
                if (slug) {
                  result = await update(articleData);
                } else {
                  result = await create(articleData);
                }

                if (result) {
                  setSubmitted(true);
                }
              };

              const { title, description, body } = post;

              return (
                <form className="form" onSubmit={handleSubmit(onSubmit)}>
                  <FormHeader name={slug ? 'Edit article' : 'Create new article'} />
                  <FormField
                    label="Title"
                    placeholder="Title"
                    register={register({
                      required: true,
                    })}
                    name="title"
                    error={errors.title}
                    defaultValue={title}
                  />
                  {errors.title && errors.title.type === 'required' && (
                    <FormFieldError error="This field is required!" />
                  )}
                  <FormField
                    label="Short description"
                    placeholder="Short description"
                    register={register({
                      required: true,
                    })}
                    name="description"
                    error={errors.description}
                    defaultValue={description}
                  />
                  <FormFieldTextarea
                    label="Text"
                    placeholder="Text"
                    register={register({
                      required: true,
                    })}
                    name="body"
                    error={errors.body}
                    defaultValue={body}
                  />
                  {errors.body && errors.body.type === 'required' && (
                    <FormFieldError error="This field is required!" />
                  )}
                  <ul>{tagIds.map((id, index) => newTagForm(id, index === 0))}</ul>
                  <ButtonSubmit label="Send" />
                  {error && <FormFieldError error={error} />}
                </form>
              );
            }}
          </SignedInUserConsumer>
        )}
      </BlogServiceConsumer>
    );
  }
}

export default NewArticleForm;
