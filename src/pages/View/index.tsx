import Marquee from 'react-fast-marquee'
import 'react-quill/dist/quill.snow.css'
import { useEffect, useMemo, useState } from 'react'
import { useParams } from 'react-router'
import { formatPicUrl } from '@/utils/format'
import useMessage from '@/components/MessageContent/useMessage'
import useSpin from '@/components/SpinContent/useSpin'
import WechatAPI from '@/apis/WechatAPI'
import horizontal from '@/assets/images/horizontal.png'
import vertical from '@/assets/images/vertical.png'
import fidelity from '@/assets/images/fidelity.png'
// import '@/styles/font.css'

const View: React.FC = () => {
  const { msg } = useMessage()
  const { toggleSpin } = useSpin()
  const { id: linkId } = useParams<{ id: string }>()

  const [phoneType, setPhoneType] = useState<string>('horizontal') // horizontal vertical
  const [backgroundId, setBackgroundId] = useState<string>('')
  // const [patternMode, setPatternMode] = useState<string>('notice')
  const [patternMode, setPatternMode] = useState<string>('text')
  const [patternContent, setPatternContent] = useState<string>(``)
  const [message, setMessage] = useState<string>(``)

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
      // fontFamily: 'PingFangJiangNanTi',
    }
  }, [backgroundId])

  const getDetail = async () => {
    try {
      toggleSpin(true)
      const { data } = await WechatAPI.getLinkInfo({
        linkId,
      })
      setBackgroundId(data?.picId)
      setPatternMode(data?.mode || 'text')
      if (data?.mode === 'text') {
        setMessage(data?.linkContent || '')
      } else {
        setPatternContent(data?.linkContent || '')
      }
    } catch (error) {
      msg.error('链接失效，请重新生成')
    } finally {
      toggleSpin(false)
    }
  }

  useEffect(() => {
    const el = document.documentElement

    const enterFullScreen = () => {
      if (el.requestFullscreen) {
        el.requestFullscreen()
      } else if ((el as any).webkitRequestFullscreen) {
        ;(el as any).webkitRequestFullscreen()
      } else if ((el as any).msRequestFullscreen) {
        ;(el as any).msRequestFullscreen()
      }
    }

    // 初始綁定：首次點擊全屏
    const onClick = () => enterFullScreen()
    document.addEventListener('click', onClick)

    // 監聽退出全屏事件
    const onExit = () => {
      console.log('退出全屏，等待下一次點擊進入')
      document.addEventListener('click', onClick, { once: true })
      // once: true 保證只觸發一次，避免多次綁定
    }

    document.addEventListener('fullscreenchange', () => {
      if (!document.fullscreenElement) {
        onExit()
      }
    })

    return () => {
      document.removeEventListener('click', onClick)
      document.removeEventListener('fullscreenchange', onExit)
    }
  }, [])

  useEffect(() => {
    if (linkId) {
      getDetail()
    }
  }, [linkId])

  return (
    <div className="phone-preview absolute" style={phoneStyle}>
      {patternMode === 'text' ? (
        <div
          dangerouslySetInnerHTML={{ __html: message }}
          className="absolute"
          style={
            phoneType === 'horizontal'
              ? {
                  padding: '16px',
                  height: 'auto',
                  width: '100%',
                  top: '50%',
                  transform: 'translateY(-50%)',
                  left: '0',
                  wordWrap: 'break-word',
                }
              : {
                  padding: '16% 0',
                  width: 'auto',
                  height: '100%',
                  right: '50%',
                  transform: 'translateX(50%)',
                  display: 'inline-block',
                  writingMode: 'vertical-rl',
                  WebkitWritingMode: 'vertical-rl',
                  msWritingMode: 'vertical-rl',
                  textOrientation: 'sideways',
                }
          }
        ></div>
      ) : (
        <div
          style={{
            height: '100vh',
            width: '100vw',
          }}
        >
          {phoneType === 'horizontal' ? (
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
                  fontSize: '60px',
                  color: '#333',
                }}
              >
                {patternContent}
              </p>
            </Marquee>
          ) : (
            <marquee
              direction="up"
              loop={-1}
              style={{
                width: '120px',
                height: '100%',
                left: '50%',
                transform: 'translateX(-50%)',
                position: 'absolute',
              }}
            >
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  height: '100%',
                  width: '100%',
                }}
              >
                <p
                  style={{
                    fontSize: '100px',
                    color: '#333',
                    display: 'inline-block',
                    writingMode: 'vertical-rl',
                    WebkitWritingMode: 'vertical-rl',
                    msWritingMode: 'vertical-rl',
                    textOrientation: 'sideways',
                    whiteSpace: 'nowrap',
                  }}
                >
                  {patternContent}
                </p>
              </div>
            </marquee>
          )}
        </div>
      )}

      <div
        className="absolute bottom-2 left-2 w-8 h-8 opacity-50"
        onClick={() =>
          setPhoneType(phoneType === 'horizontal' ? 'vertical' : 'horizontal')
        }
      >
        <img src={phoneType === 'horizontal' ? vertical : horizontal} />
      </div>

      {/* <div className="absolute top-1 left-1">
        <img src={fidelity} className="w-10" />
      </div>
      <div className="absolute bottom-1 right-1">
        <img src={fidelity} className="w-10" />
      </div> */}
    </div>
  )
}

export default View
