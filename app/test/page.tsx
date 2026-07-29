import WebGLVisibilityWrapper from '@/components/WebGLVisibilityWrapper';
import Particles from '@/components/Particles';

export default function TestPage() {
  return (
    <div style={{ height: '2000px', width: '100vw', background: 'blue' }}>
      <div style={{ position: 'absolute', top: '1000px', width: '400px', height: '400px', background: 'red' }}>
        <WebGLVisibilityWrapper>
          <Particles />
        </WebGLVisibilityWrapper>
      </div>
    </div>
  );
}
