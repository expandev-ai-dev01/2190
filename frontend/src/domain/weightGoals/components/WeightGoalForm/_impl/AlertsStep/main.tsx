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
import { Switch } from '@/core/components/switch';
import { Checkbox } from '@/core/components/checkbox';
import { Alert, AlertDescription, AlertTitle } from '@/core/components/alert';
import { InfoIcon } from 'lucide-react';
import type { WeightGoalFormInput, WeightGoalFormOutput } from '../../../../types/forms';

interface AlertsStepProps {
  form: UseFormReturn<WeightGoalFormInput, unknown, WeightGoalFormOutput>;
}

function AlertsStep({ form }: AlertsStepProps) {
  const tiposAlertas = [
    { id: 'pesagem', label: 'Pesagem' },
    { id: 'medicao', label: 'Medição Corporal' },
    { id: 'exercicio', label: 'Exercício' },
    { id: 'hidratacao', label: 'Hidratação' },
    { id: 'refeicao', label: 'Refeição' },
  ];

  const canaisNotificacao = [
    { id: 'push', label: 'Notificações Push' },
    { id: 'email', label: 'E-mail' },
    { id: 'sms', label: 'SMS' },
  ];

  return (
    <div className="space-y-6">
      <Alert>
        <InfoIcon className="h-4 w-4" />
        <AlertTitle>Preferências de Alertas</AlertTitle>
        <AlertDescription>
          Configure como e quando deseja receber lembretes e notificações.
        </AlertDescription>
      </Alert>

      <div className="space-y-4">
        <h3 className="text-lg font-semibold">Tipos de Alertas</h3>
        <FormField
          control={form.control}
          name="preferenciasAlertas.tiposDesejados"
          render={() => (
            <FormItem>
              <div className="space-y-2">
                {tiposAlertas.map((tipo) => (
                  <FormField
                    key={tipo.id}
                    control={form.control}
                    name="preferenciasAlertas.tiposDesejados"
                    render={({ field }) => {
                      return (
                        <FormItem
                          key={tipo.id}
                          className="flex flex-row items-start space-x-3 space-y-0"
                        >
                          <FormControl>
                            <Checkbox
                              checked={field.value?.includes(tipo.id)}
                              onCheckedChange={(checked) => {
                                return checked
                                  ? field.onChange([...field.value, tipo.id])
                                  : field.onChange(
                                      field.value?.filter((value) => value !== tipo.id)
                                    );
                              }}
                            />
                          </FormControl>
                          <FormLabel className="font-normal">{tipo.label}</FormLabel>
                        </FormItem>
                      );
                    }}
                  />
                ))}
              </div>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>

      <div className="space-y-4">
        <h3 className="text-lg font-semibold">Horários Preferidos</h3>
        <div className="grid gap-4 md:grid-cols-3">
          <FormField
            control={form.control}
            name="preferenciasAlertas.horariosPreferidos.manha"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Manhã</FormLabel>
                <FormControl>
                  <Input type="time" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="preferenciasAlertas.horariosPreferidos.tarde"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Tarde</FormLabel>
                <FormControl>
                  <Input type="time" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="preferenciasAlertas.horariosPreferidos.noite"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Noite</FormLabel>
                <FormControl>
                  <Input type="time" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
      </div>

      <div className="space-y-4">
        <h3 className="text-lg font-semibold">Canais de Notificação</h3>
        <FormField
          control={form.control}
          name="preferenciasAlertas.canaisNotificacao"
          render={() => (
            <FormItem>
              <div className="space-y-2">
                {canaisNotificacao.map((canal) => (
                  <FormField
                    key={canal.id}
                    control={form.control}
                    name="preferenciasAlertas.canaisNotificacao"
                    render={({ field }) => {
                      return (
                        <FormItem
                          key={canal.id}
                          className="flex flex-row items-start space-x-3 space-y-0"
                        >
                          <FormControl>
                            <Checkbox
                              checked={field.value?.includes(canal.id as 'push' | 'email' | 'sms')}
                              onCheckedChange={(checked) => {
                                return checked
                                  ? field.onChange([...field.value, canal.id])
                                  : field.onChange(
                                      field.value?.filter((value) => value !== canal.id)
                                    );
                              }}
                            />
                          </FormControl>
                          <FormLabel className="font-normal">{canal.label}</FormLabel>
                        </FormItem>
                      );
                    }}
                  />
                ))}
              </div>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>

      <FormField
        control={form.control}
        name="configuracaoInteligente"
        render={({ field }) => (
          <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
            <div className="space-y-0.5">
              <FormLabel className="text-base">Configuração Inteligente</FormLabel>
              <FormDescription>
                Permite que o sistema ajuste automaticamente os horários dos alertas baseado no seu
                comportamento
              </FormDescription>
            </div>
            <FormControl>
              <Switch checked={field.value} onCheckedChange={field.onChange} />
            </FormControl>
          </FormItem>
        )}
      />
    </div>
  );
}

export { AlertsStep };
