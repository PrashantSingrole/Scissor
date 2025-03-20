const ContactUs = () => {
  return (
    <div className="container mt-4">
      <h2 className="text-center mb-4">Contact Us</h2>
      <p className="text-center">
        Have questions or need assistance? Feel free to reach out to us. Our
        team is here to help you!
      </p>

      <div className="row mt-4">
        {/* Contact Details */}
        <div className="col-md-6">
          <h5>Get in Touch</h5>
          <p>
            <i className="bi bi-geo-alt-fill"></i> 123, Main Street, Your City,
            Country
          </p>
          <p>
            <i className="bi bi-envelope-fill"></i> support@salonhub.com
          </p>
          <p>
            <i className="bi bi-telephone-fill"></i> +1 234 567 890
          </p>
          <p>
            <i className="bi bi-clock-fill"></i> Mon - Sat: 9:00 AM - 8:00 PM
          </p>
        </div>

        {/* Contact Form */}
        <div className="col-md-6">
          <h5>Send Us a Message</h5>
          <form>
            <div className="mb-3">
              <label className="form-label">Your Name</label>
              <input
                type="text"
                className="form-control"
                placeholder="Enter your name"
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Email Address</label>
              <input
                type="email"
                className="form-control"
                placeholder="Enter your email"
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Message</label>
              <textarea
                className="form-control"
                rows="3"
                placeholder="Type your message..."
              ></textarea>
            </div>
            <button type="submit" className=" btn bg-color custom-bg-text">
              Send Message
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ContactUs;
