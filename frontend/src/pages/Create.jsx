import { useForm } from "react-hook-form";
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Create = () => {

    const form = useForm({
        defaultValues: {
            title: "",
            content: "",
            image: "",
        },
    });

    const navigate = useNavigate()
    const [error, setError] = useState(null);
    const [output, setOutput] = useState()


    const onSubmit = async (data) => {
        // Basic validation for the title field
        if (data.title.length < 2) {
            setError("Title must be at least 2 characters.");
        } else {
            setError(null);
            console.log(data);
        }

        const response = await axios.post("http://localhost:5000/posts", data)
        setOutput(response.data)
        console.log(response.data);
        navigate("/blogs")
        // Reset the form after submission
        form.reset({
            title: "",
            content: "",
            image: "",
        });
    };

    return (
        <Form {...form}>
            <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="w-full max-w-2xl mx-auto p-8 space-y-8 bg-gray-900 text-white shadow-xl rounded-lg"
            >
                <h2 className="text-3xl font-bold text-center text-indigo-400">Create a Blog Post</h2>

                {/* Title Field */}
                <FormField
                    control={form.control}
                    name="title"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel className="text-lg font-medium text-gray-200">Enter the Title</FormLabel>
                            <FormControl>
                                <Input
                                    {...field}
                                    placeholder="Blog Title"
                                    className="mt-3 p-4 w-full rounded-md border border-gray-700 bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                />
                            </FormControl>
                            {error && <FormMessage className="text-red-500 mt-2">{error}</FormMessage>}
                        </FormItem>
                    )}
                />

                {/* Content Field */}
                <FormField
                    control={form.control}
                    name="content"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel className="text-lg font-medium text-gray-200">Enter the Content</FormLabel>
                            <FormControl>
                                <textarea
                                    {...field}
                                    placeholder="Blog Content"
                                    className="mt-3 p-4 w-full h-40 rounded-md border border-gray-700 bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                />
                            </FormControl>
                        </FormItem>
                    )}
                />

                {/* Image Upload Field */}
                <FormField
                    control={form.control}
                    name="image"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel className="text-lg font-medium text-gray-200">Upload an Image</FormLabel>
                            <FormControl>
                                <input
                                    {...field}
                                    type="file"
                                    className="mt-3 p-2 w-full border border-gray-700 bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                />
                            </FormControl>
                        </FormItem>
                    )}
                />

                {/* Submit Button */}
                <Button
                    type="submit"
                    className="w-full py-3 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                >
                    Submit
                </Button>
            </form>
        </Form>
    );
};

export default Create;
