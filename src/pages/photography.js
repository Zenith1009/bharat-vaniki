import React, {useEffect} from 'react'
import Image from 'next/image';
import { slide } from './slide';
import { ArrowLeft, ArrowRight } from 'lucide-react';

const ig2 = () => {
    useEffect(() => {
        slide();
      }, []);

  return (
    <div>
        <header></header>

    <div class="carousel">
        <div class="list">
            <div class="item"> 
                <Image src="/image/img1.jpg" width={1000} height={800}/>
                <div class="content">
                    <div class="title">DESIGN SLIDER</div>
                    <div class="topic">ANIMAL</div>
                    
                </div>
            </div>
            <div class="item">
                <Image src="/image/img2.jpg" width={1000} height={800}/>
                <div class="content">
                    <div class="title">DESIGN SLIDER</div>
                    <div class="topic">ANIMAL</div>
                    
                </div>
            </div>
            <div class="item">
                <Image src="/image/img3.jpg" width={1000} height={800}/>
                <div class="content">
                    <div class="title">DESIGN SLIDER</div>
                    <div class="topic">ANIMAL</div>                    
                </div>
            </div>
            <div class="item">
                <Image src="/image/img4.jpg" width={1000} height={800}/>
                <div class="content">
                    <div class="title">DESIGN SLIDER</div>
                    <div class="topic">ANIMAL</div>                    
                </div>
            </div>
        </div>
        <div class="thumbnail">
            <div class="item">
                <Image src="/image/img1.jpg" width={1000} height={800}/>
                
            </div>
            <div class="item">
                <Image src="/image/img2.jpg" width={1000} height={800}/>
                
            </div>
            <div class="item">
                <Image src="/image/img3.jpg" width={1000} height={800}/>
                
            </div>
            <div class="item">
                <Image src="/image/img4.jpg" width={1000} height={800}/>
                
            </div>
        </div>

        <div class="arrows">
            <button id="prev"> <ArrowLeft/> </button>
            <button id="next"> <ArrowRight /> </button> 
        </div>
        <div class="time"></div>
    </div> 
    </div>
  )
}

export default ig2