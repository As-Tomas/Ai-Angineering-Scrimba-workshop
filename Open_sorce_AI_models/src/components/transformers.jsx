import  { useEffect, useState } from 'react';
import road from "../images/road.jpeg";

// import { pipeline } from 'https://cdn.jsdelivr.net/npm/@xenova/transformers@2.8.0';
import { pipeline } from '@xenova/transformers'; // irasytas npm i @xenova/transformers

const Transformers = () => {
    const [status, setStatus] = useState('Loading model...');
    const imageSrc = road; // replace with your image source
    // const imageSrc = 'https://huggingface.co/datasets/Xenova/transformers.js-docs/resolve/main/cats.jpg'; // replace with your image source

  
    useEffect(() => {
      const loadModelAndDetectObjects = async () => {
        const detector = await pipeline('object-detection', 'Xenova/detr-resnet-50');
        setStatus('Ready!');
  
        const detectedObjects = await detector(imageSrc, { threshold: 0.9 });
        detectedObjects.forEach(object => {
          console.log(object);
        });
  
        setStatus('Done!');
      };
  
      loadModelAndDetectObjects();
    }, [imageSrc]);
    
  return (
    <div>
        <div className=' font-medium'>{status}</div>

         <p>{status}</p>
        <div className='flex'>
            <img className='w-1/3'
            src={imageSrc} alt="road" />
        </div>
    </div>
  )
}

export default Transformers;
