import { useState } from "react";
import Icon from "@/components/ui/icon";

const HERO_IMAGE = "https://cdn.poehali.dev/projects/8e6a258d-21ee-4204-a204-467064960ca3/bucket/33321ca4-f8a6-485d-a69d-9dadbe88fa55.png";

type Section = "home" | "articles" | "forum" | "events" | "about" | "contact";

const navItems: { id: Section; label: string }[] = [
  { id: "home", label: "Главная" },
  { id: "articles", label: "Материалы" },
  { id: "forum", label: "Форум" },
  { id: "events", label: "Мероприятия" },
  { id: "about", label: "О клубе" },
  { id: "contact", label: "Контакты" },
];

const articles = [
  {
    id: 1,
    category: "Психология",
    title: "Как говорить с ребёнком о сложных эмоциях",
    excerpt: "Практические техники для родителей, которые помогут детям понять и выразить свои чувства безопасным образом.",
    author: "Мария Соколова",
    date: "12 апреля 2026",
    readTime: "8 мин",
    type: "article",
  },
  {
    id: 2,
    category: "Видео",
    title: "Вечерние ритуалы: как подготовить ребёнка ко сну",
    excerpt: "Видеозапись встречи клуба с детским психологом Еленой Васиной о важности режима и спокойного вечера.",
    author: "Елена Васина",
    date: "5 апреля 2026",
    readTime: "24 мин",
    type: "video",
  },
  {
    id: 3,
    category: "Материал",
    title: "Чек-лист: первый класс без стресса",
    excerpt: "Пошаговое руководство для родителей первоклассников. Скачайте и используйте в подготовке к школе.",
    author: "Редакция клуба",
    date: "28 марта 2026",
    readTime: "PDF",
    type: "download",
  },
  {
    id: 4,
    category: "Психология",
    title: "Границы без наказаний: как объяснить «нет»",
    excerpt: "Альтернативные методы воспитания, которые работают лучше традиционных запретов и наказаний.",
    author: "Алексей Дорофеев",
    date: "20 марта 2026",
    readTime: "12 мин",
    type: "article",
  },
  {
    id: 5,
    category: "Здоровье",
    title: "Питание дошкольника: мифы и реальность",
    excerpt: "Разбираем популярные заблуждения о детском питании вместе с педиатром-нутрициологом.",
    author: "Наталья Крюкова",
    date: "14 марта 2026",
    readTime: "10 мин",
    type: "article",
  },
  {
    id: 6,
    category: "Видео",
    title: "Игры для всей семьи: развиваем вместе",
    excerpt: "Подборка игр для детей от 3 до 10 лет, которые объединяют и развивают одновременно.",
    author: "Ирина Климова",
    date: "7 марта 2026",
    readTime: "18 мин",
    type: "video",
  },
];

const forumTopics = [
  {
    id: 1,
    title: "Ребёнок отказывается ходить в детский сад — что делать?",
    author: "Анна К.",
    replies: 23,
    lastActive: "2 часа назад",
    tag: "Адаптация",
  },
  {
    id: 2,
    title: "Поделитесь: как вы объясняете детям про развод?",
    author: "Дмитрий Л.",
    replies: 15,
    lastActive: "5 часов назад",
    tag: "Семья",
  },
  {
    id: 3,
    title: "Экранное время: сколько можно и как ограничить без скандалов",
    author: "Юлия М.",
    replies: 41,
    lastActive: "вчера",
    tag: "Воспитание",
  },
  {
    id: 4,
    title: "Рекомендуете ли спорт? Какие секции для 5-летнего?",
    author: "Сергей В.",
    replies: 18,
    lastActive: "вчера",
    tag: "Развитие",
  },
  {
    id: 5,
    title: "Как вы справляетесь с усталостью? Делимся опытом",
    author: "Ольга Р.",
    replies: 56,
    lastActive: "2 дня назад",
    tag: "Самопомощь",
  },
];

const events = [
  {
    id: 1,
    date: "26 апр",
    day: "суббота",
    title: "Встреча клуба: «Трудные разговоры с детьми»",
    location: "Центр «Семья», ул. Ленина, 14",
    time: "11:00 — 13:00",
    spots: "8 мест",
    type: "meetup",
  },
  {
    id: 2,
    date: "10 мая",
    day: "суббота",
    title: "Мастер-класс: арт-терапия для родителей",
    location: "Онлайн",
    time: "10:00 — 12:00",
    spots: "20 мест",
    type: "online",
  },
  {
    id: 3,
    date: "24 мая",
    day: "суббота",
    title: "Семейный пикник клуба",
    location: "Парк Дружбы",
    time: "12:00 — 16:00",
    spots: "Свободно",
    type: "outdoor",
  },
  {
    id: 4,
    date: "7 июн",
    day: "суббота",
    title: "Лекция: детская тревожность и её причины",
    location: "Онлайн",
    time: "18:00 — 19:30",
    spots: "Без ограничений",
    type: "online",
  },
];

const typeIcon: Record<string, string> = {
  article: "FileText",
  video: "Play",
  download: "Download",
};

const typeLabel: Record<string, string> = {
  article: "Читать",
  video: "Смотреть",
  download: "Скачать",
};

const Index = () => {
  const [activeSection, setActiveSection] = useState<Section>("home");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [archiveFilter, setArchiveFilter] = useState("Все");

  const scrollTo = (id: Section) => {
    setActiveSection(id);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="min-h-screen bg-[#FAFAF8] font-golos text-[#2C2C2C]">
      {/* NAV */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-[#FAFAF8]/90 backdrop-blur-sm border-b border-[#E8E4DC]">
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
          <button
            onClick={() => scrollTo("home")}
            className="font-cormorant text-xl font-semibold tracking-wide text-[#2C2C2C] hover:text-[#8B6E4E] transition-colors"
          >
            Родительский Клуб
          </button>
          <nav className="hidden md:flex items-center gap-8">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => scrollTo(item.id)}
                className={`text-sm transition-colors relative py-1 ${
                  activeSection === item.id
                    ? "text-[#8B6E4E] font-medium"
                    : "text-[#6B6B6B] hover:text-[#2C2C2C]"
                }`}
              >
                {item.label}
                {activeSection === item.id && (
                  <span className="absolute bottom-0 left-0 right-0 h-px bg-[#8B6E4E]" />
                )}
              </button>
            ))}
          </nav>
          <button
            className="md:hidden p-2 text-[#6B6B6B]"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            <Icon name={mobileMenuOpen ? "X" : "Menu"} size={20} />
          </button>
        </div>
        {mobileMenuOpen && (
          <div className="md:hidden border-t border-[#E8E4DC] bg-[#FAFAF8] px-6 py-4 flex flex-col gap-4 animate-fade-in">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => scrollTo(item.id)}
                className={`text-left text-sm py-1 ${
                  activeSection === item.id ? "text-[#8B6E4E] font-medium" : "text-[#6B6B6B]"
                }`}
              >
                {item.label}
              </button>
            ))}
          </div>
        )}
      </header>

      <main className="pt-16">

        {/* HOME */}
        {activeSection === "home" && (
          <div className="animate-fade-in">
            {/* Hero */}
            <section className="relative h-[88vh] min-h-[560px] overflow-hidden">
              <img
                src={HERO_IMAGE}
                alt="Родительский клуб"
                className="absolute inset-0 w-full h-full object-contain object-center"
                style={{ filter: "saturate(0.55) brightness(0.92)" }}
              />
              <div className="absolute inset-0 bg-gradient-to-b from-[#FAFAF8]/30 via-transparent to-[#FAFAF8]" />
              <div className="relative h-full flex flex-col justify-end pb-16 px-6 max-w-6xl mx-auto">
                <div className="max-w-xl">
                  <span className="text-xs font-medium tracking-widest uppercase text-[#8B6E4E] mb-4 block">
                    Сообщество родителей
                  </span>
                  <h1 className="font-cormorant text-5xl md:text-7xl font-light leading-[1.1] text-[#111111] mb-6">
                    Особый<br />
                    <em>ритм</em>
                  </h1>
                  <p className="text-[#3A3A3A] text-lg leading-relaxed mb-8 max-w-sm">
                    Пространство, где родители находят знания, поддержку и живое общение.
                  </p>
                  <div className="flex gap-4 flex-wrap">
                    <button
                      onClick={() => scrollTo("articles")}
                      className="px-6 py-3 bg-[#2C2C2C] text-[#FAFAF8] text-sm font-medium hover:bg-[#8B6E4E] transition-colors"
                    >
                      Читать материалы
                    </button>
                    <button
                      onClick={() => scrollTo("events")}
                      className="px-6 py-3 border border-[#2C2C2C] text-[#2C2C2C] text-sm font-medium hover:border-[#8B6E4E] hover:text-[#8B6E4E] transition-colors"
                    >
                      Ближайшие встречи
                    </button>
                  </div>
                </div>
              </div>
            </section>

            {/* Stats */}
            <section className="py-16 border-b border-[#E8E4DC]">
              <div className="max-w-6xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-8">
                {[
                  { value: "240+", label: "Участников клуба" },
                  { value: "85", label: "Статей и видео" },
                  { value: "30", label: "Встреч проведено" },
                  { value: "4 года", label: "Работаем вместе" },
                ].map((stat) => (
                  <div key={stat.label} className="text-center">
                    <div className="font-cormorant text-4xl font-light text-[#8B6E4E] mb-1">{stat.value}</div>
                    <div className="text-xs text-[#9B9B9B] uppercase tracking-wider">{stat.label}</div>
                  </div>
                ))}
              </div>
            </section>

            {/* Preview sections */}
            <section className="py-20 max-w-6xl mx-auto px-6">
              <div className="grid md:grid-cols-3 gap-8">
                {[
                  {
                    icon: "BookOpen",
                    title: "Архив материалов",
                    desc: "Статьи, видео и файлы для скачивания от специалистов и участников клуба.",
                    action: () => scrollTo("articles"),
                    link: "Перейти в архив",
                  },
                  {
                    icon: "MessageCircle",
                    title: "Форум родителей",
                    desc: "Задайте вопрос, поделитесь опытом или просто поговорите с теми, кто понимает.",
                    action: () => scrollTo("forum"),
                    link: "В форум",
                  },
                  {
                    icon: "Calendar",
                    title: "Встречи и события",
                    desc: "Регулярные встречи, мастер-классы и лекции — онлайн и в вашем городе.",
                    action: () => scrollTo("events"),
                    link: "Расписание",
                  },
                ].map((card) => (
                  <div
                    key={card.title}
                    className="border border-[#E8E4DC] p-8 hover:border-[#C4A882] transition-colors group"
                  >
                    <div className="w-10 h-10 bg-[#F0EDE6] flex items-center justify-center mb-6 group-hover:bg-[#E8DECE] transition-colors">
                      <Icon name={card.icon} size={20} className="text-[#8B6E4E]" />
                    </div>
                    <h3 className="font-cormorant text-2xl font-medium text-[#2C2C2C] mb-3">{card.title}</h3>
                    <p className="text-sm text-[#6B6B6B] leading-relaxed mb-6">{card.desc}</p>
                    <button
                      onClick={card.action}
                      className="text-sm text-[#8B6E4E] flex items-center gap-2 hover:gap-3 transition-all"
                    >
                      {card.link} <Icon name="ArrowRight" size={14} />
                    </button>
                  </div>
                ))}
              </div>
            </section>

            {/* Quote */}
            <section className="bg-[#F0EDE6] py-20">
              <div className="max-w-3xl mx-auto px-6 text-center">
                <blockquote className="font-cormorant text-3xl md:text-4xl font-light italic text-[#2C2C2C] leading-relaxed mb-6">
                  «Быть родителем — это не должность, это постоянное путешествие открытий.»
                </blockquote>
                <cite className="text-xs text-[#9B9B9B] uppercase tracking-wider not-italic">
                  Миссия нашего клуба
                </cite>
              </div>
            </section>
          </div>
        )}

        {/* ARTICLES */}
        {activeSection === "articles" && (
          <div className="animate-fade-in max-w-6xl mx-auto px-6 py-16">
            <div className="mb-12">
              <span className="text-xs font-medium tracking-widest uppercase text-[#8B6E4E] mb-3 block">Архив</span>
              <h2 className="font-cormorant text-5xl font-light text-[#2C2C2C] mb-4">Материалы</h2>
              <p className="text-[#6B6B6B] max-w-md">
                Статьи, видеозаписи встреч и материалы для скачивания от специалистов и участников клуба.
              </p>
            </div>

            <div className="flex gap-3 mb-10 flex-wrap">
              {["Все", "Статьи", "Видео", "Скачать"].map((f) => (
                <button
                  key={f}
                  onClick={() => setArchiveFilter(f)}
                  className={`px-4 py-2 text-sm transition-colors ${
                    archiveFilter === f
                      ? "bg-[#2C2C2C] text-[#FAFAF8]"
                      : "border border-[#E8E4DC] text-[#6B6B6B] hover:border-[#2C2C2C] hover:text-[#2C2C2C]"
                  }`}
                >
                  {f}
                </button>
              ))}
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {articles
                .filter((a) => {
                  if (archiveFilter === "Все") return true;
                  if (archiveFilter === "Статьи") return a.type === "article";
                  if (archiveFilter === "Видео") return a.type === "video";
                  if (archiveFilter === "Скачать") return a.type === "download";
                  return true;
                })
                .map((article) => (
                  <article
                    key={article.id}
                    className="border border-[#E8E4DC] p-6 hover:border-[#C4A882] transition-colors group cursor-pointer"
                  >
                    <div className="flex items-center justify-between mb-4">
                      <span className="text-xs text-[#8B6E4E] font-medium uppercase tracking-wider">
                        {article.category}
                      </span>
                      <div className="w-8 h-8 bg-[#F0EDE6] flex items-center justify-center group-hover:bg-[#E8DECE] transition-colors">
                        <Icon name={typeIcon[article.type]} size={14} className="text-[#8B6E4E]" />
                      </div>
                    </div>
                    <h3 className="font-cormorant text-xl font-medium text-[#2C2C2C] mb-3 leading-snug">
                      {article.title}
                    </h3>
                    <p className="text-sm text-[#6B6B6B] leading-relaxed mb-5">{article.excerpt}</p>
                    <div className="flex items-center justify-between pt-4 border-t border-[#F0EDE6]">
                      <div>
                        <div className="text-xs font-medium text-[#2C2C2C]">{article.author}</div>
                        <div className="text-xs text-[#9B9B9B]">{article.date}</div>
                      </div>
                      <span className="text-xs text-[#9B9B9B] flex items-center gap-1">
                        <Icon name="Clock" size={12} />
                        {article.readTime}
                      </span>
                    </div>
                    <button className="mt-4 text-sm text-[#8B6E4E] flex items-center gap-2 hover:gap-3 transition-all">
                      {typeLabel[article.type]} <Icon name="ArrowRight" size={14} />
                    </button>
                  </article>
                ))}
            </div>
          </div>
        )}

        {/* FORUM */}
        {activeSection === "forum" && (
          <div className="animate-fade-in max-w-6xl mx-auto px-6 py-16">
            <div className="mb-12 flex items-end justify-between flex-wrap gap-4">
              <div>
                <span className="text-xs font-medium tracking-widest uppercase text-[#8B6E4E] mb-3 block">Сообщество</span>
                <h2 className="font-cormorant text-5xl font-light text-[#2C2C2C] mb-4">Форум</h2>
                <p className="text-[#6B6B6B] max-w-md">
                  Пространство для живого общения. Задавайте вопросы, делитесь опытом.
                </p>
              </div>
              <button className="px-6 py-3 bg-[#2C2C2C] text-[#FAFAF8] text-sm font-medium hover:bg-[#8B6E4E] transition-colors flex items-center gap-2">
                <Icon name="Plus" size={16} />
                Новая тема
              </button>
            </div>

            <div className="space-y-3">
              {forumTopics.map((topic) => (
                <div
                  key={topic.id}
                  className="border border-[#E8E4DC] p-6 hover:border-[#C4A882] transition-colors cursor-pointer group"
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <span className="text-xs bg-[#F0EDE6] text-[#8B6E4E] px-2 py-0.5 font-medium">
                          {topic.tag}
                        </span>
                      </div>
                      <h3 className="font-medium text-[#2C2C2C] group-hover:text-[#8B6E4E] transition-colors mb-2">
                        {topic.title}
                      </h3>
                      <div className="flex items-center gap-4 text-xs text-[#9B9B9B]">
                        <span>{topic.author}</span>
                        <span className="flex items-center gap-1">
                          <Icon name="Clock" size={11} />
                          {topic.lastActive}
                        </span>
                      </div>
                    </div>
                    <div className="text-right shrink-0">
                      <div className="flex items-center gap-1 text-[#9B9B9B]">
                        <Icon name="MessageCircle" size={14} />
                        <span className="text-sm font-medium text-[#6B6B6B]">{topic.replies}</span>
                      </div>
                      <div className="text-xs text-[#9B9B9B] mt-1">ответов</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-10 bg-[#F0EDE6] p-8 text-center">
              <Icon name="Users" size={32} className="text-[#8B6E4E] mx-auto mb-4" />
              <h3 className="font-cormorant text-2xl font-medium text-[#2C2C2C] mb-2">Присоединяйтесь к клубу</h3>
              <p className="text-sm text-[#6B6B6B] mb-4">Чтобы писать на форуме, нужно стать участником клуба</p>
              <button
                onClick={() => scrollTo("contact")}
                className="px-6 py-3 bg-[#2C2C2C] text-[#FAFAF8] text-sm font-medium hover:bg-[#8B6E4E] transition-colors"
              >
                Вступить в клуб
              </button>
            </div>
          </div>
        )}

        {/* EVENTS */}
        {activeSection === "events" && (
          <div className="animate-fade-in max-w-6xl mx-auto px-6 py-16">
            <div className="mb-12">
              <span className="text-xs font-medium tracking-widest uppercase text-[#8B6E4E] mb-3 block">Расписание</span>
              <h2 className="font-cormorant text-5xl font-light text-[#2C2C2C] mb-4">Мероприятия</h2>
              <p className="text-[#6B6B6B] max-w-md">
                Встречи клуба, мастер-классы и открытые лекции. Онлайн и офлайн.
              </p>
            </div>

            <div className="space-y-4">
              {events.map((event) => (
                <div
                  key={event.id}
                  className="border border-[#E8E4DC] p-6 md:p-8 flex gap-6 md:gap-10 items-start hover:border-[#C4A882] transition-colors group"
                >
                  <div className="shrink-0 text-center min-w-[60px]">
                    <div className="font-cormorant text-3xl font-light text-[#8B6E4E] leading-none">
                      {event.date.split(" ")[0]}
                    </div>
                    <div className="text-xs text-[#9B9B9B] mt-1 font-medium uppercase tracking-wider">
                      {event.date.split(" ")[1]}
                    </div>
                    <div className="text-xs text-[#9B9B9B]">{event.day}</div>
                  </div>
                  <div className="flex-1">
                    <h3 className="font-cormorant text-2xl font-medium text-[#2C2C2C] group-hover:text-[#8B6E4E] transition-colors mb-3">
                      {event.title}
                    </h3>
                    <div className="flex flex-wrap gap-4 text-sm text-[#6B6B6B]">
                      <span className="flex items-center gap-1.5">
                        <Icon name="MapPin" size={14} className="text-[#9B9B9B]" />
                        {event.location}
                      </span>
                      <span className="flex items-center gap-1.5">
                        <Icon name="Clock" size={14} className="text-[#9B9B9B]" />
                        {event.time}
                      </span>
                      <span className="flex items-center gap-1.5">
                        <Icon name="Users" size={14} className="text-[#9B9B9B]" />
                        {event.spots}
                      </span>
                    </div>
                  </div>
                  <button className="shrink-0 px-4 py-2 border border-[#E8E4DC] text-sm text-[#6B6B6B] hover:border-[#8B6E4E] hover:text-[#8B6E4E] transition-colors self-center hidden md:block">
                    Записаться
                  </button>
                </div>
              ))}
            </div>

            <div className="mt-10 border border-[#E8E4DC] p-8 flex flex-col md:flex-row items-start md:items-center gap-6 justify-between">
              <div>
                <h3 className="font-cormorant text-2xl font-medium text-[#2C2C2C] mb-1">Хотите предложить тему?</h3>
                <p className="text-sm text-[#6B6B6B]">Напишите нам — мы постараемся организовать встречу по вашему запросу.</p>
              </div>
              <button
                onClick={() => scrollTo("contact")}
                className="shrink-0 px-6 py-3 bg-[#2C2C2C] text-[#FAFAF8] text-sm font-medium hover:bg-[#8B6E4E] transition-colors"
              >
                Написать нам
              </button>
            </div>
          </div>
        )}

        {/* ABOUT */}
        {activeSection === "about" && (
          <div className="animate-fade-in">
            <div className="max-w-6xl mx-auto px-6 py-16">
              <div className="grid md:grid-cols-2 gap-16 items-start">
                <div>
                  <span className="text-xs font-medium tracking-widest uppercase text-[#8B6E4E] mb-3 block">О нас</span>
                  <h2 className="font-cormorant text-5xl font-light text-[#2C2C2C] mb-6">Наш клуб</h2>
                  <div className="space-y-5 text-[#6B6B6B] leading-relaxed">
                    <p>
                      Родительский Клуб — это некоммерческое сообщество, основанное в 2022 году группой
                      родителей, которые хотели найти живое и честное пространство для обмена опытом.
                    </p>
                    <p>
                      Мы не даём готовых рецептов воспитания. Мы создаём условия, в которых каждый родитель
                      может задать вопрос, услышать разные точки зрения и найти то, что подходит именно его семье.
                    </p>
                    <p>
                      К нам приходят специалисты — детские психологи, педиатры, логопеды — и делятся знаниями
                      в формате живых встреч, записей и материалов.
                    </p>
                  </div>
                </div>
                <div className="space-y-6">
                  {[
                    { icon: "Heart", title: "Поддержка без осуждения", desc: "Мы создаём безопасное место, где нет правильных и неправильных родителей." },
                    { icon: "Lightbulb", title: "Знания из первых рук", desc: "Специалисты с реальной практикой, не теоретики из учебников." },
                    { icon: "Users", title: "Живое сообщество", desc: "Офлайн-встречи, личное знакомство, дружба семьями." },
                    { icon: "Leaf", title: "Рост вместе с детьми", desc: "Клуб растёт вместе с участниками — мы учимся у друг друга." },
                  ].map((value) => (
                    <div key={value.title} className="flex gap-4">
                      <div className="w-10 h-10 bg-[#F0EDE6] flex items-center justify-center shrink-0">
                        <Icon name={value.icon} size={18} className="text-[#8B6E4E]" />
                      </div>
                      <div>
                        <h4 className="font-medium text-[#2C2C2C] mb-1">{value.title}</h4>
                        <p className="text-sm text-[#6B6B6B]">{value.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="bg-[#F0EDE6] py-16">
              <div className="max-w-6xl mx-auto px-6">
                <h3 className="font-cormorant text-3xl font-light text-[#2C2C2C] mb-10 text-center">
                  Команда клуба
                </h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                  {[
                    { name: "Мария Соколова", role: "Основатель", initial: "М" },
                    { name: "Алексей Дорофеев", role: "Детский психолог", initial: "А" },
                    { name: "Наталья Крюкова", role: "Педиатр", initial: "Н" },
                    { name: "Ирина Климова", role: "Координатор", initial: "И" },
                  ].map((person) => (
                    <div key={person.name} className="text-center">
                      <div className="w-16 h-16 bg-[#C4A882] text-[#FAFAF8] rounded-full flex items-center justify-center font-cormorant text-2xl mx-auto mb-3">
                        {person.initial}
                      </div>
                      <div className="font-medium text-sm text-[#2C2C2C]">{person.name}</div>
                      <div className="text-xs text-[#9B9B9B]">{person.role}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* CONTACT */}
        {activeSection === "contact" && (
          <div className="animate-fade-in max-w-6xl mx-auto px-6 py-16">
            <div className="mb-12">
              <span className="text-xs font-medium tracking-widest uppercase text-[#8B6E4E] mb-3 block">Связь</span>
              <h2 className="font-cormorant text-5xl font-light text-[#2C2C2C] mb-4">Напишите нам</h2>
              <p className="text-[#6B6B6B] max-w-md">
                Хотите вступить в клуб, задать вопрос или предложить идею — будем рады услышать.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-16">
              <div className="space-y-8">
                {[
                  { icon: "Mail", label: "Электронная почта", value: "hello@roditeli-club.ru" },
                  { icon: "Phone", label: "Телефон", value: "+7 (999) 000-00-00" },
                  { icon: "MapPin", label: "Адрес", value: "Центр «Семья», ул. Ленина, 14" },
                  { icon: "Clock", label: "Режим работы", value: "Пн–Пт, 10:00 — 18:00" },
                ].map((contact) => (
                  <div key={contact.label} className="flex gap-4">
                    <div className="w-10 h-10 bg-[#F0EDE6] flex items-center justify-center shrink-0">
                      <Icon name={contact.icon} size={18} className="text-[#8B6E4E]" />
                    </div>
                    <div>
                      <div className="text-xs text-[#9B9B9B] uppercase tracking-wider mb-1">{contact.label}</div>
                      <div className="text-[#2C2C2C] font-medium">{contact.value}</div>
                    </div>
                  </div>
                ))}

                <div className="pt-4 border-t border-[#E8E4DC]">
                  <div className="text-xs text-[#9B9B9B] uppercase tracking-wider mb-3">Мы в соцсетях</div>
                  <div className="flex gap-3">
                    {["VK", "Telegram"].map((net) => (
                      <button
                        key={net}
                        className="px-4 py-2 border border-[#E8E4DC] text-sm text-[#6B6B6B] hover:border-[#8B6E4E] hover:text-[#8B6E4E] transition-colors"
                      >
                        {net}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              <form className="space-y-5" onSubmit={(e) => e.preventDefault()}>
                <div>
                  <label className="block text-xs text-[#9B9B9B] uppercase tracking-wider mb-2">Ваше имя</label>
                  <input
                    type="text"
                    placeholder="Имя и фамилия"
                    className="w-full border border-[#E8E4DC] px-4 py-3 text-sm bg-transparent focus:outline-none focus:border-[#8B6E4E] transition-colors placeholder:text-[#C4BFB6]"
                  />
                </div>
                <div>
                  <label className="block text-xs text-[#9B9B9B] uppercase tracking-wider mb-2">Email</label>
                  <input
                    type="email"
                    placeholder="your@email.com"
                    className="w-full border border-[#E8E4DC] px-4 py-3 text-sm bg-transparent focus:outline-none focus:border-[#8B6E4E] transition-colors placeholder:text-[#C4BFB6]"
                  />
                </div>
                <div>
                  <label className="block text-xs text-[#9B9B9B] uppercase tracking-wider mb-2">Тема</label>
                  <select className="w-full border border-[#E8E4DC] px-4 py-3 text-sm bg-[#FAFAF8] focus:outline-none focus:border-[#8B6E4E] transition-colors text-[#6B6B6B]">
                    <option>Вступление в клуб</option>
                    <option>Предложение темы встречи</option>
                    <option>Сотрудничество</option>
                    <option>Другое</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs text-[#9B9B9B] uppercase tracking-wider mb-2">Сообщение</label>
                  <textarea
                    rows={4}
                    placeholder="Ваш вопрос или предложение..."
                    className="w-full border border-[#E8E4DC] px-4 py-3 text-sm bg-transparent focus:outline-none focus:border-[#8B6E4E] transition-colors resize-none placeholder:text-[#C4BFB6]"
                  />
                </div>
                <button
                  type="submit"
                  className="w-full py-3 bg-[#2C2C2C] text-[#FAFAF8] text-sm font-medium hover:bg-[#8B6E4E] transition-colors"
                >
                  Отправить сообщение
                </button>
              </form>
            </div>
          </div>
        )}

      </main>

      {/* FOOTER */}
      <footer className="border-t border-[#E8E4DC] mt-20">
        <div className="max-w-6xl mx-auto px-6 py-10 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="font-cormorant text-xl font-semibold text-[#2C2C2C]">Родительский Клуб</div>
          <div className="flex gap-6 flex-wrap justify-center">
            {navItems.slice(1).map((item) => (
              <button
                key={item.id}
                onClick={() => scrollTo(item.id)}
                className="text-xs text-[#9B9B9B] hover:text-[#2C2C2C] transition-colors uppercase tracking-wider"
              >
                {item.label}
              </button>
            ))}
          </div>
          <div className="text-xs text-[#C4BFB6]">© 2026 Родительский Клуб</div>
        </div>
      </footer>
    </div>
  );
};

export default Index;