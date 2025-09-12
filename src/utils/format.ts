import dayjs from 'dayjs'
import { filesize } from 'filesize'
import { baseUrl } from '@/apis/config'

export interface Item {
  id: string | number | boolean | null
  nameTc?: string
  namePt?: string
  nameZhHant?: string
  code?: string
  [key: string]: any
}

export const formatDate = (
  date?: dayjs.ConfigType,
  format: string = 'YYYY-MM-DD'
) => {
  if (!date || !dayjs(date).isValid()) return ''
  return dayjs(date).format(format)
}

export const formatDateTime = (
  date?: dayjs.ConfigType,
  format: string = 'YYYY-MM-DD HH:mm:ss'
) => {
  if (!date || !dayjs(date).isValid()) return ''
  return dayjs(date).format(format)
}

export const formatUtcDate = (date?: dayjs.ConfigType) => {
  if (!date || !dayjs(date).isValid()) return ''
  return dayjs(date).toISOString()
}

export const formatTime = (
  date?: dayjs.ConfigType,
  format: string = 'HH:mm'
) => {
  if (!date || !dayjs(date).isValid()) return ''
  return dayjs(date).format(format)
}

export const formatEnum = (
  value: string | number | boolean,
  list: Item[],
  label = 'nameTc'
) => {
  return list.find((item: Item) => item.id === value)?.[label] || ''
}

export const formatEnums = (
  value: string[],
  list: Item[],
  label = 'nameTc'
) => {
  const items = list.filter((item: any) => value?.includes(item.id))
  return items.map((item: any) => item[label]).join(', ')
}

export const formatFileSize = (bytes: number) => {
  return filesize(bytes)
}

export const formatPicUrl = (id: string) => {
  if (id) {
    return `${baseUrl}fidelityApi/api/file/${id}`
  }
  return ''
}
