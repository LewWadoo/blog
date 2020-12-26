import React, { useState } from 'react';

import './New-tag-form.scss';

import FormField from '../form-field';
import ButtonLink from '../button-link';

const NewTagForm = ({ onAdd, onDelete, register, tagId, needLabel, tag, setTag }) => {
  // const [value, setValue] = useState();

  return (
    <li className="new-tag-form">
      <FormField
        /* register={register({ */
        /*   required: false, */
        /* })} */
        placeholder="Tag"
        name={`tag-${tagId}`}
        label={needLabel ? 'Tags' : ''}
        defaultValue={tag}
        value={tag}
        onChange={(event) => {
          // eslint-disable-next-line no-console
          console.log(
            'in onChange: tagId, event, event.target.value',
            tagId,
            event,
            event.target.value,
          );
          setTag(tagId, event.target.value);
        }}
      />
      <ButtonLink label="Delete" classModification="highlight" onClick={() => onDelete(tagId)} />
      <ButtonLink label="Add tag" classModification="info" onClick={onAdd} />
      {/* <input type="submit" className="btn-link btn-link--info" value="Add tag"/> */}
      {/* <input type="submit" className="submit-button" /> */}
    </li>
  );
};

export default NewTagForm;
