import { Input } from "@nextui-org/react";

// eslint-disable-next-line react/prop-types
export const InputForm = ({ register, errors, value, name, tipo, onChange, text  }) => {
  return (
    <>
      <div className="mb-2">
        <div className=" z-0 w-full">
          <label
            htmlFor={name}
            className=" text-sm text-green-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75  -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 "
          >
            {text}:
          </label>
          <Input
            type={tipo}
            variant="bordered"
            radius="sm"
            name={name}
            id={name}
            label={text} //?
            isInvalid={errors[name] ? true : false}
            autoFocus
            /*  eslint-disable-next-line react/prop-types  */
            errorMessage={errors[name]?.message}
            autoComplete="off"
            {...register(name, {
              required: {
                value: true,
                message: `${name} es obligatorio`,
              },
            })}
            value={value}
            onChange={onChange}
          />
        </div>
      </div>
    </>
  );
}
