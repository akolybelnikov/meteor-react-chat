import React from "react";
import Dots from './SVG/three-dots'

export default props => {
  const { username } = props;
  return (
    <div className="indicator">
        <p className="tag is-info typing-tag">
          <span style={{marginRight: '5px'}}>{username} is typing</span><span><Dots /></span>
        </p>
    </div>
  );ˀ
};