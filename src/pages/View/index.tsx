import { Form } from 'antd'
import Marquee from 'react-fast-marquee'
import 'react-quill/dist/quill.snow.css'
import { useMemo, useState } from 'react'
import { formatPicUrl } from '@/utils/format'
import useMessage from '@/components/MessageContent/useMessage'
import useSpin from '@/components/SpinContent/useSpin'
import '@/styles/font.css'

const View: React.FC = () => {
  const { msg } = useMessage()
  const { toggleSpin } = useSpin()
  const [form] = Form.useForm()
  const [patternName, setPatternName] = useState<string>('')
  const [backgroundId, setBackgroundId] = useState<string>('11')
  const [patternMode, setPatternMode] = useState<string>('notice') //  text
  const [patternContent, setPatternContent] = useState<string>(`亲爱的XX：
遇见你，是我此生最美的意外。你的笑容是我的阳光，你的陪伴是我最深的依赖。未来的路，我想和你一起走，分享每一个平凡与闪耀的时刻。我爱你，用我全部的真心。你愿意嫁给我，让我用余生守护你、疼爱你吗？`)
  const [message, setMessage] = useState<string>(`亲爱的XX：
遇见你，是我此生最美的意外。你的笑容是我的阳光，你的陪伴是我最深的依赖。未来的路，我想和你一起走，分享每一个平凡与闪耀的时刻。我爱你，用我全部的真心。你愿意嫁给我，让我用余生守护你、疼爱你吗？`)

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
      fontFamily:'PingFangJiangNanTi'
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
