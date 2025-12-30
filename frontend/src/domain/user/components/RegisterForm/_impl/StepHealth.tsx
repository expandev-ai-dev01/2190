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
import { Textarea } from '@/core/components/textarea';
import { Alert, AlertDescription, AlertTitle } from '@/core/components/alert';
import { InfoIcon } from 'lucide-react';
import type { RegisterFormInput, RegisterFormOutput } from '../../../types/forms';

interface StepHealthProps {
  form: UseFormReturn<RegisterFormInput, unknown, RegisterFormOutput>;
}

export function StepHealth({ form }: StepHealthProps) {
  const peso = form.watch('pesoAtual');
  const altura = form.watch('altura');

  const imc = peso && altura ? (peso / (altura * altura)).toFixed(2) : null;

  return (
    <div className="space-y-8">
      <div className="space-y-4">
        <h3 className="text-lg font-medium">Dados Antropométricos</h3>
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
                    placeholder="Ex: 70.5"
                    {...field}
                    onChange={(e) => field.onChange(parseFloat(e.target.value) || 0)}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="altura"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Altura (m)</FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    step="0.01"
                    placeholder="Ex: 1.75"
                    {...field}
                    onChange={(e) => field.onChange(parseFloat(e.target.value) || 0)}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        {imc && (
          <Alert>
            <InfoIcon className="h-4 w-4" />
            <AlertTitle>IMC Calculado: {imc}</AlertTitle>
            <AlertDescription>
              Seu Índice de Massa Corporal foi calculado automaticamente com base no peso e altura.
            </AlertDescription>
          </Alert>
        )}

        <div className="grid gap-4 md:grid-cols-3">
          <FormField
            control={form.control}
            name="medidaCintura"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Cintura (cm) - Opcional</FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    step="0.1"
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
          <FormField
            control={form.control}
            name="medidaQuadril"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Quadril (cm) - Opcional</FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    step="0.1"
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
          <FormField
            control={form.control}
            name="medidaBraco"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Braço (cm) - Opcional</FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    step="0.1"
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
        <h3 className="text-lg font-medium">Informações de Saúde (Opcional)</h3>
        <FormField
          control={form.control}
          name="historicoMedico"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Histórico Médico</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Cirurgias, doenças crônicas, etc."
                  {...field}
                  value={field.value ?? ''}
                />
              </FormControl>
              <FormDescription>Máximo 1000 caracteres</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="medicamentosUso"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Medicamentos em Uso</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Liste os medicamentos que você usa regularmente"
                  {...field}
                  value={field.value ?? ''}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="alergiasAlimentares"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Alergias Alimentares</FormLabel>
              <FormControl>
                <Input
                  placeholder="Ex: Amendoim, Lactose, Glúten"
                  {...field}
                  value={field.value ?? ''}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>
    </div>
  );
}
