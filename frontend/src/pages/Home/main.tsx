import { Button } from '@/core/components/button';
import { Card, CardDescription, CardHeader, CardTitle } from '@/core/components/card';
import { useNavigation } from '@/core/hooks/useNavigation';
import { Target, TrendingDown, Activity } from 'lucide-react';

function HomePage() {
  const { navigate } = useNavigation();

  return (
    <div className="flex flex-col items-center justify-center space-y-8 py-12 text-center">
      <div className="space-y-4">
        <h1 className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl">EmagreceJá</h1>
        <p className="text-muted-foreground mx-auto max-w-2xl text-lg sm:text-xl">
          Sua plataforma inteligente para acompanhamento e apoio no processo de emagrecimento e
          melhoria da saúde
        </p>
      </div>

      <div className="grid w-full max-w-5xl gap-6 md:grid-cols-3">
        <Card className="transition-all hover:shadow-lg">
          <CardHeader>
            <div className="mb-2 flex justify-center">
              <div className="bg-primary/10 rounded-full p-3">
                <Target className="text-primary h-6 w-6" />
              </div>
            </div>
            <CardTitle>Defina Objetivos</CardTitle>
            <CardDescription>
              Configure metas personalizadas de perda de peso com validação de segurança
            </CardDescription>
          </CardHeader>
        </Card>

        <Card className="transition-all hover:shadow-lg">
          <CardHeader>
            <div className="mb-2 flex justify-center">
              <div className="bg-primary/10 rounded-full p-3">
                <TrendingDown className="text-primary h-6 w-6" />
              </div>
            </div>
            <CardTitle>Acompanhe Progresso</CardTitle>
            <CardDescription>
              Monitore sua evolução com marcos intermediários e relatórios detalhados
            </CardDescription>
          </CardHeader>
        </Card>

        <Card className="transition-all hover:shadow-lg">
          <CardHeader>
            <div className="mb-2 flex justify-center">
              <div className="bg-primary/10 rounded-full p-3">
                <Activity className="text-primary h-6 w-6" />
              </div>
            </div>
            <CardTitle>Receba Orientações</CardTitle>
            <CardDescription>
              Planos alimentares e sugestões de atividades físicas personalizadas
            </CardDescription>
          </CardHeader>
        </Card>
      </div>

      <div className="flex flex-col gap-4 sm:flex-row">
        <Button size="lg" onClick={() => navigate('/weight-goals')}>
          <Target className="mr-2 h-5 w-5" />
          Definir Objetivos
        </Button>
      </div>
    </div>
  );
}

export { HomePage };
