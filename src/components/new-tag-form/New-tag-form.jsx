import React from 'react';

import './New-tag-form.scss';

import FormField from '../form-field';
import ButtonLink from '../button-link';

const NewTagForm = ({
  onAdd,
  onDelete,
  register,
  tagId,
  needLabel,
  tag,
  setTag,
  needAddTag,
  isDisabled,
}) => {
  const addTagButton = needAddTag ? (
    <ButtonLink label="Add tag" classModification="info" onClick={onAdd} />
  ) : null;

  return (
    <li className="new-tag-form">
      <FormField
        placeholder="Tag"
        name={`tag-${tagId}`}
        label={needLabel ? 'Tags' : ''}
        defaultValue={tag}
        value={tag}
        onChange={(event) => {
          setTag(tagId, event.target.value);
        }}
        isDisabled={isDisabled}
      />
      <ButtonLink label="Delete" classModification="highlight" onClick={() => onDelete(tagId)} />
      {addTagButton}
    </li>
  );
};

export default NewTagForm;
