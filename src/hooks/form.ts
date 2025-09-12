import { useMemo, useState } from 'react'

type Options = { title: string | { edit: string; add: string } }

export const useEditModal = (options: Options) => {
  const [isOpen, setIsOpen] = useState<boolean>(false)
  const [editId, setEditId] = useState<string | null>(null)

  const open = (id: string | null) => {
    setEditId(id)
    setIsOpen(true)
  }

  const close = () => {
    setEditId(null)
    setIsOpen(false)
  }

  const title = useMemo(() => {
    if (!isOpen || !options.title) return
    else if (typeof options.title === 'string') return options.title
    else if (editId) {
      return options.title.edit
    } else {
      return options.title.add
    }
  }, [isOpen, editId, options.title])

  return { isOpen, setIsOpen, editId, open, close, title }
}

export const useAntdEditModal = (options: Options) => {
  const editModal = useEditModal(options)
  const onCancel = () => editModal.close()
  const onClose = () => editModal.close()
  return {
    ...editModal,
    modalProps: {
      title: editModal.title,
      open: editModal.isOpen,
      onClose,
      onCancel,
    },
  }
}
