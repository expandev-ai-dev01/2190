import { UseFormReturn } from 'react-hook-form';
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormDescription,
  FormMessage,
} from '@/core/components/form';
import { Input } from '@/core/components/input';
import { Alert, AlertDescription, AlertTitle } from '@/core/components/alert';
import { InfoIcon } from 'lucide-react';
import type { WeightGoalFormInput, WeightGoalFormOutput } from '../../../../types/forms';

interface MainGoalStepProps {
  form: UseFormReturn<WeightGoalFormInput, unknown, WeightGoalFormOutput>;
}

function MainGoalStep({ form }: MainGoalStepProps) {
  const pesoAtual = form.watch('pesoAtual');
  const pesoDesejado = form.watch('pesoDesejado');
  const prazoObjetivo = form.watch('prazoObjetivo');

  const totalPesoPerder = pesoAtual && pesoDesejado ? pesoAtual - pesoDesejado : 0;
  const perdaSemanal = totalPesoPerder && prazoObjetivo ? totalPesoPerder / prazoObjetivo : 0;

  return (
    <div className="space-y-6">
      <Alert>
        <InfoIcon className="h-4 w-4" />
        <AlertTitle>Meta Principal de Peso</AlertTitle>
        <AlertDescription>
          Defina seu peso atual, peso desejado e o prazo para atingir seu objetivo.
        </AlertDescription>
      </Alert>

      <div className="grid gap-4 md:grid-cols-2">
        <FormField
          control={form.control}
          name="pesoAtual"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Peso Atual (kg)</FormLabel>
              <FormControl>
                <Input
                  type="number"
                  step="0.1"
                  placeholder="Ex: 85.5"
                  {...field}
                  onChange={(e) => field.onChange(parseFloat(e.target.value) || 0)}
                />
              </FormControl>
              <FormDescription>Entre 30kg e 300kg</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="pesoDesejado"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Peso Desejado (kg)</FormLabel>
              <FormControl>
                <Input
                  type="number"
                  step="0.1"
                  placeholder="Ex: 75.0"
                  {...field}
                  onChange={(e) => field.onChange(parseFloat(e.target.value) || 0)}
                />
              </FormControl>
              <FormDescription>Deve ser menor que o peso atual</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>

      <FormField
        control={form.control}
        name="prazoObjetivo"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Prazo para Atingir o Objetivo (semanas)</FormLabel>
            <FormControl>
              <Input
                type="number"
                placeholder="Ex: 12"
                {...field}
                onChange={(e) => field.onChange(parseInt(e.target.value) || 0)}
              />
            </FormControl>
            <FormDescription>Entre 4 e 104 semanas</FormDescription>
            <FormMessage />
          </FormItem>
        )}
      />

      {totalPesoPerder > 0 && (
        <Alert>
          <InfoIcon className="h-4 w-4" />
          <AlertTitle>Resumo do Objetivo</AlertTitle>
          <AlertDescription>
            <div className="space-y-1">
              <p>
                <strong>Total a perder:</strong> {totalPesoPerder.toFixed(1)} kg
              </p>
              <p>
                <strong>Perda semanal estimada:</strong> {perdaSemanal.toFixed(2)} kg/semana
              </p>
            </div>
          </AlertDescription>
        </Alert>
      )}
    </div>
  );
}

export { MainGoalStep };
