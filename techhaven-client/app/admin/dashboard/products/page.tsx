"use client";
import { checkAuthentication } from "@/app/lib/slice/AuthSlice";
import { fetchAllProducts, searchProducts } from "@/app/lib/slice/ProductSlice";
import { AppDispatch, RootState } from "@/app/lib/store";
import { Input } from "@/components/ui/input";
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import FilterForm from "./FilterForm";
import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Textarea } from "@/components/ui/textarea";
import { useForm } from "react-hook-form";

const ProductForm = ({ onSubmit }) => {
    const validateImages = async (data) => {
        const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB make this 25mb
        const ACCEPTED_IMAGE_TYPES = [".jpeg", ".jpg", ".png", ".webp"];
        for (const image of data) {
            if (!(image instanceof File)) {
                throw new Error("Invalid image file.");
            }
            // Add your other file size and type validation logic here
        }

        return data;
    };
    const schema = z.object({
        name: z.string(),
        description: z.string(),
        price: z.string().default("0"),
        stock: z.string({
            required_error: "Stock field is required",
        }),
        images: z.custom(validateImages),
        collection: z.string(),
        brand: z.string(),
        // Ensures valid email format
    });

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({ resolver: zodResolver(schema) });

    // const Schema = z.object({
    //     name: z.string({
    //         required_error: "Name is required",
    //     }),
    //     description: z.string({
    //         required_error: "Description is required",
    //     }),
    // images: z.array(
    //     z.object({
    //         size: z
    //             .number()
    //             .positive()
    //             .int()
    //             .refine((size) => size <= MAX_FILE_SIZE, {
    //                 message: `Image size cannot exceed ${
    //                     MAX_FILE_SIZE / (1024 * 1024)
    //                 }MB`,
    //             }),
    //         type: z
    //             .string()
    //             .refine((type) => ACCEPTED_IMAGE_TYPES.includes(type), {
    //                 message:
    //                     "Only JPEG, JPG, PNG, and WEBP formats are supported",
    //             }),
    //     })
    // ),
    //     price: z.number(),
    //     stock: z.number(),
    //     collection: z.string(),
    //     brand: z.string(),
    // });

    /** Submit data */
    const handleOnSubmit = (data) => {
        console.log("nice");
        onSubmit(data);
    };

    // const form = useForm({
    //     resolver: zodResolver(schema),
    // });

    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button variant="outline">Open Form</Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[600px]">
                <DialogHeader>
                    <DialogTitle>My Form</DialogTitle>
                </DialogHeader>
                <form
                    className="grid gap-4 py-4"
                    onSubmit={handleSubmit(onSubmit)}
                >
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="name" className="text-right">
                            Name:
                        </Label>
                        <Input
                            className="col-span-3"
                            {...register("name", { required: true })} // Set required field with error message
                        />
                        {errors.name && (
                            <span className="text-red-500 text-sm">
                                Name is required
                            </span>
                        )}
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="description" className="text-right">
                            Description:
                        </Label>
                        <Textarea
                            className="col-span-3"
                            {...register("description", { required: true })}
                        />
                        {errors.description && (
                            <span className="text-red-500 text-sm">
                                Description is required
                            </span>
                        )}
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="images" className="text-right">
                            Images
                        </Label>
                        <Input
                            type="file"
                            multiple={true}
                            className="col-span-3 hover:bg-gray-100 hover:cursor-pointer"
                            {...register("images")}
                        />
                        {errors.images && (
                            <span className="text-red-500 text-sm">
                                {errors.images.message as string}
                            </span>
                        )}
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="price" className="text-right">
                            Price:
                        </Label>
                        <Input
                            type="number"
                            className="no-spinner cols-span-3"
                            {...register("price")}
                        />
                        {errors.price && (
                            <span className="text-red-500 text-sm">
                                {errors.price.message as string}
                            </span>
                        )}
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="price" className="text-right">
                            Stock:
                        </Label>
                        <Input
                            type="number"
                            className="no-spinner cols-span-3"
                            {...register("stock")}
                        />
                        {errors.stock && (
                            <span className="text-red-500 text-sm">
                                {errors.stock.message as string}
                            </span>
                        )}
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="collection" className="text-right">
                            Collection
                        </Label>
                        <Input
                            type="text"
                            className="col-span-3"
                            {...register("collection")}
                        />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="brand" className="text-right">
                            Brand
                        </Label>
                        <Input
                            type="text"
                            className="col-span-3"
                            {...register("brand")}
                        />
                    </div>
                    <DialogFooter>
                        <Button type="submit">Submit</Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
};
{
    /* <Dialog>
            <DialogTrigger asChild>
                <Button variant="outline">Create New Product</Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[600px]">
                <DialogHeader>
                    <DialogTitle>Create New Product</DialogTitle>
                    <DialogDescription>
                        Make changes to your profile here. Click save when you
                        re done.
                    </DialogDescription>
                </DialogHeader>

                <form
                    className="grid gap-4 py-4"
                    onSubmit={form.handleSubmit(handleOnSubmit)}
                >
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="name" className="text-right">
                            Name
                        </Label>
                        <Input
                            className="col-span-3"
                            {...form.register("name", { required: true })}
                        />
                    </div>

                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="description" className="text-right">
                            Description
                        </Label>
                        <Textarea
                            className="col-span-3"
                            {...form.register("description")}
                        />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="images" className="text-right">
                            Images
                        </Label>
                        <Input
                            type="file"
                            multiple={true}
                            className="col-span-3 hover:bg-gray-100 hover:cursor-pointer"
                            {...form.register("images")}
                        />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="price" className="text-right">
                            Price
                        </Label>
                        <Input
                            type="number"
                            className="col-span-3 no-spinner"
                            {...form.register("price")}
                        />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="stock" className="text-right">
                            Stock
                        </Label>
                        <Input
                            type="number"
                            className="col-span-3 no-spinner"
                            {...form.register("stock")}
                        />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="collection" className="text-right">
                            Collection
                        </Label>
                        <Input
                            type="text"
                            className="col-span-3"
                            {...form.register("collection")}
                        />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="brand" className="text-right">
                            Brand
                        </Label>
                        <Input
                            type="text"
                            className="col-span-3"
                            {...form.register("brand")}
                        />
                    </div>
                    <DialogFooter>
                        <Button type="submit">Submit</Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog> */
}
const ProductsDashboard = () => {
    const user = useSelector((state: RootState) => state.user);
    const products = useSelector((state: RootState) => state.items.products);
    const collections = useSelector((state: RootState) => state.collections);
    const dispatch = useDispatch<AppDispatch>();

    const router = useRouter();

    useEffect(() => {
        dispatch(fetchAllProducts());
        dispatch(checkAuthentication());

        // Refresh still does not work
        // if (user.userId === "") {
        //     router.push("/admin/login");
        // }
    }, [dispatch, router, user.userId]);

    const handleOnChange = (e) => {
        const searchQuery = e.target.value;
        dispatch(searchProducts(searchQuery));
        //Tryna fix search to be more flexible currently search is keyword sensitive
    };

    const handleSubmit = async (data: Object) => {
        console.log(data);
    };

    // Add loading so data cant be seen
    return (
        <div className="flex">
            <div className="flex flex-col">
                <div className="flex justify-between items-center p-4 border-b">
                    <h1 className="font-semibold">Dashboard</h1>
                    <ProductForm onSubmit={handleSubmit} />
                </div>
                <div className="my-2 p-4">
                    <Input
                        type="text"
                        placeholder="Search Products"
                        onChange={(e) => {
                            handleOnChange(e);
                        }}
                        name="Search"
                        className="focus-visible:ring-0"
                    />
                </div>
                <div className="flex flex-row">
                    <div className="w-1/5 px-4 my-4">
                        <FilterForm />
                    </div>
                    <Table className="grow">
                        <TableCaption></TableCaption>
                        <TableHeader>
                            <TableRow>
                                <TableHead className="lg:w-[500px]">
                                    Product ID
                                </TableHead>
                                <TableHead className="lg:w-[800px]">
                                    Name
                                </TableHead>
                                <TableHead className="lg:w-[80px]">
                                    Inventory Count
                                </TableHead>
                                <TableHead className="lg:w-[80px]">
                                    Total Sold
                                </TableHead>
                                <TableHead className="lg:w-[200px]">
                                    Actions
                                </TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {products?.map((product) => (
                                <TableRow key={product._id as string}>
                                    <TableCell>{product._id}</TableCell>
                                    <TableCell>{product.name}</TableCell>
                                    <TableCell>
                                        {product.totalStock as number}
                                    </TableCell>
                                    <TableCell>
                                        {product.totalSold as number}
                                    </TableCell>
                                    <TableCell>
                                        <p>Edit</p>
                                        <p>Delete</p>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </div>
            </div>
        </div>
    );
};

export default ProductsDashboard;
