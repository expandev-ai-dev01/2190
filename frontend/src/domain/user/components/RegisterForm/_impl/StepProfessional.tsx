import { UseFormReturn } from 'react-hook-form';
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
  FormDescription,
} from '@/core/components/form';
import { Input } from '@/core/components/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/core/components/select';
import type { RegisterFormInput, RegisterFormOutput } from '../../../types/forms';

interface StepProfessionalProps {
  form: UseFormReturn<RegisterFormInput, unknown, RegisterFormOutput>;
}

export function StepProfessional({ form }: StepProfessionalProps) {
  return (
    <div className="space-y-6">
      <div className="grid gap-4 md:grid-cols-2">
        <FormField
          control={form.control}
          name="conselhoProfissional"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Conselho Profissional</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="CRM">CRM (Medicina)</SelectItem>
                  <SelectItem value="CRN">CRN (Nutrição)</SelectItem>
                  <SelectItem value="CREF">CREF (Educação Física)</SelectItem>
                  <SelectItem value="CRF">CRF (Farmácia)</SelectItem>
                  <SelectItem value="outro">Outro</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="numeroRegistro"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Número do Registro</FormLabel>
              <FormControl>
                <Input placeholder="Ex: 12345/SP" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="especialidade"
          render={({ field }) => (
            <FormItem className="col-span-2">
              <FormLabel>Especialidade</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="endocrinologia">Endocrinologia</SelectItem>
                  <SelectItem value="nutricao">Nutrição</SelectItem>
                  <SelectItem value="educacao_fisica">Educação Física</SelectItem>
                  <SelectItem value="clinico_geral">Clínico Geral</SelectItem>
                  <SelectItem value="outro">Outro</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>

      <div className="space-y-2">
        <FormLabel>Documento Comprobatório</FormLabel>
        <Input type="file" accept=".pdf,.jpg,.png" />
        <FormDescription>
          Envie uma foto ou PDF da sua carteira profissional (Máx. 10MB)
        </FormDescription>
      </div>
    </div>
  );
}
