import {
  ConfigProvider,
  Spin,
  ThemeConfig,
} from 'antd'
import { RouterProvider } from 'react-router-dom'
import zh from 'antd/locale/zh_HK'
import router from './router'
import { Suspense } from 'react'

const theme: ThemeConfig = {
  token: {
    // 修改主題色
    colorPrimary: '#DEC37A',
  },
  components: {
    Layout: {
      headerBg: '#DEC37A',
      bodyBg: '#f8f8f8',
    },
    Input: {
      // 修改表單焦點邊框顔色
      activeBorderColor: '#DEC37A',
    },
    Breadcrumb: {
      colorText: '#DEC37A',
      linkColor: '#232323',
      itemColor: '#232323',
      separatorColor: '#232323',
      iconFontSize: 16,
      fontSize: 18,
    },
    Button: {
      colorLink: '#DEC37A',
      colorLinkActive: '#DEC37A',
      colorLinkHover: '#DEC37A',
    },
    Descriptions: {
      labelBg: '#EEF3FA',
      colorSplit: '#E4E5E7',
      borderRadiusLG: 0,
    },
    List: {
      // headerBg: '#DEC37A',
    },
    Tabs: {
      cardBg: '#fff',
    },
    Segmented: {
      itemSelectedBg: '#F8E49D',
      itemSelectedColor: '#23221E'
    },
  },
}

function App() {
  return (
    <ConfigProvider theme={theme} locale={zh}>
      <Suspense fallback={<Spin fullscreen></Spin>}>
        <RouterProvider router={router}></RouterProvider>
      </Suspense>
    </ConfigProvider>
  )
}

export default App
