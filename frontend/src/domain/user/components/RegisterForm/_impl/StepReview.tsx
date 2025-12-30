import { UseFormReturn } from 'react-hook-form';
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
  FormDescription,
} from '@/core/components/form';
import { Checkbox } from '@/core/components/checkbox';
import { Input } from '@/core/components/input';
import type { RegisterFormInput, RegisterFormOutput } from '../../../types/forms';

interface StepReviewProps {
  form: UseFormReturn<RegisterFormInput, unknown, RegisterFormOutput>;
}

export function StepReview({ form }: StepReviewProps) {
  return (
    <div className="space-y-8">
      <div className="space-y-4">
        <h3 className="text-lg font-medium">Foto de Perfil (Opcional)</h3>
        <div className="flex items-center gap-4">
          <div className="bg-muted text-muted-foreground flex h-24 w-24 items-center justify-center rounded-full">
            Foto
          </div>
          <div className="flex-1">
            <Input type="file" accept=".jpg,.jpeg,.png" />
            <FormDescription>Recomendado: 400x400px. Máx 5MB.</FormDescription>
          </div>
        </div>
      </div>

      <div className="space-y-4">
        <h3 className="text-lg font-medium">Termos e Condições</h3>

        <FormField
          control={form.control}
          name="aceiteTermos"
          render={({ field }) => (
            <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
              <FormControl>
                <Checkbox checked={field.value} onCheckedChange={field.onChange} />
              </FormControl>
              <div className="space-y-1 leading-none">
                <FormLabel>Aceito os Termos de Uso</FormLabel>
                <FormDescription>
                  Li e concordo com os termos de serviço da plataforma EmagreceJá.
                </FormDescription>
              </div>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="aceitePrivacidade"
          render={({ field }) => (
            <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
              <FormControl>
                <Checkbox checked={field.value} onCheckedChange={field.onChange} />
              </FormControl>
              <div className="space-y-1 leading-none">
                <FormLabel>Aceito a Política de Privacidade</FormLabel>
                <FormDescription>
                  Concordo com o processamento dos meus dados pessoais conforme descrito na política
                  de privacidade.
                </FormDescription>
              </div>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>
    </div>
  );
}
