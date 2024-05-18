import { Customer } from "./customer"

export type CustomerState = {
    customers: Customer[],
    loading: boolean,
    error: string | null

}