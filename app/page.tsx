import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <div>
      <h1 className=" flex items-center justify-center mt-5 ">
        LinkedIn{" "}
        <span className=" animate-bounce text-purple-500 pl-1">
          {" "}
          <Button>clone</Button>
        </span>
      </h1>
    </div>
  );
}
