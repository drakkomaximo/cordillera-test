"use client";

import { useForm, Controller } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { CustomInput, CustomInputWithIcon, CustomDatePicker, CustomCheckbox } from "../ui/Input";
import OutlinedTitle from "../ui/OutlinedTitle";
import React, { useState, useEffect } from "react";
import Button from "../ui/Button";
import { motion, AnimatePresence } from "framer-motion";
import Image from 'next/image';

const schema = z.object({
  name: z.string().min(2, "El nombre es requerido"),
  surname: z.string().min(2, "El apellido es requerido"),
  email: z.string().email("Correo inválido"),
  phone: z.string().min(7, "Número inválido"),
  birthdate: z.date({ required_error: "Fecha requerida" }),
  terms: z.boolean().refine((val) => val === true, {
    message: "Debes aceptar los Términos y Condiciones",
  }),
});

type FormData = z.infer<typeof schema>;

const DotsLoader = () => {
  const [dots, setDots] = useState("");
  useEffect(() => {
    const interval = setInterval(() => {
      setDots((prev) => (prev.length < 3 ? prev + "." : ""));
    }, 400);
    return () => clearInterval(interval);
  }, []);
  return <span>{dots}</span>;
};

const ContactSectionV2 = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
    reset,
    setValue,
    watch,
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      birthdate: undefined,
      terms: false,
    },
    mode: "onChange",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const onSubmit = async (data: FormData) => {
    setErrorMsg("");
    setIsSubmitting(true);
    try {
      const response = await fetch("/api/gsheet", {
        method: "POST",
        body: JSON.stringify({
          nombre: data.name,
          apellido: data.surname,
          correo: data.email,
          celular: data.phone,
          fecha_nacimiento: data.birthdate ? data.birthdate.toISOString().split("T")[0] : "",
          terminos: data.terms,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      });
      const result = await response.json();
      if (result.result === "success" || (result.raw && result.raw.includes("success"))) {
        setIsSuccess(true);
        reset();
        setTimeout(() => setIsSuccess(false), 4000);
      } else {
        setErrorMsg("Error al registrar. Intenta de nuevo");
      }
    } catch {
      setErrorMsg("Error de conexión. Intenta de nuevo");
    }
    setIsSubmitting(false);
  };

  const termsChecked = watch("terms");

  return (
    <section className="flex justify-center items-center min-h-screen bg-maindark">
      <div className="w-full min-h-screen rounded-lg overflow-hidden shadow-lg max-w-[1440px] mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 min-h-screen">
          <div className="bg-contact-gradient border-[6px] border-black flex flex-col justify-start items-start p-0 md:p-8 relative overflow-hidden h-full pb-[300px] sm:pb-[500px] ">
            <div className="mx-4 xl:mx-16 relative z-10">
              <OutlinedTitle className="md:!text-[64px] !text-[52px] !text-left w-full">
                REGÍSTRATE PARA HACER PARTE DE LOS PROFETAS
              </OutlinedTitle>
              <p className="text-p-mobile md:text-[20px] text-mainlight mt-4 md:mt-8 font-frente leading-[100%] w-full text-left">
                SÉ PARTE DE LA COMUNIDAD SUDAMERICANA ROCKERS, SÉ EL PRIMERO EN ENTERARTE DE TODAS LAS NOTICIAS QUE EL FESTIVAL CORDILLERA TRAE PARA TI
              </p>
            </div>
            <Image
              src="/contact-pet-desktop-stage-2.png"
              alt="Arte Cordillera"
              width={600}
              height={300}
              className="hidden md:block absolute left-0 bottom-0 w-full pointer-events-none select-none z-0"
              priority={false}
            />
            <Image
              src="/contact-pet-desktop-stage-2.png"
              alt="Arte Cordillera"
              width={400}
              height={120}
              className="block md:hidden absolute left-0 bottom-0 w-full pointer-events-none select-none z-0"
              priority={false}
            />
          </div>
          <div className="bg-[#191916] flex items-stretch justify-center p-6 md:p-8 h-full">
            <div className='flex justify-center items-start md:justify-center w-full md:mt-[px] '>
              <AnimatePresence mode='wait'>
                {isSuccess ? (
                  <motion.div
                    key='success'
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.3, ease: "easeInOut" }}
                    className='flex flex-col items-center justify-start gap-2 '
                  >
                    <div className='hidden md:flex flex-col items-left gap-0'>
                      <OutlinedTitle style={{ fontSize: "82px", paddingBottom: "200px" }}>ENVÍO EXITOSO</OutlinedTitle>
                    </div>
                    <div className='flex md:hidden px-4 sm:px-0'>
                      <OutlinedTitle style={{ fontSize: "52px", marginTop: "11rem" }} blueOutline>
                        ENVÍO EXITOSO
                      </OutlinedTitle>
                    </div>
                  </motion.div>
                ) : errorMsg ? (
                  <motion.div
                    key='error'
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.3, ease: "easeInOut" }}
                    className='p-6 bg-red-700/80 rounded text-white text-center font-frente text-xl md:text-2xl whitespace-pre-line'
                  >
                    {errorMsg}
                  </motion.div>
                ) : (
                  <motion.form
                    key='form'
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.3, ease: "easeInOut" }}
                    onSubmit={handleSubmit(onSubmit)}
                    className='bg-transparent flex flex-col gap-2 md:mx-[0px] w-full md:max-w-[535px]'
                  >
                    <CustomInput 
                      label='Escribe tu nombre' 
                      placeholder='' 
                      disabled={isSubmitting} 
                      error={errors.name?.message}
                      {...register("name")} 
                    />

                    <CustomInput 
                      label='Escribe tu apellido' 
                      placeholder='' 
                      disabled={isSubmitting} 
                      error={errors.surname?.message}
                      {...register("surname")} 
                    />

                    <CustomInputWithIcon
                      label='Escribe tu correo'
                      placeholder='correo@gmail.com'
                      icon={
                        <svg width='24' height='24' fill='none' stroke='currentColor' strokeWidth='2' viewBox='0 0 24 24'>
                          <rect width='20' height='14' x='2' y='5' rx='2' />
                          <path d='m22 5-10 7L2 5' />
                        </svg>
                      }
                      type='email'
                      disabled={isSubmitting}
                      error={errors.email?.message}
                      {...register("email")}
                    />

                    <CustomInputWithIcon
                      label='Escribe tu numero de celular'
                      placeholder=''
                      icon={
                        <svg width='20' height='20' viewBox='0 0 20 20' fill='none' xmlns='http://www.w3.org/2000/svg'>
                          <path
                            d='M13.535 0.807967C12.779 0.0519668 11.463 0.0519668 10.707 0.807967L0.807999 10.707C0.433301 11.0822 0.222839 11.5907 0.222839 12.121C0.222839 12.6512 0.433301 13.1598 0.807999 13.535L6.465 19.192C6.843 19.57 7.345 19.778 7.879 19.778C8.413 19.778 8.915 19.57 9.293 19.192L19.192 9.29297C19.57 8.91497 19.778 8.41297 19.778 7.87897C19.778 7.34497 19.57 6.84297 19.192 6.46497L13.535 0.807967ZM7.879 17.778L2.222 12.121L12.121 2.22197L17.778 7.87897L7.879 17.778Z'
                            fill='currentColor'
                          />
                          <path d='M7 14C7.55228 14 8 13.5523 8 13C8 12.4477 7.55228 12 7 12C6.44772 12 6 12.4477 6 13C6 13.5523 6.44772 14 7 14Z' fill='currentColor' />
                          <path
                            d='M13.707 19.707L12.293 18.293L18.293 12.293L19.707 13.708L13.707 19.707ZM6.29303 0.292969L7.70703 1.70697L1.70703 7.70697L0.29303 6.29197L6.29303 0.292969Z'
                            fill='currentColor'
                          />
                        </svg>
                      }
                      type='tel'
                      disabled={isSubmitting}
                      error={errors.phone?.message}
                      {...register("phone")}
                    />

                    <Controller
                      name='birthdate'
                      control={control}
                      render={({ field }) => (
                        <CustomDatePicker
                          label='Escribe tu fecha de nacimiento'
                          value={field.value}
                          onChange={field.onChange}
                          name={field.name}
                          error={errors.birthdate?.message}
                          disabled={isSubmitting}
                        />
                      )}
                    />

                    <CustomCheckbox
                      label="Autorizo el uso de mi información conforme a al "
                      checked={termsChecked}
                      onChange={(checked) => setValue("terms", checked, { shouldValidate: true })}
                      disabled={isSubmitting}
                      error={errors.terms?.message}
                      link="https://www.cordillerafestival.com/docs/Aviso%20de%20privacidad.docx.pdf"
                      linkText="Aviso de privacidad"
                    />

                    <Button type='submit' className='primary mt-8 font-normal pb-5' disabled={isSubmitting}>
                      {isSubmitting ? (
                        <>
                          <span>Enviando</span>
                          <DotsLoader />
                        </>
                      ) : (
                        "REGISTRARSE"
                      )}
                    </Button>
                  </motion.form>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSectionV2;
