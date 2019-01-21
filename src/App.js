// App.js
import React, { Component } from 'react'
import zhCN from 'antd/lib/locale-provider/zh_CN'
import 'antd/dist/antd.css'
import moment from 'moment'
import { Button, LocaleProvider, Modal } from 'antd'
import MyForm, { defaultLabelColSpan } from './components/MyForm'
// formItems即为表单的配置项
import formItems from '././components/FormItem'

// 模拟发请求（在做修改操作时，表单需要先填充已有数据，这里写了个假的获取详情接口）
const a= 3;

class App extends Component {
  constructor(props) {
    super(props);
    this.formRef = React.createRef();
    this.state = {
      visible: false,
    };
  }

  requestDetail = () => {
    return new Promise(resolve => {
      setTimeout(() => {
        resolve({
          Input: 'Input',
          password: 'password',
          Select: 'option2',
          RadioGroup: 'radio2',
          RadioButtonGroup: 'radio2',
          CheckboxGroup: ['checkbox2'],
          DatePicker: '2018-05-15T13:36:27.132Z',
         RangePicker: ['2018-04-15T13:36:27.132Z', '2018-05-15T13:36:27.132Z'],
          TextArea: '123',
          Switch: true,
        })
      }, 500)
    })
  }

  getDetail = () => {
    //this.setState({visible: true})

    this.requestDetail().then(res => {
      // 如果字段的值是日期，要先转成moment格式
      res.DatePicker = moment(res.DatePicker)
      res.RangePicker = res.RangePicker.map(d => moment(d))
      this.formRef.current.setFieldsValue(res)
      this.setState({visible: true})
    })
  }


  addDetail = () => {
    this.setState({visible: true})
  }

  onClickSubmit = () => {
    this.formRef.current.validateFieldsAndScroll((err, values) => {
      console.log(values)
      if (err) {
        return
      }
      console.log('校验通过')
    })
  }

  resetForm = () => {
    this.formRef.current.resetFields();
  }

  handleCancel = () => {
    this.setState({visible: false});
    this.resetForm();
  }

  render() {
    return (
      <LocaleProvider locale={zhCN}>
      <div>
          <Button style={{ margin: 24 }} type="primary" onClick={this.getDetail}>
            编辑
          </Button>
          <Button style={{ margin: 24 }} type="primary" onClick={this.addDetail}>
            添加
          </Button>

          <Modal visible={this.state.visible} onOk={this.onClickSubmit} onCancel={this.handleCancel} forceRender>
            <MyForm ref={this.formRef} items={formItems} />
          </Modal>

          </div>
      </LocaleProvider>
    )
  }
}

export default App
