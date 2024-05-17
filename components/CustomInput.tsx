import React from "react";
import { FormField, FormLabel, FormControl, FormMessage } from "./ui/form";
import { Input } from "./ui/input";
import { Control, FieldPath } from "react-hook-form";
import { authFormSchema } from "@/lib/utils";
import { z } from "zod";

const formSchema = authFormSchema('sign-up')

interface CustomInputProps {
  name: FieldPath<z.infer<typeof formSchema>>;
  label: string;
  placeholder: string;
  control: Control<z.infer<typeof formSchema>>;
}

const CustomInput = ({
  control,
  name,
  label,
  placeholder,
}: CustomInputProps) => {
  return (
    <FormField
      control={control}      
      name={name}
      render={({ field }) => (
        <div className="form-item">
          <FormLabel htmlFor={name}>{label}</FormLabel>
          <div className="flex w-full flex-col">
            <FormControl>
              <Input
                placeholder={placeholder}
                type={name === 'password' ? 'password': 'text'}
                className="input-class"
                id={name}
                {...field}
              />
            </FormControl>
            <FormMessage className="form-message mt-15" />
          </div>
        </div>
      )}
    />
  );
};

export default CustomInput;
