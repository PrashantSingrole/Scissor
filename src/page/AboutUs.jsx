const AboutUs = () => {
  return (
    <div className="container mt-4">
      <h2 className="text-center mb-4">About Us</h2>
      <p className="text-center">
        Welcome to <strong>SalonHub</strong>, your go-to destination for premium
        salon services. We believe in delivering the best beauty and wellness
        experiences to our customers.
      </p>

      <div className="row mt-4">
        {/* About Us Content */}
        <div className="col-md-6">
          <h5>Who We Are</h5>
          <p>
            At <strong>SalonHub</strong>, we bring together skilled
            professionals and high-quality services to ensure our clients look
            and feel their best. Our expert stylists and beauty professionals
            are dedicated to providing top-notch salon treatments.
          </p>
          <h5>Our Mission</h5>
          <p>
            Our mission is to revolutionize the salon industry by providing
            seamless and convenient services through our innovative platform. We
            aim to offer a luxurious experience at your convenience.
          </p>
        </div>

        {/* Image Section */}
        <div className="col-md-6 text-center">
          <img
            src="https://us.123rf.com/450wm/emojiimage/emojiimage2010/emojiimage201000493/157053389-young-woman-in-beauty-salon-washing-and-drying-hair-vector-illustration-set.jpg?ver=6"
            alt="Salon"
            className="img-fluid rounded shadow"
          />
        </div>
      </div>

      {/* Why Choose Us Section */}
      <div className="row mt-5">
        <div className="col-md-4 text-center">
          <i className="bi bi-scissors fs-1 text-primary"></i>
          <h5 className="mt-3">Expert Stylists</h5>
          <p>
            Our team consists of highly skilled professionals with years of
            experience.
          </p>
        </div>
        <div className="col-md-4 text-center">
          <i className="bi bi-calendar-check fs-1 text-primary"></i>
          <h5 className="mt-3">Easy Booking</h5>
          <p>Schedule your appointments hassle-free through our platform.</p>
        </div>
        <div className="col-md-4 text-center">
          <i className="bi bi-heart-fill fs-1 text-danger"></i>
          <h5 className="mt-3">Customer Satisfaction</h5>
          <p>
            We prioritize customer happiness and ensure a delightful experience.
          </p>
        </div>
      </div>
    </div>
  );
};

export default AboutUs;
