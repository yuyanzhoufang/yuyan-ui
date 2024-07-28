import React from 'react';
import {Modal, Form, Input, InputNumber, Select} from 'antd';
import UpdateUploadImage from "./updateUploadImage";

export default class FormModal extends React.Component {

  state = {
    options: [
      {label: "初级", value: "初级"},
      {label: "中级", value: "中级"},
      {label: "高级", value: "高级"},
      {label: "特高", value: "特高"},
      {label: "其他", value: "其他"},
    ]
  }

  constructor(props) {
    super(props);
  }

  componentDidMount() {
    // 组件挂载后执行的操作，例如：发起网络请求或者订阅事件

  }

  componentDidUpdate(prevProps, prevState) {
    // 组件更新后执行的操作，例如：状态更新导致的UI更新
  }

  componentWillUnmount() {
    // 组件卸载前执行的操作，例如：清除定时器或取消网络请求
  }

  render() {
    const CustomForm = () => {
      const { handleOk, handleCancel, open, values } = this.props;
      const { options } = this.state;
      const [form] = Form.useForm();
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
          title="厨师信息修改"
          open={open}
          okText="保存"
          onOk={onOk}
          cancelText="返回"
          onCancel={handleCancel}
        >
          <Form form={form} layout="vertical">
            <Form.Item
              name="id"
              label="id"
              rules={[
                {
                  required: true,
                  message: 'id',
                },
              ]}
              initialValue={values !== undefined ? values.id : undefined}
            >
              <Input disabled={true}/>
            </Form.Item>
            <Form.Item
              name="name"
              label="姓名"
              rules={[
                {
                  required: true,
                  message: 'name',
                },
              ]}
              initialValue={values !== undefined ? values.name : undefined}
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
              initialValue={values !== undefined ? values.age : undefined}
            >
              <InputNumber min={0} style={{width: '100%',}}/>
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
              initialValue={values !== undefined ? values.gender === 1 ? "男" : "女" : undefined}
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
              initialValue={values !== undefined ? values.description : undefined}
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
              initialValue={values !== undefined ? values.phone : undefined}
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
              initialValue={values !== undefined ? values.address : undefined}
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
              initialValue={values !== undefined ? values.tags : undefined}
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
              <UpdateUploadImage fileList={[{url: values.url}]}/>
            </Form.Item>
          </Form>
        </Modal>
      )
    }
    return (
      <CustomForm />
    )
  }
};

