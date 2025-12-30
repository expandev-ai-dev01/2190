import { useState } from 'react';
import { Button } from '@/core/components/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/core/components/card';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/core/components/dialog';
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from '@/core/components/empty';
import { LoadingSpinner } from '@/core/components/loading-spinner';
import { useWeightGoalList } from '@/domain/weightGoals/hooks/useWeightGoalList';
import { WeightGoalForm } from '@/domain/weightGoals/components/WeightGoalForm';
import { Plus, Target } from 'lucide-react';
import { Badge } from '@/core/components/badge';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';

function WeightGoalsPage() {
  const [isFormOpen, setIsFormOpen] = useState(false);
  const idUsuario = 1;

  const { goals, isLoading } = useWeightGoalList({ idUsuario });

  if (isLoading) {
    return (
      <div className="flex h-full items-center justify-center">
        <LoadingSpinner className="h-8 w-8" />
      </div>
    );
  }

  const activeGoals = goals?.filter((goal) => goal.ativo) ?? [];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Objetivos de Emagrecimento</h1>
          <p className="text-muted-foreground">Gerencie suas metas de perda de peso</p>
        </div>
        <Button onClick={() => setIsFormOpen(true)}>
          <Plus className="mr-2 h-4 w-4" />
          Novo Objetivo
        </Button>
      </div>

      {activeGoals.length === 0 ? (
        <Empty className="min-h-[400px]">
          <EmptyHeader>
            <EmptyMedia variant="icon">
              <Target className="h-6 w-6" />
            </EmptyMedia>
            <EmptyTitle>Nenhum objetivo definido</EmptyTitle>
            <EmptyDescription>
              Comece definindo seu primeiro objetivo de emagrecimento para acompanhar seu progresso.
            </EmptyDescription>
          </EmptyHeader>
          <EmptyContent>
            <Button onClick={() => setIsFormOpen(true)}>
              <Plus className="mr-2 h-4 w-4" />
              Criar Primeiro Objetivo
            </Button>
          </EmptyContent>
        </Empty>
      ) : (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {activeGoals.map((goal) => {
            const totalPesoPerder = goal.pesoAtual - goal.pesoDesejado;
            const perdaSemanal = totalPesoPerder / goal.prazoObjetivo;

            return (
              <Card key={goal.id} className="transition-all hover:shadow-lg">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div>
                      <CardTitle className="text-xl">Meta de Peso</CardTitle>
                      <CardDescription>
                        Criado em{' '}
                        {format(new Date(goal.dataCriacao), 'dd/MM/yyyy', { locale: ptBR })}
                      </CardDescription>
                    </div>
                    <Badge
                      variant={
                        goal.validacaoAutomatica.status === 'aprovado' ? 'default' : 'destructive'
                      }
                    >
                      {goal.validacaoAutomatica.status}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-muted-foreground text-sm">Peso Atual</p>
                      <p className="text-2xl font-bold">{goal.pesoAtual} kg</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground text-sm">Peso Desejado</p>
                      <p className="text-2xl font-bold">{goal.pesoDesejado} kg</p>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Total a perder</span>
                      <span className="font-semibold">{totalPesoPerder.toFixed(1)} kg</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Prazo</span>
                      <span className="font-semibold">{goal.prazoObjetivo} semanas</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Perda semanal</span>
                      <span className="font-semibold">{perdaSemanal.toFixed(2)} kg/sem</span>
                    </div>
                  </div>

                  <div className="space-y-2 border-t pt-4">
                    <p className="text-sm font-medium">Motivação</p>
                    <Badge variant="secondary" className="capitalize">
                      {goal.motivacaoPrincipal}
                    </Badge>
                  </div>

                  {goal.validacaoAutomatica.scoreSeguranca && (
                    <div className="space-y-2 border-t pt-4">
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">Score de Segurança</span>
                        <span className="font-semibold">
                          {goal.validacaoAutomatica.scoreSeguranca}/100
                        </span>
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            );
          })}
        </div>
      )}

      <Dialog open={isFormOpen} onOpenChange={setIsFormOpen}>
        <DialogContent className="max-h-[90vh] max-w-5xl overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Novo Objetivo de Emagrecimento</DialogTitle>
          </DialogHeader>
          <WeightGoalForm
            idUsuario={idUsuario}
            onSuccess={() => setIsFormOpen(false)}
            onCancel={() => setIsFormOpen(false)}
          />
        </DialogContent>
      </Dialog>
    </div>
  );
}

export { WeightGoalsPage };
