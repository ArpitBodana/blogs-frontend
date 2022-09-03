export default function Background() {
  return (
    <div className=" min-h-screen md:mt-36 mt-16 fixed">
      <div className="bg-yellow-300  rounded-full absolute top-6 h-32 w-32 md:h-72 md:w-72 mix-blend-multiply  md:left-56 md:-top-26  animate-moving blur-2xl "></div>
      <div className="bg-red-400 rounded-full absolute top-14 h-32 w-32 md:h-72 md:w-72 mix-blend-multiply  md:left-36 md:-top-20 animate-moving animation-delay-2000 blur-2xl"></div>
      <div className="bg-slate-300 rounded-full absolute top-36 h-32 w-32 md:h-72 md:w-72 mix-blend-multiply  md:left-96 md:-top-14 animate-moving  animation-delay-6000 blur-2xl"></div>
      <div className="bg-lime-300 rounded-full absolute top-56 h-32 w-32 md:h-72 md:w-72 mix-blend-multiply  md:left-56 md:-top-8 animate-moving animation-delay-4000 blur-2xl"></div>
    </div>
  );
}
