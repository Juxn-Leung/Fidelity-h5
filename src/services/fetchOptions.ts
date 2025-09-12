
import PicAPI from '@/apis/PicAPI'

export const fetchPicFindOptions = async () => {
  const { data } = await PicAPI.find({
    unpaged: true,
  })
  return data?.records?.map((ele: any) => {
    return {
      ...ele,
      disabled: ele.status === 1,
    }
  })
}
