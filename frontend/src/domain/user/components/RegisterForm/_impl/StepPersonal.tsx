import { UseFormReturn } from 'react-hook-form';
import { differenceInYears, parseISO } from 'date-fns';
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from '@/core/components/form';
import { Input } from '@/core/components/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/core/components/select';
import { Alert, AlertDescription, AlertTitle } from '@/core/components/alert';
import { InfoIcon } from 'lucide-react';
import type { RegisterFormInput, RegisterFormOutput } from '../../../types/forms';

interface StepPersonalProps {
  form: UseFormReturn<RegisterFormInput, unknown, RegisterFormOutput>;
}

export function StepPersonal({ form }: StepPersonalProps) {
  const metodoCadastro = form.watch('metodoCadastro');
  const dataNascimento = form.watch('dataNascimento');

  const isUnderage = dataNascimento
    ? differenceInYears(new Date(), parseISO(dataNascimento)) < 18
    : false;

  return (
    <div className="space-y-6">
      <div className="grid gap-4 md:grid-cols-2">
        <FormField
          control={form.control}
          name="nomeCompleto"
          render={({ field }) => (
            <FormItem className="col-span-2">
              <FormLabel>Nome Completo</FormLabel>
              <FormControl>
                <Input placeholder="Digite seu nome completo" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem className="col-span-2">
              <FormLabel>E-mail</FormLabel>
              <FormControl>
                <Input type="email" placeholder="seu@email.com" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {metodoCadastro === 'email' && (
          <FormField
            control={form.control}
            name="senha"
            render={({ field }) => (
              <FormItem className="col-span-2">
                <FormLabel>Senha</FormLabel>
                <FormControl>
                  <Input type="password" placeholder="Mínimo 8 caracteres" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        )}

        <FormField
          control={form.control}
          name="dataNascimento"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Data de Nascimento</FormLabel>
              <FormControl>
                <Input type="date" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="genero"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Gênero</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="masculino">Masculino</SelectItem>
                  <SelectItem value="feminino">Feminino</SelectItem>
                  <SelectItem value="outro">Outro</SelectItem>
                  <SelectItem value="prefiro_nao_informar">Prefiro não informar</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="telefone"
          render={({ field }) => (
            <FormItem className="col-span-2">
              <FormLabel>Telefone (Opcional)</FormLabel>
              <FormControl>
                <Input placeholder="(XX) XXXXX-XXXX" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>

      {isUnderage && (
        <div className="bg-muted/20 space-y-4 rounded-lg border p-4">
          <Alert>
            <InfoIcon className="h-4 w-4" />
            <AlertTitle>Autorização de Responsável Necessária</AlertTitle>
            <AlertDescription>
              Como você é menor de 18 anos, precisamos dos dados de um responsável legal.
            </AlertDescription>
          </Alert>

          <FormField
            control={form.control}
            name="nomeResponsavel"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Nome do Responsável</FormLabel>
                <FormControl>
                  <Input placeholder="Nome completo do responsável" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="grid gap-4 md:grid-cols-2">
            <FormField
              control={form.control}
              name="cpfResponsavel"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>CPF do Responsável</FormLabel>
                  <FormControl>
                    <Input placeholder="000.000.000-00" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="emailResponsavel"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>E-mail do Responsável</FormLabel>
                  <FormControl>
                    <Input type="email" placeholder="email@responsavel.com" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </div>
      )}
    </div>
  );
}
