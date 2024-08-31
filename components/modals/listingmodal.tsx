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

export const listingSchema = z.object({
  category: z.string().min(1, "Category is required"),
  location: z.any(),
  guestCount: z.number().min(1),
  roomCount: z.number().min(1),
  bathroomCount: z.number().min(1),
  imageSrc: z.string().min(1, "Image is required"),
  price: z.coerce.number().min(1, "Price must be a positive number"),
  title: z.string().min(1, "Title is required"),
  description: z.string().min(1, "Description is required"),
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

  const onSubmit = async (values: z.infer<typeof listingSchema>) => {
    setIsLoading(true);
    try {
      const response = await submitListing(values);
      if (response.success) {
        toast.success("Listing created successfully");
        router.refresh();
        reset();
        setStep(STEPS.CATEGORY);
        listingModal.onClose();
      } else {
        throw new Error("Failed to create listing");
      }
    } catch (error) {
      console.error("Error during listing submission:", error);
      toast.error(
        error instanceof Error ? error.message : "An unexpected error occurred"
      );
    } finally {
      setIsLoading(false);
    }
  };

  const back = () => setStep((value) => value - 1);
  const next = () => setStep((value) => value + 1);

  const actionLabel = useMemo(
    () => (step === STEPS.PRICE ? "Create" : "Next"),
    [step]
  );
  const secondaryLabel = useMemo(
    () => (step === STEPS.CATEGORY ? undefined : "Back"),
    [step]
  );

  const Map = useMemo(
    () =>
      dynamic(() => import("../map"), {
        loading: () => <p>Loading...</p>,
        ssr: false,
      }),
    [location]
  );

  const bodyContent = {
    [STEPS.CATEGORY]: (
      <div className="max-w-4xl mx-auto px-4 py-8">
        <Heading
          title="Which of these best describes your place?"
          subtitle="Pick a category"
          className="text-center mb-8"
        />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 max-h-[60vh] overflow-y-auto pr-2">
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
      <div className="max-w-3xl mx-auto px-4 py-8 space-y-8">
        <Heading
          title="Where is your place located?"
          subtitle="Help guests find you!"
          className="text-center"
        />
        <CountrySelect
          value={location}
          onChange={(value) => setCustomValue("location", value)}
        />
        <div className="mt-6 h-[350px] w-full rounded-lg overflow-hidden">
          <Map center={location?.latling || semarangCenter} />
        </div>
      </div>
    ),
    [STEPS.INFO]: (
      <div className="max-w-2xl mx-auto px-4 py-8 space-y-8">
        <Heading
          title="Share some basics about your place"
          subtitle="What amenities do you have?"
          className="text-center"
        />
        <div className="space-y-6">
          <Counter
            title="Guests"
            subtitle="How many guests can your place accommodate?"
            value={guestCount}
            onChange={(value) => setCustomValue("guestCount", value)}
          />
          <Counter
            title="Rooms"
            subtitle="How many rooms are available?"
            value={roomCount}
            onChange={(value) => setCustomValue("roomCount", value)}
          />
          <Counter
            title="Bathrooms"
            subtitle="How many bathrooms does your place have?"
            value={bathroomCount}
            onChange={(value) => setCustomValue("bathroomCount", value)}
          />
        </div>
      </div>
    ),
    [STEPS.IMAGES]: (
      <div className="max-w-3xl mx-auto px-4 py-8 space-y-8">
        <Heading
          title="Add photos of your place"
          subtitle="Show guests what your place looks like!"
          className="text-center"
        />
        <ImageUpload
          value={imageSrc}
          onChange={(value) => setCustomValue("imageSrc", value)}
        />
      </div>
    ),
    [STEPS.DESCRIPTION]: (
      <div className="max-w-2xl mx-auto px-4 py-8 space-y-8">
        <Heading
          title="How would you describe your place?"
          subtitle="Short and sweet works best!"
          className="text-center"
        />
        <div className="space-y-6">
          <RegisterInput
            id="title"
            label="Title"
            disabled={isLoading}
            register={register}
            errors={errors}
            required
          />
          <RegisterInput
            id="description"
            label="Description"
            disabled={isLoading}
            register={register}
            errors={errors}
            required
          />
        </div>
      </div>
    ),
    [STEPS.PRICE]: (
      <div className="max-w-xl mx-auto px-4 py-8 space-y-8">
        <Heading
          title="Now, set your price"
          subtitle="How much do you want to charge per night?"
          className="text-center"
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
      </div>
    ),
  }[step];

  return (
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
  );
};

export default ListingModal;
