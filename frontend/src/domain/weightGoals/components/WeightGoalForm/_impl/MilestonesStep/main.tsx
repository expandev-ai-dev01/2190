import { UseFormReturn } from 'react-hook-form';
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormDescription,
  FormMessage,
} from '@/core/components/form';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/core/components/select';
import { Switch } from '@/core/components/switch';
import { Alert, AlertDescription, AlertTitle } from '@/core/components/alert';
import { InfoIcon } from 'lucide-react';
import type { WeightGoalFormInput, WeightGoalFormOutput } from '../../../../types/forms';

interface MilestonesStepProps {
  form: UseFormReturn<WeightGoalFormInput, unknown, WeightGoalFormOutput>;
}

function MilestonesStep({ form }: MilestonesStepProps) {
  const marcosAutomaticos = form.watch('marcosAutomaticos');

  return (
    <div className="space-y-6">
      <Alert>
        <InfoIcon className="h-4 w-4" />
        <AlertTitle>Marcos Intermediários</AlertTitle>
        <AlertDescription>
          Defina marcos para acompanhar seu progresso e manter a motivação.
        </AlertDescription>
      </Alert>

      <FormField
        control={form.control}
        name="marcosAutomaticos"
        render={({ field }) => (
          <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
            <div className="space-y-0.5">
              <FormLabel className="text-base">Marcos Automáticos</FormLabel>
              <FormDescription>
                O sistema gerará marcos baseados em 10% do peso total a perder
              </FormDescription>
            </div>
            <FormControl>
              <Switch checked={field.value} onCheckedChange={field.onChange} />
            </FormControl>
          </FormItem>
        )}
      />

      {marcosAutomaticos && (
        <FormField
          control={form.control}
          name="frequenciaMarcos"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Frequência dos Marcos</FormLabel>
              <Select onValueChange={field.onChange} value={field.value ?? undefined}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione a frequência" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="semanal">Semanal</SelectItem>
                  <SelectItem value="quinzenal">Quinzenal</SelectItem>
                  <SelectItem value="mensal">Mensal</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
      )}

      {!marcosAutomaticos && (
        <Alert>
          <InfoIcon className="h-4 w-4" />
          <AlertTitle>Marcos Personalizados</AlertTitle>
          <AlertDescription>
            Você poderá adicionar marcos personalizados após criar o objetivo inicial.
          </AlertDescription>
        </Alert>
      )}
    </div>
  );
}

export { MilestonesStep };
