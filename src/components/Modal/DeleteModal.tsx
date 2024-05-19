import { Modal } from 'antd'
import { deleteModalProps } from '../../types/customer'
import { useCallback } from 'react'

function DeleteModal(props: deleteModalProps) {
    const { onClose, onDelete, show } = props

    const deleteCustomer = useCallback(() => {
        onDelete()
        onClose();
    }, [onClose, onDelete,])

    return (
        <Modal
            visible={show}
            onCancel={onClose}
            footer={null}
        >
            <div className='flex justify-center items-center flex-col p-[50px]'>
                <img src='/assests/delete.svg' alt='delete icon' />
                <h2 className='font-semibold text-[30px] text-[#000000]'>Are you sure?</h2>
                <p className='font-medium text-[24px] text-center items-center flex flex-col'>Do you really want to delete this customer? This process can not be undone.</p>
                <div className='flex flex-row justify-around w-full  mt-[40px]'>
                    <button className='text-white px-[60px] cancel-button py-[8px] rounded-md text-lg font-semibold' onClick={onClose}>Cancel</button>
                    <button onClick={deleteCustomer} className='text-white px-[60px] py-[8px] delete-button  rounded-md text-lg font-semibold'>Delete</button>
                </div>
            </div>
        </Modal>
    )
}

export default DeleteModal
