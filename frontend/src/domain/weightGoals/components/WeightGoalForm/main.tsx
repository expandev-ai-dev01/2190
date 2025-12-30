import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import DOMPurify from 'dompurify';
import { toast } from 'sonner';
import { weightGoalSchema } from '../../validations/weightGoal';
import type { WeightGoalFormInput, WeightGoalFormOutput } from '../../types/forms';
import type { WeightGoalFormProps } from './types';
import { useWeightGoalList } from '../../hooks/useWeightGoalList';
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
import { MainGoalStep } from './_impl/MainGoalStep';
import { SecondaryGoalsStep } from './_impl/SecondaryGoalsStep';
import { MotivationsStep } from './_impl/MotivationsStep';
import { MilestonesStep } from './_impl/MilestonesStep';
import { AlertsStep } from './_impl/AlertsStep';
import { ValidationStep } from './_impl/ValidationStep';
import { Loader2 } from 'lucide-react';

function WeightGoalForm({ idUsuario, onSuccess, onCancel }: WeightGoalFormProps) {
  const [currentStep, setCurrentStep] = useState('main');
  const { create, isCreating } = useWeightGoalList({ idUsuario });

  const form = useForm<WeightGoalFormInput, unknown, WeightGoalFormOutput>({
    resolver: zodResolver(weightGoalSchema),
    mode: 'onBlur',
    defaultValues: {
      idUsuario,
      pesoAtual: 0,
      pesoDesejado: 0,
      prazoObjetivo: 12,
      marcosAutomaticos: true,
      configuracaoInteligente: true,
      preferenciasAlertas: {
        tiposDesejados: ['pesagem'],
        horariosPreferidos: {
          manha: '08:00',
          tarde: '14:00',
          noite: '20:00',
        },
        frequenciaPersonalizada: {},
        canaisNotificacao: ['push'],
      },
    },
  });

  const onSubmit = async (data: WeightGoalFormOutput) => {
    try {
      const sanitizedData = {
        ...data,
        motivacaoPessoal: data.motivacaoPessoal
          ? DOMPurify.sanitize(data.motivacaoPessoal)
          : undefined,
      };

      const result = await create(sanitizedData);
      toast.success('Objetivo criado com sucesso!');
      onSuccess?.(result);
    } catch (error) {
      toast.error('Erro ao criar objetivo. Tente novamente.');
      console.error(error);
    }
  };

  const handleNext = async () => {
    const steps = ['main', 'secondary', 'motivations', 'milestones', 'alerts', 'validation'];
    const currentIndex = steps.indexOf(currentStep);

    let fieldsToValidate: (keyof WeightGoalFormInput)[] = [];

    switch (currentStep) {
      case 'main':
        fieldsToValidate = ['pesoAtual', 'pesoDesejado', 'prazoObjetivo'];
        break;
      case 'motivations':
        fieldsToValidate = ['motivacaoPrincipal', 'abordagemPreferida', 'experienciaAnterior'];
        break;
      case 'milestones':
        fieldsToValidate = ['marcosAutomaticos'];
        break;
      case 'alerts':
        fieldsToValidate = ['preferenciasAlertas'];
        break;
    }

    if (fieldsToValidate.length > 0) {
      const isValid = await form.trigger(fieldsToValidate);
      if (!isValid) return;
    }

    if (currentIndex < steps.length - 1) {
      setCurrentStep(steps[currentIndex + 1]);
    }
  };

  const handleBack = () => {
    const steps = ['main', 'secondary', 'motivations', 'milestones', 'alerts', 'validation'];
    const currentIndex = steps.indexOf(currentStep);
    if (currentIndex > 0) {
      setCurrentStep(steps[currentIndex - 1]);
    }
  };

  return (
    <Card className="w-full max-w-4xl">
      <CardHeader>
        <CardTitle>Definir Objetivos de Emagrecimento</CardTitle>
        <CardDescription>
          Configure suas metas de perda de peso e preferências de acompanhamento
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <Tabs value={currentStep} onValueChange={setCurrentStep}>
            <TabsList className="grid w-full grid-cols-6">
              <TabsTrigger value="main">Meta Principal</TabsTrigger>
              <TabsTrigger value="secondary">Secundários</TabsTrigger>
              <TabsTrigger value="motivations">Motivações</TabsTrigger>
              <TabsTrigger value="milestones">Marcos</TabsTrigger>
              <TabsTrigger value="alerts">Alertas</TabsTrigger>
              <TabsTrigger value="validation">Validação</TabsTrigger>
            </TabsList>

            <TabsContent value="main" className="space-y-4">
              <MainGoalStep form={form} />
            </TabsContent>

            <TabsContent value="secondary" className="space-y-4">
              <SecondaryGoalsStep form={form} />
            </TabsContent>

            <TabsContent value="motivations" className="space-y-4">
              <MotivationsStep form={form} />
            </TabsContent>

            <TabsContent value="milestones" className="space-y-4">
              <MilestonesStep form={form} />
            </TabsContent>

            <TabsContent value="alerts" className="space-y-4">
              <AlertsStep form={form} />
            </TabsContent>

            <TabsContent value="validation" className="space-y-4">
              <ValidationStep form={form} />
            </TabsContent>
          </Tabs>
        </form>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button
          type="button"
          variant="outline"
          onClick={currentStep === 'main' ? onCancel : handleBack}
        >
          {currentStep === 'main' ? 'Cancelar' : 'Voltar'}
        </Button>
        {currentStep === 'validation' ? (
          <Button type="button" onClick={form.handleSubmit(onSubmit)} disabled={isCreating}>
            {isCreating && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            Criar Objetivo
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

export { WeightGoalForm };
