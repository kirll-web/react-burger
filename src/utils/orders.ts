export const getOrderStatusText = (status: string): string =>
  status === 'done' ? 'Выполнен' : 'Готовится';

export const isDoneOrder = (status: string): boolean => status === 'done';

export const formatOrderDate = (createdAt: Date): string => {
  const date = new Date(createdAt);
  const now = new Date();
  const yesterday = new Date(now);

  yesterday.setDate(now.getDate() - 1);

  const time = date.toLocaleTimeString('ru-RU', {
    hour: '2-digit',
    minute: '2-digit',
  });

  if (date.toDateString() === now.toDateString()) {
    return `Сегодня, ${time}`;
  }

  if (date.toDateString() === yesterday.toDateString()) {
    return `Вчера, ${time}`;
  }

  return date.toLocaleString('ru-RU', {
    day: 'numeric',
    month: 'long',
    hour: '2-digit',
    minute: '2-digit',
  });
};
