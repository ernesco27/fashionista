import CategoryContainer from "@/components/custom/CategoryContainer";

import React from "react";

const CategoryDetails = async ({
  params,
}: {
  params: Promise<{ categoryId: string }>;
}) => {
  const { categoryId } = await params;

  return (
    <div>
      <CategoryContainer categoryId={categoryId} />
    </div>
  );
};

export default CategoryDetails;
