'use client';

import { useForm, Controller } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { CustomInput, CustomInputWithIcon, CustomDatePicker } from '../ui/Input';
import OutlinedTitle from '../ui/OutlinedTitle';
import React from 'react';
import Button from '../ui/Button';

const schema = z.object({
  name: z.string().min(2, 'El nombre es requerido'),
  email: z.string().email('Correo inválido'),
  phone: z.string().min(7, 'Número inválido'),
  birthdate: z.date({ required_error: 'Fecha requerida' }),
});

type FormData = z.infer<typeof schema>;

const ContactSection = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      birthdate: undefined,
    },
  });

  const onSubmit = (data: FormData) => {
    // Aquí puedes manejar el envío del formulario
    alert(JSON.stringify(data, null, 2));
  };

  return (
    <section className="py-14">
      <div className="bg-contact-gradient pb-14">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 items-start h-[598px]">
          {/* Título */}
          <div className="flex flex-col justify-center">
            <OutlinedTitle>CONTACTO</OutlinedTitle>
          </div>
          {/* Formulario */}
          <form onSubmit={handleSubmit(onSubmit)} className="bg-transparent flex flex-col gap-4">
            <CustomInput
              label="Escribe tu nombre"
              placeholder=""
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
                />
              )}
            />

            <Button
              type="submit"
              className="primary"
            >
              REGISTRARSE
            </Button>
          </form>
        </div>
      </div>
      {/* Franja blanca inferior */}
      <div className="bg-white py-4 w-full h-[108px]">
        <div className="max-w-6xl mx-auto flex flex-col items-center justify-between text-black text-sm gap-2">
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