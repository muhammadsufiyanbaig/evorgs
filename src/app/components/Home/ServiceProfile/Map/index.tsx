export default function Map() {

  return (
    <section className="bg-white rounded-lg px-6">
          <h2 className="py-6 text-xl font-bold">Location/Map</h2>
      <div className="py-6 relative border-t">
      <div className="absolute h-[2px] bg-orange-600 w-1/12 -top-[1px]" />
        <div className="relative h-96 md:h-auto md:aspect-[16/9] w-full rounded-lg bg-muted">
          <iframe
            src={`https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d14475.799247228457!2d67.1095609!3d24.8996935!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3eb339e74fb94d59%3A0x1f060e0c084792f8!2sInnovative%20Widget%20-%20One%20Window%20Digital%20Solution-%20Best%20Digital%20Marketing%20Agency%20-%20Best%20Digital%20Marketing%20Company!5e0!3m2!1sen!2s!4v1732093315281!5m2!1sen!2s`}
            className="absolute inset-0 h-full w-full rounded-lg"
            allowFullScreen
            loading="lazy"
            no-referrer-when-downgrade="no-referrer-when-loaded"
          />
        </div>
      </div>
    </section>
  );
}
