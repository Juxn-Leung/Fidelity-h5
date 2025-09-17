import { Form } from 'antd'
import Marquee from 'react-fast-marquee'
import 'react-quill/dist/quill.snow.css'
import { useEffect, useMemo, useState } from 'react'
import { formatPicUrl } from '@/utils/format'
import useMessage from '@/components/MessageContent/useMessage'
import useSpin from '@/components/SpinContent/useSpin'
import horizontal from '@/assets/images/horizontal.png'
import vertical from '@/assets/images/vertical.png'
import fidelity from '@/assets/images/fidelity.png'
import '@/styles/font.css'

const View: React.FC = () => {
  const { msg } = useMessage()
  const { toggleSpin } = useSpin()
  const [form] = Form.useForm()

  const [phoneType, setPhoneType] = useState<string>('horizontal') // horizontal vertical

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
      fontFamily: 'PingFangJiangNanTi',
    }
  }, [backgroundId])

  const [orientation, setOrientation] = useState<"portrait" | "landscape">(
    window.matchMedia("(orientation: portrait)").matches
      ? "portrait"
      : "landscape"
  );

  useEffect(() => {
    // 監聽 orientationchange（大部分瀏覽器支援）
    const handleOrientationChange = () => {
      if (window.matchMedia("(orientation: portrait)").matches) {
        setOrientation("portrait");
      } else {
        setOrientation("landscape");
      }
    };

    // 監聽螢幕方向改變
    window.addEventListener("orientationchange", handleOrientationChange);

    // 附加方案：監聽 deviceorientation（角度更精確）
    const handleDeviceOrientation = (e: DeviceOrientationEvent) => {
      const { beta, gamma } = e;
      if (beta !== null && gamma !== null) {
        // 簡單判斷：手機橫過來
        if (Math.abs(gamma) > 45) {
          setOrientation("landscape");
        } else {
          setOrientation("portrait");
        }
      }
    };
    window.addEventListener("deviceorientation", handleDeviceOrientation);

    return () => {
      window.removeEventListener("orientationchange", handleOrientationChange);
      window.removeEventListener("deviceorientation", handleDeviceOrientation);
    };
  }, []);

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
            transform:
              phoneType === 'horizontal' ? 'rotate(0deg)' : 'rotate(90deg)',
          }}
        ></div>
      ) : (
        <div
          style={{
            height: '100vh',
            width: '100vw',
          }}
        >
          {phoneType === 'horizontal' ? <Marquee
            style={{
              
              padding: '16px',
              top: '50%',
              transform: 'translateY(-50%)',
              left: '0',
              position: 'absolute',
              // writingMode: 'vertical-rl',
              // textOrientation: 'mixed'
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
          </Marquee> :
          <marquee 
            direction="up"
            loop={-1}
            style={{
              width: '80px',
              height: '100%',
              left: '50%',
              transform: 'translateX(-50%)',
              position: 'absolute',
            }}
          >
            <p
              style={{
                width: 'max-content',
                height: 'max-content',
                fontSize: '36px',
                color: '#333',
                display: 'inline-block',
                writingMode: 'vertical-rl',
                textOrientation: 'sideways', // 直排，想讓中文「像英文一樣橫過來」
                whiteSpace: 'nowrap',
              }}
            >
              {patternContent}
            </p>
          </marquee>}
        </div>
      )}

      <div
        className="absolute bottom-2 left-2 w-8 h-8"
        onClick={() =>
          setPhoneType(phoneType === 'horizontal' ? 'vertical' : 'horizontal')
        }
      >
        <img src={phoneType === 'horizontal' ? vertical : horizontal} />
      </div>

      <div className="absolute top-1 left-1">
        <img src={fidelity} className="w-10" />
      </div>
      <div className="absolute bottom-1 right-1">
        <img src={fidelity} className="w-10" />
      </div>
    </div>
  )
}

export default View
