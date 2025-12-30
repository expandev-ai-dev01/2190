import { UseFormReturn } from 'react-hook-form';
import { Alert, AlertDescription, AlertTitle } from '@/core/components/alert';
import { CheckCircle2, AlertTriangle } from 'lucide-react';
import type { WeightGoalFormInput, WeightGoalFormOutput } from '../../../../types/forms';

interface ValidationStepProps {
  form: UseFormReturn<WeightGoalFormInput, unknown, WeightGoalFormOutput>;
}

function ValidationStep({ form }: ValidationStepProps) {
  const formValues = form.getValues();
  const totalPesoPerder = formValues.pesoAtual - formValues.pesoDesejado;
  const perdaSemanal = totalPesoPerder / formValues.prazoObjetivo;

  const isMetaSaudavel = perdaSemanal >= 0.25 && perdaSemanal <= 1;

  return (
    <div className="space-y-6">
      <Alert variant={isMetaSaudavel ? 'default' : 'destructive'}>
        {isMetaSaudavel ? (
          <CheckCircle2 className="h-4 w-4" />
        ) : (
          <AlertTriangle className="h-4 w-4" />
        )}
        <AlertTitle>
          {isMetaSaudavel ? 'Meta Validada' : 'Atenção: Meta Pode Ser Inadequada'}
        </AlertTitle>
        <AlertDescription>
          {isMetaSaudavel
            ? 'Sua meta está dentro dos parâmetros recomendados para perda de peso saudável.'
            : 'A perda de peso semanal está fora dos limites recomendados (0,25kg a 1kg por semana). Considere ajustar seu prazo.'}
        </AlertDescription>
      </Alert>

      <div className="space-y-4 rounded-lg border p-4">
        <h3 className="text-lg font-semibold">Resumo do Objetivo</h3>

        <div className="grid gap-4 md:grid-cols-2">
          <div>
            <p className="text-muted-foreground text-sm">Peso Atual</p>
            <p className="text-lg font-semibold">{formValues.pesoAtual} kg</p>
          </div>
          <div>
            <p className="text-muted-foreground text-sm">Peso Desejado</p>
            <p className="text-lg font-semibold">{formValues.pesoDesejado} kg</p>
          </div>
          <div>
            <p className="text-muted-foreground text-sm">Total a Perder</p>
            <p className="text-lg font-semibold">{totalPesoPerder.toFixed(1)} kg</p>
          </div>
          <div>
            <p className="text-muted-foreground text-sm">Prazo</p>
            <p className="text-lg font-semibold">{formValues.prazoObjetivo} semanas</p>
          </div>
          <div>
            <p className="text-muted-foreground text-sm">Perda Semanal Estimada</p>
            <p className="text-lg font-semibold">{perdaSemanal.toFixed(2)} kg/semana</p>
          </div>
          <div>
            <p className="text-muted-foreground text-sm">Motivação Principal</p>
            <p className="text-lg font-semibold capitalize">{formValues.motivacaoPrincipal}</p>
          </div>
        </div>
      </div>

      {formValues.objetivosSecundarios && (
        <div className="space-y-4 rounded-lg border p-4">
          <h3 className="text-lg font-semibold">Objetivos Secundários</h3>
          <div className="grid gap-2 text-sm">
            {formValues.objetivosSecundarios.medidaCinturaDesejada && (
              <p>
                • Cintura: {formValues.objetivosSecundarios.medidaCinturaAtual} cm →{' '}
                {formValues.objetivosSecundarios.medidaCinturaDesejada} cm
              </p>
            )}
            {formValues.objetivosSecundarios.medidaQuadrilDesejada && (
              <p>
                • Quadril: {formValues.objetivosSecundarios.medidaQuadrilAtual} cm →{' '}
                {formValues.objetivosSecundarios.medidaQuadrilDesejada} cm
              </p>
            )}
            {formValues.objetivosSecundarios.medidaBracoDesejada && (
              <p>
                • Braço: {formValues.objetivosSecundarios.medidaBracoAtual} cm →{' '}
                {formValues.objetivosSecundarios.medidaBracoDesejada} cm
              </p>
            )}
            {formValues.objetivosSecundarios.frequenciaExercicioSemanal && (
              <p>
                • Exercícios: {formValues.objetivosSecundarios.frequenciaExercicioSemanal}{' '}
                dias/semana
              </p>
            )}
            {formValues.objetivosSecundarios.consumoAguaDiario && (
              <p>• Água: {formValues.objetivosSecundarios.consumoAguaDiario} litros/dia</p>
            )}
          </div>
        </div>
      )}

      <div className="space-y-4 rounded-lg border p-4">
        <h3 className="text-lg font-semibold">Configurações de Acompanhamento</h3>
        <div className="grid gap-2 text-sm">
          <p>
            • Marcos:{' '}
            {formValues.marcosAutomaticos
              ? `Automáticos (${formValues.frequenciaMarcos})`
              : 'Personalizados'}
          </p>
          <p>
            • Alertas: {formValues.preferenciasAlertas.tiposDesejados.length} tipos configurados
          </p>
          <p>• Canais: {formValues.preferenciasAlertas.canaisNotificacao.join(', ')}</p>
          <p>
            • Configuração Inteligente:{' '}
            {formValues.configuracaoInteligente ? 'Ativada' : 'Desativada'}
          </p>
        </div>
      </div>
    </div>
  );
}

export { ValidationStep };
