'use client';

import { useForm, Controller } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { CustomInput, CustomInputWithIcon, CustomDatePicker } from '../ui/Input';
import OutlinedTitle from '../ui/OutlinedTitle';
import React, { useState, useEffect } from 'react';
import Button from '../ui/Button';

const schema = z.object({
  name: z.string().min(2, 'El nombre es requerido'),
  email: z.string().email('Correo inválido'),
  phone: z.string().min(7, 'Número inválido'),
  birthdate: z.date({ required_error: 'Fecha requerida' }),
});

type FormData = z.infer<typeof schema>;

const DotsLoader = () => {
  const [dots, setDots] = useState('');
  useEffect(() => {
    const interval = setInterval(() => {
      setDots(prev => (prev.length < 3 ? prev + '.' : ''));
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
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      birthdate: undefined,
    },
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(true);
  const [errorMsg, setErrorMsg] = useState('');

  const onSubmit = async (data: FormData) => {
    setErrorMsg('');
    setIsSubmitting(true);
    try {
      const response = await fetch('/api/gsheet', {
        method: 'POST',
        body: JSON.stringify({
          nombre: data.name,
          correo: data.email,
          celular: data.phone,
          fecha_nacimiento: data.birthdate ? data.birthdate.toISOString().split('T')[0] : '',
        }),
        headers: {
          'Content-Type': 'application/json',
        },
      });
      const result = await response.json();
      if (result.result === 'success' || (result.raw && result.raw.includes('success'))) {
        setIsSuccess(true);
        reset();
        setTimeout(() => setIsSuccess(false), 4000); // 4 segundos
      } else {
        setErrorMsg('Error al registrar. Intenta de nuevo');
      }
    } catch {
      setErrorMsg('Error de conexión. Intenta de nuevo');
    }
    setIsSubmitting(false);
  };

  return (
    <section className="relative bg-contact-gradient pt-0 md:h-auto md:px-[40px] xl:px-[100px]">
      <div
          className="absolute inset-0 w-full h-full z-0 hidden md:block max-w-[1440px] mx-auto"
          style={{
            backgroundImage: `url('/contact-pet-desktop.png')`,
            backgroundPosition: 'bottom -1px left, top left',
            backgroundRepeat: 'no-repeat',
            backgroundSize: '100% 645px',
            pointerEvents: 'none',
          }}
        />
        <div
          className="absolute inset-0 w-full h-full z-0 block md:hidden"
          style={{
            backgroundImage: `url('/contact-pet-mobile.png'), url('/contact-cloud.png')`,
            backgroundPosition: 'bottom -1px left 0px, top left',
            backgroundRepeat: 'no-repeat, no-repeat',
            backgroundSize: '100% auto, 100% 140px',
            pointerEvents: 'none',
          }}
        />
      <div className="relative max-w-[1440px] mx-auto h-auto md:h-[726px] ">
        <div className="relative z-10">
          <div className={`flex flex-col md:grid md:grid-cols-2 gap-4 md:gap-8 items-start md:h-[598px] z-20 ${!isSuccess ? 'h-[1201px] sm:h-[1261px]' : 'h-[558px] sm:h-[698px]'}`}>
            <div className="hidden md:flex flex-col justify-center mt-[144px] md:mt-[0px] md:pt-[53px]">
              <OutlinedTitle>CONTACTO</OutlinedTitle>
            </div>
            {
              !isSuccess && (
                <div className="flex md:hidden flex-col justify-center mt-[144px] md:mt-[0px] md md:pt-[53px] w-full">
                  <OutlinedTitle>CONTACTO</OutlinedTitle>
                  <p className='block md:hidden text-p-mobile text-mainlight font-normal font-economica mt-2 mx-[20px] text-center'>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse varius enim in eros elementum tristique. </p>
                </div>
              )
            }
            <div className='flex justify-center md:justify-end w-full md:mt-[67px]'>
              {isSuccess ? (
                <div className="flex flex-col items-center justify-start gap-2 md:max-w-[426px]">
                  <div className="hidden md:flex flex-col items-left gap-0">
                    <OutlinedTitle style={{ fontSize: '52px' }}>ENVÍO EXITOSO</OutlinedTitle>
                    <OutlinedTitle style={{ fontSize: '52px' }}>PRONTO NOS</OutlinedTitle>
                    <OutlinedTitle style={{ fontSize: '52px' }}>PONDREMOS EN</OutlinedTitle>
                    <OutlinedTitle style={{ fontSize: '52px' }}>CONTACTO CONTIGO</OutlinedTitle>
                  </div>
                  <div className="flex md:hidden sm:w-[60%]">
                    <OutlinedTitle style={{ fontSize: '32px', marginTop: '11rem' }} blueOutline>
                      ENVÍO EXITOSO PRONTO NOS PONDREMOS EN CONTACTO CONTIGO
                    </OutlinedTitle>
                  </div>
                </div>
              ) : errorMsg ? (
                <div className="p-6 bg-red-700/80 rounded text-white text-center font-frente text-xl md:text-2xl whitespace-pre-line">
                  {errorMsg}
                </div>
              ) : (
                <form onSubmit={handleSubmit(onSubmit)} className="bg-transparent flex flex-col gap-4 mx-4 md:mx-[0px] sm:max-w-[426px]">
                  <CustomInput
                    label="Escribe tu nombre"
                    placeholder=""
                    disabled={isSubmitting}
                    {...register('name')}
                  />
                  {errors.name && <span className="text-red-400 text-xs -mt-3">{errors.name.message}</span>}

                  <CustomInputWithIcon
                    label="Escribe tu correo"
                    placeholder="correo@gmail.com"
                    icon={
                      <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><rect width="20" height="14" x="2" y="5" rx="2" /><path d="m22 5-10 7L2 5" /></svg>
                    }
                    type="email"
                    disabled={isSubmitting}
                    {...register('email')}
                  />
                  {errors.email && <span className="text-red-400 text-xs -mt-3">{errors.email.message}</span>}

                  <CustomInputWithIcon
                    label="Escribe tu numero de celular"
                    placeholder=""
                    icon={
                      <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M13.535 0.807967C12.779 0.0519668 11.463 0.0519668 10.707 0.807967L0.807999 10.707C0.433301 11.0822 0.222839 11.5907 0.222839 12.121C0.222839 12.6512 0.433301 13.1598 0.807999 13.535L6.465 19.192C6.843 19.57 7.345 19.778 7.879 19.778C8.413 19.778 8.915 19.57 9.293 19.192L19.192 9.29297C19.57 8.91497 19.778 8.41297 19.778 7.87897C19.778 7.34497 19.57 6.84297 19.192 6.46497L13.535 0.807967ZM7.879 17.778L2.222 12.121L12.121 2.22197L17.778 7.87897L7.879 17.778Z" fill="#E9DDB5" />
                        <path d="M7 14C7.55228 14 8 13.5523 8 13C8 12.4477 7.55228 12 7 12C6.44772 12 6 12.4477 6 13C6 13.5523 6.44772 14 7 14Z" fill="#E9DDB5" />
                        <path d="M13.707 19.707L12.293 18.293L18.293 12.293L19.707 13.708L13.707 19.707ZM6.29303 0.292969L7.70703 1.70697L1.70703 7.70697L0.29303 6.29197L6.29303 0.292969Z" fill="#E9DDB5" />
                      </svg>

                    }
                    type="tel"
                    disabled={isSubmitting}
                    {...register('phone')}
                  />
                  {errors.phone && <span className="text-red-400 text-xs -mt-3">{errors.phone.message}</span>}

                  <Controller
                    name="birthdate"
                    control={control}
                    render={({ field }) => (
                      <CustomDatePicker
                        label="Escribe tu fecha de nacimiento"
                        value={field.value}
                        onChange={field.onChange}
                        name={field.name}
                        error={errors.birthdate?.message}
                        disabled={isSubmitting}
                      />
                    )}
                  />

                  <p className='w-full text-form-disclaimer-mobile text-mainlight font-normal font-economica -mt-[20px]'>
                    <span className='text-center md:text-left'>Al hacer clic en Registrarte, confirmas que estás de acuerdo con nuestros Términos y Condiciones</span>
                  </p>

                  <Button type="submit" className="primary" disabled={isSubmitting}>
                    {isSubmitting ? <><span>Enviando</span><DotsLoader /></> : 'REGISTRARSE'}
                  </Button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection; 