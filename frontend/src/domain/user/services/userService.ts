/**
 * @service UserService
 * @domain user
 * @type REST
 */

import { publicClient } from '@/core/lib/api';
import type { RegisterFormOutput } from '../types/forms';

export const userService = {
  async register(
    data: RegisterFormOutput
  ): Promise<{ id: number; email: string; message: string }> {
    // Note: In a real scenario with file uploads, we would use FormData here.
    // Based on the provided backend controller, it accepts JSON body.
    // If files were strictly required by backend as multipart, we would transform 'data' to FormData.

    const payload = {
      ...data,
      dadosAntropometricos: {
        pesoAtual: data.pesoAtual,
        altura: data.altura,
        medidaCintura: data.medidaCintura,
        medidaQuadril: data.medidaQuadril,
        medidaBraco: data.medidaBraco,
      },
      estiloVida: {
        nivelAtividadeFisica: data.nivelAtividadeFisica,
        rotinaTrabalho: data.rotinaTrabalho,
        preferenciasAlimentares: data.preferenciasAlimentares,
        horarioPreferidoExercicio: data.horarioPreferidoExercicio,
      },
      // Mapping flat structure to nested if backend requires, or sending flat if backend adapts.
      // The provided controller JSDoc suggests nested objects for 'dadosAntropometricos' and 'estiloVida'.
    };

    const response = await publicClient.post<{
      success: boolean;
      data: { id: number; email: string; mensagem: string };
    }>('/user/register', payload);
    return {
      id: response.data.data.id,
      email: response.data.data.email,
      message: response.data.data.mensagem,
    };
  },
};
