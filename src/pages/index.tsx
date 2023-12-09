import useGeolocation from "@/lib/hooks/useGeolocaiton";
import { Location } from "@/lib/types";
import * as React from "react";
import { Card, CardBody } from "@nextui-org/react";
import { CiLocationOn } from "react-icons/ci";
import Image from "next/image";

const Home = () => {
  const location: Location = useGeolocation();

  return (
    <div className="flex flex-col gap-4 h-full">
      <div className="text-4xl font-bold">
        <span className="text-green-600">Grocery</span>
        <br />
        at your
        <br /> fingertips!
      </div>
      <Card className="bg-nord1 mt-5">
        <CardBody className="flex flex-row gap-3 items-center overflow-hidden">
          <CiLocationOn size={30} />
          <span className="font-bold text-blue-500">Location :</span>
          <span>
            {location.longitude}&nbsp;&nbsp;{location.latitude}
          </span>
        </CardBody>
      </Card>
      <div className="w-full font-bold text-5xl mt-5">Essentials</div>
      <Card
        className="bg-green/50 w-full h-[250px] flex flex-row gap-4 justify-between px-4 items-center"
        isPressable
      >
        <div className="h-full flex items-center justify-center text-3xl">
          Edibles
        </div>
        <div className="h-full flex-[0.7] flex justify-center items-center">
          <Image
            src="/images/veg.jpg"
            alt="Veggies"
            layout="contain"
            width={1000}
            height={1000}
            className="mix-blend-color-burn"
          />
        </div>
      </Card>
      <Card
        className="bg-green/50 w-full h-[250px] flex flex-row gap-4 justify-between px-4 items-center"
        isPressable
      >
        <div className="h-full flex items-center justify-center text-3xl">
          Toiletries
        </div>
        <div className="h-full flex-[0.7] flex justify-center items-center">
          <Image
            src="/images/cleaner.jpg"
            alt="Veggies"
            layout="contain"
            width={1000}
            height={1000}
            className="mix-blend-color-burn"
          />
        </div>
      </Card>
    </div>
  );
};

export default Home;
