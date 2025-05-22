import Image from "next/image";

export default function Home() {
  return (
      <div className="flex justify-between mx-24 py-6">
        <div className="flex justify-center items-center w-[30%]">
          <h2 className="text-4xl">Learning is the <br />first right to <br />every human being</h2>
        </div>
        <Image src="/rbluebg.png" width={700} height={700} alt=""></Image>
      </div>
  );
}
