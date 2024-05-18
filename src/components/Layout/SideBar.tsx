import { Layout } from 'antd'
import React from 'react'

function SideBar() {
    const { Sider } = Layout
    return (
        <Sider className='bg-[#015249] h-screen p-4'>
            <div className='pt-[20px]'>
                <img src='/assests/logo.png' alt='logo' />
            </div>
            <div className='flex  items-center bg-[#043933] mt-[60px] rounded-md py-[14px] justify-around'>
                <img src='/assests/customers icon.svg' alt='Customers' />
                <span className='text-[22px] 1920:text-[24px] text-[#FFFFFF] font-medium'>CUSTOMERS</span>
            </div>
        </Sider>
    )
}

export default SideBar