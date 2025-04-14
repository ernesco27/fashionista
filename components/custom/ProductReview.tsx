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

const ProductReview = ({ product }: { product: Product }) => {
  const [perPage, setPerPage] = useState<number>(10);
  const [filter, setFilter] = useState<string>("latest");
  const [page, setPage] = useState<number>(1);

  const count = Math.ceil((product?.reviews || []).length / perPage);
  const _DATA = usePagination(product?.reviews || [], perPage);
  const maxPage = _DATA.maxPage;
  const currentData = _DATA.currentData();

  return (
    <section className="my-6">
      <div className="grid grid-cols-1 lg:grid-cols-[30%_70%] gap-8">
        <div className="flex flex-col items-center justify-center gap-4   border-r-2 border-gray-100 ">
          <span className="flex items-baseline gap-2">
            {" "}
            <p className="text-3xl font-medium">4.8</p>
            <p className="text-lg font-normal">out of 5</p>
          </span>
          <div className="flex items-center gap-2">
            <Star className=" text-primary-300 w-6 h-6" />
            <Star className="outline-none text-primary-300 w-6 h-6" />
            <Star className="outline-none text-primary-300 w-6 h-6" />
            <Star className="outline-none text-primary-300 w-6 h-6" />
            <Star className="outline-none text-primary-300 w-6 h-6" />
          </div>
          <p className="text-lg font-normal">
            ( {product.reviews?.length} Reviews)
          </p>
        </div>

        <div className=" px-6 flex flex-col gap-2 justify-center">
          <div className="flex items-center gap-10">
            <p className="font-normal">5 Star</p>
            <Progress value={70} className="w-[70%] h-2 bg-slate-200 " />
          </div>
          <div className="flex items-center gap-10">
            <p className="font-normal">4 Star</p>
            <Progress value={40} className="w-[70%] h-2 bg-slate-200 " />
          </div>
          <div className="flex items-center gap-10">
            <p className="font-normal">3 Star</p>
            <Progress value={20} className="w-[70%] h-2 bg-slate-200 " />
          </div>
          <div className="flex items-center gap-10">
            <p className="font-normal">2 Star</p>
            <Progress value={10} className="w-[70%] h-2 bg-slate-200 " />
          </div>
          <div className="flex items-center gap-10">
            <p className="font-normal">1 Star</p>
            <Progress value={2} className="w-[70%] h-2 bg-slate-200 " />
          </div>
        </div>
      </div>
      <Separator className="mt-6" />
      <div className="flex flex-col gap-2 mt-6">
        <p className="text-lg font-medium">Customer Reviews</p>
        <div className="flex items-center justify-between ">
          <div className="hidden lg:block">
            Showing{" "}
            {maxPage === page ? product?.reviews?.length : perPage * page} of{" "}
            {product?.reviews?.length} results
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
          <div>
            <div className="flex items-center justify-between ">
              <div className="flex items-center gap-2">
                <Avatar>
                  <AvatarImage src="https://github.com/shadcn.png" />
                  <AvatarFallback>CN</AvatarFallback>
                </Avatar>
                <span className="flex flex-col gap-1">
                  <p className="font-medium text-sm lg:text-lg leading-none">
                    {`${review.user?.firstName} ${review.user?.lastName}`}
                  </p>
                  <p className="text-sm text-gray-500 leading-none">
                    (verified)
                  </p>
                </span>
              </div>
              <p className="text-sm lg:text-lg text-gray-500 leading-none">
                1 month ago
              </p>
            </div>
            <p className="text-[16px] lg:text-lg text-gray-500 leading-tight mt-3">
              {review.comment}
            </p>
            <div className="flex items-center gap-2">
              <Star className=" text-primary-300 w-6 h-6" />
              <Star className="outline-none text-primary-300 w-6 h-6" />
              <Star className="outline-none text-primary-300 w-6 h-6" />
              <Star className="outline-none text-primary-300 w-6 h-6" />
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default ProductReview;
