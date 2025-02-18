import { SignUp } from "@clerk/nextjs";

export default function Page() {
  return (
    <div className="h-full grid grid-cols-1 lg:grid-cols-2">
      <div className="hidden bg-cover bg-center bg-[url('/assets/signup-image.jpg')] lg:flex"></div>
      <div className="flex justify-center items-center">
        <SignUp
          appearance={{
            variables: {
              fontSize: "18px",
            },
          }}
        />
      </div>
    </div>
  );
}
