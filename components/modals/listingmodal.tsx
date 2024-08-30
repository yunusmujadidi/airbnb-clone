"use client";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useMemo, useState } from "react";
import Modal from "./modal";
import toast from "react-hot-toast";
import useListingModal from "@/app/hooks/useListingModal";
import Heading from "../heading";
import { categories } from "../category";
import CategoryInput from "../categoryinput";
import CountrySelect from "../countryselect";

import dynamic from "next/dynamic";
import Counter from "../counter";
import ImageUpload from "../imageupload";
import RegisterInput from "./registerinput";
import { submitListing } from "@/lib/actions/registeraction";
import { useRouter } from "next/navigation";
import Button from "../button";

export const listingSchema = z.object({
  category: z.string(),
  location: z.string(),
  guestCount: z.number(),
  roomCount: z.number(),
  bathroomCount: z.number(),
  imageSrc: z.string(),
  price: z.string(),
  title: z.string(),
  description: z.string(),
});

enum STEPS {
  CATEGORY = 0,
  LOCATION = 1,
  INFO = 2,
  IMAGES = 3,
  DESCRIPTION = 4,
  PRICE = 5,
}

const semarangCenter: [number, number] = [-6.9667, 110.4167];

const ListingModal = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [step, setStep] = useState<STEPS>(STEPS.CATEGORY);

  const listingModal = useListingModal();
  const router = useRouter();

  const back = () => {
    setStep((value) => value - 1);
  };

  const next = () => {
    setStep((value) => value + 1);
  };

  const actionLabel = useMemo(() => {
    if (step === STEPS.PRICE) {
      return undefined;
    }

    return "Next";
  }, [step]);

  const secondaryLabel = useMemo(() => {
    if (step === STEPS.CATEGORY) {
      return undefined;
    }

    return "Back";
  }, [step]);

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
    reset,
  } = useForm({
    resolver: zodResolver(listingSchema),
    defaultValues: {
      category: "",
      location: semarangCenter,
      guestCount: 1,
      roomCount: 1,
      bathroomCount: 1,
      imageSrc: "",
      price: 1,
      title: "",
      description: "",
    },
  });

  // watch value from custom components to update the form
  const category = watch("category");
  const location: any = watch("location");
  const guestCount = watch("guestCount");
  const bathroomCount = watch("bathroomCount");
  const roomCount = watch("roomCount");
  const imageSrc = watch("imageSrc");

  // set custom value to the form
  const setCustomValue = (id: any, value: any) => {
    setValue(id, value, {
      shouldDirty: true,
      shouldTouch: true,
      shouldValidate: true,
    });
  };

  async function onSubmit(values: any) {
    if (step !== STEPS.PRICE) {
      return next();
    }
    try {
      setIsLoading(true);
      console.log(values);
      const response = await submitListing(values);
      if (!response) {
        toast.error("An unexpected error occurred. Please try again later");
      }
      toast.success("Listing created successfully");
      router.refresh();
      reset();
      setStep(STEPS.CATEGORY);
      listingModal.onClose();
    } catch (error) {
      console.error(error);
      toast.error("An unexpected error occurred");
    } finally {
      setIsLoading(false);
    }
  }

  const Map = dynamic(() => import("../map"), {
    ssr: false,
  });

  const bodyContent = {
    [STEPS.CATEGORY]: (
      <div className="flex flex-col gap-8">
        <Heading
          title="Which of these best describe your place?"
          subtitle="Pick a category"
        />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 max-h-[50vh] overflow-y-auto">
          {categories.map((item) => (
            <div key={item.label} className="col-span-1">
              <CategoryInput
                icon={item.icon}
                label={item.label}
                selected={category === item.label}
                onClick={(category) => setCustomValue("category", category)}
              />
            </div>
          ))}
        </div>
      </div>
    ),
    [STEPS.LOCATION]: (
      <div className="flex flex-col gap-8">
        <Heading
          title="Where is your place located?"
          subtitle="Help the quest find you!"
        />
        <CountrySelect
          value={location}
          onChange={(value) => setCustomValue("location", value)}
        />
        <Map center={location?.latling || semarangCenter} />
      </div>
    ),
    [STEPS.INFO]: (
      <div className="flex flex-col gap-8">
        <Heading
          title="Share some basic about your place"
          subtitle="What amenities do you have?"
        />
        <Counter
          title="Guests"
          subtitle="How many guests?"
          value={guestCount}
          onChange={(value) => setCustomValue("guestCount", value)}
        />
        <Counter
          title="Rooms"
          subtitle="How many rooms do tou have?"
          value={roomCount}
          onChange={(value) => setCustomValue("roomCount", value)}
        />
        <Counter
          title="Bathrooms"
          subtitle="How many bathrooms do tou have?"
          value={bathroomCount}
          onChange={(value) => setCustomValue("bathroomCount", value)}
        />
      </div>
    ),
    [STEPS.IMAGES]: (
      <div className="flex flex-col gap-8">
        <Heading
          title="Add a photo to your place"
          subtitle="Show guest what your place looks like!"
        />
        <ImageUpload
          value={imageSrc}
          onChange={(value) => setCustomValue("imageSrc", value)}
        />
      </div>
    ),
    [STEPS.DESCRIPTION]: (
      <div className="flex flex-col gap-8">
        <Heading
          title="How would you describe your place?"
          subtitle="Short and sweet works best!"
        />
        <RegisterInput
          id="title"
          label="Title"
          disabled={isLoading}
          register={register}
          errors={errors}
          required
        />
        <hr />
        <RegisterInput
          id="description"
          label="Description"
          disabled={isLoading}
          register={register}
          errors={errors}
          required
        />
      </div>
    ),
    [STEPS.PRICE]: (
      <div className="flex flex-col gap-8">
        <Heading
          title="Now, set the price"
          subtitle="How much do you want to charge per night?"
        />
        <RegisterInput
          formatPrice
          id="price"
          label="Price"
          type="number"
          disabled={isLoading}
          register={register}
          errors={errors}
          required
        />
        <Button
          onClick={handleSubmit(onSubmit)}
          disabled={isLoading}
          label="Submit"
        />
      </div>
    ),
  }[step];

  return (
    <>
      <Modal
        disabled={isLoading}
        isOpen={listingModal.isOpen}
        title="Listing your property"
        actionLabel={actionLabel}
        onClose={listingModal.onClose}
        onSubmit={step === STEPS.PRICE ? handleSubmit(onSubmit) : next}
        body={bodyContent}
        secondaryLabel={secondaryLabel}
        secondaryAction={step === STEPS.CATEGORY ? undefined : back}
      />
    </>
  );
};

export default ListingModal;
