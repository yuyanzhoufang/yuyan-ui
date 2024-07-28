import React from "react";
import { Form, Input, InputNumber, Modal, Select } from "antd";
import UploadImage from "./uploadImage";

export default class AddChefModal extends React.Component {

  state = {
    options: [
      {label: "初级", value: "初级"},
      {label: "中级", value: "中级"},
      {label: "高级", value: "高级"},
      {label: "特高", value: "特高"},
      {label: "其他", value: "其他"},
    ]
  }

  render() {
    const CustomForm = () => {
      const { handleOk, handleCancel, open } = this.props;
      const [form] = Form.useForm();
      const { options, values } = this.state;
      const onOk = () => {
        form
          .validateFields()
          .then(values => {
            handleOk(values)
          })
          .catch(info => {
            console.log('Validate Failed:', info);
          });
      };
      return (
        <Modal
          title="添加厨师"
          open={open}
          okText="添加"
          onOk={onOk}
          cancelText="返回"
          onCancel={handleCancel}
        >
          <Form form={form} layout="vertical">
            <Form.Item
              name="name"
              label="姓名"
              rules={[
                {
                  required: true,
                  message: 'name',
                },
              ]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              name="age"
              label="年龄"
              rules={[
                {
                  required: true,
                  message: 'age',
                },
              ]}
            >
              <InputNumber min={0} style={{ width: '100%' }}/>
            </Form.Item>
            <Form.Item
              name="gender"
              label="性别"
              rules={[
                {
                  required: true,
                  message: 'gender',
                },
              ]}
            >
              <Select>
                <Select.Option value="1">男</Select.Option>
                <Select.Option value="2">女</Select.Option>
              </Select>
            </Form.Item>
            <Form.Item
              name="description"
              label="描述"
              rules={[
                {
                  required: true,
                  message: 'description',
                },
              ]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              name="phone"
              label="手机号"
              rules={[
                {
                  required: true,
                  message: 'phone',
                },
              ]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              name="address"
              label="地址"
              rules={[
                {
                  required: true,
                  message: 'address',
                },
              ]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              name="tags"
              label="标签"
              rules={[
                {
                  required: true,
                  message: 'tags',
                },
              ]}
            >
              <Select
                mode="multiple"
                allowClear
                style={{
                  width: '100%',
                }}
                placeholder="请选择"
                options={options}
              />
            </Form.Item>
            <Form.Item
              name="url"
              label="照片"
              rules={[
                {
                  required: true,
                  message: 'url',
                },
              ]}
            >
              <UploadImage />
            </Form.Item>
          </Form>
        </Modal>
      )
    }
    return (
      <CustomForm />
    )
  }

}
