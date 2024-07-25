import React from "react";
import {Table, Image, Button, Space} from "antd";
import { queryList } from "@/api/chef";

export default class ChefList extends React.Component {
  state ={
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
        title: 'Action',
        width: 150,
        fixed: 'right',
        render: (_, item) => (
          <Space>
            <Button onClick={()=>this.queryChefDetail(item.id)}>详情</Button>
            <Button onClick={()=>this.delete(item.id)} danger>删除</Button>
          </Space>
        ),
      },
    ]
  }

  queryChefDetail(id) {
    console.log(id);
  }

  delete(id) {
    console.log(id);
  }

  constructor(props) {
    super(props);
    // // 初始化状态
    // this.state = { counter: 0 };
  }

  componentDidMount() {
    // 组件挂载后执行的操作，例如：发起网络请求或者订阅事件
    queryList({}).then((response) => {
      console.log(response);
      this.setState({
        dataSource: response.result,
      })
    }).catch((error) => {
      console.log(error);
    })

  }

  componentDidUpdate(prevProps, prevState) {
    // 组件更新后执行的操作，例如：状态更新导致的UI更新
  }

  componentWillUnmount() {
    // 组件卸载前执行的操作，例如：清除定时器或取消网络请求
  }

  render() {
    const { dataSource , columns} = this.state;
    return <Table dataSource={dataSource} columns={columns} />;
  }
}
