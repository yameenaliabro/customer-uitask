
import { useCallback, useEffect, useState } from 'react'
import { FaPlus } from "react-icons/fa6";
import { useDispatch, useSelector } from 'react-redux';
import { Result, Spin } from 'antd';
import { TbCaretUpDownFilled } from "react-icons/tb";
import CustomerModal from '../Modal/CustomerModal';
import DeleteModal from '../Modal/DeleteModal';
import { RootState } from '../redux/store';
import { addCustomer, deleteCustomer, editCustomer, fetchCustomers } from '../redux/customerSlice';

function Customers() {
    const dispatch = useDispatch();
    const { customers, loading, error } = useSelector((state: RootState) => state.users);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [modalMode, setModalMode] = useState<'add' | 'edit'>('add');
    const [selectedUser, setSelectedUser] = useState<any>(null);
    const [isDeleteModalVisible, setIsDeleteModalVisible] = useState<boolean>(false);
    const [userToDeleteId, setUserToDeleteId] = useState<number | null>(null)

    useEffect(() => {
        dispatch(fetchCustomers() as any);
    }, [dispatch]);

    const handleDelete = useCallback((id: number) => {
        dispatch(deleteCustomer(id));
    }, [dispatch]);

    const handleEdit = useCallback((user: { id: number; first_name: string; last_name: string; email: string; avatar: string }) => {
        setSelectedUser(user);
        setModalMode('edit');
        setIsModalVisible(true);
    }, []);

    const handleAdd = useCallback(() => {
        setSelectedUser(null);
        setModalMode('add');
        setIsModalVisible(true);
    }, []);

    const handleSave = useCallback((values: any) => {
        if (modalMode === 'edit') {
            dispatch(editCustomer({ ...selectedUser, ...values }));
        } else {
            dispatch(addCustomer(values) as any);
        }
    }, [dispatch, selectedUser, modalMode]);

    const showDeleteModal = useCallback((userId: number) => {
        setUserToDeleteId(userId);
        setIsDeleteModalVisible(true);
    }, []);

    if (loading) return (
        <div className='flex justify-center items-center h-screen'>
            <Spin size='large' />
        </div>
    );
    if (error) return (
        <div className='flex justify-center items-center h-screen'>
            <Result status="500" title={error} />
        </div>
    )

    return (
        <section className='bg-primary-white'>
            <div className='flex justify-start px-10 pt-[40px]'>
                <button onClick={handleAdd} className='bg-gradient  gap-x-[20px] px-[20px] py-[17px]  rounded-xl flex items-center justify-between'>
                    <FaPlus className='text-white  font-semibold text-base' />
                    <span className='text-white border-none font-semibold text-base'>ADD NEW CUSTOMER</span>
                </button>
            </div>
            <div className="w-full   rounded-lg shadow-md p-6 justify-center items-center mt-[20px]">
                <div className="grid grid-cols-5 gap-4 mb-[40px] bg-[#57BC90] p-[15px] m-5 rounded-xl">
                    <div>
                    </div>
                    <div className='flex flex-row justify-center items-center gap-x-[2px] cursor-pointer'>
                        <span className='text-[#015249] text-[22px] font-semibold'>Customer ID</span>
                        <TbCaretUpDownFilled />
                    </div>
                    <div className='flex flex-row justify-center items-center gap-x-[2px]  cursor-pointer'>
                        <span className='text-[#015249] text-[22px] font-semibold'>Customer Name</span>
                        <TbCaretUpDownFilled />
                    </div>
                    <div className='flex flex-row justify-center items-center gap-x-[2px]  cursor-pointer'>
                        <span className='text-[#015249] text-[22px] font-semibold'>Email</span>
                        <TbCaretUpDownFilled />
                    </div>
                    <div></div>
                </div>
                {customers.map(user => (
                    <div key={user.id} className="grid grid-cols-5 gap-4 p-3 m-5 rounded-xl border-b bg-white hover:bg-gray-50 items-center">
                        <div className="flex justify-center">
                            <img src={user?.avatar ? user.avatar : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSOAbP5GG2uH0CSphScY2Eg5BWBG3TrJ6O24y3SOOoXzg&s"} alt={`${user.first_name} ${user.last_name}`} className="w-[109px] h-[105px] rounded-xl" />
                        </div>
                        <div className='text-lg text-[#5A5F65] font-medium'>00{user.id}</div>
                        <div className="font-medium  text-lg underline cursor-pointer text-[#57BC90]">{`${user.first_name} ${user.last_name === undefined ? "" : user.last_name}`}</div>
                        <div className='text-[#5A5F65] text-lg font-medium'>{user.email.slice(0, 20)}..</div>
                        <div className="text-center">
                            <button onClick={() => handleEdit(user)} className="bg-button text-[#008212] px-[25px] py-[8px] rounded mr-2">Edit</button>
                            <button onClick={() => showDeleteModal(user.id)} className="bg-delete text-[#D80000]  px-[30px] py-[8px] rounded hover:bg-red-600">Delete</button>
                        </div>

                    </div>
                ))}
            </div>
            <CustomerModal
                customer={selectedUser}
                show={isModalVisible}
                onClose={() => setIsModalVisible(false)}
                onSave={handleSave}
                mode={modalMode}
            />
            <DeleteModal
                onClose={() => setIsDeleteModalVisible(false)}
                onDelete={() => handleDelete(userToDeleteId as number)}
                show={isDeleteModalVisible}
            />
        </section >
    )
}
export default Customers