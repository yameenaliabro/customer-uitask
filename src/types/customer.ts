export type Customer = {
    id: number,
    first_name: string,
    last_name: string,
    email: string,
    avatar: string,
}

export type deleteModalProps = {
    show: boolean,
    onClose: () => void,
    onDelete: () => void,
}

export type CustomerModalProps = {
    show: boolean,
    onClose: () => void,
    customer: Customer,
    mode: string,
    onSave: (customer: Customer) => void,
}