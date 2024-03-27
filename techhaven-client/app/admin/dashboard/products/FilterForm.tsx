import Container from "@/app/components/component";
import { fetchBrands } from "@/app/lib/slice/ProductSlice";
import { AppDispatch, RootState } from "@/app/lib/store";
import { FormControl, FormField, FormItem } from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@radix-ui/react-accordion";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { z } from "zod";

const FilterForm = () => {
    const dispatch = useDispatch<AppDispatch>();
    const brands = useSelector((state: RootState) => state.items.brands);

    // Create filter slice for the brands .. etc forms
    // Revert products and change all the call backs

    useEffect(() => {
        dispatch(fetchBrands());
    }, [dispatch]);
    const Schema = z.object({
        collection: z.string(),
    });
    const form = useForm({ resolver: zodResolver(Schema) });
    return (
        <Accordion type="multiple" className="w-full">
            <AccordionItem
                value="price"
                className="border-t border-l border-r py-[5px] px-2 hover:bg-gray-100 text-sm"
            >
                <AccordionTrigger className="w-full text-left py-2 px-1">
                    Price
                </AccordionTrigger>
                <AccordionContent className="gap-x-2 flex">
                    <input
                        type="range"
                        min={0}
                        max={100}
                        step={1}
                        className="w-full"
                    />
                </AccordionContent>
            </AccordionItem>
            <AccordionItem
                value="availability"
                className="border-l border-t border-r py-[5px] px-2 hover:bg-gray-100 text-sm"
            >
                <AccordionTrigger className="w-full text-left py-2 px-1">
                    Availability
                </AccordionTrigger>
                <AccordionContent>
                    <div>
                        <div className="gap-x-2 flex">
                            <input
                                type="checkbox"
                                name="inStock"
                                value={"inStock"}
                            />
                            <label
                                htmlFor="inStock"
                                className="text-xs leading-4"
                            >
                                In Stock
                            </label>
                        </div>
                        <div className="gap-x-2 flex">
                            <input
                                type="checkbox"
                                name="outOfStock"
                                value={"outOfStock"}
                            />
                            <label
                                htmlFor="outOfStock"
                                className="text-xs leading-4"
                            >
                                Out of Stock
                            </label>
                        </div>
                    </div>
                </AccordionContent>
            </AccordionItem>
            <AccordionItem
                value="brand"
                className="border py-[5px] px-2 hover:bg-gray-100 text-sm"
            >
                <AccordionTrigger className="w-full text-left py-2 px-1">
                    Brands
                </AccordionTrigger>
                <AccordionContent>
                    {brands?.map((brand) => (
                        <div key={brand} className="gap-x-2 flex">
                            <input type="checkbox" name={brand} value={brand} />
                            <label
                                htmlFor={brand}
                                className="text-xs leading-4"
                            >
                                {brand.toUpperCase()}
                            </label>
                        </div>
                    ))}
                </AccordionContent>
            </AccordionItem>
        </Accordion>
    );
};

export default FilterForm;
