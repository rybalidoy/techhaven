import Container from "@/app/components/component";
import { Button } from "@/components/ui/button";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

const AdminForm = ({ onSubmit }) => {
    const Schema = z.object({
        phoneNumber: z
            .string({
                required_error: "Phone number is required",
            })
            .min(10, { message: "Phone number must be at least 10 digits" })
            .max(11, { message: "Invalid phone number" }),
        password: z
            .string({
                required_error: "Password is required",
            })
            .min(6, { message: "Must contain at least 6 characters" })
            .max(20, { message: "Maximum of 20 characters" }),
    });

    const form = useForm({ resolver: zodResolver(Schema) });

    const handleSubmit = (data) => {
        onSubmit(data);
    };

    return (
        <Container>
            <Form {...form}>
                <form
                    className="space-y-8 w-96 m-auto p-12 shadow-md rounded border flex flex-col bg-white"
                    onSubmit={form.handleSubmit(handleSubmit)}
                >
                    <h1 className="text-center -m-6 font-semibold">Admin</h1>
                    <FormField
                        control={form.control}
                        name="phoneNumber"
                        render={() => (
                            <FormItem>
                                <FormControl>
                                    <Input
                                        {...form.register("phoneNumber")}
                                        placeholder="Enter your phone number"
                                        type="number"
                                        className="no-spinner"
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    ></FormField>
                    <FormField
                        control={form.control}
                        name="password"
                        render={() => (
                            <FormItem>
                                <FormLabel>Password</FormLabel>
                                <FormControl>
                                    <Input
                                        {...form.register("password")}
                                        placeholder="Enter your password"
                                        type="password"
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    ></FormField>
                    <Button type="submit" className="w-full">
                        Sign in
                    </Button>
                </form>
            </Form>
        </Container>
    );
};

export default AdminForm;
