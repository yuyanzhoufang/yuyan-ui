import React from 'react';
import { PlusOutlined } from '@ant-design/icons';
import { Image, Upload } from 'antd';
import {split} from "lodash";
import {removeImage} from "@/api/chef";

export default class UploadImage extends React.Component {
  state = {
    previewOpen: false,
    previewImage: '',
    fileList: [],
  };

  render() {
    const { previewOpen, previewImage, fileList } = this.state;
    const getBase64 = (file) =>
      new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result);
        reader.onerror = (error) => reject(error);
      });

    const handlePreview = async (file) => {
      console.log(file.response.result);
      if (!file.url && !file.preview) {
        file.preview = await getBase64(file.originFileObj);
      }
      this.setState({
        previewImage: file.url || file.preview,
        previewOpen: true,
      })
    };
    const handleRemove = async (file) => {
      const arr = split(file.response.result, '/')
      const name = arr[arr.length - 1];
      const params = {
        name,
      }
      removeImage(params);
    };
    const onChange = ({fileList: newFileList}) => {
      this.setState({
        fileList: newFileList
      });
      if (newFileList[0] && newFileList[0].status && newFileList[0].status === 'done') {
        this.props.onChange(newFileList[0].response['result']);
      }
    };
    const uploadButton = (
      <button
        style={{
          border: 0,
          background: 'none',
        }}
        type="button"
      >
        <PlusOutlined/>
        <div
          style={{
            marginTop: 8,
          }}
        >
          Upload
        </div>
      </button>
    );
    return (
      <>
        <Upload
          action="http://127.0.0.1:8080/api/image/upload"
          listType="picture-card"
          fileList={fileList}
          onPreview={handlePreview}
          onRemove={handleRemove}
          onChange={onChange}
        >
          {fileList.length >= 1 ? null : uploadButton}
        </Upload>
        {previewImage && (
          <Image
            wrapperStyle={{
              display: 'none',
            }}
            preview={{
              visible: previewOpen,
              onVisibleChange: (visible) => this.setState({
                visible
              }),
              afterOpenChange: (visible) => !visible && this.setState({previewImage: ''}),
            }}
            src={previewImage}
          />
        )}
      </>
    );
  }
};
