import Link from 'next/link';

export default function NotFound() {
  return (
    <section className="min-h-screen bg-white flex items-center justify-center font-sans text-black p-4">
      <div className="container mx-auto max-w-4xl text-center">
        {/* GIF Background Container */}
        <div 
          className="relative h-[400px] w-full flex items-center justify-center bg-center bg-no-repeat mb-[-30px]"
          style={{ backgroundImage: 'url(https://cdn.dribbble.com/users/285475/screenshots/2083086/dribbble_1.gif)' }}
        >
          {/* We position the 404 slightly higher so it doesn't cover the animation at the bottom of the GIF */}
          <h1 className="text-[100px] md:text-[150px] font-extrabold text-black/90 tracking-widest mt-[-120px]">
            404
          </h1>
        </div>
        
        <div className="space-y-4 relative z-10 p-6 rounded-2xl inline-block">
          <h3 className="text-4xl md:text-5xl font-bold">
            Look like you're lost
          </h3>
          <p className="text-gray-600 text-lg md:text-xl max-w-lg mx-auto mb-6">
            Oops! The page you are looking for is not available! Maybe our cute robot took it... 🤖
          </p>
          
          <Link 
            href="/" 
            className="inline-flex mt-4 items-center justify-center px-8 py-3 bg-[#39ac31] hover:bg-[#2d8a27] text-white font-semibold rounded-lg transition-transform hover:scale-105 active:scale-95 shadow-lg shadow-[#39ac31]/40"
          >
            Go to Home
          </Link>
        </div>
      </div>
    </section>
  );
}
