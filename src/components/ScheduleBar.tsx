"use client";

import React from "react";

interface Agendamento {
  inicio: string;
  fim: string;
}

interface ScheduleBarProps {
  agendamentos: Agendamento[];
}

const ScheduleBar: React.FC<ScheduleBarProps> = ({ agendamentos }) => {
  const startHour = 19; // Horário de início das 19h
  const endHour = 23; // Horário de fim das 23h
  const totalMinutes = (endHour - startHour) * 60;

  // Gera o horário de 19h a 23h, marcando os horários ocupados
  const slots: { start: number; end: number; ocupado: boolean }[] = [];

  // Preenche os horários com base nos agendamentos
  agendamentos.forEach((agendamento) => {
    const [startHour, startMinute] = agendamento.inicio.split(":").map(Number);
    const [endHour, endMinute] = agendamento.fim.split(":").map(Number);

    // Corrigindo o cálculo das posições de início e fim
    const start = (startHour - 19) * 60 + startMinute;
    const end = (endHour - 19) * 60 + endMinute;

    slots.push({ start, end, ocupado: true });
  });

  // Preenche as lacunas como horários livres
  const timeline = [];
  let lastEnd = 0;

  for (let i = 0; i < slots.length; i++) {
    const { start, end } = slots[i];

    // Horários livres entre agendamentos
    if (start > lastEnd) {
      timeline.push({ start: lastEnd, end: start, ocupado: false });
    }

    // Adiciona o agendamento
    timeline.push({ start, end, ocupado: true });
    lastEnd = end;
  }

  // Adiciona os horários livres após o último agendamento
  if (lastEnd < totalMinutes) {
    timeline.push({ start: lastEnd, end: totalMinutes, ocupado: false });
  }

  // Função para gerar os rótulos de hora, excluindo o último horário (23h)
  const generateHourLabels = () => {
    const labels = [];
    for (let i = startHour; i < endHour; i++) {
      // Modificado para não incluir 23h
      const position = ((i - startHour) / (endHour - startHour)) * 100; // Calcula a posição proporcional
      labels.push(
        <div
          key={i}
          className="absolute bottom-0 text-xs text-foreground"
          style={{ left: `${position}%` }}
        >
          {i}:00
        </div>
      );
    }
    return labels;
  };

  return (
    <div className="w-full relative mt-4 cursor-pointer">
      {/* Rótulos de Hora abaixo da barra */}
      <div className="w-full relative">{generateHourLabels()}</div>
      {/* Barra de Horários com agendamentos e horários livres */}
      <div className="w-full h-4 flex items-center border rounded-lg overflow-hidden bg-card-foreground relative">
        {timeline.map((slot, index) => (
          <div
            key={index}
            className={`h-full absolute ${slot.ocupado ? "bg-primary" : "bg-green-200"}`}
            style={{
              width: `${((slot.end - slot.start) / totalMinutes) * 100}%`,
              left: `${(slot.start / totalMinutes) * 100}%`,
            }}
          />
        ))}
      </div>
    </div>
  );
};

export default ScheduleBar;

