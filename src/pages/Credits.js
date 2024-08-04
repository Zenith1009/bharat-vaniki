import Image from "next/image";

const Credits = () => {
  return (
    <div>
        <section className="w-full bg-black relative">
        <div class="shadow absolute bottom-[100%] w-full h-[300px] left-0 z-50 bg-gradient-to-b from-transparent to-black"></div>

        <div class="container p-12 grid grid-cols-2 items-center justify-center min-h-[100vh]">
          <div class="content opacity text-white m-8 transform -translate-y-12">
            <h3 class="title font-bold text-4xl mb-4 pb-2 relative">
              Credits
              <div class="border absolute h-[3px] bg-white bottom-0 left-0"></div>
            </h3>
            <p class="text-2xl">
              Lorem ipsum dolor, sit amet consectetur adipisicing elit. Eaque
              officiis quos expedita ipsa, a quidem inventore voluptates debitis
              accusamus tenetur qui et voluptas dicta, culpa earum, doloribus
              odio consectetur consequuntur soluta quasi nobis! Deserunt
              voluptatum reiciendis iure expedita sequi quisquam laboriosam
              temporibus exercitationem.
            </p>
          </div>

          <div class="imgContainer opacity m-8 transform translate-y-12">
            <Image src="/img/background.png" width={800} height={600} />
          </div>
        </div>
        <div class="borderLine relative w-full h-[3px] bg-white bottom-0 left-0"></div>
      </section>
    </div>
  )
}

export default Credits