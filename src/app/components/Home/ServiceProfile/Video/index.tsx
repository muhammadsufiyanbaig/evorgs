interface VideoProps {
  serviceData?: any;
  serviceType?: 'catering' | 'farmhouse' | 'venue' | 'photography' | null;
}

export default function Video({ serviceData, serviceType }: VideoProps) {
  const videoUrl = serviceData?.video || serviceData?.videoUrl || "https://www.youtube.com/embed/RiXdDGk_XCU";
  
  return (
    <section className="bg-white rounded-lg px-6">
      <h2 className="py-6 text-xl font-bold">Video</h2>
      <div className="py-6 relative border-t">
        <div className="absolute h-[2px] bg-orange-600 w-1/12 -top-[1px]" />
        <div className="relative  w-full rounded-lg bg-muted overflow-hidden">
          <iframe
            width="100%"
            height="500"
            src={videoUrl}
            title="Service Video"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            referrerPolicy="strict-origin-when-cross-origin"
            allowFullScreen
          ></iframe>
        </div>
      </div>
    </section>
  );
}
