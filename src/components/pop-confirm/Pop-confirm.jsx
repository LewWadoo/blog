import { useEffect } from 'react';

import './Pop-confirm.scss';
import attention from './attention.png';
import arrow from './arrow.svg';

import Button from '../button';

function PopConfirm({ onAccept, onReject }) {
  return (
    <div className="pop-confirm-container">
      <img alt="arrow" src={arrow} className="arrow" />
      <div className="question">
        <img alt="attention" src={attention} className="attention" />
        <p>Are you sure to delete this article?</p>
      </div>
      <div className="buttons">
        <Button label="No" onClick={onReject} isFocused={false} />
        <Button label="Yes" onClick={onAccept} isFocused={true} />
      </div>
    </div>
  );
}

export default PopConfirm;
