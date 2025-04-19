"use client";

import React, { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { FormProvider, useForm } from "react-hook-form";
import { z } from "zod";
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
  FormDescription,
} from "../ui/form";
import { Input } from "../ui/input";
import ProductRating from "@/components/ui/rating";
import { Textarea } from "../ui/textarea";
import { Button } from "../ui/Button";
import { CldUploadWidget } from "next-cloudinary";
import Image from "next/image";
import { UploadIcon } from "lucide-react";

const formSchema = z.object({
  fullName: z.string().min(2, {
    message: "Full name must be at least 2 characters.",
  }),
  email: z.string().email({
    message: "Invalid email address.",
  }),
  reviewTitle: z.string().min(10, {
    message: "Review title must be at least 10 characters.",
  }),
  rating: z.number().min(1, {
    message: "Rating must be at least 1.",
  }),
  reviewDetails: z.string().min(10, {
    message: "Review details must be at least 10 characters.",
  }),
  reviewImages: z.array(z.string()).optional(),
});

const ReviewForm = () => {
  const [photos, setPhotos] = useState<any>([]);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      fullName: "",
      email: "",
      reviewTitle: "",
      rating: 0,
      reviewDetails: "",
      reviewImages: [],
    },
  });

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    console.log(values);
  };

  return (
    <FormProvider {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-8 w-full lg:w-[80%] "
      >
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="fullName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Full Name *</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Ex. Kobe Grey"
                    {...field}
                    className="border outline-gray-300 focus-visible:border-primary-300 text-lg lg:text-xl h-12"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email *</FormLabel>
                <FormControl>
                  <Input
                    className="border outline-gray-300 focus-visible:border-primary-300 text-lg lg:text-xl h-12"
                    placeholder="example@gmail.com"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <FormField
          control={form.control}
          name="rating"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Rating *</FormLabel>
              <FormControl>
                <ProductRating value={field.value} onChange={field.onChange} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="reviewTitle"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Review Title *</FormLabel>
              <FormControl>
                <Input
                  placeholder="Ex. Best product ever"
                  {...field}
                  className="border focus-visible:border-primary-300 text-lg lg:text-xl h-12"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="reviewDetails"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Review Details *</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Ex. This product is amazing"
                  {...field}
                  className="outline-none focus-visible:border-primary-300 text-lg lg:text-xl min-h-[100px] max-h-[200px]"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="reviewImages"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Review Photos (Optional)</FormLabel>
              <FormControl>
                <CldUploadWidget
                  uploadPreset="fashionista"
                  onSuccess={(result, widget) => {
                    setPhotos(result.info);
                    widget.close();
                  }}
                >
                  {({ open }) => {
                    return (
                      <div
                        className="flex flex-col justify-center border rounded-md  w-full h-[200px] text-lg text-gray-500 items-center gap-2 cursor-pointer"
                        onClick={() => open()}
                      >
                        <UploadIcon className="w-6 h-6" />

                        <span>Upload a photo</span>
                        <p className="text-xs text-black font-medium">Browse</p>
                      </div>
                    );
                  }}
                </CldUploadWidget>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit" size="lg" className="bg-primary-900 text-lg">
          Submit
        </Button>
      </form>
    </FormProvider>
  );
};

export default ReviewForm;
