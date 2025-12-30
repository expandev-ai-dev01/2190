import { UseFormReturn } from 'react-hook-form';
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from '@/core/components/form';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/core/components/select';
import type { RegisterFormInput, RegisterFormOutput } from '../../../types/forms';

interface StepLifestyleProps {
  form: UseFormReturn<RegisterFormInput, unknown, RegisterFormOutput>;
}

export function StepLifestyle({ form }: StepLifestyleProps) {
  return (
    <div className="space-y-6">
      <FormField
        control={form.control}
        name="nivelAtividadeFisica"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Nível de Atividade Física</FormLabel>
            <Select onValueChange={field.onChange} defaultValue={field.value}>
              <FormControl>
                <SelectTrigger>
                  <SelectValue placeholder="Selecione" />
                </SelectTrigger>
              </FormControl>
              <SelectContent>
                <SelectItem value="sedentario">Sedentário (Pouco ou nenhum exercício)</SelectItem>
                <SelectItem value="leve">Leve (Exercício leve 1-3 dias/semana)</SelectItem>
                <SelectItem value="moderado">
                  Moderado (Exercício moderado 3-5 dias/semana)
                </SelectItem>
                <SelectItem value="intenso">Intenso (Exercício pesado 6-7 dias/semana)</SelectItem>
                <SelectItem value="muito_intenso">
                  Muito Intenso (Exercício pesado diário ou 2x ao dia)
                </SelectItem>
              </SelectContent>
            </Select>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="rotinaTrabalho"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Rotina de Trabalho (Opcional)</FormLabel>
            <Select onValueChange={field.onChange} defaultValue={field.value}>
              <FormControl>
                <SelectTrigger>
                  <SelectValue placeholder="Selecione" />
                </SelectTrigger>
              </FormControl>
              <SelectContent>
                <SelectItem value="escritorio">
                  Escritório (Sentado a maior parte do tempo)
                </SelectItem>
                <SelectItem value="ativo">Ativo (Em pé/Andando)</SelectItem>
                <SelectItem value="muito_ativo">Muito Ativo (Trabalho físico pesado)</SelectItem>
                <SelectItem value="variavel">Variável</SelectItem>
              </SelectContent>
            </Select>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="horarioPreferidoExercicio"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Horário Preferido para Exercícios (Opcional)</FormLabel>
            <Select onValueChange={field.onChange} defaultValue={field.value}>
              <FormControl>
                <SelectTrigger>
                  <SelectValue placeholder="Selecione" />
                </SelectTrigger>
              </FormControl>
              <SelectContent>
                <SelectItem value="manha">Manhã</SelectItem>
                <SelectItem value="tarde">Tarde</SelectItem>
                <SelectItem value="noite">Noite</SelectItem>
                <SelectItem value="flexivel">Flexível</SelectItem>
              </SelectContent>
            </Select>
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  );
}
