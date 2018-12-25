import React from "react";

export default ({name}) => {
  return (
  <figure className={name}>
    <p className="image is-64x64">
      <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGQAAABkCAYAAABw4pVUAAAAnklEQVR42u3RQREAAAQAMIJ5yqW6Gs5tFZbVNcEZKUQIQoQgRAhChCBEiBAhCBGCECEIEYIQIQhBiBCECEGIEIQIQQhChCBECEKEIEQIQhAiBCFCECIEIUIQghAhCBGCECEIEYIQhAhBiBCECEGIEIQgRAhChCBECEKEIAQhQhAiBCFCECIEIQgRghAhCBGCECEIESJECEKEIEQIQr5bjMB8nahrFBcAAAAASUVORK5CYII=" />
    </p>
  </figure>
)};
