import { SignUp } from "@clerk/nextjs";

export default function Page() {
  return (
    <div className="w-screen h-screen flex justify-center items-center">
      <SignUp />
    </div>
  );
}
