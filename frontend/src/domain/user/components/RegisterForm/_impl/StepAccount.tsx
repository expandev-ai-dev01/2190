import { UseFormReturn } from 'react-hook-form';
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from '@/core/components/form';
import { RadioGroup, RadioGroupItem } from '@/core/components/radio-group';
import { UserIcon, StethoscopeIcon, MailIcon } from 'lucide-react';
import type { RegisterFormInput, RegisterFormOutput } from '../../../types/forms';

interface StepAccountProps {
  form: UseFormReturn<RegisterFormInput, unknown, RegisterFormOutput>;
}

export function StepAccount({ form }: StepAccountProps) {
  return (
    <div className="space-y-6">
      <div className="space-y-4">
        <h3 className="text-lg font-medium">Tipo de Conta</h3>
        <FormField
          control={form.control}
          name="tipoUsuario"
          render={({ field }) => (
            <FormItem className="space-y-3">
              <FormControl>
                <RadioGroup
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                  className="grid grid-cols-1 gap-4 md:grid-cols-2"
                >
                  <FormItem>
                    <FormControl>
                      <RadioGroupItem value="usuario_final" className="peer sr-only" />
                    </FormControl>
                    <FormLabel className="border-muted bg-popover hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary flex cursor-pointer flex-col items-center justify-between rounded-md border-2 p-4 transition-all">
                      <UserIcon className="mb-3 h-6 w-6" />
                      Usuário Final
                    </FormLabel>
                  </FormItem>
                  <FormItem>
                    <FormControl>
                      <RadioGroupItem value="profissional_saude" className="peer sr-only" />
                    </FormControl>
                    <FormLabel className="border-muted bg-popover hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary flex cursor-pointer flex-col items-center justify-between rounded-md border-2 p-4 transition-all">
                      <StethoscopeIcon className="mb-3 h-6 w-6" />
                      Profissional de Saúde
                    </FormLabel>
                  </FormItem>
                </RadioGroup>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>

      <div className="space-y-4">
        <h3 className="text-lg font-medium">Método de Cadastro</h3>
        <FormField
          control={form.control}
          name="metodoCadastro"
          render={({ field }) => (
            <FormItem className="space-y-3">
              <FormControl>
                <RadioGroup
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                  className="grid grid-cols-1 gap-4"
                >
                  <FormItem>
                    <FormControl>
                      <RadioGroupItem value="email" className="peer sr-only" />
                    </FormControl>
                    <FormLabel className="border-muted bg-popover hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary flex cursor-pointer items-center gap-3 rounded-md border-2 p-4 transition-all">
                      <MailIcon className="h-5 w-5" />
                      Cadastrar com E-mail
                    </FormLabel>
                  </FormItem>
                  {/* Social login options would go here if implemented in frontend logic */}
                </RadioGroup>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>
    </div>
  );
}
