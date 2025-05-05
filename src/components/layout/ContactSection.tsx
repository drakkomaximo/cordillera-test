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

  const onSubmit = async (data: FormData) => {
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
      console.log(result); // Para depuración
      if (result.result === 'success' || (result.raw && result.raw.includes('success'))) {
        alert('¡Registro exitoso!');
        reset();
      } else {
        alert('Error al registrar. Intenta de nuevo.\n' + (result.error || result.raw || ''));
      }
    } catch (err) {
      alert('Error de conexión. Intenta de nuevo.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="pt-0 pb-12 md:py-14 md:h-auto">
      <div className="bg-contact-gradient pb-14">
        <div className="max-w-6xl mx-auto flex flex-col md:grid md:grid-cols-2 gap-4 md:gap-8 items-start h-[1061px] md:h-[598px]">
          {/* Título */}
          <div className="flex flex-col justify-center mt-[144px] md:mt-[0px] md:pl-[30px] md:pt-[53px]">
            <OutlinedTitle>CONTACTO</OutlinedTitle>
            <p className='block md:hidden text-p-mobile text-mainlight font-normal font-economica mt-2 mx-[20px] text-center'>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse varius enim in eros elementum tristique. </p>
          </div>
          {/* Formulario */}
          <div className='flex md:justify-end w-full md:mt-[117px]'>
          <form onSubmit={handleSubmit(onSubmit)} className="bg-transparent flex flex-col gap-4 mx-[20px] md:mx-[0px] w-[calc(100%-40px)] md:w-[326px] md:pr-[15px]">
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
                <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><rect width="20" height="14" x="2" y="5" rx="2"/><path d="m22 5-10 7L2 5"/></svg>
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
                <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><rect x="6" y="2" width="12" height="20" rx="2"/><path d="M11 18h2"/></svg>
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

            <Button type="submit" className="primary" disabled={isSubmitting}>
              {isSubmitting ? <><span>Enviando</span><DotsLoader /></> : 'REGISTRARSE'}
            </Button>
          </form>
          </div>
          <div className='grid md:hidden grid-cols-2 gap-4'>
            <p className='text-form-disclaimer-mobile text-mainlight font-normal font-economica mx-[20px]'>Al hacer clic en Registrarte, confirmas que estás de acuerdo con nuestros <a href="#" className='hover:underline'>Términos y Condiciones</a>.</p>
          </div>
        </div>
      </div>
      {/* Franja blanca inferior */}
      <div className="bg-white py-0 px-4 md:px-0 md:py-4 w-full h-[72px] md:h-[108px]">
        <div className="max-w-6xl mx-auto flex flex-col items-start md:items-center justify-between text-black text-sm gap-2">
          <span className='font-frente text-p-desktop font-normal'>Cordillera Festival 2025 ©</span>
          <div className="flex gap-10 font-economica text-p-mobile font-normal">
            <a href="#" className="hover:underline">Política de privacidad</a>
            <a href="#" className="hover:underline">Términos y condiciones</a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection; 