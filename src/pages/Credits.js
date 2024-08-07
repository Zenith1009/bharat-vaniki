import Image from "next/image";

const Credits = () => {
  return (
    <div>
      <section className="w-full bg-black relative">
        <div className="shadow absolute bottom-[100%] w-full h-[150px] md:h-[300px] left-0 z-50 bg-gradient-to-b from-transparent to-black"></div>

        <div className="container px-4 py-8 md:p-12 flex flex-col md:flex-row items-center justify-center min-h-screen">
          <div className="content text-white mb-8 md:mb-0 md:w-1/2 transform -translate-y-6 md:-translate-y-12">
            <h3 className="title font-bold text-3xl md:text-4xl mb-4 pb-2 relative inline-block">
              Welcome
              <div className="border absolute h-[3px] bg-white bottom-0 left-0 right-0"></div>
            </h3>
            <p className="text-lg md:text-2xl mt-4">
            We are delighted to have you explore the rich biodiversity and conservation efforts showcased here. Enjoy your journey through the wonders of India's forests and wildlife!
            </p>
          </div>

          <div className="imgContainer md:w-1/2 transform translate-y-6 md:translate-y-12">
            <Image 
              src="/image/bg.jpg" 
              width={800} 
              height={600} 
              layout="responsive"
              alt="Credits background"
            />
          </div>
        </div>
        <div className="borderLine relative w-full h-[3px] bg-white bottom-0 left-0"></div>
      </section>
    </div>
  )
}

export default Credits