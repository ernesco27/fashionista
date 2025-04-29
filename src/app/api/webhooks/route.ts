import { prisma } from "@/lib/prisma";
import { verifyWebhook } from "@clerk/nextjs/webhooks";
import { NextRequest } from "next/server";
import { clerkClient } from "@clerk/nextjs/server";

export async function POST(req: NextRequest) {
  try {
    const evt = await verifyWebhook(req);

    if (evt.type === "user.created" && "first_name" in evt.data) {
      const { id, first_name, last_name, email_addresses, image_url } =
        evt.data;
      const email = email_addresses?.[0]?.email_address;
      const emailStatus = email_addresses?.[0]?.verification?.status;

      try {
        const role = "client";
        const client = await clerkClient();
        await client.users.updateUser(id, {
          publicMetadata: {
            role,
          },
        });
      } catch (error) {
        console.error("Error updating user role:", error);
        return new Response(
          JSON.stringify({
            success: false,
            message: "Error updating user role",
          }),
          { status: 500 },
        );
      }

      try {
        await prisma.user.create({
          data: {
            id,
            firstName: first_name ?? "",
            lastName: last_name ?? "",
            email,
            photo: image_url,
            emailVerified: emailStatus === "verified" ? true : false,
          },
        });

        return new Response(
          JSON.stringify({ success: true, message: "User created" }),
          { status: 200 },
        );
      } catch (error) {
        console.error("Error creating user:", error);
        return new Response(
          JSON.stringify({ success: false, message: "Error creating user" }),
          { status: 500 },
        );
      }
    } else if (evt.type === "user.updated" && "first_name" in evt.data) {
      const { id, first_name, last_name, email_addresses, image_url } =
        evt.data;
      const email = email_addresses?.[0]?.email_address;
      const emailStatus = email_addresses?.[0]?.verification?.status;

      try {
        await prisma.user.update({
          where: { id },
          data: {
            firstName: first_name ?? "",
            lastName: last_name ?? "",
            email,
            photo: image_url,
            emailVerified: emailStatus === "verified" ? true : false,
          },
        });

        return new Response(
          JSON.stringify({ success: true, message: "User updated" }),
          { status: 200 },
        );
      } catch (error) {
        console.error("Error updating user:", error);
        return new Response(
          JSON.stringify({ success: false, message: "Error updating user" }),
          { status: 500 },
        );
      }
    } else if (evt.type === "user.deleted" && "id" in evt.data) {
      const { id } = evt.data;

      try {
        await prisma.user.delete({
          where: { id },
        });

        return new Response(
          JSON.stringify({ success: true, message: "User deleted" }),
          { status: 200 },
        );
      } catch (error) {
        console.error("Error deleting user:", error);
        return new Response(
          JSON.stringify({ success: false, message: "Error deleting user" }),
          { status: 500 },
        );
      }
    }

    return new Response(
      JSON.stringify({ success: true, message: "Webhook processed" }),
      { status: 200 },
    );
  } catch (err) {
    console.error("Error verifying webhook:", err);
    return new Response(
      JSON.stringify({ success: false, message: "Error verifying webhook" }),
      { status: 400 },
    );
  }
}
