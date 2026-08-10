const fs = require('fs');
const path = require('path');

const files = [
  path.join(__dirname, 'components/HomePageDesktop.tsx'),
  path.join(__dirname, 'components/HomePageMobile.tsx')
];

const newCounterContent = `const AnimatedCounter = ({ end, duration = 2000, suffix = "", decimals = 0 }: { end: number, duration?: number, suffix?: string, decimals?: number }) => {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          let startTimestamp: number | null = null;
          const step = (timestamp: number) => {
            if (!startTimestamp) startTimestamp = timestamp;
            const progress = Math.min((timestamp - startTimestamp) / duration, 1);
            const easeOut = 1 - Math.pow(1 - progress, 3);
            const currentCount = easeOut * end;
            
            if (ref.current) {
              const formattedCount = Math.round(currentCount) === currentCount || decimals === 0 
                ? Math.round(currentCount) 
                : currentCount.toFixed(decimals);
              ref.current.textContent = formattedCount + suffix;
            }

            if (progress < 1) {
              window.requestAnimationFrame(step);
            } else {
              if (ref.current) {
                const finalCount = Math.round(end) === end || decimals === 0 ? Math.round(end) : end.toFixed(decimals);
                ref.current.textContent = finalCount + suffix;
              }
            }
          };
          window.requestAnimationFrame(step);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );
    if (ref.current) {
      observer.observe(ref.current);
    }
    return () => observer.disconnect();
  }, [end, duration, suffix, decimals]);

  return (
    <div ref={ref} className="fs-num">
      0{suffix}
    </div>
  );
};`;

files.forEach(file => {
  if (fs.existsSync(file)) {
    let content = fs.readFileSync(file, 'utf8');
    
    // Find the AnimatedCounter block and replace it
    const counterRegex = /const AnimatedCounter = \({ end.*?return \([\s\S]*?<\/div>\s*\);\s*};/m;
    
    if (counterRegex.test(content)) {
      content = content.replace(counterRegex, newCounterContent);
      // Also remove setCount from useState since we removed it from the code
      content = content.replace(/const \[count, setCount\] = useState\(0\);/g, '');
      fs.writeFileSync(file, content);
      console.log(`Updated AnimatedCounter in ${file}`);
    } else {
      console.log(`Could not find AnimatedCounter in ${file}`);
    }
  }
});
