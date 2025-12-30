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
import { Textarea } from '@/core/components/textarea';
import { Alert, AlertDescription, AlertTitle } from '@/core/components/alert';
import { InfoIcon } from 'lucide-react';
import type { WeightGoalFormInput, WeightGoalFormOutput } from '../../../../types/forms';

interface MotivationsStepProps {
  form: UseFormReturn<WeightGoalFormInput, unknown, WeightGoalFormOutput>;
}

function MotivationsStep({ form }: MotivationsStepProps) {
  return (
    <div className="space-y-6">
      <Alert>
        <InfoIcon className="h-4 w-4" />
        <AlertTitle>Motivações e Preferências</AlertTitle>
        <AlertDescription>
          Entender suas motivações nos ajuda a personalizar suas recomendações.
        </AlertDescription>
      </Alert>

      <FormField
        control={form.control}
        name="motivacaoPrincipal"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Motivação Principal</FormLabel>
            <Select onValueChange={field.onChange} value={field.value}>
              <FormControl>
                <SelectTrigger>
                  <SelectValue placeholder="Selecione sua principal motivação" />
                </SelectTrigger>
              </FormControl>
              <SelectContent>
                <SelectItem value="saude">Saúde</SelectItem>
                <SelectItem value="estetica">Estética</SelectItem>
                <SelectItem value="autoestima">Autoestima</SelectItem>
                <SelectItem value="performance">Performance Física</SelectItem>
                <SelectItem value="medica">Recomendação Médica</SelectItem>
              </SelectContent>
            </Select>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="motivacaoPessoal"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Motivação Pessoal (Opcional)</FormLabel>
            <FormControl>
              <Textarea
                placeholder="Descreva sua motivação pessoal..."
                className="min-h-[100px]"
                {...field}
                value={field.value ?? ''}
              />
            </FormControl>
            <FormDescription>Máximo 500 caracteres</FormDescription>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="abordagemPreferida"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Abordagem Preferida</FormLabel>
            <Select onValueChange={field.onChange} value={field.value}>
              <FormControl>
                <SelectTrigger>
                  <SelectValue placeholder="Selecione sua abordagem preferida" />
                </SelectTrigger>
              </FormControl>
              <SelectContent>
                <SelectItem value="dieta">Foco em Dieta</SelectItem>
                <SelectItem value="exercicio">Foco em Exercícios</SelectItem>
                <SelectItem value="combinacao">Combinação (Dieta + Exercícios)</SelectItem>
              </SelectContent>
            </Select>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="experienciaAnterior"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Experiência Anterior</FormLabel>
            <Select onValueChange={field.onChange} value={field.value}>
              <FormControl>
                <SelectTrigger>
                  <SelectValue placeholder="Selecione sua experiência" />
                </SelectTrigger>
              </FormControl>
              <SelectContent>
                <SelectItem value="primeira_vez">Primeira Vez</SelectItem>
                <SelectItem value="tentativas_anteriores">Tentativas Anteriores</SelectItem>
                <SelectItem value="acompanhamento_profissional">
                  Com Acompanhamento Profissional
                </SelectItem>
              </SelectContent>
            </Select>
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  );
}

export { MotivationsStep };
