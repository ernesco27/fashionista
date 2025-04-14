import React from "react";
import Container from "./Container";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { Product } from "@/types";
import ProductReview from "./ProductReview";
const ProductInfo = ({ product }: { product: Product }) => {
  console.log("product", product);

  return (
    <section>
      <Container>
        <div className="w-full ">
          <Tabs defaultValue="description" className="w-full">
            <TabsList className="flex justify-center">
              <TabsTrigger className="text-lg" value="description">
                Description
              </TabsTrigger>
              <TabsTrigger className="text-lg" value="additional-info">
                Additional Information
              </TabsTrigger>
              <TabsTrigger className="text-lg" value="review">
                Review
              </TabsTrigger>
            </TabsList>
            <TabsContent value="description" className="lg:px-10">
              <div>
                <p className="font-normal text-lg">
                  {product.description ? product.description : ""}
                </p>
              </div>
            </TabsContent>
            <TabsContent value="additional-info" className="lg:px-10">
              <div>
                <Table>
                  <TableHeader className="bg-primary-300">
                    <TableRow>
                      <TableHead className="w-[190px] text-black text-lg">
                        Feature
                      </TableHead>
                      <TableHead className="text-black text-lg">
                        Description
                      </TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    <TableRow>
                      <TableCell className="font-medium text-lg">
                        Material
                      </TableCell>
                      <TableCell className="text-lg">Cotton</TableCell>
                    </TableRow>
                    {product.variants &&
                      product.variants.length > 0 &&
                      product.variants.map((variant) => (
                        <TableRow key={variant.id}>
                          <TableCell className="font-medium text-lg">
                            {variant.name}
                          </TableCell>
                          <TableCell>
                            {variant.values?.map((value, index) => (
                              <span className=" text-lg" key={value.id}>
                                {value.value}
                                {index < (variant.values?.length || 0) - 1
                                  ? ", "
                                  : ""}
                              </span>
                            ))}
                          </TableCell>
                        </TableRow>
                      ))}

                    <TableRow>
                      <TableCell className="font-medium text-lg">
                        Country of Origin
                      </TableCell>
                      <TableCell className="text-lg">Ghana</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium text-lg">
                        Brand
                      </TableCell>
                      <TableCell className="text-lg">
                        {product.brand?.name}
                      </TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </div>
            </TabsContent>

            <TabsContent value="review" className="lg:px-10 ">
              <ProductReview product={product} />
            </TabsContent>
          </Tabs>
        </div>
      </Container>
    </section>
  );
};

export default ProductInfo;
