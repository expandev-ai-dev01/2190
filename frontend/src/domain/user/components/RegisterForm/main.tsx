import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { toast } from 'sonner';
import { Loader2 } from 'lucide-react';
import { Button } from '@/core/components/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/core/components/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/core/components/tabs';
import { registerSchema } from '../../validations/register';
import type { RegisterFormInput, RegisterFormOutput } from '../../types/forms';
import type { RegisterFormProps } from './types';
import { useRegister } from '../../hooks/useRegister';
import {
  StepAccount,
  StepPersonal,
  StepProfessional,
  StepHealth,
  StepLifestyle,
  StepReview,
} from './_impl';

export function RegisterForm({ onSuccess }: RegisterFormProps) {
  const [currentStep, setCurrentStep] = useState('account');
  const { register, isRegistering } = useRegister();

  const form = useForm<RegisterFormInput, unknown, RegisterFormOutput>({
    resolver: zodResolver(registerSchema),
    mode: 'onBlur',
    defaultValues: {
      tipoUsuario: 'usuario_final',
      metodoCadastro: 'email',
      aceiteTermos: false,
      aceitePrivacidade: false,
    },
  });

  const tipoUsuario = form.watch('tipoUsuario');

  const steps = [
    { id: 'account', label: 'Conta' },
    { id: 'personal', label: 'Pessoal' },
    ...(tipoUsuario === 'profissional_saude'
      ? [{ id: 'professional', label: 'Profissional' }]
      : []),
    { id: 'health', label: 'Saúde' },
    { id: 'lifestyle', label: 'Estilo de Vida' },
    { id: 'review', label: 'Revisão' },
  ];

  const handleNext = async () => {
    const currentIndex = steps.findIndex((s) => s.id === currentStep);

    // Trigger validation for current step fields before moving
    let fieldsToValidate: (keyof RegisterFormInput)[] = [];

    switch (currentStep) {
      case 'account':
        fieldsToValidate = ['tipoUsuario', 'metodoCadastro'];
        break;
      case 'personal':
        fieldsToValidate = [
          'nomeCompleto',
          'email',
          'senha',
          'dataNascimento',
          'genero',
          'telefone',
          'nomeResponsavel',
          'cpfResponsavel',
          'emailResponsavel',
        ];
        break;
      case 'professional':
        fieldsToValidate = ['numeroRegistro', 'conselhoProfissional', 'especialidade'];
        break;
      case 'health':
        fieldsToValidate = ['pesoAtual', 'altura'];
        break;
      case 'lifestyle':
        fieldsToValidate = ['nivelAtividadeFisica'];
        break;
    }

    if (fieldsToValidate.length > 0) {
      const isValid = await form.trigger(fieldsToValidate);
      if (!isValid) return;
    }

    if (currentIndex < steps.length - 1) {
      setCurrentStep(steps[currentIndex + 1].id);
    }
  };

  const handleBack = () => {
    const currentIndex = steps.findIndex((s) => s.id === currentStep);
    if (currentIndex > 0) {
      setCurrentStep(steps[currentIndex - 1].id);
    }
  };

  const onSubmit = async (data: RegisterFormOutput) => {
    try {
      await register(data);
      toast.success('Cadastro realizado com sucesso! Verifique seu e-mail.');
      onSuccess?.();
    } catch (error) {
      toast.error('Erro ao realizar cadastro. Tente novamente.');
      console.error(error);
    }
  };

  return (
    <Card className="mx-auto w-full max-w-4xl">
      <CardHeader>
        <CardTitle>Crie sua conta</CardTitle>
        <CardDescription>
          Preencha os dados abaixo para começar sua jornada no EmagreceJá.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <Tabs value={currentStep} onValueChange={setCurrentStep} className="w-full">
            <TabsList className="h-auto w-full flex-wrap">
              {steps.map((step) => (
                <TabsTrigger
                  key={step.id}
                  value={step.id}
                  disabled={true} // Disable direct navigation to enforce validation
                  className="flex-1"
                >
                  {step.label}
                </TabsTrigger>
              ))}
            </TabsList>

            <div className="mt-6">
              <TabsContent value="account">
                <StepAccount form={form} />
              </TabsContent>
              <TabsContent value="personal">
                <StepPersonal form={form} />
              </TabsContent>
              <TabsContent value="professional">
                <StepProfessional form={form} />
              </TabsContent>
              <TabsContent value="health">
                <StepHealth form={form} />
              </TabsContent>
              <TabsContent value="lifestyle">
                <StepLifestyle form={form} />
              </TabsContent>
              <TabsContent value="review">
                <StepReview form={form} />
              </TabsContent>
            </div>
          </Tabs>
        </form>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button
          type="button"
          variant="outline"
          onClick={handleBack}
          disabled={currentStep === steps[0].id || isRegistering}
        >
          Voltar
        </Button>

        {currentStep === steps[steps.length - 1].id ? (
          <Button type="button" onClick={form.handleSubmit(onSubmit)} disabled={isRegistering}>
            {isRegistering && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            Finalizar Cadastro
          </Button>
        ) : (
          <Button type="button" onClick={handleNext}>
            Próximo
          </Button>
        )}
      </CardFooter>
    </Card>
  );
}
