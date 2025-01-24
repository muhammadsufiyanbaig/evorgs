import BreadCrumb from "../../Breadcrumb";


const ContactBanner = () => {
  return (
    <section>
      <div
        className="h-60 bg-cover"
        style={{
          backgroundImage:
            "url('https://radiustheme.com/demo/wordpress/themes/listygo/wp-content/uploads/2022/09/img-29-min.jpg')",
        }}
      >
        <div className="breadcrumb h-full w-full bg-black/70 flex justify-center items-center">
          <div className="flex flex-col justify-center items-center gap-3">
            <h2 className="text-5xl text-white font-semibold ">Contact Us</h2>
            <BreadCrumb />
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactBanner;
