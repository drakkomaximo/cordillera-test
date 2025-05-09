import Image from "next/image";

export default function Logos() {
  return (
    <div className="hidden py-[33px] md:py-[120px]">
      <Image className='w-full md:hidden' src='/log_mobile.png' alt='logos' width={375} height={100} />
      <Image className='w-full hidden md:block max-w-[1080px] mx-auto' src='/log_desktop.png' alt='logos' width={1080} height={100} />
    </div>
  );
}
