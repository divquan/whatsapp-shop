import Link from "next/link";
import Image from "next/image";

const collections = [
  {name: 'women', id: 1, image: 'https://images.unsplash.com/photo-1493655161922-ef98929de9d8?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=870&q=80'},
  {name: 'men', id: 2, image: 'https://images.unsplash.com/photo-1579635480803-b990e007f508?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=387&q=80'},
]

export default function SexLink() {
    return (
        <div className="grid grid-cols-2 gap-2">
          {collections.map((collection) => (
            <div key={collection.id} className="relative">
              <Link href={`/collections/${collection.name}`}>
                <Image
                  width={500}
                  height={500}
                    className="h-[160px] lg:h-[230px] w-full rounded-sm object-cover"
                    src={collection.image}
                    alt={'Women posing'}
                  />
                  <p className="absolute top-[50%] left-0 right-0 translate-y-[-50%] text-white inset-0 text-xl tracking-wider flex hover:shadow-lg items-center capitalize font-semibold justify-center h-full">{collection.name}</p>
              </Link>
            </div>
          ))}
        </div>
    );
};