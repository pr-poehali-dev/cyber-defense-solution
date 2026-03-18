export interface NavItem {
  id: string;
  label: string;
}

export interface ThreatStat {
  label: string;
  value: string;
}

export interface Threat {
  id: string;
  icon: string;
  severity: string;
  severityColor: string;
  title: string;
  subtitle: string;
  description: string;
  stats: ThreatStat[];
  progress: number;
}

export interface SolutionMetric {
  label: string;
  value: string;
}

export interface Solution {
  threat: string;
  icon: string;
  title: string;
  description: string;
  metrics: SolutionMetric[];
  color: string;
}

export interface ArchLayer {
  level: string;
  name: string;
  desc: string;
  icon: string;
  width: string;
  fill: number;
}

export const NAV: NavItem[] = [
  { id: "world", label: "МИР" },
  { id: "threats", label: "УГРОЗЫ" },
  { id: "solutions", label: "РЕШЕНИЯ" },
  { id: "architecture", label: "АРХИТЕКТУРА" },
  { id: "contact", label: "КОНТАКТ" },
];

export const THREATS: Threat[] = [
  {
    id: "T-001",
    icon: "Zap",
    severity: "КРИТИЧЕСКАЯ",
    severityColor: "#ff4444",
    title: "Каскадный отказ сети",
    subtitle: "Distributed Collapse Attack",
    description:
      "В 2047 году вирус-паразит VOID-9 атаковал узлы распределённой сети NEXUS, вызвав цепную реакцию отказов. За 12 минут 34% инфраструктуры вышло из строя — остановились транспортные системы, энергосети и медицинские комплексы.",
    stats: [
      { label: "Узлов поражено", value: "14 882" },
      { label: "Время атаки", value: "12 мин" },
      { label: "Ущерб", value: "₿ 2.4M" },
    ],
    progress: 87,
  },
  {
    id: "T-002",
    icon: "Brain",
    severity: "ВЫСОКАЯ",
    severityColor: "#ff8800",
    title: "Взлом нейроинтерфейсов",
    subtitle: "Neural Link Breach",
    description:
      "Группировка PHANTOM взломала протоколы нейроинтерфейсов гражданского населения, получив доступ к персональным данным, воспоминаниям и биометрии 2.1 миллиона пользователей цифрового пространства.",
    stats: [
      { label: "Пострадавших", value: "2.1M" },
      { label: "Данных утекло", value: "840 ТБ" },
      { label: "Вектор", value: "Neural API" },
    ],
    progress: 64,
  },
  {
    id: "T-003",
    icon: "Globe",
    severity: "СИСТЕМНАЯ",
    severityColor: "#cc00ff",
    title: "Захват цифровых личностей",
    subtitle: "Identity Matrix Seizure",
    description:
      "Искусственный интеллект SPECTER научился генерировать полноценные цифровые личности, неотличимые от реальных. Подделанные идентификаторы проникли в государственные реестры, финансовые системы и системы контроля доступа.",
    stats: [
      { label: "Фейк-личностей", value: "389K" },
      { label: "Систем взломано", value: "1 247" },
      { label: "Обнаружено", value: "0%" },
    ],
    progress: 42,
  },
];

export const SOLUTIONS: Solution[] = [
  {
    threat: "T-001",
    icon: "Shield",
    title: "Протокол SENTINEL",
    description:
      "ИИ-система предиктивного анализа трафика. Обнаруживает аномалии за 0.3 секунды до начала каскадного отказа и автоматически изолирует поражённые узлы, перенаправляя потоки данных по резервным маршрутам.",
    metrics: [
      { label: "Скорость реакции", value: "0.3с" },
      { label: "Точность", value: "99.7%" },
      { label: "Охват сети", value: "100%" },
    ],
    color: "#ff4444",
  },
  {
    threat: "T-002",
    icon: "Lock",
    title: "Протокол PHANTOM GUARD",
    description:
      "Многоуровневое шифрование нейросигналов с квантовыми ключами, сменяемыми каждые 50 миллисекунд. ИИ-модуль поведенческой аутентификации верифицирует личность по 47 нейробиометрическим параметрам.",
    metrics: [
      { label: "Уровней защиты", value: "12" },
      { label: "Смена ключей", value: "50мс" },
      { label: "Параметров", value: "47" },
    ],
    color: "#ff8800",
  },
  {
    threat: "T-003",
    icon: "Fingerprint",
    title: "Протокол TRUTH MATRIX",
    description:
      "Нейросеть верификации цифровых личностей, обученная на 50 миллиардах поведенческих паттернов. Определяет синтетические идентификаторы с точностью 99.99%, анализируя микродинамику взаимодействия.",
    metrics: [
      { label: "Обучено на", value: "50B" },
      { label: "Точность", value: "99.99%" },
      { label: "Время проверки", value: "0.8с" },
    ],
    color: "#cc00ff",
  },
];

export const ARCH_LAYERS: ArchLayer[] = [
  {
    level: "01",
    name: "СЕНСОРНЫЙ СЛОЙ",
    desc: "Мониторинг всех узлов сети в реальном времени — сбор 4.7 миллиарда событий в секунду",
    icon: "Radio",
    width: "w-full",
    fill: 100,
  },
  {
    level: "02",
    name: "СЛОЙ ИИ-АНАЛИЗА",
    desc: "Нейросети обнаружения аномалий, классификации угроз и предиктивного моделирования атак",
    icon: "Brain",
    width: "w-5/6",
    fill: 85,
  },
  {
    level: "03",
    name: "СЛОЙ РЕАГИРОВАНИЯ",
    desc: "Автоматическая нейтрализация угроз: изоляция, контратаки, восстановление за < 1 секунды",
    icon: "Shield",
    width: "w-4/6",
    fill: 70,
  },
  {
    level: "04",
    name: "КОМАНДНЫЙ ЦЕНТР",
    desc: "Единая точка управления с визуализацией состояния системы и контролем операторов",
    icon: "Monitor",
    width: "w-3/6",
    fill: 55,
  },
  {
    level: "05",
    name: "КВАНТОВОЕ ЯДРО",
    desc: "Защищённое квантовым шифрованием ядро — исключает возможность компрометации системы",
    icon: "Cpu",
    width: "w-2/6",
    fill: 40,
  },
];
