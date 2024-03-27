"use client";
import { signIn } from "@/app/lib/slice/AuthSlice";
import AdminForm from "./form";
import { AppDispatch, RootState } from "@/app/lib/store";
import { useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";

const AdminLoginPage = () => {
    const router = useRouter();

    const user = useSelector((state: RootState) => state.user);
    const dispatch = useDispatch<AppDispatch>();

    const handleSubmit = async (data: Object) => {
        await dispatch(signIn(data)).then(() => {
            router.push("/admin/dashboard/products");
        });
    };
    return (
        <div className="flex items-center justify-center h-screen bg-gray-200">
            <AdminForm onSubmit={handleSubmit} />
        </div>
    );
};

export default AdminLoginPage;
