import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";

import { useNavigate } from "react-router-dom";

import { MainNav } from "@/components/MainNav";
import { navigationLinks } from "../config/navigationLinks";
import { UserNav } from "./CustomersPage/components/UserNav";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import { ToastAction } from "@/components/ui/toast";
import { useToast } from "@/components/ui/use-toast";

const FormSchema = z.object({
  name: z.string().min(3, {
    message: "name must be at least 3 characters.",
  }),
  surname: z.string().min(3, {
    message: "surname must be at least 3 characters.",
  }),
  email: z.string().email({
    message: "email must be in correct format",
  }),
  phone_number: z.string().min(11, {
    message: "phone number must be 9 digits with '-' between every 3.",
  }),
});

const FormFields = [
  {
    name: "name",
    placeholder: "John",
  },
  {
    name: "surname",
    placeholder: "Doe",
  },
  {
    name: "email",
    placeholder: "example@exaple.com",
  },
  {
    name: "phone_number",
    placeholder: "000-000-000",
  },
];

export const AddCustomerPage = () => {
  const { toast } = useToast();
  const navigate = useNavigate();

  const form = useForm({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      name: "",
      surname: "",
      email: "",
      phone_number: "",
    },
  });

  const onSubmit = async (customerData) => {
    const response = await fetch("http://127.0.0.1:8000/customers", {
      method: "POST",
      body: JSON.stringify(customerData),
      headers: {
        "Content-Type": "application/json",
      },
    });

    const data = await response.json();
    if (!response.ok) {
      toast({
        variant: "destructive",
        title: "Uh oh! Something went wrong.",
        description: `There was a problem with your request: ${data.message} `,
        action: <ToastAction altText="Try again">Try again</ToastAction>,
      });

      return;
    }

    toast({
      title: "Added customer",
      description: "New customer has been added succesfully",
    });

    setTimeout(() => {
      navigate("/customers");
    }, 2000);
  };
  return (
    <div className="hidden flex-col md:flex">
      <div className="border-b">
        <div className="flex h-16 items-center px-4">
          <MainNav className="mx-6" links={navigationLinks} />
          <div className="ml-auto flex items-center space-x-4">
            <UserNav />
          </div>
        </div>
      </div>
      <div className="flex-1 space-y-4 p-8 pt-6">
        <div className="flex items-center justify-between space-y-2">
          <h2 className="text-3xl font-bold tracking-tight">Add customer</h2>
        </div>
        <div className="hidden h-full flex-1 flex-col space-y-8 md:flex">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              {FormFields.map((item, index) => (
                <FormField
                  control={form.control}
                  name={item.name}
                  key={index}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-md">
                        {field.name.replace("_", " ")}
                      </FormLabel>
                      <FormControl>
                        <Input placeholder={item.placeholder} {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              ))}
              <Button type="submit" className="w-full">
                Submit
              </Button>
            </form>
          </Form>
        </div>
      </div>
    </div>
  );
};
