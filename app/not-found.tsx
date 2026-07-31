import Link from 'next/link';

export default function NotFound() {
  return (
    <section className="h-screen w-screen overflow-hidden bg-white flex flex-col items-center justify-center font-sans text-black p-4">
      <div className="container mx-auto max-w-4xl text-center flex flex-col items-center justify-center h-full">
        {/* GIF Background Container */}
        <div 
          className="relative h-[300px] md:h-[400px] w-full bg-center bg-no-repeat bg-contain"
          style={{ backgroundImage: 'url(https://cdn.dribbble.com/users/285475/screenshots/2083086/dribbble_1.gif)' }}
        >
          {/* Text is placed at the top so it doesn't overlap the character */}
          <h1 className="text-[80px] md:text-[100px] font-extrabold text-black/90 tracking-widest pt-4 md:pt-10">
            404
          </h1>
        </div>
        
        <div className="space-y-2 md:space-y-4 relative z-10 p-2 md:p-6 rounded-2xl -mt-10 md:-mt-20">
          <h3 className="text-3xl md:text-5xl font-bold">
            Look like you're lost
          </h3>
          <p className="text-gray-600 text-base md:text-xl max-w-lg mx-auto mb-4 md:mb-6">
            Oops! The page you are looking for is not available! Maybe our cute robot took it... 🤖
          </p>
          
          <Link 
            href="/" 
            className="inline-flex mt-2 md:mt-4 items-center justify-center px-6 md:px-8 py-3 bg-[#39ac31] hover:bg-[#2d8a27] text-white font-semibold rounded-lg transition-transform hover:scale-105 active:scale-95 shadow-lg shadow-[#39ac31]/40"
          >
            Go to Home
          </Link>
        </div>
      </div>
    </section>
  );
}
