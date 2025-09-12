import useMessage from '@/components/MessageContent/useMessage'
import useSpin from '@/components/SpinContent/useSpin'
import { Image, Button, Divider, Form, Input, Typography } from 'antd'
import { useNavigate } from 'react-router'
import LoginAPI from '@/apis/LoginAPI'

const PhoneVerification = () => {
  const navigate = useNavigate()
  const [form] = Form.useForm()
  const { msg } = useMessage()
  const { toggleSpin } = useSpin()

  const onSubmit = async () => {
    toggleSpin(true)
    try {
      const values = form.getFieldsValue()
      await LoginAPI.login(values)
      msg.success('登录成功')
      navigate('/home')
    } catch (error) {
      msg.$error(error)
    } finally {
      toggleSpin(false)
    }
  }

  const account = Form.useWatch('account', form)
  const password = Form.useWatch('password', form)

  return (
    <div
      style={{
        backgroundColor: '#FEFAEF',
        height: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <div
        style={{
          width: 500,
          margin: '200px auto',
        }}
      >
        <Image src="@/assets/images/ring.png" alt="logo" style={{ width: 228, height: 365 }} />
        <Typography.Title style={{ textAlign: 'center' }} level={2}>
          欢迎登录管理系统
        </Typography.Title>
        <Divider></Divider>
        <Form labelCol={{ span: 6 }} form={form} onFinish={onSubmit}>
          <Form.Item
            name={'account'}
            label="账号"
            rules={[{ required: true, message: '请输入账号' }]}
          >
            <Input></Input>
          </Form.Item>
          <Form.Item
            name={'password'}
            label="密码"
            rules={[{ required: true, message: '请输入密码' }]}
          >
            <Input></Input>
          </Form.Item>
          <Form.Item label={null}>
            <Button
              className='w-full'
              type="primary"
              htmlType="submit"
              disabled={!account || !password}
            >
              登入
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  )
}
export default PhoneVerification
