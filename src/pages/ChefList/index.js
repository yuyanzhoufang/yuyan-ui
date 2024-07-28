import React from "react";
import {Table, Image, Button, Space, Row, Col, Form, Input, Select, theme, InputNumber, message, Spin, Tag } from "antd";
import { queryList, deleteById, updateById, addChef } from "@/api/chef";
const { Option } = Select;
import FormModal from "./updateChef"
import AddChefModal from "./addChef";

export default class ChefList extends React.Component {
  state ={
    values: undefined,
    dataSource: [],
    columns: [
      {
        title: 'id',
        dataIndex: 'id',
        key: 'id',
      },
      {
        title: '图片',
        key: 'image',
        dataIndex: 'url',
        render: (image) => <Image width={50} src={image}/>,
      },
      {
        title: '姓名',
        dataIndex: 'name',
        key: 'name',
      },
      {
        title: '年龄',
        dataIndex: 'age',
        key: 'age',
      },
      {
        title: '性別',
        dataIndex: 'gender',
        key: 'gender',
        render: (gender) => (gender === 1 ? <text>男</text> : <text>女</text>)
      },
      {
        title: '描述',
        dataIndex: 'description',
        key: 'description',
      },
      {
        title: '标签',
        dataIndex: 'tags',
        key: 'tags',
        render: (_, { tags }) => (
          <>
            {tags.map((tag) => {
              const map = {
                "初级": "green",
                "中级": "geekblue",
                "高级": "orange",
                "特高": "red",
                "其他": "blue"
              }

              const color = map[tag];
              return (
                <Tag color={color} key={tag}>
                  {tag.toUpperCase()}
                </Tag>
              );
            })}
          </>
        ),
      },
      {
        title: '手机号',
        dataIndex: 'phone',
        key: 'phone',
      },
      {
        title: '住址',
        dataIndex: 'address',
        key: 'address',
      },
      {
        title: '操作',
        width: 150,
        fixed: 'right',
        render: (_, item) => (
          <Space>
            <Button onClick={()=>this.update(item)}>修改</Button>
            <Button onClick={()=>this.delete(item.id)} danger>删除</Button>
          </Space>
        ),
      },
    ],
    spinning: true,
    open: false,
    item: {},
    addOpen: false,
  }

  queryList(params) {
    this.setState({
      spinning: true,
    });
    queryList(params).then((response) => {
      this.setState({
        values: params,
        dataSource: response.result,
        spinning: false,
      })
    }).catch((error) => {
      console.log(error);
    })
  }

  update(item) {
    this.setState({
      item,
      open: true,
    });
  }

  delete(id) {
    deleteById({id}).then((response) => {
      if (response.status && response.result) {
        message.success('删除成功');
      } else {
        message.error(response.msg);
      }
    }).catch((error) => {
      message.error(error);
    })
    setTimeout(()=>{
      const { values } = this.state;
      this.queryList(values);
    }, 500);
  }

  constructor(props) {
    super(props);
    // // 初始化状态
    // this.state = { counter: 0 };
  }

  componentDidMount() {
    // 组件挂载后执行的操作，例如：发起网络请求或者订阅事件
    this.queryList({});
  }

  componentDidUpdate(prevProps, prevState) {
    // 组件更新后执行的操作，例如：状态更新导致的UI更新
  }

  componentWillUnmount() {
    // 组件卸载前执行的操作，例如：清除定时器或取消网络请求
  }

  render() {
    const { values, dataSource , columns, spinning, open, item, addOpen } = this.state;
    const AdvancedSearchForm = () => {
      const { token } = theme.useToken();
      const [form] = Form.useForm();
      const formStyle = {
        maxWidth: 'none',
        background: token.colorFillAlter,
        borderRadius: token.borderRadiusLG,
        padding: 24,
      };
      const getFields = () => {
        const children = [];
        children.push(
          <Col span={4}>
            <Form.Item
              name="id"
              label="id"
              rules={[
                {
                  required: false,
                  message: 'id',
                },
              ]}
              initialValue={values !== undefined ? values.id : undefined}
            >
              <Input />
            </Form.Item>
          </Col>
        );
        children.push(
          <Col span={4}>
            <Form.Item
              name="name"
              label="姓名"
              rules={[
                {
                  required: false,
                  message: 'name',
                },
              ]}
              initialValue={values !== undefined ? values.name : undefined}
            >
              <Input />
            </Form.Item>
          </Col>
        );
        children.push(
          <Col span={4}>
            <Form.Item
              name="minAge"
              label="年龄下限"
              rules={[
                {
                  required: false,
                  message: 'min age',
                },
              ]}
              initialValue={values !== undefined ? values.minAge : undefined}
            >
              <InputNumber min={0} />
            </Form.Item>
          </Col>
        );
        children.push(
          <Col span={4}>
            <Form.Item
              name="maxAge"
              label="年龄上限"
              rules={[
                {
                  required: false,
                  message: 'max age',
                },
              ]}
              initialValue={values !== undefined ? values.maxAge : undefined}
            >
              <InputNumber min={0} />
            </Form.Item>
          </Col>
        );
        children.push(
          <Col span={4}>
            <Form.Item
              name="gender"
              label="性别"
              rules={[
                {
                  required: false,
                  message: 'gender',
                },
              ]}
              initialValue={values !== undefined ? values.gender : undefined}
            >
              <Select>
                <Option value="1">男</Option>
                <Option value="2">女</Option>
              </Select>
            </Form.Item>
          </Col>
        );
        return children;
      };
      const onFinish = (values) => {
        this.queryList(values);
      };
      return (
        <Form form={form} name="advanced_search" style={formStyle} onFinish={onFinish}>
          <Row gutter={24}>{getFields()}</Row>
          <div
            style={{
              textAlign: 'right',
            }}
          >
            <Space size="small">
              <Button type="primary" htmlType="submit">
                查询
              </Button>
              <Button
                onClick={() => {
                  this.setState({
                    values: undefined
                  })
                  form.resetFields();
                }}
              >
                重置
              </Button>
            </Space>
          </div>
        </Form>
      );
    };

    const handleOk = (params) => {
      params.gender = params.gender === '男' ? 1 : 2;
      updateById(params).then((response) => {
        this.setState({
          open: false,
        });
        if (response.status && response.result) {
          message.success("修改成功")
        } else {
          message.error("修改失败" + response.msg);
        }
        setTimeout(() => {
          this.queryList(values)
        }, 500);
      }).catch((error) => {
        message.error(error);
      })
    };

    const handleCancel = () => {
      this.setState({
        open: false
      });
    };

    const addClick = () => {
      this.setState({
        addOpen: true,
      });
    }

    const handleAdd = (params) => {
      addChef(params).then((response) => {
        this.setState({
          addOpen: false,
        });
        if (response.status) {
          message.success("添加成功")
        } else {
          message.error("添加失败" + response.msg);
        }
        setTimeout(() => {
          this.queryList(values)
        }, 500);
      }).catch((error) => {
        message.error(error);
      })
    }

    const cancelAdd = () => {
      this.setState({
        addOpen: false
      });
    };

    return (
      <div>
        <AdvancedSearchForm />
        <Button onClick={addClick} type="primary">添加</Button>
        <Spin spinning={spinning} />
        <Table dataSource={dataSource} columns={columns} />
        <FormModal open={open} handleOk={handleOk} handleCancel={handleCancel} values={item} />
        <AddChefModal open={addOpen} handleOk={handleAdd} handleCancel={cancelAdd} />
      </div>
    );
  }
}
