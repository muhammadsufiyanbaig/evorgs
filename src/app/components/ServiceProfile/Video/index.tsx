export default function Video() {
  return (
    <section className="bg-white rounded-lg px-6">
      <h2 className="py-6 text-xl font-bold">Video</h2>
      <div className="py-6 relative border-t">
        <div className="absolute h-[2px] bg-orange-600 w-1/12 -top-[1px]" />
        <div className="relative  w-full rounded-lg bg-muted overflow-hidden">
          <iframe
            width="100%"
            height="500"
            src="https://www.youtube.com/embed/RiXdDGk_XCU"
            title="How to use Classified Listing WordPress Plugin by RadiusTheme"
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
