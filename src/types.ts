// Definición de interfaces para la base de conocimientos

export interface Category {
  id: string;
  name: string;
  description: string;
}

export interface Entry {
  id: string;
  title: string;
  category: string;
  tags: string[];
  content: string;
  related: string[];
}

export interface KnowledgeBaseMetadata {
  title: string;
  description: string;
  version: string;
  created: string;
  updated: string;
}

export interface KnowledgeBase {
  metadata: KnowledgeBaseMetadata;
  categories: Category[];
  entries: Entry[];
}

// Interfaces para estadísticas
export interface KnowledgeBaseStats {
  totalEntries: number;
  totalCategories: number;
  entriesByCategory: Record<string, number>;
  topTags: { tag: string; count: number }[];
  avgRelatedEntriesPerEntry: number;
}

// Interfaces para resultados de búsqueda
export interface SearchResult {
  entry: Entry;
  relevance: number; // Un valor indicando la relevancia del resultado
  matchesIn: string[]; // Dónde se encontraron las coincidencias (title, content, tags)
}
