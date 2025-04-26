"use server";

import { prisma } from "../lib/prisma";
import { ProductReview } from "@/types";
import { revalidatePath } from "next/cache";

type ReviewPayload = {
  reviewTitle: string;
  rating: number;
  reviewDetails: string;
  reviewImages?: string[];
  userId: string;
  productId: number;
};

export async function createReview(formData: ReviewPayload) {
  console.log("Creating review with data:", formData);

  if (!formData || typeof formData !== "object") {
    throw new Error("Invalid form data received");
  }

  try {
    // Validate required fields
    if (
      !formData.reviewTitle ||
      !formData.rating ||
      !formData.reviewDetails ||
      !formData.userId ||
      !formData.productId
    ) {
      throw new Error("Missing required fields");
    }

    // Validate the user ID
    const userExists = await prisma.user.findUnique({
      where: { id: formData.userId },
    });

    if (!userExists) {
      throw new Error(`User with ID ${formData.userId} does not exist.`);
    }

    // Create the review
    const review = await prisma.productReview.create({
      data: {
        reviewTitle: formData.reviewTitle,
        rating: formData.rating,
        reviewDetails: formData.reviewDetails,
        userId: formData.userId,
        productId: formData.productId,
      },
    });

    if (!review) {
      throw new Error("Failed to create review.");
    }

    // Create review images if provided
    if (formData.reviewImages && formData.reviewImages.length > 0) {
      await prisma.productReviewImage.createMany({
        data: formData.reviewImages.map((link) => ({
          link,
          slug: `review-image-${review.id}-${Date.now()}`,
          reviewId: review.id,
        })),
      });
    }

    // revalidatePath(`/products/${formData.productId}`);
    return { success: true, error: false };
  } catch (err) {
    console.error("Error creating review:", err);
    return { success: false, error: true };
  }
}

export async function updateReview(formData: ProductReview, reviewId: number) {
  try {
    await prisma.productReview.update({
      where: {
        id: reviewId,
      },
      data: {
        reviewTitle: formData.reviewTitle,
        rating: formData.rating,
        reviewDetails: formData.reviewDetails,
        updatedAt: new Date(),
      },
    });

    revalidatePath("/products/[productId]");
    return { success: true, error: false };
  } catch (err) {
    console.error("Error updating review:", err);
    return { success: false, error: true };
  }
}

export async function deleteReview(reviewId: number) {
  try {
    await prisma.productReview.delete({
      where: {
        id: reviewId,
      },
    });

    revalidatePath("/products/[productId]");
    return { success: true, error: false };
  } catch (err) {
    console.error("Error deleting review:", err);
    return { success: false, error: true };
  }
}
