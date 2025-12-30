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

interface SecondaryGoalsStepProps {
  form: UseFormReturn<WeightGoalFormInput, unknown, WeightGoalFormOutput>;
}

function SecondaryGoalsStep({ form }: SecondaryGoalsStepProps) {
  return (
    <div className="space-y-6">
      <Alert>
        <InfoIcon className="h-4 w-4" />
        <AlertTitle>Objetivos Secundários (Opcionais)</AlertTitle>
        <AlertDescription>
          Defina metas adicionais para acompanhar sua evolução de forma mais completa.
        </AlertDescription>
      </Alert>

      <div className="space-y-4">
        <h3 className="text-lg font-semibold">Medidas Corporais</h3>

        <div className="grid gap-4 md:grid-cols-2">
          <FormField
            control={form.control}
            name="objetivosSecundarios.medidaCinturaAtual"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Cintura Atual (cm)</FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    step="0.1"
                    placeholder="Ex: 90.0"
                    {...field}
                    onChange={(e) =>
                      field.onChange(e.target.value ? parseFloat(e.target.value) : undefined)
                    }
                    value={field.value ?? ''}
                  />
                </FormControl>
                <FormDescription>Entre 50cm e 200cm</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="objetivosSecundarios.medidaCinturaDesejada"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Cintura Desejada (cm)</FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    step="0.1"
                    placeholder="Ex: 80.0"
                    {...field}
                    onChange={(e) =>
                      field.onChange(e.target.value ? parseFloat(e.target.value) : undefined)
                    }
                    value={field.value ?? ''}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          <FormField
            control={form.control}
            name="objetivosSecundarios.medidaQuadrilAtual"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Quadril Atual (cm)</FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    step="0.1"
                    placeholder="Ex: 100.0"
                    {...field}
                    onChange={(e) =>
                      field.onChange(e.target.value ? parseFloat(e.target.value) : undefined)
                    }
                    value={field.value ?? ''}
                  />
                </FormControl>
                <FormDescription>Entre 60cm e 250cm</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="objetivosSecundarios.medidaQuadrilDesejada"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Quadril Desejado (cm)</FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    step="0.1"
                    placeholder="Ex: 90.0"
                    {...field}
                    onChange={(e) =>
                      field.onChange(e.target.value ? parseFloat(e.target.value) : undefined)
                    }
                    value={field.value ?? ''}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          <FormField
            control={form.control}
            name="objetivosSecundarios.medidaBracoAtual"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Braço Atual (cm)</FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    step="0.1"
                    placeholder="Ex: 30.0"
                    {...field}
                    onChange={(e) =>
                      field.onChange(e.target.value ? parseFloat(e.target.value) : undefined)
                    }
                    value={field.value ?? ''}
                  />
                </FormControl>
                <FormDescription>Entre 15cm e 60cm</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="objetivosSecundarios.medidaBracoDesejada"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Braço Desejado (cm)</FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    step="0.1"
                    placeholder="Ex: 28.0"
                    {...field}
                    onChange={(e) =>
                      field.onChange(e.target.value ? parseFloat(e.target.value) : undefined)
                    }
                    value={field.value ?? ''}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
      </div>

      <div className="space-y-4">
        <h3 className="text-lg font-semibold">Hábitos Saudáveis</h3>

        <div className="grid gap-4 md:grid-cols-2">
          <FormField
            control={form.control}
            name="objetivosSecundarios.frequenciaExercicioSemanal"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Frequência de Exercícios (dias/semana)</FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    placeholder="Ex: 3"
                    {...field}
                    onChange={(e) =>
                      field.onChange(e.target.value ? parseInt(e.target.value) : undefined)
                    }
                    value={field.value ?? ''}
                  />
                </FormControl>
                <FormDescription>Entre 1 e 7 dias</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="objetivosSecundarios.consumoAguaDiario"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Consumo de Água (litros/dia)</FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    step="0.1"
                    placeholder="Ex: 2.5"
                    {...field}
                    onChange={(e) =>
                      field.onChange(e.target.value ? parseFloat(e.target.value) : undefined)
                    }
                    value={field.value ?? ''}
                  />
                </FormControl>
                <FormDescription>Entre 1 e 5 litros</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
      </div>
    </div>
  );
}

export { SecondaryGoalsStep };
