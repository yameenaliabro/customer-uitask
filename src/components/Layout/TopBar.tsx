import { Layout } from 'antd'

function TopBar() {
    const { Header } = Layout
    return (
        <Header className='bg-white h-[90px] flex justify-start '>
            <div className='flex justify-start items-center text-center'>
                <h1 className='text-start  text-[#000000]  text-[35px] font-semibold 1920:text-[35px]'>Customers</h1>
            </div>
        </Header>
    )
}

export default TopBar