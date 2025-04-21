import React, { useState } from "react";
import { Product } from "@/types";
import { Progress } from "@/components/ui/progress";
import { Star } from "lucide-react";
import { Separator } from "../ui/separator";
import usePagination from "@/hooks/usePagination";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { Button } from "../ui/Button";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import Image from "next/image";
import Zoom from "react-medium-image-zoom";
import ReviewForm from "../forms/ReviewForm";
import { cn } from "@/lib/utils";

interface Review {
  rating: number;
  id: number;
  images?: {
    id: number;
    link: string;
    slug: string;
  }[];
  user: {
    firstName: string;
    lastName: string;
    emailVerified: boolean;
    photo?: string;
  };
  reviewDetails: string | null;
  reviewTitle: string | null;
  createdAt: Date;
}

const ProductReview = ({ product }: { product: Product }) => {
  const [perPage, setPerPage] = useState<number>(10);
  const [filter, setFilter] = useState<string>("latest");
  const [page, setPage] = useState<number>(1);

  const count = Math.ceil((product?.reviews || []).length / perPage);
  const _DATA = usePagination(product?.reviews || [], perPage);
  const maxPage = _DATA.maxPage;
  const currentData = _DATA.currentData();

  return (
    <>
      {(product?.reviews?.length ?? 0) > 0 ? (
        <section className="my-6">
          <div className="grid grid-cols-1 lg:grid-cols-[30%_70%] gap-8">
            <div className="flex flex-col items-center justify-center gap-4   border-r-2 border-gray-100 ">
              <span className="flex items-baseline gap-2">
                {" "}
                <p className="text-3xl font-medium">
                  {product.reviews && product.reviews.length > 0
                    ? (
                        product.reviews.reduce(
                          (sum: number, review: Review) => sum + review.rating,
                          0,
                        ) / product.reviews.length
                      ).toFixed(1)
                    : "0.0"}
                </p>
                <p className="text-lg font-normal">out of 5</p>
              </span>
              <div className="flex items-center gap-2">
                {[1, 2, 3, 4, 5].map((star) => {
                  const averageRating =
                    product.reviews && product.reviews.length > 0
                      ? product.reviews.reduce(
                          (sum, review) => sum + review.rating,
                          0,
                        ) / product.reviews.length
                      : 0;
                  return (
                    <Star
                      key={star}
                      className={cn(
                        "w-6 h-6",
                        star <= averageRating
                          ? "text-primary-300 fill-primary-300"
                          : "text-gray-300",
                      )}
                    />
                  );
                })}
              </div>
              <p className="text-lg font-normal">
                ( {product.reviews?.length} Reviews)
              </p>
            </div>

            <div className=" px-6 flex flex-col gap-2 justify-center">
              {[5, 4, 3, 2, 1].map((rating) => {
                const count =
                  product.reviews?.filter(
                    (review) => Math.round(review.rating) === rating,
                  ).length || 0;
                const percentage = product.reviews?.length
                  ? (count / product.reviews.length) * 100
                  : 0;

                return (
                  <div key={rating} className="flex items-center gap-10">
                    <p className="font-normal">{rating} Star</p>
                    <Progress
                      value={percentage}
                      className="w-[70%] h-2 bg-slate-200"
                    />
                  </div>
                );
              })}
            </div>
          </div>
          <Separator className="mt-6" />
          <div className="flex flex-col gap-2 mt-6">
            <p className="text-lg font-medium">Customer Reviews</p>
            <div className="flex items-center justify-between ">
              <div className="hidden lg:block">
                Showing{" "}
                {maxPage === page ? product?.reviews?.length : perPage * page}{" "}
                of {product?.reviews?.length} results
              </div>
              <div className="ms-auto">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="outline">{filter}</Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="w-56">
                    <DropdownMenuSeparator />
                    <DropdownMenuRadioGroup value="bottom">
                      <DropdownMenuRadioItem
                        value={filter}
                        onClick={() => setFilter("oldest")}
                      >
                        Oldest
                      </DropdownMenuRadioItem>
                      <DropdownMenuRadioItem
                        value={filter}
                        onClick={() => setFilter("latest")}
                      >
                        Latest
                      </DropdownMenuRadioItem>
                    </DropdownMenuRadioGroup>
                  </DropdownMenuContent>
                </DropdownMenu>
                <span className="ms-4">Show:</span>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="outline">{perPage} </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="w-56">
                    <DropdownMenuRadioGroup value="bottom">
                      <DropdownMenuRadioItem
                        value="30"
                        onClick={() => setPerPage(30)}
                      >
                        30
                      </DropdownMenuRadioItem>
                      <DropdownMenuRadioItem
                        value="20"
                        onClick={() => setPerPage(20)}
                      >
                        20
                      </DropdownMenuRadioItem>
                      <DropdownMenuRadioItem
                        value="10"
                        onClick={() => setPerPage(10)}
                      >
                        10
                      </DropdownMenuRadioItem>
                    </DropdownMenuRadioGroup>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </div>
            {product.reviews?.map((review) => (
              <div key={review.id} className="mt-6">
                <div className="flex items-center justify-between ">
                  <div className="flex items-center gap-2  ">
                    <Avatar className="bg-primary-200 overflow-hidden">
                      {review.user?.photo ? (
                        <AvatarImage src={review.user?.photo} />
                      ) : (
                        <AvatarFallback>
                          {review.user?.firstName.charAt(0)}
                          {review.user?.lastName.charAt(0)}
                        </AvatarFallback>
                      )}
                    </Avatar>

                    <span className="flex flex-col gap-1">
                      <p className="font-medium text-lg lg:text-lg leading-none">
                        {`${review.user?.firstName} ${review.user?.lastName}`}
                      </p>
                      <p className="text-sm text-gray-500 leading-none">
                        {review.user.emailVerified
                          ? "(Verified)"
                          : "(Not Verified)"}
                      </p>
                    </span>
                  </div>
                  <p className="text-sm lg:text-lg text-gray-500 leading-none">
                    {new Date(review.createdAt).toLocaleDateString("en-GB", {
                      month: "long",
                      day: "numeric",
                      year: "numeric",
                    })}
                  </p>
                </div>
                <p className="text-[16px] lg:text-lg leading-tight mt-8">
                  {review.reviewTitle}
                </p>
                <p className="text-[16px] lg:text-lg text-gray-500 leading-tight mt-4 font-normal">
                  {review.reviewDetails}
                </p>
                <div className="flex gap-4 items-center mt-4">
                  <div className="flex items-center gap-2">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <Star
                        key={star}
                        className={cn(
                          "w-6 h-6",
                          star <= review.rating
                            ? "text-primary-300 fill-primary-300"
                            : "text-gray-300",
                        )}
                      />
                    ))}
                  </div>
                  <p className="text-sm lg:text-lg text-gray-500 leading-none">
                    {review.rating} out of 5
                  </p>
                </div>
                <div className="flex gap-4 mt-4">
                  {(review as Review).images?.map((image) => (
                    <div
                      key={image.id}
                      className="bg-gray-300 w-[100px] h-[100px] rounded-md overflow-hidden"
                    >
                      <Zoom>
                        <img
                          src={image.link}
                          alt={image.slug}
                          className="w-full h-full object-cover"
                        />
                      </Zoom>
                    </div>
                  ))}
                </div>
                <Separator className="mt-6" />
              </div>
            ))}
          </div>
        </section>
      ) : (
        <div className="flex items-center justify-center h-full">
          <p className="text-lg font-medium">No reviews yet</p>
        </div>
      )}
      {/* <Separator className="mt-6" /> */}
      <div className=" flex flex-col gap-4 mt-6">
        <p className="text-lg lg:text-2xl font-medium">Add your review</p>
        <p className="text-sm lg:text-lg text-gray-500">
          Your email address will not be published. Required fields are marked *
        </p>
        <ReviewForm />
      </div>
    </>
  );
};

export default ProductReview;
