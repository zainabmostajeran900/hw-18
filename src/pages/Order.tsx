import React from "react";
import { Controller, useForm } from "react-hook-form";
import { Input } from "../components/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { OrderSchema } from "../validator/order.validation";

interface IForm {
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  address: string;
  fixedNumber: string;
}

export const Order: React.FC = () => {

  const formField = useForm<IForm>({
    mode: "all",
    resolver: zodResolver(OrderSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      phoneNumber: "",
      address: "",
      fixedNumber: "",
    },
  });

  const submit = (data: IForm) => {
    console.log(data);
  };

  return (
    <form
      className="flex flex-col mx-auto max-w-md bg-white py-6 px-8 rounded-lg shadow-md my-10 space-y-4"
      onSubmit={formField.handleSubmit(submit)}
    >
      <h2 className="font-bold text-center text-2xl">Order Details</h2>

      <Controller
        control={formField.control}
        name="firstName"
        render={({ field, fieldState }) => (
          <Input
            type="firstName"
            label="firstName"
            placeholder="firstName"
            error={fieldState.error?.message}
            {...field}
          />
        )}
      />
      <Controller
        control={formField.control}
        name="lastName"
        render={({ field, fieldState }) => (
          <Input
            type="lastName"
            label="lastName"
            placeholder="lastName"
            error={fieldState.error?.message}
            {...field}
          />
        )}
      />
      <Controller
        control={formField.control}
        name="email"
        render={({ field, fieldState }) => (
          <Input
            type="email"
            label="email"
            placeholder="email"
            error={fieldState.error?.message}
            {...field}
          />
        )}
      />
      <Controller
        control={formField.control}
        name="phoneNumber"
        render={({ field, fieldState }) => (
          <Input
            type="phoneNumber"
            label="phoneNumber"
            placeholder="phoneNumber"
            error={fieldState.error?.message}
            {...field}
          />
        )}
      />

      <Controller
        control={formField.control}
        name="address"
        render={({ field, fieldState }) => (
          <Input
            type="address"
            label="address"
            placeholder="address"
            error={fieldState.error?.message}
            {...field}
          />
        )}
      />
      <Controller
        control={formField.control}
        name="fixedNumber"
        render={({ field, fieldState }) => (
          <Input
            type="fixedNumber"
            label="fixedNumber"
            placeholder="fixedNumber"
            error={fieldState.error?.message}
            {...field}
          />
        )}
      />
      <button 
        className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded-lg "
        type="submit"
      >
        Submit Order
      </button>
    </form>
  );
};
