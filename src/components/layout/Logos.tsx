export default function Logos() {
  return (
    <div className=" py-[33px] md:py-[120px]">
      <img className='w-full md:hidden' src='/log_mobile.png' alt='logos' />
      <img className='w-full hidden md:block max-w-[1080px] mx-auto' src='/log_desktop.png' alt='logos' />
    </div>
  );
}
