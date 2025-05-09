"use client";

import { useForm, Controller } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { CustomInput, CustomInputWithIcon, CustomDatePicker, CustomCheckbox, PhoneInput } from "../ui/Input";
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
  const [indicative, setIndicative] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [phoneError, setPhoneError] = useState<string | undefined>(undefined);

  const validatePhone = () => {
    if (!indicative) return 'Selecciona un indicativo';
    if (!phoneNumber || phoneNumber.length !== 10) return 'El número debe tener 10 dígitos';
    return undefined;
  };

  const onSubmit = async (data: FormData) => {
    const phoneValidation = validatePhone();
    if (phoneValidation) {
      setPhoneError(phoneValidation);
      return;
    }
    setPhoneError(undefined);
    setErrorMsg("");
    setIsSubmitting(true);
    try {
      const response = await fetch("/api/gsheet", {
        method: "POST",
        body: JSON.stringify({
          nombre: data.name,
          apellido: data.surname,
          correo: data.email,
          celular: `${indicative} ${phoneNumber}`,
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
        setIndicative('');
        setPhoneNumber('');
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
          <div className={`flex flex-col md:grid md:grid-cols-2 gap-4 mx-6 md:mx-[0px] md:gap-6 items-stretch`}>
            <div className='hidden md:flex flex-col justify-start mt-[144px] md:mt-[0px] md:pt-[53px]'>
              <OutlinedTitle className="md:!text-[68px] lg:text-[82px]">Registrate para hacer parte de los profetas</OutlinedTitle>
              <p className='text-p-mobile md:text-[36px] text-mainlight mt-[20px] md:mt-[44px] border_text font-frente leading-[100%]'>
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
                  <OutlinedTitle style={{ textAlign: 'left', fontSize: '49px' }}>Registrate para hacer parte de los profetas</OutlinedTitle>
                  <p className='block text-[20px] text-mainlight font-normal  mt-2 text-start font-frente leading-[100%]'>
                    Sé parte de la Comunidad Sudamerican Rockers, sé el primero en enterarte de todas las noticias que el Festival Cordillera trae para ti
                  </p>
                </motion.div>
              ) : null}
            </AnimatePresence>
            <div className='flex justify-center items-end md:justify-end w-full md:mt-[67px]'>
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
                    className='bg-transparent flex flex-col gap-2 md:mx-[0px] w-full md:max-w-[426px]'
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

                    <PhoneInput
                      label="Escribe tu número de celular"
                      value={phoneNumber}
                      onChangeNumber={setPhoneNumber}
                      indicative={indicative}
                      onChangeIndicative={setIndicative}
                      error={phoneError}
                      disabled={isSubmitting}
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
                      label="Autorizo el uso de mi información conforme a al aviso de "
                      checked={termsChecked}
                      onChange={(checked) => setValue("terms", checked, { shouldValidate: true })}
                      disabled={isSubmitting}
                      error={errors.terms?.message}
                      link="https://paramopresenta.com/politicas.pdf"
                      linkText="privacidad"
                    />

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
