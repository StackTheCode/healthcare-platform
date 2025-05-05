"use client"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { UserFormValidation } from "@/lib/validations"
import { useRouter } from "next/navigation"
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import CustomFormFIeld from "./CustomFormField"
import SubmitButton from "./SubmitButton"
import { useState } from "react"
import { createUser } from "@/lib/actions/patient.actions"

export enum FormFieldType {
    INPUT = 'input',
    TEXTAREA = "textarea",
    PHONE_INPUT = "phone_input",
    CHECKBOX = "checkbox",
    SELECT = "select",
    DATE_PICKER = "date_picker",
    SKELETON = "skeleton",
}

const formSchema = z.object({
    name: z.string().min(2, {
        message: "Username must be at least 2 characters.",
    }),
    email: z.string().email({
        message: "Please enter a valid email address.",
    }),
    phone: z.string().min(10, {
        message: "Please enter a valid phone number.",
    }),
})

export const PatientForm = () => {
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);
    // 1. Define your form.
    const form = useForm<z.infer<typeof UserFormValidation>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: "",
            email: "",
            phone: "",
        },
    })



    const onSubmit = async (values: z.infer<typeof UserFormValidation>) => {
        setIsLoading(true);
    
        try {
          const user = {
            name: values.name,
            email: values.email,
            phone: values.phone,
          };
    
          const newUser = await createUser(user);
    
          if (newUser) {
            router.push(`/patients/${newUser.$id}/register`);
          }
        } catch (error) {
          console.log(error);
        }
    
        setIsLoading(false);
      };
    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">


                <CustomFormFIeld control={form.control}
                    fieldType={FormFieldType.INPUT}
                    name="name"
                    label="Full name"
                    placeholder="John Doe"
                    iconSrc="/assets/icons/user.svg"
                    iconAlt="user" />

                <CustomFormFIeld control={form.control}
                    fieldType={FormFieldType.INPUT}
                    name="email"
                    label="Email"
                    placeholder="example@gmail.com"
                    iconSrc="/assets/icons/email.svg"
                    iconAlt="email" />

                <CustomFormFIeld control={form.control}
                    fieldType={FormFieldType.PHONE_INPUT}
                    name="phone"
                    label="Phoine number"
                    placeholder="+00 457 448 456"
                    iconSrc="/assets/icons/phone.svg"
                    iconAlt="phone" />

                <SubmitButton isLoading={isLoading}>
                    Get Started
                </SubmitButton>
            </form>
        </Form>
    )
}

export default PatientForm