import { useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { Build } from '@/types';

export default function BuildPage() {
  const { buildId } = useParams();
  
  const { data: build } = useQuery({
    queryKey: ['build', buildId],
    queryFn: async () => {
      const { data } = await supabase
        .from('mi3dp_builds')
        .select('*')
        .eq('id', buildId)
        .single();
        
      return data as Build;
    }
  });

  if (!build) return null;

  return (
    <div>
      <h1>{build.name}</h1>
      <p>{build.description}</p>
      
      <div>
        <h2>Build Volume</h2>
        <div>
          <span>X: {build.build_volume.x}{build.build_volume.units}</span>
          <span>Y: {build.build_volume.y}{build.build_volume.units}</span>
          <span>Z: {build.build_volume.z}{build.build_volume.units}</span>
        </div>
      </div>
      
      <div>
        <h2>Parts</h2>
        <ul>
          {build.parts.map(part => (
            <li key={part.id}>
              {part.name} (Quantity: {part.quantity})
            </li>
          ))}
        </ul>
      </div>

      <div>
        <h2>Images</h2>
        <div>
          {build.images.map(image => (
            <img key={image.url} src={image.url} alt={image.alt} />
          ))}
        </div>
      </div>
    </div>
  );
}
