import { Form } from 'antd'
import Marquee from 'react-fast-marquee'
import 'react-quill/dist/quill.snow.css'
import { useMemo, useState } from 'react'
import { formatPicUrl } from '@/utils/format'
import useMessage from '@/components/MessageContent/useMessage'
import useSpin from '@/components/SpinContent/useSpin'

const View: React.FC = () => {
  const { msg } = useMessage()
  const { toggleSpin } = useSpin()
  const [form] = Form.useForm()
  const [patternName, setPatternName] = useState<string>('')
  const [backgroundId, setBackgroundId] = useState<string>('11')
  const [patternMode, setPatternMode] = useState<string>('text')
  const [patternContent, setPatternContent] = useState<string>('')
  const [message, setMessage] = useState<string>('')

  const phoneStyle = useMemo(() => {
    return {
      backgroundImage: `url(${formatPicUrl(backgroundId)})`,
      backgroundSize: 'cover',
      width: '100%',
      height: '100%',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
    }
  }, [backgroundId])

  return (
    <div className="phone-preview absolute" style={phoneStyle}>
      {patternMode === 'text' ? (
        <div
          dangerouslySetInnerHTML={{ __html: message }}
          className="absolute"
          style={{
            padding: '16px',
            height: '70%',
            width: '100%',
            top: '15%',
            left: '0',
            wordWrap: 'break-word',
          }}
        ></div>
      ) : (
        <Marquee
          style={{
            padding: '16px',
            top: '50%',
            transform: 'translateY(-50%)',
            left: '0',
            position: 'absolute',
          }}
        >
          <p
            style={{
              fontSize: '36px',
              color: '#333',
            }}
          >
            {patternContent}
          </p>
        </Marquee>
      )}
    </div>
  )
}

export default View
