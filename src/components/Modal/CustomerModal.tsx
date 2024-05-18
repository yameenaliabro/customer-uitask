import React, { useCallback, useEffect, useRef, useState } from 'react';
import { Modal, Form, Input, Button } from 'antd';
import { ImCross } from "react-icons/im";
import { CustomerModalProps } from '../../types/customer';

const CustomerModal: React.FC<CustomerModalProps> = (props) => {
    const { customer, onClose, onSave, show, mode } = props;
    const [form] = Form.useForm();
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const fileInputRef = useRef<HTMLInputElement | null>(null);

    useEffect(() => {
        form.resetFields();
        setSelectedFile(null);
        const initialValues = mode === 'edit' && customer ? {
            first_name: customer.first_name,
            email: customer.email,
        } : {};
        form.setFieldsValue(initialValues);
    }, [show, form, customer, mode]);

    const handleSubmit = useCallback(() => {
        try {
            form.validateFields().then((values) => {
                onSave(values);
                onClose();
            });
        } catch (error) {
            console.error('Error submitting form:', error);
        }
    }, [form, onClose, onSave]);

    const handleUploadClick = useCallback(() => {
        if (fileInputRef?.current) {
            fileInputRef?.current.click();
        }
    }, []);

    const handleFileChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files && e.target.files[0];
        if (file) {
            setSelectedFile(file);
        }
    }, []);

    const initialValues = mode === 'edit' && customer ? {
        first_name: customer.first_name,
        email: customer.email,
    } : {};

    return (
        <Modal
            visible={show}
            onCancel={onClose}
            className='!p-[0px]'
            closeIcon={null}
            footer={null}
        >
            <div className="bg-modal-image">
                <div className='pr-[3vw] pt-[2vw]'>
                    <ImCross className='float-right text-white text-[20px] cursor-pointer' onClick={onClose} />
                </div>
                <div className='flex justify-center items-center '>
                    <h2 className='text-[40px] font-medium text-white'>{mode === "edit" ? "Edit Customer" : "Add New Customer"} </h2>
                </div>
            </div>
            <Form form={form} layout="vertical" className='p-[20px]' onFinish={handleSubmit} initialValues={initialValues}>
                <Form.Item
                    name="first_name"
                    rules={[{ required: true, message: 'Please enter customer name' }]}
                >
                    <Input type='text' placeholder='Customer Name' size='large' />
                </Form.Item>
                <Form.Item
                    name="email"
                    rules={[{ required: true, message: "Please enter email" }]}
                >
                    <Input type='text' placeholder='Customer Email' size='large' />
                </Form.Item>
                {mode === "edit" ? null :
                    <div>
                        <span className='cursor-pointer underline text-[#57BC90] font-semibold text-lg' onClick={handleUploadClick}>Upload Photo</span>
                        <input type="file" ref={fileInputRef} style={{ display: 'none' }} onChange={handleFileChange} accept="image/*" />
                    </div>
                }
                {selectedFile && (
                    <img src={URL.createObjectURL(selectedFile)} alt="Preview" style={{ width: '100%', marginTop: '10px', height: "180px", marginBottom: "20px" }} />
                )}
                <Form.Item>
                    <Button type='primary' size='large' htmlType='submit' className='w-full bg-gradient text-base hover:!bg-none'>
                        {mode === "edit" ? "Edit Customer" : "ADD CUSTOMER"}
                    </Button>
                </Form.Item>
            </Form>
        </Modal>
    );
};

export default CustomerModal;