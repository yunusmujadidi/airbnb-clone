"use client";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { FieldValue, useForm } from "react-hook-form";
import { useMemo, useState } from "react";
import Modal from "./modal";
import toast from "react-hot-toast";
import useListingModal from "@/app/hooks/useListingModal";
import Heading from "../heading";
import { categories } from "../category";
import CategoryInput from "../categoryinput";
import CountrySelect from "../countryselect";

export const formSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
});

enum STEPS {
  CATEGORY = 0,
  LOCATION = 1,
  INFO = 2,
  IMAGES = 3,
  DESCRIPTION = 4,
  PRICE = 5,
}

const ListingModal = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [step, setStep] = useState<STEPS>(STEPS.CATEGORY);

  const listingModal = useListingModal();

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

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      category: "",
      location: null,
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
  const category = form.watch("category");
  const location = form.watch("location");

  // set custom value to the form
  const setCustomValue = (id: any, value: any) => {
    form.setValue(id, value, {
      shouldDirty: true,
      shouldTouch: true,
      shouldValidate: true,
    });
  };

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      setIsLoading(true);
    } catch (error) {
      console.error(error);
      toast.error("An unexpected error occurred");
    } finally {
      setIsLoading(false);
    }
  };

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
      </div>
    ),
    [STEPS.INFO]: <div>info</div>,
    [STEPS.IMAGES]: <div>images</div>,
    [STEPS.DESCRIPTION]: <div>description</div>,
    [STEPS.PRICE]: <div>price</div>,
  }[step];

  const footerContent = <div></div>;

  return (
    <>
      <Modal
        disabled={isLoading}
        isOpen={listingModal.isOpen}
        title="Listing your property"
        actionLabel={actionLabel}
        onClose={listingModal.onClose}
        onSubmit={step === STEPS.PRICE ? () => onSubmit : next}
        body={bodyContent}
        footer={footerContent}
        secondaryLabel={secondaryLabel}
        secondaryAction={step === STEPS.CATEGORY ? undefined : back}
      />
    </>
  );
};

export default ListingModal;
