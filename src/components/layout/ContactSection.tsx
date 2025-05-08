"use client";

import { useForm, Controller } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { CustomInput, CustomInputWithIcon, CustomDatePicker } from "../ui/Input";
import OutlinedTitle from "../ui/OutlinedTitle";
import React, { useState, useEffect } from "react";
import Button from "../ui/Button";
import { motion, AnimatePresence } from "framer-motion";

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

const ContactSection = () => {
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
    <section className='relative bg-contact-gradient pt-0 md:h-auto md:px-[40px] xl:px-[100px] pb-[300px] sm:pb-[500px] md:pb-[200px]'>
      <div
        className='absolute inset-0 w-full h-full z-0 hidden md:block max-w-[1440px] mx-auto'
        style={{
          backgroundImage: `url('/contact-pet-desktop.png'), url('/contact-cloud-desktop.png')`,
          backgroundPosition: "bottom -1px left, top 100px left",
          backgroundRepeat: "no-repeat, no-repeat",
          backgroundSize: "100% 645px, 55% 250px",
          pointerEvents: "none",
        }}
      />
      <div
        className='absolute inset-0 w-full h-full z-0 block md:hidden'
        style={{
          backgroundImage: `url('/contact-pet-mobile.png'), url('/contact-cloud-mobile.png')`,
          backgroundPosition: "bottom -1px left 0px, top left",
          backgroundRepeat: "no-repeat, no-repeat",
          backgroundSize: "100% auto, 100% 140px",
          pointerEvents: "none",
        }}
      />
      <div className='relative max-w-[1440px] mx-auto h-auto md:h-[726px] '>
        <div className='relative z-10'>
          <div className={`flex flex-col md:grid md:grid-cols-2 gap-4 md:gap-8 items-start`}>
            <div className='hidden md:flex flex-col justify-center mt-[144px] md:mt-[0px] md:pt-[53px]'>
              <OutlinedTitle>Registrate para hacer parte de los profetas</OutlinedTitle>
              <p className='text-p-mobile md:text-[36px] text-mainlight  mt-[20px] md:mt-[44px] border_text font-frente leading-[100%]'>
                Sé parte de la Comunidad Sudamerican Rockers, sé el primero en enterarte de todas las noticias que el Festival Cordillera trae para ti
              </p>
            </div>
            <AnimatePresence mode='wait'>
              {!isSuccess ? (
                <motion.div
                  key='form'
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3, ease: "easeInOut" }}
                  className='flex md:hidden flex-col justify-center mt-[144px] md:mt-[0px] md md:pt-[53px] w-full'
                >
                  <OutlinedTitle>Registrate para hacer parte de los profetas</OutlinedTitle>
                  <p className='block text-[20px] text-mainlight font-normal  mt-2 mx-[20px] text-start font-frente leading-[100%]'>
                    Sé parte de la Comunidad Sudamerican Rockers, sé el primero en enterarte de todas las noticias que el Festival Cordillera trae para ti
                  </p>
                </motion.div>
              ) : null}
            </AnimatePresence>
            <div className='flex justify-center md:justify-end w-full md:mt-[67px]'>
              <AnimatePresence mode='wait'>
                {isSuccess ? (
                  <motion.div
                    key='success'
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.3, ease: "easeInOut" }}
                    className='flex flex-col items-center justify-start gap-2 md:max-w-[426px]'
                  >
                    <div className='hidden md:flex flex-col items-left gap-0'>
                      <OutlinedTitle style={{ fontSize: "52px" }}>ENVÍO EXITOSO</OutlinedTitle>
                      <OutlinedTitle style={{ fontSize: "52px" }}>PRONTO NOS</OutlinedTitle>
                      <OutlinedTitle style={{ fontSize: "52px" }}>PONDREMOS EN</OutlinedTitle>
                      <OutlinedTitle style={{ fontSize: "52px" }}>CONTACTO CONTIGO</OutlinedTitle>
                    </div>
                    <div className='flex md:hidden px-4 sm:px-0 sm:w-[60%]'>
                      <OutlinedTitle style={{ fontSize: "32px", marginTop: "11rem" }} blueOutline>
                        ENVÍO EXITOSO PRONTO NOS PONDREMOS EN CONTACTO CONTIGO
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
                    className='bg-transparent flex flex-col gap-2 mx-4 md:mx-[0px] w-full md:max-w-[426px]'
                  >
                    <CustomInput label='Escribe tu nombre' placeholder='' disabled={isSubmitting} {...register("name")} />
                    {errors.name && <span className='text-red-400 text-xs -mt-3'>{errors.name.message}</span>}

                    <CustomInput label='Escribe tu apellido' placeholder='' disabled={isSubmitting} {...register("surname")} />
                    {errors.surname && <span className='text-red-400 text-xs -mt-3'>{errors.surname.message}</span>}

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
                      {...register("email")}
                    />
                    {errors.email && <span className='text-red-400 text-xs -mt-3'>{errors.email.message}</span>}

                    <CustomInputWithIcon
                      label='Escribe tu numero de celular'
                      placeholder=''
                      icon={
                        <svg width='20' height='20' viewBox='0 0 20 20' fill='none' xmlns='http://www.w3.org/2000/svg'>
                          <path
                            d='M13.535 0.807967C12.779 0.0519668 11.463 0.0519668 10.707 0.807967L0.807999 10.707C0.433301 11.0822 0.222839 11.5907 0.222839 12.121C0.222839 12.6512 0.433301 13.1598 0.807999 13.535L6.465 19.192C6.843 19.57 7.345 19.778 7.879 19.778C8.413 19.778 8.915 19.57 9.293 19.192L19.192 9.29297C19.57 8.91497 19.778 8.41297 19.778 7.87897C19.778 7.34497 19.57 6.84297 19.192 6.46497L13.535 0.807967ZM7.879 17.778L2.222 12.121L12.121 2.22197L17.778 7.87897L7.879 17.778Z'
                            fill='#E9DDB5'
                          />
                          <path d='M7 14C7.55228 14 8 13.5523 8 13C8 12.4477 7.55228 12 7 12C6.44772 12 6 12.4477 6 13C6 13.5523 6.44772 14 7 14Z' fill='#E9DDB5' />
                          <path
                            d='M13.707 19.707L12.293 18.293L18.293 12.293L19.707 13.708L13.707 19.707ZM6.29303 0.292969L7.70703 1.70697L1.70703 7.70697L0.29303 6.29197L6.29303 0.292969Z'
                            fill='#E9DDB5'
                          />
                        </svg>
                      }
                      type='tel'
                      disabled={isSubmitting}
                      {...register("phone")}
                    />
                    {errors.phone && <span className='text-red-400 text-xs -mt-3'>{errors.phone.message}</span>}

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

                    <div className='flex items-center gap-2 mb-2'>
                      <label htmlFor='terms' className='flex items-center gap-2 cursor-pointer select-none'>
                        <input
                          id='terms'
                          type='checkbox'
                          {...register("terms")}
                          checked={termsChecked}
                          onChange={(e) => setValue("terms", e.target.checked, { shouldValidate: true })}
                          disabled={isSubmitting}
                          className='absolute opacity-0 w-0 h-0'
                        />
                        <span
                          className={`w-4 h-4 flex items-center justify-center border border-mainlight rounded transition-colors duration-200 ${
                            termsChecked ? "bg-mainlight" : "bg-transparent"
                          }`}
                          style={{ minWidth: "1rem", minHeight: "1rem" }}
                        >
                          {termsChecked && (
                            <svg width='12' height='12' viewBox='0 0 12 12' fill='none' xmlns='http://www.w3.org/2000/svg'>
                              <path d='M3 6.5L5.5 9L9 4.5' stroke='#191916' strokeWidth='2' strokeLinecap='round' strokeLinejoin='round' />
                            </svg>
                          )}
                        </span>
                        <a href='https://paramopresenta.com/politicas.pdf' target='blank' className='text-form-disclaimer-mobile text-mainlight font-normal font-economica'>
                          Autorizo el uso de mi información conforme a al aviso de privacidad - la palabra privacidad debe tener este documento anclado
                        </a>
                      </label>
                    </div>
                    {errors.terms && <span className='text-red-400 text-xs -mt-3'>{errors.terms.message}</span>}

                    <Button type='submit' className='primary mt-8' disabled={isSubmitting}>
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

export default ContactSection;
