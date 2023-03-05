import { NextApiRequest, NextApiResponse } from "next";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const {
    year,
    make,
    model,
    convertible,
    cylinders,
    engine,
    extColor,
    intColor,
    insurancePolicyNumber,
    pwrSteering,
    rentalCostDay,
    rentalStatus,
    title,
    transmission,
    trim,
    turoLink,
    type,
    vin,
  } = req.body;
  try {
    console.log(year);
    console.log(make);
    console.log(model);
    console.log(convertible);
    console.log(cylinders);
    console.log(engine);
    console.log(extColor);
    console.log(intColor);
    console.log(insurancePolicyNumber);
    console.log(pwrSteering);
    console.log(rentalCostDay);
    console.log(rentalStatus);
    console.log(title);
    console.log(transmission);
    console.log(trim);
    console.log(turoLink);
    console.log(type);
    console.log(vin);
  } catch (error) {
    res.status(error.statusCode || 500).json({ error: error.message });
  }

  return res.status(200).json({ message: "Vehicle Added" });
};
