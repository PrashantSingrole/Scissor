import { Link } from "react-router-dom";
import LocationNavigator from "../LocationComponent/LocationNavigator";
import SalonCarousel from "./SalonCarousel";

const SalonCard = (salon) => {
  return (
    <div className="col">
      <div class="card border-color rounded-card card-hover product-card custom-bg h-100">
        <img
          src={"http://localhost:8080/api/salon/" + salon.item.image2}
          class="card-img-top rounded mx-auto d-block m-2"
          alt="img"
          style={{
            maxHeight: "270px",
            maxWidth: "100%",
            width: "auto",
          }}
        />

        {/* <SalonCarousel
      item={{
        carouselId : salon.item.image1, 
        image1 : salon.item.image1,
        image2 : salon.item.image2,
        image3 : salon.item.image3,
      }}
      /> */}

        <div class="card-body text-color">
          <h5 class="card-title d-flex justify-content-between">
            <div>
              <b>{salon.item.name}</b>
            </div>
            <LocationNavigator
              item={{
                id: salon.item.location.id,
                city: salon.item.location.city,
              }}
            />
          </h5>
          <p className="card-text">{salon.item.description}</p>
        </div>
        <div class="card-footer">
          <div className="text-center text-color">
            <p>
              <span>
                <h4>Price Per Service : &#8377;{salon.item.pricePerDay}</h4>
              </span>
            </p>
          </div>
          <div className="d-flex justify-content-center">
            <Link
              to={`/salon/${salon.item.id}/location/${salon.item.location.id}`}
              className="btn bg-color custom-bg-text"
            >
              Book Now
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SalonCard;
