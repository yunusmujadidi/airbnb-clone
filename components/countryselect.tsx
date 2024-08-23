import useCountries from "@/app/hooks/useCountries";
import Select from "react-select";

export type CountrySelectValue = {
  flag: string;
  label: string;
  latling: number[];
  region: string;
  value: string;
};

interface CountrySelectProps {
  value?: CountrySelectValue | null;
  onChange: (value: CountrySelectValue) => void;
}

const CountrySelect = ({ value, onChange }: CountrySelectProps) => {
  const { getAll } = useCountries();

  return (
    <Select
      placeholder="Anywhere"
      isClearable
      options={getAll()}
      value={value}
      onChange={(value) => onChange(value as CountrySelectValue)}
      formatOptionLabel={(option: CountrySelectValue) => (
        <div className="flex flex-row items-center gap-3">
          <div>{option.flag}</div>
          <div>
            {option.label}
            <span className="text-neutral-500 ml-1">{option.region}</span>
          </div>
        </div>
      )}
      classNames={{
        control: () => "p-1 border-2",
        input: () => "text-lg",
        option: () => "text-lg",
      }}
      theme={(theme) => ({
        ...theme,
        borderRadius: 6,
        colors: {
          ...theme.colors,
          primary: "black",
          primary25: "#ffe4e6",
        },
      })}
    />
  );
};

export default CountrySelect;
