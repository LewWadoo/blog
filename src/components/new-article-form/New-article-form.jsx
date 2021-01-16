import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { Redirect } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import './New-article-form.scss';
import FormHeader from '../form-header';
import FormField from '../form-field';
import ButtonSubmit from '../button-submit';
import FormFieldError from '../form-field-error';
import FormFieldTextarea from '../form-field-textarea';
import NewTagForm from '../new-tag-form';
import { createArticle, updateArticle } from '../../actions/articles';
import { CLEAR_REDIRECT, CLEAR_MESSAGE } from '../../actions/action-types.js';

function NewArticleForm({ match }) {
  let slug = match ? match.params.slug : null;
  let isEnoughEmptyTags = false;
  let noMoreNewTagForms = false;

  const { register, handleSubmit, errors } = useForm();
  const message = useSelector((state) => state.message);
  const article = useSelector((state) => state.article);
  const auth = useSelector((state) => state.auth);
  const redirect = useSelector((state) => state.redirect);
  const doesOwnArticle =
    article && auth && auth.user && article.author.username === auth.user.username;
  const [tags, setTags] = useState(article && doesOwnArticle ? article.tagList : ['']);
  const [tagIds, setTagIds] = useState(
    tags && tags.length > 0 ? tags.map((tag, index) => index) : [0],
  );

  const dispatch = useDispatch();

  const addTagForm = () => {
    window.id += 1;
    setTagIds([...tagIds, window.id]);
    setTags([...tags.slice(0, tags.length), '']);
  };

  const findIndexById = (id) => {
    return tagIds.findIndex((tagId) => tagId === id);
  };

  const onDelete = (id) => {
    const index = findIndexById(id);
    if (index === -1) return;

    if (tagIds.length === 1) {
      setTags(['']);
      setTagIds([0]);
    } else {
      setTagIds([...tagIds.slice(0, index), ...tagIds.slice(index + 1)]);
      setTags([...tags.slice(0, index), ...tags.slice(index + 1)]);
    }
  };

  const getTag = (id) => {
    const index = findIndexById(id);
    return tags[index];
  };

  const setTag = (id, tag) => {
    if (tag && tag.trim() === '') {
      return;
    }

    const index = findIndexById(id);

    setTags([...tags.slice(0, index), tag, ...tags.slice(index + 1)]);
  };

  const newTagForm = (id, index, isDisabled) => {
    return (
      <NewTagForm
        onAdd={addTagForm}
        onDelete={onDelete}
        register={register}
        tagId={id}
        needLabel={index === 0}
        tag={getTag(id)}
        setTag={setTag}
        key={id}
        needAddTag={index === tags.length - 1}
        isDisabled={isDisabled}
      />
    );
  };

  useEffect(() => {
    dispatch({ type: CLEAR_REDIRECT });
    dispatch({ type: CLEAR_MESSAGE });
    window.id = 0;
  }, [dispatch]);

  if (redirect) {
    return <Redirect to="/" />;
  }

  const create = async (articleData) => {
    const { title, description, body } = articleData;
    const { token } = auth.user;
    dispatch(createArticle(token, title, description, body, tags));
  };

  const update = async (articleData) => {
    const { title, description, body } = articleData;
    const { token } = auth.user;
    dispatch(updateArticle(token, title, description, body, tags, slug));
  };

  const onSubmit = async (articleData) => {
    if (slug) {
      update(articleData);
    } else {
      create(articleData);
    }
  };

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
        defaultValue={article && doesOwnArticle ? article.title : ''}
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
        defaultValue={article && doesOwnArticle ? article.description : ''}
      />
      <FormFieldTextarea
        label="Text"
        placeholder="Text"
        register={register({
          required: true,
        })}
        name="body"
        error={errors.body}
        defaultValue={article && doesOwnArticle ? article.body : ''}
      />
      {errors.body && errors.body.type === 'required' && (
        <FormFieldError error="This field is required!" />
      )}
      <ul>
        {tagIds.map((id, index) => {
          if (noMoreNewTagForms || typeof tags[index] === 'undefined') {
            return null;
          } else {
            if (!isEnoughEmptyTags && tags[index].trim() === '') {
              isEnoughEmptyTags = true;
            } else {
              if (isEnoughEmptyTags && tags[index].trim() === '') {
                onDelete(id);
                noMoreNewTagForms = true;

                return null;
              }
            }
          }
          return newTagForm(id, index, index < tagIds.length - 1);
        })}
      </ul>
      <ButtonSubmit label="Send" classMod="sm" />
      {message && <FormFieldError error={message} />}
    </form>
  );
}

export default NewArticleForm;
