import Link from 'next/link';

export default function NotFound() {
  return (
    <section className="h-screen w-screen overflow-hidden bg-white flex flex-col items-center justify-center font-sans text-black relative">
      
      {/* Massive Background Watermark */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-[0.03]">
        <h1 className="text-[30vw] font-black tracking-tighter select-none">404</h1>
      </div>

      {/* Floating decorative elements for a broken/funny vibe */}
      <div className="absolute top-10 left-10 text-4xl animate-bounce" style={{ animationDuration: '3s' }}>🛸</div>
      <div className="absolute top-20 right-20 text-4xl animate-pulse">🪐</div>
      <div className="absolute bottom-20 left-20 text-4xl animate-spin" style={{ animationDuration: '4s' }}>⚙️</div>
      <div className="absolute bottom-32 right-32 text-3xl animate-bounce" style={{ animationDuration: '2s', animationDelay: '1s' }}>👀</div>

      <div className="container mx-auto max-w-4xl text-center flex flex-col items-center justify-center h-full relative z-10 px-4">
        
        {/* GIF Background Container */}
        <div 
          className="relative h-[250px] md:h-[350px] w-full max-w-[600px] mx-auto bg-center bg-no-repeat bg-contain"
          style={{ backgroundImage: 'url(https://cdn.dribbble.com/users/285475/screenshots/2083086/dribbble_1.gif)' }}
        />
        
        <div className="space-y-4 md:space-y-6 relative z-10 p-4 md:p-8 rounded-3xl -mt-4 bg-white/60 backdrop-blur-sm border border-gray-100 shadow-2xl shadow-gray-200/50">
          
          <h3 className="text-4xl md:text-6xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-gray-900 via-gray-700 to-gray-900 animate-pulse">
            Houston, We Have a Problem!
          </h3>
          
          <div className="space-y-2">
            <p className="text-gray-600 text-lg md:text-xl font-medium max-w-lg mx-auto">
              The page you are looking for has been abducted by aliens... or maybe our cute robot ate the wires. 🤖⚡
            </p>
            <p className="text-gray-400 text-sm md:text-base italic">
              (Either way, it's definitely not here).
            </p>
          </div>
          
          <div className="pt-4">
            <Link 
              href="/" 
              className="group inline-flex items-center justify-center px-8 md:px-10 py-4 bg-gray-900 hover:bg-black text-white font-bold text-lg rounded-2xl transition-all duration-300 hover:scale-110 active:scale-95 shadow-[0_10px_40px_-10px_rgba(0,0,0,0.5)] overflow-hidden relative"
            >
              <span className="absolute inset-0 w-full h-full -mt-1 rounded-lg opacity-30 bg-gradient-to-b from-transparent via-transparent to-black"></span>
              <span className="relative flex items-center gap-2">
                Flee to Homepage <span className="group-hover:translate-x-2 transition-transform duration-300">🏃‍♂️💨</span>
              </span>
            </Link>
          </div>
        </div>

      </div>
    </section>
  );
}
