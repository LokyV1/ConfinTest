import axios from "axios";
import { toast } from "sonner";

export const errorHandler = (error: unknown) => {
    if (axios.isAxiosError(error)) {
        const err = error.response?.data;
        if (Array.isArray(err?.data.errors)) {
            for (const val of err.data.errors) {
                toast.error(val);
            }
        } else if (typeof err?.data.errors === "object") {
            for(const e in err?.data.errors) {
                toast.error(err?.data.errors[e][0]);
            }
        } else if (err?.data) {
            toast.error(err?.data);
        } else if (err?.status === 401) {
            toast.error("Effettua il login");
        } else if (err){
            toast.error(err.data);
        }
    }
}