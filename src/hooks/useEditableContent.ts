import { useState, useEffect } from "react";

const STORAGE_KEY = "site_content";

const defaultContent: Record<string, string> = {
  hero_badge: "Сообщество родителей",
  hero_title_1: "Особый",
  hero_title_2: "ритм",
  hero_subtitle: "Пространство, где родители находят знания, поддержку и живое общение.",
  quote_text: "«Быть родителем — это не должность, это постоянное путешествие открытий.»",
  quote_author: "Миссия нашего клуба",
  nav_title: "Родительский Клуб",
  stat_1_value: "240+",
  stat_1_label: "Участников клуба",
  stat_2_value: "85",
  stat_2_label: "Статей и видео",
  stat_3_value: "30",
  stat_3_label: "Встреч проведено",
  stat_4_value: "4 года",
  stat_4_label: "Работаем вместе",
};

export function useEditableContent() {
  const [content, setContent] = useState<Record<string, string>>(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      return stored ? { ...defaultContent, ...JSON.parse(stored) } : defaultContent;
    } catch (_e) {
      return defaultContent;
    }
  });

  const [editMode, setEditMode] = useState(false);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(content));
    } catch (_e) {
      // ignore storage errors
    }
  }, [content]);

  const set = (key: string, value: string) => {
    setContent((prev) => ({ ...prev, [key]: value }));
  };

  const reset = () => {
    setContent(defaultContent);
    localStorage.removeItem(STORAGE_KEY);
  };

  return { content, set, editMode, setEditMode, reset };
}
