import React, { Component } from "react";

import "./ImageUploadPreviewStyles.scss";

class ImageUploadPreview extends Component {
  fileObj = [];
  fileArray = [];

  constructor(props) {
    super(props);
    this.state = {
      file: [null],
    };
    this.uploadMultipleFiles = this.uploadMultipleFiles.bind(this);
    // this.uploadFiles = this.uploadFiles.bind(this);
  }

  uploadMultipleFiles(e) {
    this.fileObj.push(e.target.files);
    for (let i = 0; i < this.fileObj[0].length; i++) {
      this.fileArray.push(URL.createObjectURL(this.fileObj[0][i]));
    }
    this.setState({ file: this.fileArray });
  }

  //   uploadFiles(e) {
  //     e.preventDefault();
  //     console.log(this.state.file);
  //   }

  render() {
    return (
      <form>
        <div className="preview">
          {(this.fileArray || []).map((url) => (
            <img src={url} alt="..." className="preview-image" />
          ))}
        </div>

        <div className="form-group">
          <input
            type="file"
            className="input-file"
            onChange={this.uploadMultipleFiles}
            multiple
            id="file"
          />
          <label className="btn__upload-image" for="file" />
        </div>
        {/* <button
          type="button"
          className="btn btn-danger btn-block"
          onClick={this.uploadFiles}
        >
          Upload
        </button> */}
      </form>
    );
  }
}

export default ImageUploadPreview;
